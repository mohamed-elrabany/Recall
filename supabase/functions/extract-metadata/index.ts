// supabase/functions/extract-metadata/index.ts
//
// Flow:
//   1. Try our own fetch (title + meta description + Open Graph). Free.
//   2. If title or snippet is missing, try Firecrawl.
//   3. If still missing, set status "manual".
//
// This function only extracts and saves title + snippet.
// The embedding is generated afterwards by the client (embedBookmark).

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

type Extracted = { title: string; snippet: string };
const EMPTY: Extracted = { title: "", snippet: "" };

const MAX_SNIPPET = 400;

/* ---------------- helpers ---------------- */

const clean = (s?: string | null) => (s ?? "").replace(/\s+/g, " ").trim();

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

// Reads <meta property="og:title" content="..."> (or name="description")
// in either attribute order.
function getMeta(html: string, key: string): string {
  const value = `content=(?:"([^"]*)"|'([^']*)')`;
  const first = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]*${value}`,
    "i",
  );
  const second = new RegExp(
    `<meta[^>]+${value}[^>]*(?:property|name)=["']${key}["']`,
    "i",
  );
  const m = html.match(first) ?? html.match(second);
  return clean(decode(m?.[1] ?? m?.[2] ?? ""));
}

// Turns markdown into plain text, used only to build a backup snippet.
function markdownToText(md: string): string {
  return clean(
    md
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> link text
      .replace(/[#>*_`~|-]+/g, " "), // markdown symbols
  );
}

// Basic protection: only http(s), and nothing that points to our own network.
function isSafeUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (!["http:", "https:"].includes(u.protocol)) return false;
    const h = u.hostname;
    return !(
      h === "localhost" ||
      h.endsWith(".local") ||
      /^127\./.test(h) ||
      /^10\./.test(h) ||
      /^192\.168\./.test(h) ||
      /^169\.254\./.test(h) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
      h === "[::1]"
    );
  } catch {
    return false;
  }
}

/* ---------------- step 1: our own fetch ---------------- */

async function extractNative(url: string): Promise<Extracted> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RecallBot/1.0)",
        Accept: "text/html",
      },
    });

    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.includes("text/html")) return EMPTY;

    const html = (await res.text()).slice(0, 500_000);
    const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";

    return {
      title: getMeta(html, "og:title") || clean(decode(titleTag)),
      snippet: getMeta(html, "og:description") || getMeta(html, "description"),
    };
  } catch {
    return EMPTY;
  }
}

/* ---------------- step 2: Firecrawl fallback ---------------- */

async function extractWithFirecrawl(url: string): Promise<Extracted> {
  const apiKey = Deno.env.get("FIRE_CRAWL_KEY");
  if (!apiKey) return EMPTY;

  try {
    const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      signal: AbortSignal.timeout(30_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url, // the page to scrape (required)
        formats: ["markdown"],
        onlyMainContent: true,
        maxAge: 172_800_000, // reuse a 2-day-old cached copy (saves credits)
      }),
    });

    if (!res.ok) {
      console.error("Firecrawl error:", res.status);
      return EMPTY;
    }

    const body = await res.json();
    const meta = body?.data?.metadata ?? {};
    const markdown: string = body?.data?.markdown ?? "";

  return {
    title: clean(meta.title || meta.ogTitle),
    snippet: clean(meta.description || meta.ogDescription),
  };
  
  } catch (err) {
    console.error("Firecrawl failed:", err);
    return EMPTY;
  }
}

/* ---------------- handler ---------------- */

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    // Use the caller's token, so Row Level Security protects the data.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { id } = await req.json();
    if (!id) return json({ error: "Missing bookmark id" }, 400);

    const { data: bookmark, error } = await supabase
      .from("bookmarks")
      .select("id, url, status")
      .eq("id", id)
      .maybeSingle();

    if (error || !bookmark) return json({ error: "Bookmark not found" }, 404);
    if (bookmark.status !== "processing") {
      return json({ error: "Bookmark is not processing" }, 409);
    }

    let result: Extracted = EMPTY;

    if (isSafeUrl(bookmark.url)) {
      result = await extractNative(bookmark.url);

      // Missing title or snippet -> ask Firecrawl for help
      if (!result.title || !result.snippet) {
        const fc = await extractWithFirecrawl(bookmark.url);
        result = {
          title: result.title || fc.title,
          snippet: result.snippet || fc.snippet,
        };
      }
    }

    const title = result.title.slice(0, 200);
    const snippet = result.snippet.slice(0, MAX_SNIPPET);

    // Title AND snippet are both required, otherwise the user fills them in.
    const complete = Boolean(title && snippet);

    const { data: updated } = await supabase
      .from("bookmarks")
      .update({
        title: title || null,
        snippet: snippet || null,
        status: complete ? "processing" : "manual",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "processing") // don't overwrite if something changed meanwhile
      .select()
      .maybeSingle();

    if (!updated) return json({ error: "Bookmark changed during extraction" }, 409);

    return json({ bookmark: updated });
  } catch (err) {
    console.error("extract-metadata error:", err);
    return json({ error: "Extraction failed" }, 500);
  }
});
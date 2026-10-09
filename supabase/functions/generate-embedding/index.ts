// supabase/functions/generate-embedding/index.ts

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

// Built into the Supabase Edge Runtime. Created once per instance
// and reused across requests, so the model only loads on cold start.
// deno-lint-ignore no-explicit-any
const session = new (globalThis as any).Supabase.ai.Session("gte-small");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (typeof text !== "string" || !text.trim()) {
      return json({ error: "`text` must be a non-empty string" }, 400);
    }

    const output = await session.run(text.trim(), {
      mean_pool: true,
      normalize: true,
    });

    const embedding = Array.from(output as ArrayLike<number>);

    if (embedding.length !== 384) {
      return json(
        { error: `Unexpected embedding size: ${embedding.length}` },
        500,
      );
    }

    return json({ embedding });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
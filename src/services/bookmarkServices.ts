import { supabase } from "../lib/supabaseClient";
import type { BookMark } from "../types/bookmark";

// A bookmark stuck in "processing" longer than this is treated as dead
// and can be edited or retried again.
const STALE_PROCESSING_MS = 2 * 60 * 1000;

type EmbeddingDoneCallback = (bookmark: BookMark) => void;

/* ============================================================
   Embedding helpers (internal, not exported)
   ============================================================ */

function buildEmbeddingText(bookmark: BookMark): string {
  const tags = bookmark.tags ?? [];

  return [
    bookmark.title,
    bookmark.snippet,
    bookmark.notes,
    tags.length ? `Tags: ${tags.join(", ")}` : "",
  ]
    .map((s) => s?.trim())
    .filter(Boolean)
    .join("\n");
}

async function generateEmbedding(text: string): Promise<number[]> {
  const { data, error } = await supabase.functions.invoke(
    "generate-embedding",
    { body: { text } },
  );

  if (error) {
    // FunctionsHttpError carries the raw response in error.context
    try {
      const body = await error.context.json();
      console.error("Edge function error body:", body);
    } catch {
      console.error("Could not read error body");
    }
    throw error;
  }
  if (!data?.embedding) throw new Error(data?.error ?? "No embedding returned");

  return data.embedding;
}

// Writes the final result, but only while the row is still "processing",
// so a late or stale result can't overwrite newer data. Never throws.
async function finishEmbedding(
  id: string,
  patch: Record<string, unknown>,
): Promise<BookMark | null> {
  const { data } = await supabase
    .from("bookmarks")
    .update(patch)
    .eq("id", id)
    .eq("status", "processing")
    .select()
    .maybeSingle();

  return data;
}

// Runs in the background. Never throws. Returns the final row.
async function embedBookmark(saved: BookMark): Promise<BookMark> {
  const text = buildEmbeddingText(saved);

  // Nothing to embed -> the user must fill in title/summary manually
  if (!text) {
    const manual = await finishEmbedding(saved.id!, {
      embedding: null,
      status: "manual",
    });
    return manual ?? saved;
  }

  try {
    const embedding = await generateEmbedding(text);
    const done = await finishEmbedding(saved.id!, { embedding, status: "done" });
    return done ?? saved;
  } catch (err) {
    console.error("Embedding failed:", err);
    const failed = await finishEmbedding(saved.id!, { status: "failed" });
    return failed ?? { ...saved, status: "failed" };
  }
}

/* ============================================================
   Read
   ============================================================ */

export async function fetchBookmarks(): Promise<BookMark[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getBookmarkById(id: string): Promise<BookMark | null> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

/* ============================================================
   Create / Update / Delete
   ============================================================ */

export async function addBookmark(
  bookmark: BookMark,
): Promise<BookMark | null> {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert(bookmark)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateBookmark(
  id: string,
  bookmark: BookMark,
  onEmbeddingDone?: EmbeddingDoneCallback,
): Promise<BookMark> {
  // Never send fields the client shouldn't overwrite
  const { embedding, id: _id, user_id, created_at, ...fields } =
    bookmark as any;

  const staleBefore = new Date(Date.now() - STALE_PROCESSING_MS).toISOString();

  const { data, error } = await supabase
    .from("bookmarks")
    .update({
      ...fields,
      status: "processing",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    // allowed only if NOT processing, or processing for too long (stuck)
    .or(`status.neq.processing,updated_at.lt.${staleBefore}`)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  // No row matched -> it's currently processing
  if (!data) {
    throw new Error(
      "This bookmark is still being processed. Try again in a moment.",
    );
  }

  // Fire and forget: the user gets the saved bookmark immediately
  embedBookmark(data).then((final) => onEmbeddingDone?.(final));

  return data;
}

export async function deleteBookmark(id: string): Promise<void> {
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

/* ============================================================
   Favorite
   ============================================================ */

export async function toggleBookmarkFavorite(id: string, isFavorite: boolean) {
  const { data, error } = await supabase
    .from("bookmarks")
    .update({ is_favorite: isFavorite })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

/* ============================================================
   Retry (failed / manual)
   ============================================================ */

export async function retryEmbedding(
  id: string,
  onEmbeddingDone?: EmbeddingDoneCallback,
): Promise<BookMark> {
  const staleBefore = new Date(Date.now() - STALE_PROCESSING_MS).toISOString();

  // Claim the row atomically: set "processing" only if it isn't already
  const { data, error } = await supabase
    .from("bookmarks")
    .update({ status: "processing", updated_at: new Date().toISOString() })
    .eq("id", id)
    .or(`status.neq.processing,updated_at.lt.${staleBefore}`)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("This bookmark is already being processed.");

  embedBookmark(data).then((final) => onEmbeddingDone?.(final));

  return data;
}

/* ============================================================
   WHAT EACH FUNCTION DOES

   buildEmbeddingText(bookmark)
     Joins title, snippet, notes and tags into one string
     ("Tags: a, b") to be embedded. Empty fields are skipped.
     Returns "" if there is nothing meaningful to embed.

   generateEmbedding(text)
     Calls the "generate-embedding" edge function and returns the
     384-number vector. Throws if the call fails or no vector comes back.

   finishEmbedding(id, patch)
     Saves the final result (embedding + status) on the row, but only
     if the row is still "processing". This prevents a stale or late
     result from overwriting newer data. Never throws.

   embedBookmark(saved)
     Background job after a save. Builds the text, then:
       - no text         -> status "manual"
       - embedding works -> saves the vector, status "done"
       - embedding fails -> status "failed"
     Never throws and returns the final row.

   fetchBookmarks()
     Returns all bookmarks of the logged-in user, or [] if not logged in.

   getBookmarkById(id)
     Returns a single bookmark by id.

   addBookmark(bookmark)
     Inserts a new bookmark and returns the created row. No embedding
     yet, since add has no title/snippet until extraction exists.

   updateBookmark(id, bookmark, onEmbeddingDone?)
     Saves the edit immediately with status "processing", but refuses
     if the row is already processing (unless stuck over 2 minutes).
     Returns the saved row right away, then runs embedBookmark in the
     background and calls onEmbeddingDone with the final row
     (done / failed / manual). Throws if the save fails or the
     bookmark is currently processing.

   deleteBookmark(id)
     Deletes the bookmark.

   toggleBookmarkFavorite(id, isFavorite)
     Updates only is_favorite. Does not touch status or the embedding.

   retryEmbedding(id, onEmbeddingDone?)
     For failed / manual bookmarks. Claims the row by setting
     "processing" (refuses if already processing and not stuck), then
     re-runs embedBookmark in the background and calls
     onEmbeddingDone with the final row.
   ============================================================ */
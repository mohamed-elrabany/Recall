import { supabase } from "../lib/supabaseClient";
import type { BookMark, BookmarkInput } from "../types/bookmark";
import type { Tag } from "../types/tag";

type BookmarkTagRelation = {
  tag: Tag | null;
};

// A bookmark stuck in "processing" longer than this is treated as dead
// and can be edited or retried again.
const STALE_PROCESSING_MS = 2 * 60 * 1000;

type EmbeddingDoneCallback = (bookmark: BookMark) => void;

// function getTagNames(tags: BookMark["tags"]): string[] {
//   return (tags ?? []).map((tag) => (typeof tag === "string" ? tag : tag.name));
// }

/* ============================================================
   Embedding helpers (internal, not exported)
   ============================================================ */

function buildEmbeddingText(bookmark: BookMark): string {
  const tags = (bookmark.tags ?? []).map((tag) => tag.name);

  return [
    bookmark.title,
    bookmark.snippet,
    bookmark.notes,
    tags.length ? `Tags: ${tags.join(", ")}` : "",
  ]
    .map((text) => text?.trim())
    .filter(Boolean)
    .join("\n");
}

export async function generateEmbedding(text: string): Promise<number[]> {
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
  const { data, error } = await supabase
    .from("bookmarks")
    .update(patch)
    .eq("id", id)
    .eq("status", "processing")
    .select(`
      *,
      tags:bookmark_tags (
        tag:tags (
          id,
          name,
          user_id,
          created_at
        )
      )
    `)
    .maybeSingle();

  if (error) {
    console.error("Failed to finish embedding:", error);
    return null;
  }

  if (!data) return null;

  const relations = (data.tags ?? []) as unknown as BookmarkTagRelation[];

  return {
    ...data,
    tags: relations
      .map((relation) => relation.tag)
      .filter((tag): tag is Tag => tag !== null),
  } as BookMark;
}


// Runs in the background. Never throws. Returns the final row.
async function embedBookmark(saved: BookMark): Promise<BookMark> {
  const text = buildEmbeddingText(saved);

  const hasTitle = Boolean(saved.title?.trim());
  const hasContext = Boolean(saved.snippet?.trim() || saved.notes?.trim());

  // Nothing to embed -> the user must fill in title/summary manually
  if (!hasTitle || !hasContext) {
    const manual = await finishEmbedding(saved.id!, {
      embedding: null,
      status: "manual",
    });
    return manual ?? saved;
  }

  try {
    const embedding = await generateEmbedding(text);
    const done = await finishEmbedding(saved.id!, {
      embedding,
      status: "done",
    });
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
    .select(
      `
      *,
      tags:bookmark_tags (
        tag:tags (
          id,
          name,
          user_id,
          created_at
        )
      )
    `,
    )
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  console.log("Fetched bookmarks:", data);

  return (data ?? []).map((bookmark) => {
    const relations = (bookmark.tags ?? []) as unknown as BookmarkTagRelation[];

    return {
      ...bookmark,
      tags: relations
        .map((relation) => relation.tag)
        .filter((tag): tag is Tag => tag !== null),
    };
  }) as BookMark[];
}

export async function getBookmarkById(id: string): Promise<BookMark | null> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select(
      `
      *,
      tags:bookmark_tags (
        tag:tags (
          id,
          name,
          user_id,
          created_at
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  const relations = (data.tags ?? []) as unknown as BookmarkTagRelation[];

  console.log("Fetched bookmark by ID:", data);

  return {
    ...data,
    tags: relations
      .map((relation) => relation.tag)
      .filter((tag): tag is Tag => tag !== null),
  } as BookMark;
}

/* ============================================================
   Extract metadata (title + snippet) from a URL
   ============================================================ */


export async function processNewBookmark(
  saved: BookMark,
  onDone?: EmbeddingDoneCallback,
) {
  const { data, error } = await supabase.functions.invoke(
    "extract-metadata",
    {
      body: { id: saved.id },
    },
  );

  const extracted: BookMark | undefined = data?.bookmark;

  if (error || !extracted) {
    return onDone?.({
      ...saved,
      status: "manual",
    });
  }

  // Preserve the tags from the initially saved bookmark.
  const bookmarkWithTags: BookMark = {
    ...saved,
    ...extracted,
    tags: saved.tags,
  };

  if (bookmarkWithTags.status === "manual") {
    return onDone?.(bookmarkWithTags);
  }

  const final = await embedBookmark(bookmarkWithTags);
  onDone?.(final);
}

/* ============================================================
   Create / Update / Delete
   ============================================================ */

export async function addBookmark(
  bookmark: BookmarkInput,
): Promise<BookMark | null> {
  const { data, error } = await supabase.rpc("save_bookmark_with_tags", {
    p_bookmark: {
      url: bookmark.url,
      title: bookmark.title,
      snippet: bookmark.snippet,
      notes: bookmark.notes,
      icon: bookmark.icon,
      is_favorite: bookmark.is_favorite,
    },
    p_tag_names: bookmark.tags ?? [],
    p_bookmark_id: null,
  });

  if (error) throw new Error(error.message);

  console.log("Added bookmark:", data);

  return data as unknown as BookMark;
}

export async function updateBookmark(
  id: string,
  bookmark: BookmarkInput,
  onEmbeddingDone?: EmbeddingDoneCallback,
): Promise<BookMark> {
  // Keep tags separate from the other bookmark fields.
  const {
    embedding,
    id: _id,
    user_id,
    created_at,
    updated_at,
    status,
    tags = [],
    ...fields
  } = bookmark;

  const { data, error } = await supabase.rpc("save_bookmark_with_tags", {
    p_bookmark: fields,
    p_tag_names: tags,
    p_bookmark_id: id,
  });

  if (error) throw new Error(error.message);

  if (!data) {
    throw new Error("Failed to update bookmark.");
  }

  console.log("Updated bookmark:", data);

  // The RPC has saved the bookmark and synchronized its tags.
  // Start embedding only after that operation succeeds.
  const saved = data as unknown as BookMark;

  embedBookmark(saved).then((final) => onEmbeddingDone?.(final));

  return saved;
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
  const staleBefore = new Date(
    Date.now() - STALE_PROCESSING_MS,
  ).toISOString();

  // Claim the bookmark only if it isn't already being processed,
  // or its processing state is stale.
  const { data, error } = await supabase
    .from("bookmarks")
    .update({
      status: "processing",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .or(`status.neq.processing,updated_at.lt.${staleBefore}`)
    .select("id")
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) {
    throw new Error("This bookmark is already being processed.");
  }

  // Fetch the complete bookmark, including its related tags.
  const saved = await getBookmarkById(id);

  if (!saved) {
    throw new Error("Failed to fetch the bookmark for embedding.");
  }

  // Run embedding in the background.
  embedBookmark(saved)
    .then((final) => onEmbeddingDone?.(final))
    .catch((error) => {
      console.error("Retry embedding failed:", error);
    });

  // Return the bookmark with its tags immediately.
  return saved;
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

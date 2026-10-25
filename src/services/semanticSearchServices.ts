
import type { BookMark } from "../types/bookmark";
import type { SearchParams } from "../types/semanticSearch";
import { supabase } from "../lib/supabaseClient";
import { generateEmbedding } from "./bookmarkServices";

const DEFAULT_MIN_SIMILARITY = 0.80;
const DEFAULT_RESULT_LIMIT = 10;

export async function searchBookmarks({
    query,
    scope,
    tagId,
    minSimilarity = DEFAULT_MIN_SIMILARITY,
    limit = DEFAULT_RESULT_LIMIT,
}: SearchParams): Promise<BookMark[]> {
    const queryEmbedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc(
        "semantic_search_bookmarks",
        {
            p_query_embedding: queryEmbedding,
            p_scope: scope,
            p_tag_id: tagId ?? null,
            p_min_similarity: minSimilarity,
            p_limit: limit,
        }
    );

    if (error) {
        console.error("Error searching bookmarks:", error);
        throw error;
    }

    return (data ?? []) as BookMark[];
}

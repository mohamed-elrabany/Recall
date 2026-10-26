import type { BookMark } from "../types/bookmark";
import type { SearchParams } from "../types/semanticSearch";
import { supabase } from "../lib/supabaseClient";
import { generateEmbedding } from "./bookmarkServices";

const DEFAULT_MIN_SIMILARITY = 0.80;
const DEFAULT_RESULT_LIMIT = 2;

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



interface SimilarBookmarkParams {
    bookmarkId: string;
    minSimilarity?: number;
    limit?: number;
}

export async function getSimilarBookmarks({
    bookmarkId,
    minSimilarity = DEFAULT_MIN_SIMILARITY,
    limit = DEFAULT_RESULT_LIMIT,
}: SimilarBookmarkParams): Promise<BookMark[]> {
    const { data, error } = await supabase.rpc(
        "get_similar_bookmarks",
        {
            p_bookmark_id: bookmarkId,
            p_min_similarity: minSimilarity,
            p_limit: limit,
        }
    );

    if (error) {
        console.error("Error fetching similar bookmarks:", error);
        throw error;
    }

    return (data ?? []) as BookMark[];
}

import type { BookMark } from "./bookmark";


export type SearchScope = "favorites" | "all" | "tag";

export interface SearchParams {
    query: string;
    scope: SearchScope;
    tagId?: string | null;
    minSimilarity?: number;
    limit?: number;
}
export interface SemanticSearchResult {
    bookmark: BookMark;
    similarity: number;
}

import { useEffect, useState } from "react";
import type { BookMark } from "../types/bookmark";
import type {
  SearchParams,
} from "../types/semanticSearch";
import { searchBookmarks } from "../services/semanticSearchServices";

export function useSemanticSearch({
  query,
  scope,
  tagId,
}: SearchParams) {
  const [results, setResults] = useState<BookMark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const searchResults = await searchBookmarks({
          query: trimmedQuery,
          scope,
          tagId,
        });

        if (!cancelled) {
          setResults(searchResults);
        }
      } catch (err) {
        console.error("Semantic search failed:", err);

        if (!cancelled) {
          setResults([]);
          setError("Failed to fetch search results");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query, scope, tagId]);

  return { results, loading, error };
}

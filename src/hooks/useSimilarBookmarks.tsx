
import { useEffect, useState } from "react";
import type { BookMark } from "../types/bookmark";
import { getSimilarBookmarks } from "../services/semanticSearchServices";

interface UseSimilarBookmarksParams {
    bookmarkId?: string;
}

export function useSimilarBookmarks({
    bookmarkId,
}: UseSimilarBookmarksParams) {
    const [results, setResults] = useState<BookMark[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookmarkId) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }

        const id = bookmarkId;

        let cancelled = false;

        async function fetchSimilarBookmarks() {
            setLoading(true);
            setError(null);
            setResults([]);

            try {
                const bookmarks = await getSimilarBookmarks({
                    bookmarkId: id,
                });

                if (!cancelled) {
                    setResults(bookmarks);
                }
            } catch (err) {
                console.error("Failed to fetch similar bookmarks:", err);

                if (!cancelled) {
                    setResults([]);
                    setError("Failed to fetch similar bookmarks");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void fetchSimilarBookmarks();

        return () => {
            cancelled = true;
        };
    }, [bookmarkId]);

    return { results, loading, error };
}

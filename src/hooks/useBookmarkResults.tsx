
import { useSemanticSearchContext } from "../context/SemanticSearchContext";
import { useBookmarks } from "./useBookmark";
import type { BookMark } from "../types/bookmark";

export function useBookmarkResults(sourceBookmarks: BookMark[]) {
  const { query, results, loading, error } = useSemanticSearchContext();
  const { isLoading: bookmarksLoading } = useBookmarks();

  const isSearching = query.trim().length >= 2;
  const bookmarks = isSearching ? results : sourceBookmarks;

  const isLoading = isSearching
    ? loading
    : bookmarksLoading && sourceBookmarks.length === 0;

  const searchError = isSearching ? error : null;
  const isEmpty = bookmarks.length === 0 && !isLoading && !searchError;

  return { bookmarks, isSearching, isLoading, searchError, isEmpty };
}

import { useSemanticSearchContext } from "../context/SemanticSearchContext";
import type { BookMark } from "../types/bookmark"; // use your actual type

export function useBookmarkResults(sourceBookmarks: BookMark[]) {
  const { query, results, loading, error } = useSemanticSearchContext();

  const isSearching = query.trim().length >= 2;
  const bookmarks = isSearching ? results : sourceBookmarks;

  const isLoading = isSearching && loading;
  const searchError = isSearching ? error : null;
  const isEmpty = bookmarks.length === 0 && !isLoading && !searchError;

  return { bookmarks, isSearching, isLoading, searchError, isEmpty };
}
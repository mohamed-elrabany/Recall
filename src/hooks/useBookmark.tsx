import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBookmarks } from "../services/bookmarkServices";
import { bookmarkActions } from "../store/slices/bookmarkSlice";

export function useBookmarks() {
  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading: authLoading } = useAppSelector(
    (state) => state.auth,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch(bookmarkActions.setBookmarks([]));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const bookmarks = await fetchBookmarks();

      dispatch(bookmarkActions.setBookmarks(bookmarks));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load bookmarks",
      );
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      load();
    }
  }, [authLoading, load]);

  return { isLoading, error, refetch: load };
}
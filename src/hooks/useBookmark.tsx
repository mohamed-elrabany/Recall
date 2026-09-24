import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchBookmarks } from "../services/bookmarkServices";
import { bookmarkActions } from "../store/slices/bookmarkSlice";
import { supabase } from "../lib/supabaseClient";

export function useBookmarks() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        dispatch(bookmarkActions.setBookmarks([]));
        return;
      }
      const bookmarks = await fetchBookmarks(user?.id);
      dispatch(bookmarkActions.setBookmarks(bookmarks ?? []));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookmarks");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  return { isLoading, error, refetch: load };
}
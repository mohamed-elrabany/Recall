import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTags } from "../services/tagServices";
import { tagActions } from "../store/slices/tagSlice";

export function useTags() {
  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading: authLoading } = useAppSelector(
    (state) => state.auth,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch(tagActions.setTags([]));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tags = await fetchTags();
      dispatch(tagActions.setTags(tags));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load tags",
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

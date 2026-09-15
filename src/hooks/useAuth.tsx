import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/slices/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1. Check if a user is already logged in
    const initializeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }
      
      dispatch(authActions.setSession(data.session));
      dispatch(authActions.setLoading(false));
    };

    initializeAuth();

    // 2. Listen for future auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(authActions.setSession(session));
    });

    // 3. Cleanup listener
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);
}

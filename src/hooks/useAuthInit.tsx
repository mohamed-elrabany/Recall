import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/slices/authSlice";
import { userActions } from "../store/slices/userSlice";
import { getCurrentUser } from "../services/userServices";

export function useAuthInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const profile = await getCurrentUser();
        if (active) dispatch(userActions.setUser(profile));
      } catch (error) {
        console.error("Error getting user profile:", error);
      }
    };

    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!active) return;

        dispatch(authActions.setSession(data.session));

        if (data.session) await loadProfile();
        else dispatch(userActions.setUser(null));
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        if (active) dispatch(authActions.setLoading(false));
      }
    };

    void initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      dispatch(authActions.setSession(session));

      if (!session) {
        dispatch(userActions.setUser(null));
        return;
      }
      void Promise.resolve().then(() => {
        if (active) void loadProfile();
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [dispatch]);
}
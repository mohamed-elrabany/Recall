import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/slices/authSlice";
import { userActions } from "../store/slices/userSlice";
import { getCurrentUser } from "../services/userServices";
import {useAppSelector} from "../store/hooks";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
  console.log("userSlice Data:", user);
}, [user]);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        dispatch(authActions.setLoading(false));
        return;
      }

      dispatch(authActions.setSession(data.session));

      // Load profile if user is logged in
      if (data.session) {
        try {
          const profile = await getCurrentUser();
          console.log("User profile loaded:", profile);
          dispatch(userActions.setUser(profile));
        } catch (error) {
          console.error("Error getting user profile:", error);
        }
      }

      dispatch(authActions.setLoading(false));
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      dispatch(authActions.setSession(session));

      if (session) {
        try {
          const profile = await getCurrentUser();
          dispatch(userActions.setUser(profile));
        } catch (error) {
          console.error("Error getting user profile:", error);
        }
      } else {
        dispatch(userActions.setUser(null));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);
}
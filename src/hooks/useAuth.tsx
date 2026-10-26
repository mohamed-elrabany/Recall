
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authActions } from "../store/slices/authSlice";
import { userActions } from "../store/slices/userSlice";
import {
  logout as logoutService,
  deleteAccount as deleteAccountService,
} from "../services/authServices";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isSubmitting = useAppSelector((state) => state.auth.isSubmitting);

  async function handleLogout() {
    if (isSubmitting) return;

    dispatch(authActions.setSubmitting(true));

    try {
      await logoutService();

      dispatch(authActions.logout());
      dispatch(userActions.setUser(null));

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      dispatch(authActions.setSubmitting(false));
    }
  }

  async function handleDeleteAccount() {
    if (isSubmitting) return;

    if (!user?.id) {
      throw new Error("No authenticated user found.");
    }

    dispatch(authActions.setSubmitting(true));

    try {
      await deleteAccountService();

      // Clear the local Supabase session after successful deletion.
      await supabase.auth.signOut({ scope: "local" });

      dispatch(authActions.logout());
      dispatch(userActions.setUser(null));

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    } finally {
      dispatch(authActions.setSubmitting(false));
    }
  }

  return {
    handleLogout,
    handleDeleteAccount,
    isLoading,
    isSubmitting,
  };
}

import { applyTheme } from "../utils/theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateUserTheme,
  userActions,
} from "../store/slices/userSlice";
import type { RootState } from "../store/store";
import type { ThemeMode } from "../types/settings";
import { useEffect } from "react";

export function useTheme() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user.user);

  const theme = user?.theme_preference || "system";

  useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const changeTheme = (newTheme: ThemeMode) => {
    if (!user) return;

    // Update Redux immediately
    dispatch(userActions.setTheme(newTheme));

    // Persist the preference in Supabase
    dispatch(
      updateUserTheme({
        userId: user.id,
        theme: newTheme,
      })
    );
  };

  return {
    theme,
    changeTheme,
  };
}
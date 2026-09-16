import type { ThemeMode } from "../types/settings";

export function applyTheme(theme: ThemeMode) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
}
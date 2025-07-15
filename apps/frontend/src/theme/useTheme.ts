import { useState, useEffect, useCallback } from "react";

const THEME_KEY = "the5ers-theme";

export type ThemeMode = "light" | "dark";

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === "dark" || stored === "light" ? stored : "light";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { mode, toggleTheme };
}

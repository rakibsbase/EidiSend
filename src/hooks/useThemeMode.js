"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme"; // "light" | "dark"
const THEME_EVENT = "eidisend-theme-change";

/** Apply or remove the `dark` class on <html> immediately. */
function applyTheme(theme) {
  if (typeof window === "undefined") return;
  const root = window.document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

/** Read persisted theme, defaulting to "light". */
function getStoredTheme() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    // ignore
  }
  return "light";
}

export function useThemeMode() {
  // Start with undefined so the server and first client render agree (no icon rendered).
  const [theme, setThemeState] = useState(undefined);
  const hydrated = theme !== undefined;

  // Hydrate from localStorage on first client paint only.
  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  // Listen for changes made in other tabs or other component instances.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue === "dark" ? "dark" : "light";
      setThemeState(next);
      applyTheme(next);
    };
    const onCustom = (e) => {
      const next = e?.detail === "dark" ? "dark" : "light";
      setThemeState(next);
      applyTheme(next);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(THEME_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(THEME_EVENT, onCustom);
    };
  }, []);

  const setTheme = useCallback((next) => {
    const resolved = next === "dark" ? "dark" : "light";
    setThemeState(resolved);
    applyTheme(resolved);
    try {
      window.localStorage.setItem(STORAGE_KEY, resolved);
    } catch {
      // ignore
    }
    try {
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: resolved }));
    } catch {
      // ignore
    }
  }, []);

  /** Toggle between light ↔ dark. */
  const cycleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const themeLabel = theme === "dark" ? "Dark" : "Light";
  // resolvedTheme equals theme (no system mode); keep for API compatibility.
  const resolvedTheme = theme ?? "light";

  return { theme, resolvedTheme, themeLabel, setTheme, cycleTheme, hydrated };
}
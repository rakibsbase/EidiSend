/**
 * @file useThemeMode.js
 * @description custom hook for managing light and dark theme persistence and synchronization across tabs.
 */

"use client";

import { useCallback, useEffect, useState } from "react";

// --- Constants & Configuration ---
const STORAGE_KEY = "theme"; // Possible values: "light" | "dark"
const THEME_EVENT = "eidisend-theme-change";

/**
 * Directly manipulates the DOM to apply the selected theme.
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
  if (typeof window === "undefined") return;
  const root = window.document.documentElement;
  const isDark = theme === "dark";
  
  // Standard Next.js / Tailwind dark mode toggle
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

/**
 * Retrieves the theme from localStorage with a fallback to "light".
 * @returns {string}
 */
function getStoredTheme() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch (error) {
    console.warn("Theme retrieval failed:", error);
  }
  return "light";
}

/**
 * Hook to manage application theme.
 * Provides theme state, toggle functions, and hydration status.
 */
export function useThemeMode() {
  // We use undefined initially to prevent hydration mismatch (SSR vs Client First Paint)
  const [theme, setThemeState] = useState(undefined);
  const hydrated = theme !== undefined;

  // --- Theme Hydration ---
  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  // --- Events & Sync ---
  useEffect(() => {
    // Synchronize across multiple browser tabs
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue === "dark" ? "dark" : "light";
      setThemeState(next);
      applyTheme(next);
    };

    // Synchronize across different components in the same tab
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

  /**
   * Updates the theme state and persists it to localStorage.
   */
  const setTheme = useCallback((next) => {
    const resolved = next === "dark" ? "dark" : "light";
    setThemeState(resolved);
    applyTheme(resolved);
    
    try {
      window.localStorage.setItem(STORAGE_KEY, resolved);
      // Dispatch custom event for cross-component sync
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: resolved }));
    } catch (error) {
      console.error("Theme persistence failed:", error);
    }
  }, []);

  /**
   * Toggles the theme between light and dark.
   */
  const cycleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const themeLabel = theme === "dark" ? "Dark" : "Light";
  const resolvedTheme = theme ?? "light"; // Safer fallback during SSR

  return { 
    theme, 
    resolvedTheme, 
    themeLabel, 
    setTheme, 
    cycleTheme, 
    hydrated 
  };
}
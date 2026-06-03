"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  type ResolvedTheme,
  type Theme,
  type ThemeContextValue,
} from "@/types/theme";
import type { ChildrenProps } from "@/types/layout";

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  display: "light",
  toggle: () => {},
});

const DEFAULT_DISPLAY: Theme = "light";
const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

function resolveTheme(display: Theme, sysDark: boolean): ResolvedTheme {
  if (display === "device") return sysDark ? "dark" : "light";
  return display;
}

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "device";
}

function getStoredDisplay(): Theme {
  if (typeof window === "undefined") return DEFAULT_DISPLAY;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : DEFAULT_DISPLAY;
}

function subscribeDisplayChange(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) callback();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getSystemDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeSystemThemeChange(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);

  return () => mq.removeEventListener("change", callback);
}

const ThemeProvider = ({ children }: ChildrenProps) => {
  const display = useSyncExternalStore(
    subscribeDisplayChange,
    getStoredDisplay,
    () => DEFAULT_DISPLAY,
  );
  const sysDark = useSyncExternalStore(
    subscribeSystemThemeChange,
    getSystemDark,
    () => false,
  );
  const theme = resolveTheme(display, sysDark);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme =
      display === "light" ? "dark" : display === "dark" ? "device" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, [display]);

  const value = useMemo(
    () => ({ display, theme, toggle }),
    [display, theme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };

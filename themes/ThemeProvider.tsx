"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type Theme, type ThemeContextValue } from "@/types/theme";
import type { ChildrenProps } from "@/types/layout";

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  display: "light",
  toggle: () => {},
});

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function resolveDisplay(display: Theme, sysDark: boolean): "light" | "dark" {
  if (display === "device") return sysDark ? "dark" : "light";
  return display;
}

const ThemeProvider = ({ children }: ChildrenProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [display, setDisplay] = useState<Theme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "device";
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = resolveDisplay(stored, sysDark);
    setDisplay(stored);
    setTheme(resolved);
    applyTheme(resolved);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSysChange = (e: MediaQueryListEvent) => {
      if ((localStorage.getItem("theme") as Theme) === "device") {
        const r = e.matches ? "dark" : "light";
        setTheme(r);
        applyTheme(r);
      }
    };
    mq.addEventListener("change", onSysChange);
    return () => mq.removeEventListener("change", onSysChange);
  }, []);

  const toggle = () => {
    const next: Theme =
      display === "light" ? "dark" : display === "dark" ? "device" : "light";
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = resolveDisplay(next, sysDark);
    setDisplay(next);
    setTheme(resolved);
    localStorage.setItem("theme", next);
    applyTheme(resolved);
  };

  return (
    <ThemeContext.Provider value={{ display, theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type Theme } from "@/types/theme";

const ThemeContext = createContext<{
  display: Theme;
  theme: Theme;
  toggle: () => void;
}>({
  theme: "light",
  display: "light",
  toggle: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [display, setDisplay] = useState<Theme>("light");

  useEffect(() => {
    let stored = localStorage.getItem("theme") as Theme | null;
    setDisplay(stored ?? "light");
    const sysDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    stored = stored === "device" ? (sysDark ? "dark" : "light") : stored;
    const inital = stored ?? (sysDark ? "dark" : "light");
    setTheme(inital);
    document.documentElement.classList.toggle("dark", inital === "dark");
  }, []);

  const toggle = () => {
    const next: Theme =
      display === "light" ? "dark" : display === "dark" ? "device" : "light";
    setDisplay(next);
    localStorage.setItem("theme", next);

    const sysDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    const resolved = next === "device" ? (sysDark ? "dark" : "light") : next;
    setTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
  };

  return (
    <ThemeContext.Provider value={{ display, theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { useTheme, ThemeProvider };

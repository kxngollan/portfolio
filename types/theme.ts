export type Theme = "light" | "dark" | "device";
export type ResolvedTheme = "light" | "dark";

export type ThemeContextValue = {
  display: Theme;
  theme: ResolvedTheme;
  toggle: () => void;
};

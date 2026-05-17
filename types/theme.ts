export type Theme = "light" | "dark" | "device";

export type ThemeContextValue = {
  display: Theme;
  theme: Theme;
  toggle: () => void;
};

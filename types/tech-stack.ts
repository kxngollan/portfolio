export type TechStack = {
  name: string;
  duration: number;
  title?: string;
};

export type TechStackVariant = "light" | "dark" | "grayscale" | undefined;

export type ColorSchemeMediaQuery = {
  matches: boolean;
};

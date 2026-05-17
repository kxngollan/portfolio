import type { ReactNode } from "react";

export type RichTextProps = {
  text: string;
  className?: string;
  paragraphClassName?: string;
  firstParagraphClassName?: string;
};

export type InlineMatch = {
  index: number;
  length: number;
  render: (key: string) => ReactNode;
};

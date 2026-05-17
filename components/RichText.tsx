import Link from "next/link";
import type { ReactNode } from "react";
import type { InlineMatch, RichTextProps } from "@/types/rich-text";

function safeExternalHref(value: string) {
  try {
    const url = new URL(value);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return null;
  }

  return null;
}

function getFirstMatch(text: string, startIndex: number): InlineMatch | null {
  const segment = text.slice(startIndex);
  const matches: InlineMatch[] = [];

  const linkMatch = /\[([^\]]+)\]\(([^)\s]+)\)/.exec(segment);

  if (linkMatch?.index !== undefined) {
    const href = safeExternalHref(linkMatch[2]);

    matches.push({
      index: startIndex + linkMatch.index,
      length: linkMatch[0].length,
      render: (key) =>
        href ? (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#a84824] underline underline-offset-4 hover:text-[#d96b3c] dark:text-[#ffa351]"
          >
            {parseInline(linkMatch[1], key)}
          </Link>
        ) : (
          linkMatch[1]
        ),
    });
  }

  const boldMatch = /\*\*([^*]+)\*\*/.exec(segment);

  if (boldMatch?.index !== undefined) {
    matches.push({
      index: startIndex + boldMatch.index,
      length: boldMatch[0].length,
      render: (key) => (
        <strong key={key} className="font-bold">
          {parseInline(boldMatch[1], key)}
        </strong>
      ),
    });
  }

  const underlineMatch = /<u>(.*?)<\/u>/i.exec(segment);

  if (underlineMatch?.index !== undefined) {
    matches.push({
      index: startIndex + underlineMatch.index,
      length: underlineMatch[0].length,
      render: (key) => (
        <u key={key} className="underline underline-offset-4">
          {parseInline(underlineMatch[1], key)}
        </u>
      ),
    });
  }

  const italicMatch = /\*([^*\n]+)\*/.exec(segment);

  if (italicMatch?.index !== undefined) {
    const absoluteIndex = startIndex + italicMatch.index;
    const previous = text[absoluteIndex - 1];
    const next = text[absoluteIndex + italicMatch[0].length];

    if (previous !== "*" && next !== "*") {
      matches.push({
        index: absoluteIndex,
        length: italicMatch[0].length,
        render: (key) => (
          <em key={key} className="italic">
            {parseInline(italicMatch[1], key)}
          </em>
        ),
      });
    }
  }

  if (matches.length === 0) {
    return null;
  }

  return matches.sort((a, b) => a.index - b.index)[0];
}

function parseInline(text: string, keyPrefix = "inline") {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  while (cursor < text.length) {
    const match = getFirstMatch(text, cursor);

    if (!match) {
      nodes.push(text.slice(cursor));
      break;
    }

    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    nodes.push(match.render(`${keyPrefix}-${key}`));
    cursor = match.index + match.length;
    key += 1;
  }

  return nodes;
}

export function stripRichText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/<u>(.*?)<\/u>/gi, "$1");
}

export default function RichText({
  text,
  className,
  paragraphClassName,
  firstParagraphClassName,
}: RichTextProps) {
  const paragraphs = text
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${paragraph}-${index}`}
          className={
            index === 0 && firstParagraphClassName
              ? firstParagraphClassName
              : paragraphClassName
          }
        >
          {parseInline(paragraph, `paragraph-${index}`)}
        </p>
      ))}
    </div>
  );
}

import React from "react";

const HIGHLIGHT_WORDS = ["we", "us", "you", "our", "your", "buyers", "suppliers", "lokavia", "manufacturers", "distributors"];
const regex = new RegExp(`(\\b(?:${HIGHLIGHT_WORDS.join("|")})\\b\\.?)`, "gi");

interface HighlightProps {
  children: React.ReactNode;
}

export function TextHighlight({ children }: HighlightProps) {
  if (!children) return null;
  if (typeof children !== "string") {
    return <>{children}</>;
  }

  const parts = children.split(regex);
  if (parts.length === 1) {
    return <>{children}</>;
  }

  return (
    <>
      {parts.map((part, i) => {
        const cleanPart = part.endsWith(".") ? part.slice(0, -1) : part;
        if (HIGHLIGHT_WORDS.includes(cleanPart.toLowerCase())) {
          return (
            <span key={i} className="accent-word">
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

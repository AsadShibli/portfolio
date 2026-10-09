"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 2600;

// Cycles through phrases with a vertical slide. Every phrase sits in the same
// grid cell, so the width is the longest one and nothing around it shifts.
export function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="inline-grid overflow-hidden align-bottom">
        {words.map((word, i) => {
          const offset = i === index ? "translate-y-0 opacity-100" : i < index ? "-translate-y-full opacity-0" : "translate-y-full opacity-0";
          return (
            <span
              key={word}
              className={`col-start-1 row-start-1 whitespace-nowrap text-accent-strong transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${offset}`}
            >
              {word}
            </span>
          );
        })}
      </span>
    </>
  );
}

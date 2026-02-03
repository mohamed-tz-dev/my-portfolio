import { useEffect, useMemo, useState } from "react";

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Minimal typewriter word swap.
 * - Types a word, pauses, deletes, moves to next word.
 * - No external libs, stable in Codespaces.
 */
export default function TypewriterSwap({
  words = ["reliable", "clean", "scalable", "secure"],
  typingMs = 55,
  deletingMs = 35,
  pauseMs = 900
}) {
  const list = useMemo(
    () => (Array.isArray(words) && words.length ? words : ["reliable"]),
    [words]
  );

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [mode, setMode] = useState("typing"); // typing | pause | deleting

  useEffect(() => {
    const full = list[index] || "";
    let t;

    if (mode === "typing") {
      const nextLen = clamp(text.length + 1, 0, full.length);
      const next = full.slice(0, nextLen);
      t = setTimeout(() => {
        setText(next);
        if (next === full) setMode("pause");
      }, typingMs);
    }

    if (mode === "pause") {
      t = setTimeout(() => setMode("deleting"), pauseMs);
    }

    if (mode === "deleting") {
      const nextLen = clamp(text.length - 1, 0, full.length);
      const next = full.slice(0, nextLen);
      t = setTimeout(() => {
        setText(next);
        if (nextLen === 0) {
          setIndex((i) => (i + 1) % list.length);
          setMode("typing");
        }
      }, deletingMs);
    }

    return () => clearTimeout(t);
  }, [text, mode, index, list, typingMs, deletingMs, pauseMs]);

  return (
    <span className="inline-flex items-center">
      <span className="text-indigo-700 dark:text-indigo-200">{text}</span>
      {/* caret */}
      <span className="ml-1 inline-block h-[1.1em] w-[2px] bg-indigo-600/70 dark:bg-indigo-300/70 animate-pulse" />
    </span>
  );
}

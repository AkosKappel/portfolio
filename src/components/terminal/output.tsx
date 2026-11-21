"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs a command as if it was typed; lets output offer clickable commands. */
export const RunContext = createContext<(command: string) => void>(() => {});

/** A command in the output that runs when clicked, handy on touch screens. */
export function Cmd({ command, children }: { command: string; children?: ReactNode }) {
  const run = useContext(RunContext);
  return (
    <button
      type="button"
      onClick={(event) => {
        // The window's click would otherwise focus the prompt before the command runs.
        event.stopPropagation();
        run(command);
      }}
      className="cursor-pointer text-accent underline-offset-2 hover:underline"
    >
      {children ?? command}
    </button>
  );
}

export function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, index) => (
        // Lines are static once printed, so their position is a stable key.
        // biome-ignore lint/suspicious/noArrayIndexKey: see above
        <p key={index}>{line}</p>
      ))}
    </>
  );
}

export function Table({ rows }: { rows: [ReactNode, ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]">
      {rows.map(([term, detail], index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: rows never reorder
        <div key={index} className="contents">
          <dt className="text-accent">{term}</dt>
          <dd className="mb-1 text-muted sm:mb-0">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Marks every case-insensitive occurrence of `term` in `text`. */
export function Highlight({ text, term }: { text: string; term: string }) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    <>
      {text.split(new RegExp(`(${escaped})`, "i")).map((part, index) =>
        index % 2 ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: parts of a fixed string
          <mark key={index} className="rounded-sm bg-accent px-0.5 text-on-accent">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Types text out a few characters per frame. Screen readers get the whole text at once. */
export function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reducedMotion()) {
      setShown(text.length);
      return;
    }
    let count = 0;
    let frame = 0;
    const step = () => {
      count = Math.min(text.length, count + 4);
      setShown(count);
      if (count < text.length) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text.slice(0, shown)}</span>
    </>
  );
}

/**
 * Prints lines one after another, like a command that takes its time. Ctrl+C aborts it
 * through `signal`; `onDone` tells the terminal it can show the prompt again.
 */
export function Sequence({
  lines,
  delay,
  signal,
  onDone,
}: {
  lines: ReactNode[];
  delay: number;
  signal: AbortSignal;
  onDone: (aborted: boolean) => void;
}) {
  const [count, setCount] = useState(0);
  const [aborted, setAborted] = useState(false);

  useEffect(() => {
    if (signal.aborted) return;
    if (reducedMotion()) {
      setCount(lines.length);
      onDone(false);
      return;
    }
    let shown = 0;
    const timer = setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= lines.length) {
        clearInterval(timer);
        onDone(false);
      }
    }, delay);
    const abort = () => {
      clearInterval(timer);
      setAborted(true);
      onDone(true);
    };
    signal.addEventListener("abort", abort, { once: true });
    return () => {
      clearInterval(timer);
      signal.removeEventListener("abort", abort);
    };
  }, [lines, delay, signal, onDone]);

  return (
    <>
      <Lines lines={lines.slice(0, count)} />
      {aborted ? <p>^C</p> : null}
    </>
  );
}

/** A text progress bar that fills once, for the fake `hack` run. */
export function Progress({ label }: { label: string }) {
  return (
    <span>
      {label.padEnd(24)}[<span className="terminal-fill">{"█".repeat(20)}</span>] 100%
    </span>
  );
}

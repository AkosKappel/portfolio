"use client";

import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { type Direction, newGame, tick, turn } from "@/lib/snake";
import { Lines } from "./output";

/** The first-visit boot log over the terminal. Any key or click skips it. */
export function Boot({ lines, onDone }: { lines: ReactNode[]; onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let shown = 0;
    let finish: ReturnType<typeof setTimeout> | undefined;
    const timer = setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= lines.length) {
        clearInterval(timer);
        finish = setTimeout(onDone, 500);
      }
    }, 90);
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearInterval(timer);
      clearTimeout(finish);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [lines, onDone]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end overflow-hidden bg-surface p-4">
      <Lines lines={lines.slice(0, count)} />
    </div>
  );
}

const MATRIX_CHARACTERS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}/=+*";

/** Falling characters over the whole window until any key or click. */
export function Matrix({ hint, onExit }: { hint: string; onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const size = 16;
    const drops: number[] = [];
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      while (drops.length < Math.ceil(innerWidth / size)) drops.push(Math.random() * -40);
    };
    resize();
    const timer = setInterval(() => {
      context.fillStyle = "rgb(0 0 0 / 0.08)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#3ddc84";
      context.font = `${size}px monospace`;
      drops.forEach((y, column) => {
        const character = MATRIX_CHARACTERS[Math.floor(Math.random() * MATRIX_CHARACTERS.length)];
        context.fillText(character, column * size, y * size);
        drops[column] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }, 50);
    const exit = (event: Event) => {
      // Keeps the key that ends the effect out of the prompt.
      event.preventDefault();
      onExit();
    };
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", exit, { capture: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", exit, { capture: true });
    };
  }, [onExit]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: any key closes it through the window listener
    <div onClick={onExit} className="fixed inset-0 z-[60] cursor-pointer bg-black">
      <canvas ref={canvasRef} aria-hidden className="block" />
      <p className="absolute right-4 bottom-4 rounded bg-black px-2 font-mono text-sm text-[#3ddc84]">
        {hint}
      </p>
    </div>
  );
}

const CONFETTI_COLOURS = Array.from({ length: 8 }, (_, index) => `var(--series-${index + 1})`);

/** A short burst of confetti for the Konami code. */
export function Confetti({ onDone }: { onDone: () => void }) {
  const [pieces] = useState(() =>
    Array.from({ length: 90 }, (_, index) => ({
      left: `${Math.random() * 100}%`,
      background: CONFETTI_COLOURS[index % CONFETTI_COLOURS.length],
      animationDelay: `${Math.random() * 0.6}s`,
      animationDuration: `${2 + Math.random() * 1.5}s`,
    })),
  );

  useEffect(() => {
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((style, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: pieces never change
        <span key={index} style={style} className="terminal-confetti absolute top-0 h-3 w-1.5" />
      ))}
    </div>
  );
}

const SNAKE_KEYS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

/** Snake drawn with text. Arrow keys or WASD steer, Enter restarts, Esc or q quits. */
export function SnakeGame({
  labels,
  onExit,
}: {
  labels: { help: string; score: (score: number) => string; over: string };
  onExit: (best: number) => void;
}) {
  const [game, setGame] = useState(() => newGame(20, 12));
  const best = useRef(0);
  const boardRef = useRef<HTMLDivElement>(null);
  best.current = Math.max(best.current, game.score);

  useEffect(() => boardRef.current?.focus(), []);

  useEffect(() => {
    if (game.over) return;
    const timer = setInterval(() => setGame((current) => tick(current)), 130);
    return () => clearInterval(timer);
  }, [game.over]);

  function onKeyDown(event: KeyboardEvent) {
    const direction = SNAKE_KEYS[event.key];
    if (direction) {
      event.preventDefault();
      setGame((current) => turn(current, direction));
    } else if (event.key === "Escape" || event.key === "q") {
      event.preventDefault();
      onExit(best.current);
    } else if (event.key === "Enter" && game.over) {
      event.preventDefault();
      setGame(newGame(20, 12));
    }
  }

  const rows = Array.from({ length: game.height }, (_, y) =>
    Array.from({ length: game.width }, (_, x) => {
      const index = game.body.findIndex(([bx, by]) => bx === x && by === y);
      if (index === 0) return <span className="text-accent">██</span>;
      if (index > 0) return "██";
      if (game.food[0] === x && game.food[1] === y) return <span className="text-accent">◆ </span>;
      return "  ";
    }),
  );

  return (
    <div
      ref={boardRef}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: the board takes the game's keys
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="application"
      aria-label={`${labels.help} ${labels.score(game.score)}`}
      className="w-fit max-w-full overflow-x-auto rounded outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <p>
        {labels.score(game.score)}
        {game.over ? ` · ${labels.over}` : null}
      </p>
      <pre aria-hidden className="leading-none">
        {`┌${"─".repeat(game.width * 2)}┐\n`}
        {rows.map((cells, y) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: board rows are positions
          <span key={y}>
            │
            {cells.map((cell, x) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: board cells are positions
              <span key={x}>{cell}</span>
            ))}
            │{"\n"}
          </span>
        ))}
        {`└${"─".repeat(game.width * 2)}┘`}
      </pre>
      <p className="text-muted">{labels.help}</p>
    </div>
  );
}

"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type GalleryFigure = { src: string; width: number; height: number; alt: string; caption: string };

type Labels = {
  close: string;
  previous: string;
  next: string;
  zoomIn: string;
  zoomOut: string;
  /** "{current} of {total}" */
  counter: string;
};

const iconButton =
  "grid size-11 place-items-center rounded-full bg-surface/90 text-ink shadow-md hover:text-accent disabled:opacity-40";

/**
 * Figures link to the full image, so the gallery works without JavaScript. With it, a
 * modal <dialog> opens instead: arrows, swipe and click-to-zoom, Esc to close.
 */
export function Gallery({ figures, labels }: { figures: GalleryFigure[]; labels: Labels }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const figure = figures[index];

  const show = (next: number) => {
    setIndex((next + figures.length) % figures.length);
    setZoomed(false);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <div className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {figures.map((item, itemIndex) => (
          <figure key={item.src}>
            <a
              href={item.src}
              aria-haspopup="dialog"
              onClick={(event) => {
                event.preventDefault();
                show(itemIndex);
                dialogRef.current?.showModal();
              }}
              className="block cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent"
            >
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="(min-width: 1152px) 528px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </a>
            <figcaption className="mt-3 text-muted">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={figure.caption}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ink backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") show(index - 1);
          if (event.key === "ArrowRight") show(index + 1);
        }}
      >
        <div className="flex h-full flex-col gap-3 p-3 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="rounded-full bg-surface/90 px-3 py-1 text-sm" aria-live="polite">
              {labels.counter
                .replace("{current}", String(index + 1))
                .replace("{total}", String(figures.length))}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setZoomed(!zoomed)}
                className={iconButton}
                aria-label={zoomed ? labels.zoomOut : labels.zoomIn}
                title={zoomed ? labels.zoomOut : labels.zoomIn}
              >
                {zoomed ? <ZoomOut aria-hidden size={20} /> : <ZoomIn aria-hidden size={20} />}
              </button>
              <button
                type="button"
                onClick={close}
                className={iconButton}
                aria-label={labels.close}
                title={labels.close}
              >
                <X aria-hidden size={20} />
              </button>
            </div>
          </div>

          <div
            className={`relative min-h-0 flex-1 ${zoomed ? "overflow-auto" : "touch-pan-y"}`}
            onPointerDown={(event) => {
              if (!zoomed) swipeStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (swipeStart.current === null) return;
              const distance = event.clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(distance) > 50) show(distance < 0 ? index + 1 : index - 1);
            }}
          >
            <Image
              key={figure.src}
              src={figure.src}
              width={figure.width}
              height={figure.height}
              alt={figure.alt}
              sizes={zoomed ? `${figure.width}px` : "100vw"}
              onClick={() => setZoomed(!zoomed)}
              draggable={false}
              className={
                zoomed
                  ? "max-w-none cursor-zoom-out"
                  : "absolute inset-0 size-full cursor-zoom-in object-contain"
              }
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => show(index - 1)}
              className={iconButton}
              aria-label={labels.previous}
              title={labels.previous}
            >
              <ChevronLeft aria-hidden size={22} />
            </button>
            <p className="flex-1 rounded-lg bg-surface/90 px-4 py-2 text-center">
              {figure.caption}
            </p>
            <button
              type="button"
              onClick={() => show(index + 1)}
              className={iconButton}
              aria-label={labels.next}
              title={labels.next}
            >
              <ChevronRight aria-hidden size={22} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

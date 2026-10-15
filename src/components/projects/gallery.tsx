"use client";

import { ChevronLeft, ChevronRight, Play, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type GalleryFigure = {
  src: string;
  video?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

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
  "grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors hover:border-accent hover:text-accent";

/**
 * Figures link to the full image or video, so the gallery works without JavaScript. With
 * it, a modal <dialog> opens instead: arrows, swipe, zoom with drag to pan, Esc to close.
 * Videos play with native controls and are not zoomable.
 */
export function Gallery({ figures, labels }: { figures: GalleryFigure[]; labels: Labels }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const pan = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const dragged = useRef(false);
  // Where to center the zoomed image, as fractions of the viewport.
  const zoomOrigin = useRef({ x: 0.5, y: 0.5 });
  const [index, setIndex] = useState(0);
  /** Width of the zoomed image in pixels, or null when it fits the screen. */
  const [zoomWidth, setZoomWidth] = useState<number | null>(null);
  const zoomed = zoomWidth !== null;
  const figure = figures[index];

  const show = (next: number) => {
    setIndex((next + figures.length) % figures.length);
    setZoomWidth(null);
  };
  const close = () => dialogRef.current?.close();

  /** Zooms to twice the fitted size, keeping the point at (clientX, clientY) in view. */
  const toggleZoom = (clientX?: number, clientY?: number) => {
    const image = viewportRef.current?.querySelector("img");
    if (zoomed || !image) {
      setZoomWidth(null);
      return;
    }
    // The fitted image is letterboxed inside the <img> box by object-contain.
    const box = image.getBoundingClientRect();
    const padding = Number.parseFloat(getComputedStyle(image).paddingLeft);
    const available = box.width - 2 * padding;
    const ratio = figure.width / figure.height;
    const width = Math.min(available, box.height * ratio);
    const height = width / ratio;
    const left = box.left + padding + (available - width) / 2;
    const top = box.top + (box.height - height) / 2;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    zoomOrigin.current = {
      x: clientX === undefined ? 0.5 : clamp((clientX - left) / width),
      y: clientY === undefined ? 0.5 : clamp((clientY - top) / height),
    };
    setZoomWidth(Math.round(width * 2));
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!zoomed || !viewport) return;
    viewport.scrollLeft = zoomOrigin.current.x * viewport.scrollWidth - viewport.clientWidth / 2;
    viewport.scrollTop = zoomOrigin.current.y * viewport.scrollHeight - viewport.clientHeight / 2;
  }, [zoomed]);

  return (
    <>
      <div className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {figures.map((item, itemIndex) => (
          <figure key={item.src}>
            <a
              href={item.video ?? item.src}
              aria-haspopup="dialog"
              onClick={(event) => {
                event.preventDefault();
                show(itemIndex);
                dialogRef.current?.showModal();
              }}
              className={`relative block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent ${item.video ? "cursor-pointer" : "cursor-zoom-in"}`}
            >
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="(min-width: 1152px) 528px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
              {item.video ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-lg"
                >
                  <Play size={28} className="translate-x-0.5" fill="currentColor" />
                </span>
              ) : null}
            </a>
            <figcaption className="mt-3 text-muted">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={figure.caption}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ink backdrop:bg-paper"
        onClose={() => viewportRef.current?.querySelector("video")?.pause()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") show(index - 1);
          if (event.key === "ArrowRight") show(index + 1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 p-3 sm:p-5">
            <p className="text-sm text-muted" aria-live="polite">
              {labels.counter
                .replace("{current}", String(index + 1))
                .replace("{total}", String(figures.length))}
            </p>
            <div className="flex gap-2">
              {figure.video ? null : (
                <button
                  type="button"
                  onClick={() => toggleZoom()}
                  className={iconButton}
                  aria-label={zoomed ? labels.zoomOut : labels.zoomIn}
                  title={zoomed ? labels.zoomOut : labels.zoomIn}
                >
                  {zoomed ? <ZoomOut aria-hidden size={20} /> : <ZoomIn aria-hidden size={20} />}
                </button>
              )}
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

          <div className="relative min-h-0 flex-1">
            <div
              ref={viewportRef}
              className={`absolute inset-0 ${zoomed ? "flex overflow-auto overscroll-contain" : "touch-pan-y"}`}
              onPointerDown={(event) => {
                dragged.current = false;
                // Dragging along the video's timeline must not swipe to the next figure.
                if (figure.video) return;
                if (!zoomed) {
                  swipeStart.current = event.clientX;
                } else if (event.pointerType === "mouse") {
                  // Touch screens pan the zoomed image natively; a mouse drags it.
                  const viewport = event.currentTarget;
                  pan.current = {
                    x: event.clientX,
                    y: event.clientY,
                    left: viewport.scrollLeft,
                    top: viewport.scrollTop,
                  };
                  viewport.setPointerCapture(event.pointerId);
                }
              }}
              onPointerMove={(event) => {
                if (!pan.current) return;
                const dx = event.clientX - pan.current.x;
                const dy = event.clientY - pan.current.y;
                if (Math.abs(dx) + Math.abs(dy) > 4) dragged.current = true;
                event.currentTarget.scrollLeft = pan.current.left - dx;
                event.currentTarget.scrollTop = pan.current.top - dy;
              }}
              onPointerUp={(event) => {
                pan.current = null;
                if (swipeStart.current === null) return;
                const distance = event.clientX - swipeStart.current;
                swipeStart.current = null;
                if (Math.abs(distance) > 50) {
                  dragged.current = true;
                  show(distance < 0 ? index + 1 : index - 1);
                }
              }}
            >
              {figure.video ? (
                <video
                  key={figure.video}
                  src={figure.video}
                  poster={figure.src}
                  width={figure.width}
                  height={figure.height}
                  aria-label={figure.alt}
                  controls
                  // Gallery videos are silent screen recordings, so there is nothing to caption.
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 m-auto h-auto max-h-full w-auto max-w-[calc(100%-8rem)] sm:max-w-[calc(100%-10rem)]"
                />
              ) : (
                <Image
                  key={figure.src}
                  src={figure.src}
                  width={figure.width}
                  height={figure.height}
                  alt={figure.alt}
                  sizes={zoomed ? `${zoomWidth}px` : "100vw"}
                  draggable={false}
                  onClick={(event) => {
                    if (!dragged.current) toggleZoom(event.clientX, event.clientY);
                  }}
                  style={zoomed ? { width: zoomWidth } : undefined}
                  className={
                    zoomed
                      ? "m-auto h-auto max-w-none shrink-0 cursor-grab select-none active:cursor-grabbing"
                      : "size-full cursor-zoom-in object-contain px-16 select-none sm:px-20"
                  }
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => show(index - 1)}
              className={`${iconButton} absolute top-1/2 left-3 -translate-y-1/2 sm:left-5`}
              aria-label={labels.previous}
              title={labels.previous}
            >
              <ChevronLeft aria-hidden size={22} />
            </button>
            <button
              type="button"
              onClick={() => show(index + 1)}
              className={`${iconButton} absolute top-1/2 right-3 -translate-y-1/2 sm:right-5`}
              aria-label={labels.next}
              title={labels.next}
            >
              <ChevronRight aria-hidden size={22} />
            </button>
          </div>

          <p className="mx-auto max-w-3xl p-4 text-center text-muted sm:p-6">{figure.caption}</p>
        </div>
      </dialog>
    </>
  );
}

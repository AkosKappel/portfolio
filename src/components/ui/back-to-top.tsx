import { ArrowUp } from "lucide-react";

/** Fades in once the page is scrolled (see `.back-to-top` in globals.css). */
export function BackToTop({ label }: { label: string }) {
  return (
    <a
      href="#main"
      aria-label={label}
      title={label}
      className="back-to-top fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-accent text-on-accent shadow-lg transition-opacity hover:opacity-90 print:hidden"
    >
      <ArrowUp aria-hidden size={20} />
    </a>
  );
}

/** Thin bar under the header that fills as a long page is read. */
export function ReadingProgress() {
  return (
    <div
      aria-hidden
      className="reading-progress fixed inset-x-0 top-0 z-50 hidden h-0.5 origin-left bg-accent print:hidden"
    />
  );
}

"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Fades in once the page is scrolled half a screen down. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight / 2);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      href="#main"
      aria-label={label}
      title={label}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-accent text-on-accent shadow-lg transition-[opacity,visibility] duration-200 hover:opacity-90 print:hidden ${visible ? "" : "invisible opacity-0"}`}
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

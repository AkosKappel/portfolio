"use client";

import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { NavLinks } from "./nav-links";

/** Uses a native modal <dialog>, which traps focus, closes on Esc and restores focus. */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="grid size-10 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <Menu aria-hidden size={20} />
      </button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; Esc already closes a modal dialog */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="mt-0 mr-0 ml-auto h-dvh max-h-none w-[min(20rem,85vw)] bg-surface p-5 text-ink shadow-2xl backdrop:bg-ink/30 backdrop:backdrop-blur-sm open:animate-[slide-in_200ms_ease-out] motion-reduce:open:animate-none"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={close}
            className="grid size-10 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
            aria-label="Close menu"
          >
            <X aria-hidden size={20} />
          </button>
        </div>
        <nav aria-label="Main" className="mt-4">
          <NavLinks className="flex flex-col gap-1 text-lg" onNavigate={close} />
        </nav>
      </dialog>
    </div>
  );
}

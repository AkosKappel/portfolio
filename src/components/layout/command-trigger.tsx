"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const loadPalette = () => import("./command-palette");
// Loaded on first use (or on hover), so the palette adds nothing to the initial page load.
const CommandPalette = dynamic(() => loadPalette().then((module) => module.CommandPalette), {
  ssr: false,
});

/** Header button and the Ctrl+K / ⌘K shortcut for the command palette. */
export function CommandTrigger() {
  const t = useTranslations("commands");
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setUsed(true);
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setUsed(true);
          setOpen(true);
        }}
        onPointerEnter={loadPalette}
        className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        aria-label={t("open")}
        title={`${t("open")} (Ctrl+K)`}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search aria-hidden size={18} />
      </button>
      {used ? <CommandPalette open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

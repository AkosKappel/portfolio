"use client";

import { MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// The panel, Turnstile and the chat logic load only when the visitor first opens the chat, so
// pages pay for the button alone.
const AssistantPanel = dynamic(() => import("./assistant-panel"), { ssr: false });

const PANEL_ID = "assistant-panel";

/** Floating "Ask about me" button. The panel stays mounted once opened, keeping the conversation. */
export function AssistantLauncher() {
  const t = useTranslations("assistant");
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {started ? <AssistantPanel id={PANEL_ID} open={open} onClose={close} /> : null}
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={started ? PANEL_ID : undefined}
        aria-label={open ? t("close") : t("open")}
        onClick={() => {
          setStarted(true);
          setOpen((value) => !value);
        }}
        className="fixed right-5 bottom-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-4 font-medium text-on-accent shadow-lg transition-opacity hover:opacity-90 print:hidden"
      >
        {open ? <X aria-hidden size={20} /> : <MessageCircle aria-hidden size={20} />}
        <span className="hidden sm:inline">{open ? t("close") : t("open")}</span>
      </button>
    </>
  );
}

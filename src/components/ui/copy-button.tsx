"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the value stays visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
    >
      {copied ? <Check aria-hidden size={16} /> : <Copy aria-hidden size={16} />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

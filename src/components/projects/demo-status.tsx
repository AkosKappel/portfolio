"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { DemoStatus } from "@/lib/demo-status";

// One request per page load, shared by every card on the page.
let request: Promise<Record<string, DemoStatus>> | undefined;

function loadStatus() {
  request ??= fetch("/api/demo-status")
    .then((response) => (response.ok ? response.json() : { demos: {} }))
    .then((body: { demos: Record<string, DemoStatus> }) => body.demos)
    .catch(() => ({}));
  return request;
}

/** "Demo online" or "Demo offline" over the screenshot; nothing until the check answers. */
export function DemoStatusBadge({ slug }: { slug: string }) {
  const t = useTranslations("common");
  const [status, setStatus] = useState<DemoStatus>();

  useEffect(() => {
    let active = true;
    loadStatus().then((demos) => {
      if (active) setStatus(demos[slug]);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!status) return null;
  return (
    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-0.5 text-xs font-medium text-ink shadow-sm backdrop-blur-sm">
      <span
        aria-hidden
        className={`size-2 rounded-full ${status === "up" ? "bg-emerald-500" : "bg-rose-500"}`}
      />
      {t(status === "up" ? "demoOnline" : "demoOffline")}
    </span>
  );
}

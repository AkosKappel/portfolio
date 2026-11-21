"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { DemoStatus as Status } from "@/lib/demo-status";

// One request per page load, cached by the CDN for five minutes.
let request: Promise<Record<string, Status>> | undefined;

function loadStatus() {
  request ??= fetch("/api/demo-status")
    .then((response) => (response.ok ? response.json() : { demos: {} }))
    .then((body: { demos: Record<string, Status> }) => body.demos)
    .catch(() => ({}));
  return request;
}

/** "Demo online" or "Demo offline" under the project's links; nothing until the check answers. */
export function DemoStatus({ slug }: { slug: string }) {
  const t = useTranslations("common");
  const [status, setStatus] = useState<Status>();

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
    <p className="flex w-full items-center gap-2 text-sm text-muted lg:justify-end">
      <span
        aria-hidden
        className={`size-2 rounded-full ${status === "up" ? "bg-emerald-500" : "bg-rose-500"}`}
      />
      {t(status === "up" ? "demoOnline" : "demoOffline")}
    </p>
  );
}

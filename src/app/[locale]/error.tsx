"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Page } from "@/components/ui/page";
import { Link } from "@/i18n/navigation";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page className="py-24">
      <p className="font-display text-xl text-muted">{t("error.label")}</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-6xl">{t("error.title")}</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">{t("error.text")}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={retry}
          className="rounded-full bg-accent px-4 py-2 text-on-accent hover:opacity-90"
        >
          {t("error.retry")}
        </button>
        <Link href="/" className="rounded-full border border-line px-4 py-2 hover:border-ink">
          {t("nav.home")}
        </Link>
      </div>
    </Page>
  );
}

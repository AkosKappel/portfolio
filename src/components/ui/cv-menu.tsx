import { Download, Eye, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Flag } from "@/components/ui/flags";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

/** A native <details> menu: works with keyboard, touch and without JavaScript. */
export function CvMenu({ className = "" }: { className?: string }) {
  const t = useTranslations();
  return (
    <details className={`group relative ${className}`}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent group-open:border-accent [&::-webkit-details-marker]:hidden">
        <Download aria-hidden size={18} />
        {t("common.downloadCv")}
      </summary>
      <ul className="absolute top-full left-0 z-10 mt-2 min-w-52 rounded-lg border border-line bg-surface p-1.5 shadow-lg">
        {site.cv.map((cv) => (
          <li key={cv.href} className="flex gap-1">
            <a
              href={cv.href}
              download
              hrefLang={cv.locale}
              className="flex flex-1 items-center gap-2.5 rounded-md px-3 py-2 hover:bg-accent-soft hover:text-accent"
            >
              <Flag locale={cv.locale} />
              <span className="flex-1">{t(`languages.${cv.locale}`)}</span>
              <FileText aria-hidden size={16} className="text-muted" />
              <span className="sr-only">{t("common.pdf")}</span>
            </a>
            <Link
              href="/cv/pdf"
              locale={cv.locale}
              aria-label={t("common.previewCv", { language: t(`languages.${cv.locale}`) })}
              title={t("common.previewCv", { language: t(`languages.${cv.locale}`) })}
              className="grid place-items-center rounded-md px-2.5 text-muted hover:bg-accent-soft hover:text-accent"
            >
              <Eye aria-hidden size={18} />
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Flag } from "@/components/ui/flags";
import { site } from "@/content/site";

/** A native <details> menu: works with keyboard, touch and without JavaScript. */
export function CvMenu({ className = "" }: { className?: string }) {
  const t = useTranslations();
  return (
    <details className={`group relative ${className}`}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink [&::-webkit-details-marker]:hidden">
        <Download aria-hidden size={18} />
        {t("common.downloadCv")}
      </summary>
      <ul className="absolute top-full left-0 z-10 mt-2 min-w-52 rounded-lg border border-line bg-surface p-1.5 shadow-lg">
        {site.cv.map((cv) => (
          <li key={cv.href}>
            <a
              href={cv.href}
              download
              hrefLang={cv.locale}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 hover:bg-paper"
            >
              <Flag locale={cv.locale} />
              <span className="flex-1">{t(`languages.${cv.locale}`)}</span>
              <span className="inline-flex items-center gap-1 text-sm text-muted">
                <FileText aria-hidden size={14} />
                {t("common.pdf")}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

import { Download, ExternalLink, FileText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Page, PageHeader } from "@/components/ui/page";
import { PdfViewer } from "@/components/ui/pdf-viewer";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cv/pdf">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "cvPdf" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/cv/pdf"),
  };
}

export default async function CvPdfPage({ params }: PageProps<"/[locale]/cv/pdf">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("cvPdf");
  const cv = site.cv.find((entry) => entry.locale === locale) ?? site.cv[0];

  return (
    <Page>
      <PageHeader title={t("title")} lead={`${site.headline} · ${pick(site.location, locale)}`} />
      <div className="flex flex-wrap gap-3">
        <a
          href={cv.href}
          download
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          <Download aria-hidden size={18} />
          {t("download")}
        </a>
        <a
          href={cv.href}
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
        >
          <ExternalLink aria-hidden size={18} />
          {t("open")}
        </a>
        <Link
          href="/cv"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
        >
          <FileText aria-hidden size={18} />
          {t("webVersion")}
        </Link>
      </div>
      <div className="mt-8 max-w-4xl">
        <PdfViewer src={cv.href} title={t("viewer")}>
          <div className="grid gap-4">
            {cv.pages.map((src, index) => (
              <Image
                key={src}
                src={src}
                width={1241}
                height={1754}
                alt={t("pageAlt", { page: index + 1 })}
                sizes="(min-width: 960px) 896px, 100vw"
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full rounded-xl border border-line shadow-sm"
              />
            ))}
          </div>
        </PdfViewer>
      </div>
    </Page>
  );
}

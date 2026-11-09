import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildCommandIndex } from "@/lib/command-index";

export const dynamicParams = false;

// The command palette fetches this on first open, so the list costs nothing on page load.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ file: `${locale}.json` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/commands/[file]">) {
  const locale = (await params).file.replace(/\.json$/, "");
  if (!hasLocale(routing.locales, locale)) return new Response(null, { status: 404 });
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return Response.json(buildCommandIndex(locale, messages));
}

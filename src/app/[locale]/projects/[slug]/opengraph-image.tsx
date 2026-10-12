import { getProject, projects } from "@/content/projects";
import { pick } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { ogSize, pageOgImage } from "@/lib/og-image";

export const alt = "Project preview";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response(null, { status: 404 });
  return pageOgImage({
    title: project.title,
    lead: pick(project.summary, locale as Locale),
    detail: project.stack.slice(0, 5).join(" · "),
    screenshot: project.image?.src,
  });
}

import { useLocale, useTranslations } from "next-intl";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Logo } from "@/components/ui/logo";
import { navigation, site } from "@/content/site";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";

const socials = [
  { href: site.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.links.gitlab, label: "GitLab", Icon: GitLabIcon },
];

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <Logo className="size-8" />
            {site.name}
          </p>
          <p className="mt-3 text-muted">{pick(site.availability, locale)}</p>
          <a href={`mailto:${site.email}`} className="link mt-4 inline-block">
            {site.email}
          </a>
        </div>
        <nav aria-label={t("footer.pages")}>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">
            {t("footer.pages")}
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-accent hover:underline underline-offset-4"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cv" className="hover:text-accent hover:underline underline-offset-4">
                {t("nav.cv")}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-muted">
            {t("footer.elsewhere")}
          </h2>
          <ul className="mt-3 space-y-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-accent hover:underline"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 pb-10 text-sm text-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          {t("footer.builtWith")}{" "}
          <a href="https://github.com/AkosKappel/portfolio" className="link">
            {t("common.sourceCode")}
          </a>
        </p>
      </div>
    </footer>
  );
}

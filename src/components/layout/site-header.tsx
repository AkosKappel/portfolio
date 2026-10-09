import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const t = useTranslations();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <Logo className="size-9 text-ink" />
          <span>{site.name}</span>
        </Link>
        <nav aria-label={t("nav.main")} className="ml-auto hidden lg:block">
          <NavLinks className="flex items-center gap-0.5" />
        </nav>
        <div className="ml-auto flex items-center gap-0.5 lg:ml-2">
          <LanguageSwitcher />
          <ThemeToggle
            labels={{ dark: t("common.switchToDark"), light: t("common.switchToLight") }}
          />
          <MobileNav
            labels={{
              open: t("common.openMenu"),
              close: t("common.closeMenu"),
              menu: t("common.menu"),
              nav: t("nav.main"),
            }}
          />
        </div>
      </div>
    </header>
  );
}

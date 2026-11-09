import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { CommandTrigger } from "./command-trigger";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { PalettePicker } from "./palette-picker";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const t = useTranslations();
  return (
    <header className="sticky top-0 z-40 print:hidden border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 min-[360px]:gap-4 min-[360px]:px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <Logo className="size-9 text-ink" />
          <span className="whitespace-nowrap max-[460px]:sr-only">{site.name}</span>
        </Link>
        <nav aria-label={t("nav.main")} className="ml-auto hidden lg:block">
          <NavLinks className="flex items-center gap-0.5" />
        </nav>
        <Link
          href="/contact"
          className="ml-auto hidden shrink-0 rounded-full bg-accent px-4 py-1.5 text-[0.95rem] font-medium whitespace-nowrap text-on-accent transition-opacity hover:opacity-90 sm:inline-flex lg:ml-3"
        >
          {t("nav.contact")}
        </Link>
        <div className="ml-auto flex items-center gap-0.5 sm:ml-2">
          <CommandTrigger />
          <LanguageSwitcher />
          <PalettePicker />
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

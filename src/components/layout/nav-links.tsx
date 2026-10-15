"use client";

import { useTranslations } from "next-intl";
import { navigation } from "@/content/site";
import { Link, usePathname } from "@/i18n/navigation";

export function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className="relative block rounded-md px-3 py-2 text-[0.95rem] text-muted transition-colors hover:bg-accent-soft hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
            >
              {t(item.key)}
              {active ? (
                // A named view transition element, so the underline slides between pages.
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-[13px] hidden h-0.5 bg-accent [view-transition-name:nav-indicator] lg:block"
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

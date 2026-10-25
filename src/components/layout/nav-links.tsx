"use client";

import {
  Activity,
  Briefcase,
  FolderGit2,
  GraduationCap,
  type LucideIcon,
  Mail,
  User,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { navigation } from "@/content/site";
import { Link, usePathname } from "@/i18n/navigation";

const icons: Record<(typeof navigation)[number]["key"], LucideIcon> = {
  projects: FolderGit2,
  experience: Briefcase,
  skills: Wrench,
  education: GraduationCap,
  activity: Activity,
  about: User,
  contact: Mail,
};

/** `menu` is the mobile drawer: links get icons and skip prefetching, which would fetch every page as soon as it opens. */
export function NavLinks({
  className,
  onNavigate,
  menu = false,
}: {
  className?: string;
  onNavigate?: () => void;
  menu?: boolean;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = icons[item.key];
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              prefetch={menu ? false : undefined}
              aria-current={active ? "page" : undefined}
              className="relative flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 lg:px-2 xl:px-3 text-[0.95rem] text-muted transition-colors hover:bg-accent-soft hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
            >
              {menu ? <Icon aria-hidden size={18} className="shrink-0" /> : null}
              {t(item.key)}
              {active ? (
                // A named view transition element, so the underline slides between pages.
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-[13px] lg:inset-x-2 xl:inset-x-3 hidden h-0.5 bg-accent [view-transition-name:nav-indicator] lg:block"
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

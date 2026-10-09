"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/site";

export function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
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
              className="relative block rounded-md px-3 py-2 text-[0.95rem] text-muted transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-[13px] aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-clean max-md:aria-[current=page]:after:hidden"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

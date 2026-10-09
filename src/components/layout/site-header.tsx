import Link from "next/link";
import { site } from "@/content/site";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <Monogram />
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Main" className="ml-auto hidden md:block">
          <NavLinks className="flex items-center gap-1" />
        </nav>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function Monogram() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-ink" />
      <path
        d="M5 20 L9 20 L11 12 L14 25 L17 7 L20 22 L22 16 L27 16"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-paper transition-colors group-hover:stroke-raw"
      />
    </svg>
  );
}

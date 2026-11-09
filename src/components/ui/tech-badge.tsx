import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { techIcon, techUrl } from "@/lib/tech-icons";

export function TechLogo({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const icon = techIcon(name);
  if (!icon) return null;
  if (icon.kind === "image") {
    // biome-ignore lint/performance/noImgElement: tiny static SVG logo, next/image adds nothing here
    return <img src={icon.src} alt="" className={`shrink-0 ${className}`} />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill={icon.color ?? "currentColor"}
      aria-hidden
    >
      <use href={`/tech-icons.svg#${icon.id}`} />
    </svg>
  );
}

/** Links a technology to its official site in a new tab; plain content if the site is unknown. */
export function TechLink({
  name,
  label = name,
  className,
  children,
}: {
  name: string;
  /** Visible text when it differs from the name, e.g. "Phoenix 1.8". */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const t = useTranslations("common");
  const url = techUrl(name);
  if (!url) return <span className={className}>{children}</span>;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("techWebsite", { name: label })}
      className={className}
    >
      {children}
    </a>
  );
}

/** Technology tags, each linked to its official site. */
export function StackList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <TechLink name={item} className="tech-tag">
            <TechLogo name={item} />
            {item}
          </TechLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * The first few technologies, as shown on project cards. Not linked: the whole card is
 * one link to the project page.
 */
export function CardStack({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.slice(0, 5).map((item) => (
        <li key={item} className="tech-tag">
          <TechLogo name={item} />
          {item}
        </li>
      ))}
    </ul>
  );
}

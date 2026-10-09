import { Link2 } from "lucide-react";

/**
 * A heading with an id and a "#" link that appears on hover or focus,
 * so any section can be linked to directly (e.g. /experience#igt-systems).
 */
export function AnchorHeading({
  id,
  as: Tag = "h2",
  className = "",
  label,
  children,
}: {
  id: string;
  as?: "h2" | "h3";
  className?: string;
  /** Accessible name of the link, e.g. "Link to this section". */
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tag id={id} className={`group/anchor relative scroll-mt-24 ${className}`}>
      {children}
      <a
        href={`#${id}`}
        aria-label={label}
        className="ml-2 inline-flex translate-y-[-0.1em] align-middle text-muted opacity-0 transition-opacity group-hover/anchor:opacity-100 hover:text-accent focus-visible:opacity-100"
      >
        <Link2 aria-hidden className="size-[0.7em]" />
      </a>
    </Tag>
  );
}

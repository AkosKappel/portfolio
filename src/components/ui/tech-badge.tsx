import { techIcon } from "@/lib/tech-icons";

export function TechLogo({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const icon = techIcon(name);
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="currentColor" aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}

export function StackList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-0.5 text-[0.8rem] leading-5 text-muted"
        >
          <TechLogo name={item} />
          {item}
        </li>
      ))}
    </ul>
  );
}

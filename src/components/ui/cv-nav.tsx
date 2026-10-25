"use client";

import { useEffect, useState } from "react";

/** Section links that mark the section currently in view, so the long page keeps its place. */
export function CvNav({
  label,
  sections,
}: {
  label: string;
  sections: { id: string; title: string; icon: React.ReactNode }[];
}) {
  const [active, setActive] = useState(`section-${sections[0]?.id}`);

  useEffect(() => {
    // A section counts as current once its top passes the upper third of the screen.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // When two sections share that band, the lower one is the one being read.
        const current = sections.findLast(({ id }) => visible.has(`section-${id}`));
        if (current) setActive(`section-${current.id}`);
      },
      { rootMargin: "0px 0px -66% 0px" },
    );
    for (const { id } of sections) {
      const element = document.getElementById(`section-${id}`);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label} className="print:hidden">
      <ul className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === `section-${section.id}` ? "true" : undefined}
              className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-ink aria-[current=true]:bg-accent-soft aria-[current=true]:font-medium aria-[current=true]:text-ink lg:border-transparent"
            >
              {section.icon}
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

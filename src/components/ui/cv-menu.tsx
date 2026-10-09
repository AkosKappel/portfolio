import { Download } from "lucide-react";
import { site } from "@/content/site";

/** A native <details> menu: works with keyboard, touch and without JavaScript. */
export function CvMenu({ className = "" }: { className?: string }) {
  return (
    <details className={`group relative ${className}`}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink [&::-webkit-details-marker]:hidden">
        <Download aria-hidden size={18} />
        Download CV
      </summary>
      <ul className="absolute top-full left-0 z-10 mt-2 min-w-48 rounded-lg border border-line bg-surface p-1.5 shadow-lg">
        {site.cv.map((cv) => (
          <li key={cv.href}>
            <a
              href={cv.href}
              download
              className="flex justify-between gap-4 rounded-md px-3 py-2 hover:bg-paper"
            >
              {cv.language}
              <span className="text-sm text-muted">PDF</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

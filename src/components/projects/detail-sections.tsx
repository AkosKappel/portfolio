import { type LucideIcon, Scale } from "lucide-react";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { pick, type Text } from "@/content/types";
import type { Locale } from "@/i18n/routing";

/** Sections shared by the project pages and the work case studies. */

export function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

export function DetailList({
  id,
  title,
  items,
  locale,
  Icon,
  anchor,
}: {
  id: string;
  title: string;
  items?: Text[];
  locale: Locale;
  Icon: LucideIcon;
  anchor: string;
}) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby={id}>
      <AnchorHeading
        id={id}
        label={anchor}
        className="flex items-center gap-2 text-2xl font-semibold"
      >
        <Icon aria-hidden className="size-5 shrink-0 text-accent" />
        {title}
      </AnchorHeading>
      <ul className="mt-4 space-y-2.5 text-lg">
        {items.map((item) => (
          <li key={item.en} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
            {pick(item, locale)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Decisions({
  title,
  items,
  locale,
  anchor,
}: {
  title: string;
  items?: { title: Text; text: Text }[];
  locale: Locale;
  anchor: string;
}) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="decisions">
      <AnchorHeading
        id="decisions"
        label={anchor}
        className="flex items-center gap-2 text-2xl font-semibold"
      >
        <Scale aria-hidden className="size-5 shrink-0 text-accent" />
        {title}
      </AnchorHeading>
      <ol className="mt-5 grid gap-4">
        {items.map((decision) => (
          <li key={decision.title.en} className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold">{pick(decision.title, locale)}</h3>
            <p className="mt-2 text-muted">{pick(decision.text, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

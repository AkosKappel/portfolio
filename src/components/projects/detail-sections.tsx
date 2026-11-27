import { type LucideIcon, Network, Scale } from "lucide-react";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { TechLogo } from "@/components/ui/tech-badge";
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

/** A request or data path drawn as a numbered chain of boxes. */
export function Architecture({
  title,
  nodes,
  locale,
  anchor,
}: {
  title: string;
  nodes?: { name: Text; detail: Text }[];
  locale: Locale;
  anchor: string;
}) {
  if (!nodes?.length) return null;
  return (
    <section aria-labelledby="architecture">
      <AnchorHeading
        id="architecture"
        label={anchor}
        className="flex items-center gap-2 text-2xl font-semibold"
      >
        <Network aria-hidden className="size-5 shrink-0 text-accent" />
        {title}
      </AnchorHeading>
      <ol className="mt-5 grid gap-0">
        {nodes.map((node, index) => (
          <li key={node.name.en} className="grid grid-cols-[auto_1fr] gap-x-4">
            <span className="flex flex-col items-center">
              <span className="grid size-8 place-items-center rounded-full border border-accent bg-accent-soft text-sm font-semibold text-accent">
                {index + 1}
              </span>
              {index < nodes.length - 1 ? (
                <span aria-hidden className="w-px flex-1 bg-line" />
              ) : null}
            </span>
            <span className="pb-5">
              <span className="flex items-center gap-2 font-semibold">
                <TechLogo name={node.name.en} className="size-4" />
                {pick(node.name, locale)}
              </span>
              <span className="block text-muted">{pick(node.detail, locale)}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { ViewTransition } from "react";

/** Page wrapper: consistent width, and the route transition for every page. */
export function Page({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
    </ViewTransition>
  );
}

export function PageHeader({ title, lead }: { title: string; lead?: React.ReactNode }) {
  return (
    <header className="max-w-3xl pt-14 pb-10 sm:pt-20">
      <h1 className="text-4xl font-semibold sm:text-6xl">{title}</h1>
      {lead ? <div className="mt-5 text-lg text-muted sm:text-xl">{lead}</div> : null}
    </header>
  );
}

export function StackList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line px-2.5 py-0.5 text-[0.8rem] leading-5 text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

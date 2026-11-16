"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { site } from "@/content/site";

const subscribe = () => () => {};

/** True only in the browser after hydration, so the server HTML never holds the address. */
function useInBrowser() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * A mailto link rendered in the browser only, out of reach of scrapers that read the HTML.
 * Shows `label` when given, otherwise the address itself (nothing until hydration).
 */
export function EmailLink({
  label,
  className,
  textClassName,
  children,
}: {
  label?: string;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
}) {
  const inBrowser = useInBrowser();
  if (!inBrowser && !label) return null;
  const text = label ?? site.email;
  return (
    <a href={inBrowser ? `mailto:${site.email}` : "/contact"} className={className}>
      {children}
      {textClassName ? <span className={textClassName}>{text}</span> : text}
    </a>
  );
}

export function CopyEmailButton(props: { label: string; copiedLabel: string }) {
  return <CopyButton value={site.email} {...props} />;
}

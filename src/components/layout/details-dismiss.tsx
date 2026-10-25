"use client";

import { useEffect } from "react";

/**
 * The header and CV menus are native <details>, which stay open until their summary is
 * clicked again. This closes them on a click outside or on Esc, like any other menu.
 */
export function DetailsDismiss() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      for (const details of document.querySelectorAll<HTMLDetailsElement>("details[open]")) {
        if (!details.contains(event.target as Node)) details.open = false;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      for (const details of document.querySelectorAll<HTMLDetailsElement>("details[open]")) {
        details.open = false;
        if (details.contains(document.activeElement)) details.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}

"use client";

import { type RefObject, useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Widget = { api: TurnstileApi; id: string };

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Covers a visitor who is shown the checkbox and takes a while to click it.
const TOKEN_TIMEOUT_MS = 60_000;

let scriptLoading: Promise<TurnstileApi> | undefined;

function loadTurnstile(): Promise<TurnstileApi> {
  scriptLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile is missing"));
    script.onerror = () => {
      scriptLoading = undefined;
      script.remove();
      reject(new Error("Turnstile failed to load"));
    };
    document.head.append(script);
  });
  return scriptLoading;
}

/**
 * Cloudflare Turnstile in "execute" mode: it stays invisible unless Cloudflare wants the visitor
 * to click a checkbox in `container`. The returned function asks for a fresh token per message,
 * because the Worker accepts each token only once.
 */
export function useTurnstile(
  siteKey: string,
  container: RefObject<HTMLDivElement | null>,
  language: string,
) {
  const ready = useRef<Promise<Widget> | undefined>(undefined);
  const pending = useRef<{ resolve: (token: string) => void; reject: (error: Error) => void }>(
    undefined,
  );

  useEffect(() => {
    let rendered: Widget | undefined;
    let cancelled = false;
    ready.current = loadTurnstile().then((api) => {
      if (cancelled || !container.current) throw new Error("The chat was closed");
      const id = api.render(container.current, {
        sitekey: siteKey,
        execution: "execute",
        appearance: "interaction-only",
        language,
        callback: (token: string) => pending.current?.resolve(token),
        "error-callback": () => pending.current?.reject(new Error("Turnstile failed")),
        "expired-callback": () => api.reset(id),
      });
      rendered = { api, id };
      return rendered;
    });
    ready.current.catch(() => {});
    return () => {
      cancelled = true;
      if (rendered) rendered.api.remove(rendered.id);
    };
  }, [siteKey, container, language]);

  return useCallback(async (): Promise<string> => {
    if (!ready.current) throw new Error("Turnstile has not started");
    const { api, id } = await ready.current;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Turnstile timed out")), TOKEN_TIMEOUT_MS);
      pending.current = {
        resolve: (token) => {
          clearTimeout(timer);
          resolve(token);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      };
      api.reset(id);
      api.execute(id);
    });
  }, []);
}

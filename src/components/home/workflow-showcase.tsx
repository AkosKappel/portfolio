"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WorkflowStep } from "@/content/types";
import { workflowIcons } from "./workflow-icons";
import { workflowScenes } from "./workflow-scenes";

type Step = {
  id: WorkflowStep["id"];
  title: string;
  text: string;
};

/*
  The workflow as a list of steps next to a mock-up of the active one. Steps advance
  on their own: the active step's progress line is a CSS animation, and when it ends
  the next step becomes active. Pausing only stops that animation, so hovering,
  keyboard focus, scrolling away and the pause button all work the same way. With
  reduced motion the line is not drawn, so nothing advances unless chosen.
*/
export function WorkflowShowcase({
  steps,
  pauseLabel,
  playLabel,
}: {
  steps: Step[];
  pauseLabel: string;
  playLabel: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [listHeight, setListHeight] = useState<number>();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Reserve room for the longest description, so the page below does not jump each time
  // the walkthrough moves on to a step with a shorter or longer text.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const rows = [...list.querySelectorAll<HTMLElement>("[data-row]")];
      const descriptions = [...list.querySelectorAll<HTMLElement>("[data-description]")];
      const collapsed = rows.reduce((sum, row) => sum + row.offsetHeight + 1, 1);
      setListHeight(collapsed + Math.max(...descriptions.map((item) => item.offsetHeight)));
    };
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const Scene = workflowScenes[steps[active].id];

  return (
    <div
      ref={rootRef}
      className="wf mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12"
      data-paused={paused || !visible ? "" : undefined}
    >
      <div>
        <ol ref={listRef} className="border-t border-line" style={{ minHeight: listHeight }}>
          {steps.map((step, index) => {
            const isActive = index === active;
            const Icon = workflowIcons[step.id];
            return (
              <li
                key={step.id}
                aria-current={isActive ? "step" : undefined}
                className="relative border-b border-line"
              >
                <button
                  type="button"
                  data-row
                  onClick={() => setActive(index)}
                  className={`group flex w-full items-center gap-4 py-3.5 text-left transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                      isActive
                        ? "border-accent bg-accent text-on-accent"
                        : "border-line bg-surface text-accent group-hover:border-accent"
                    }`}
                  >
                    <Icon aria-hidden size={18} />
                  </span>
                  <span className="font-display text-xl font-semibold sm:text-2xl">
                    {step.title}
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div data-description className="pb-5 pl-13">
                      <p className="text-muted">{step.text}</p>
                    </div>
                  </div>
                </div>
                {isActive ? (
                  <span
                    key={active}
                    aria-hidden
                    className="wf-progress absolute -bottom-px left-0 h-0.5 w-full origin-left bg-accent"
                    onAnimationEnd={() => setActive((index + 1) % steps.length)}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden size={14} /> : <Pause aria-hidden size={14} />}
          {paused ? playLabel : pauseLabel}
        </button>
      </div>

      <div aria-hidden className="h-[25rem] lg:sticky lg:top-28">
        <div key={active} className="wf-scene h-full">
          <Scene />
        </div>
      </div>
    </div>
  );
}

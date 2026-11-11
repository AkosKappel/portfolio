import { Check, CircleCheck, GitPullRequest } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { WorkflowStep } from "@/content/types";

/*
  Small mock-ups of the tools behind each stage of the workflow. They are decoration
  next to the text of the step, so they stay in English like the tools themselves.
  Elements with `wf-in` rise into place one after another (`--d` is their order);
  without motion they are simply shown in their final state.
*/

const delay = (order: number) => ({ "--d": order }) as CSSProperties;

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
      <div className="border-b border-line bg-surface px-4 py-2.5">
        <span className="font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="min-h-0 flex-1 p-5 text-sm">{children}</div>
    </div>
  );
}

function DefineScene() {
  const criteria = [
    "Works offline and syncs when back online",
    "Changes reach other devices within 2 s",
    "Usable with a keyboard and a screen reader",
  ];
  return (
    <Frame title="docs/spec.md">
      <p className="wf-in font-display text-lg font-semibold" style={delay(0)}>
        Shared shopping list
      </p>
      <p
        className="wf-in mt-3 text-xs font-semibold tracking-wide text-muted uppercase"
        style={delay(1)}
      >
        Goal
      </p>
      <p className="wf-in mt-1" style={delay(2)}>
        A family edits one list together, from any device.
      </p>
      <p
        className="wf-in mt-4 text-xs font-semibold tracking-wide text-muted uppercase"
        style={delay(3)}
      >
        Acceptance criteria
      </p>
      <ul className="mt-2 space-y-2">
        {criteria.map((item, index) => (
          <li key={item} className="wf-in flex items-start gap-2" style={delay(4 + index)}>
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded border border-accent bg-accent text-on-accent">
              <Check size={12} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function PlanScene() {
  const tasks = [
    ["Schema and migration", "S"],
    ["Sync rules per family", "M"],
    ["List screen", "M"],
    ["Offline write queue", "S"],
    ["E2E test on two devices", "S"],
  ];
  return (
    <Frame title="tasks">
      <div
        className="wf-in mb-3 flex items-center justify-between text-xs text-muted"
        style={delay(0)}
      >
        <span>Shared shopping list</span>
        <span className="font-mono">0 / {tasks.length}</span>
      </div>
      <ol className="space-y-2">
        {tasks.map(([name, size], index) => (
          <li
            key={name}
            className={`wf-in flex items-center gap-3 rounded-lg border px-3 py-2 ${
              index === 0 ? "border-accent bg-accent-soft" : "border-line bg-surface"
            }`}
            style={delay(1 + index)}
          >
            <span className="font-mono text-xs text-muted">T{index + 1}</span>
            <span className="flex-1">{name}</span>
            {index === 0 ? <span className="text-xs font-medium text-accent">next</span> : null}
            <span className="rounded border border-line px-1.5 font-mono text-xs text-muted">
              {size}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function BuildScene() {
  const lines: [string, ReactNode][] = [
    [
      "1",
      <>
        <span className="text-accent">export function</span> ListItem({"{ item }"}) {"{"}
      </>,
    ],
    [
      "2",
      <>
        {"  "}
        <span className="text-accent">const</span> toggle = useToggleItem(item.id);
      </>,
    ],
    [
      "3",
      <>
        {"  "}
        <span className="text-accent">return</span> (
      </>,
    ],
    [
      "4",
      <>
        {"    "}&lt;Checkbox checked={"{"}item.done{"}"}
      </>,
    ],
    [
      "5",
      <>
        {"      "}onChange={"{"}toggle{"}"} label={"{"}item.name{"}"} /&gt;
      </>,
    ],
    ["6", "  );"],
    ["7", "}"],
  ];
  return (
    <Frame title="src/list-item.tsx">
      <pre className="overflow-hidden rounded-lg bg-surface p-3 font-mono text-xs leading-6">
        {lines.map(([number, code], index) => (
          <div key={number} className="wf-in flex gap-3" style={delay(index)}>
            <span className="w-3 text-right text-muted/60 select-none">{number}</span>
            <code className="whitespace-pre">{code}</code>
          </div>
        ))}
      </pre>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span
          className="wf-in inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1"
          style={delay(8)}
        >
          <CircleCheck size={14} className="text-accent" />
          tsc --noEmit
        </span>
        <span
          className="wf-in inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1"
          style={delay(9)}
        >
          <span className="font-mono text-accent">+7</span>
          <span className="font-mono text-muted">−12</span>
          simplified
        </span>
      </div>
    </Frame>
  );
}

function TestScene() {
  const suites = [
    ["Unit", "42 passed"],
    ["End-to-end", "18 passed"],
    ["Accessibility", "0 violations"],
  ];
  const rules = ["strict types", "WCAG 2.2 AA", "Lighthouse 100", "no lint warnings"];
  return (
    <Frame title="checks">
      <ul className="space-y-2">
        {suites.map(([name, result], index) => (
          <li
            key={name}
            className="wf-in flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2"
            style={delay(index)}
          >
            <CircleCheck size={16} className="shrink-0 text-accent" />
            <span className="flex-1">{name}</span>
            <span className="font-mono text-xs text-muted">{result}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {rules.map((rule, index) => (
          <span
            key={rule}
            className="wf-in rounded-md bg-accent-soft px-2 py-0.5 text-xs text-accent"
            style={delay(3 + index)}
          >
            {rule}
          </span>
        ))}
      </div>
      <div
        className="wf-in mt-4 flex items-center gap-2 border-t border-line pt-3"
        style={delay(8)}
      >
        <GitPullRequest size={16} className="text-accent" />
        <span className="flex-1">Review</span>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-on-accent">
          approved
        </span>
      </div>
    </Frame>
  );
}

function Score({ label, order }: { label: string; order: number }) {
  return (
    <div className="wf-in flex flex-col items-center gap-1.5" style={delay(order)}>
      <svg viewBox="0 0 40 40" className="size-12 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r="17" fill="none" strokeWidth="3" className="stroke-line" />
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          className="wf-draw stroke-accent"
          style={delay(order)}
        />
        <text
          x="20"
          y="20"
          dy="0.35em"
          textAnchor="middle"
          className="rotate-90 fill-ink font-mono text-[11px] font-semibold"
          style={{ transformOrigin: "20px 20px" }}
        >
          100
        </text>
      </svg>
      <span className="text-center text-[11px] leading-tight text-muted">{label}</span>
    </div>
  );
}

function ShipScene() {
  const stages = ["lint", "build", "test", "deploy"];
  return (
    <Frame title=".github/workflows/ci.yml">
      <ol className="flex items-center">
        {stages.map((stage, index) => (
          <li key={stage} className="flex flex-1 items-center last:flex-none">
            <span className="wf-in flex flex-col items-center gap-1" style={delay(index)}>
              <span className="grid size-8 place-items-center rounded-full bg-accent text-on-accent">
                <Check size={16} strokeWidth={3} />
              </span>
              <span className="font-mono text-xs text-muted">{stage}</span>
            </span>
            {index < stages.length - 1 ? (
              <span className="wf-line mx-1 mb-5 h-0.5 flex-1 bg-accent" style={delay(index)} />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="wf-in mt-4 text-center text-xs text-muted" style={delay(4)}>
        Deployed to <span className="font-mono text-ink">akoskappel.dev</span> in 52 s
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-line pt-4">
        <Score label="Performance" order={5} />
        <Score label="Accessibility" order={6} />
        <Score label="Best practices" order={7} />
        <Score label="SEO" order={8} />
      </div>
    </Frame>
  );
}

function RunScene() {
  const apps = ["budgetmaster", "oriel", "portfolio"];
  // A calm response-time line with one small spike, in a 200 × 40 box.
  const line = "M0 28 L20 26 L40 27 L60 24 L80 26 L100 25 L120 12 L140 24 L160 23 L180 25 L200 24";
  return (
    <Frame title="status">
      <div className="wf-in flex items-center gap-2 font-medium" style={delay(0)}>
        <span className="relative flex size-2.5">
          <span className="wf-ping absolute inset-0 rounded-full bg-accent" />
          <span className="relative size-2.5 rounded-full bg-accent" />
        </span>
        All systems operational
      </div>
      <ul className="mt-4 space-y-3">
        {apps.map((app, row) => (
          <li key={app} className="wf-in" style={delay(1 + row)}>
            <div className="flex justify-between text-xs">
              <span className="font-mono">{app}</span>
              <span className="text-muted">99.9 %</span>
            </div>
            <div className="mt-1 flex h-5 gap-[3px]">
              {Array.from({ length: 30 }, (_, day) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: a fixed row of identical bars
                  key={day}
                  className={`flex-1 rounded-sm ${row === 0 && day === 17 ? "bg-line" : "bg-accent/70"}`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="wf-in mt-4 border-t border-line pt-3" style={delay(4)}>
        <div className="flex justify-between text-xs text-muted">
          <span>Response time</span>
          <span className="font-mono">84 ms</span>
        </div>
        <svg
          viewBox="0 0 200 40"
          className="mt-1 h-10 w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={line}
            fill="none"
            strokeWidth="2"
            pathLength={1}
            className="wf-draw stroke-accent"
            style={delay(5)}
          />
        </svg>
      </div>
    </Frame>
  );
}

export const workflowScenes: Record<WorkflowStep["id"], () => ReactNode> = {
  define: DefineScene,
  plan: PlanScene,
  build: BuildScene,
  test: TestScene,
  ship: ShipScene,
  run: RunScene,
};

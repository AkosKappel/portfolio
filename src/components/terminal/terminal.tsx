"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, type KeyboardEvent, type ReactNode, useRef, useState } from "react";
import { EmailLink } from "@/components/ui/email-link";
import { Link, useRouter } from "@/i18n/navigation";
import { complete } from "@/lib/terminal";

export type TerminalData = {
  whoami: string[];
  about: string;
  projects: { slug: string; title: string; years: string; summary: string }[];
  skills: { name: string; skills: string[] }[];
  jobs: { role: string; company: string; period: string }[];
  pages: { name: string; href: string; label: string }[];
  links: { name: string; url: string }[];
};

type Entry = { id: number; command?: string; output: ReactNode };

const Prompt = () => (
  <span aria-hidden className="text-accent">
    guest@akoskappel:~$
  </span>
);

/** A small command line over the site's content, for visitors who prefer a keyboard. */
export function Terminal({ data }: { data: TerminalData }) {
  const t = useTranslations("terminal");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>();
  const targets = [...data.projects.map((p) => p.slug), ...data.pages.map((p) => p.name)];

  const helpRows: [string, string][] = [
    ["whoami", t("help.whoami")],
    ["ls projects", t("help.lsProjects")],
    ["ls skills", t("help.lsSkills")],
    ["ls jobs", t("help.lsJobs")],
    ["cat about", t("help.catAbout")],
    ["open <name>", t("help.open")],
    ["contact", t("help.contact")],
    ["clear", t("help.clear")],
    ["exit", t("help.exit")],
  ];

  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: -1, output: t("welcome") },
    { id: 0, command: "help", output: <Table rows={helpRows} /> },
  ]);

  function run(input: string): ReactNode {
    const [command = "", ...args] = input.trim().split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    switch (command.toLowerCase()) {
      case "help":
        return <Table rows={helpRows} />;
      case "whoami":
        return <Lines lines={data.whoami} />;
      case "ls":
        if (arg === "projects")
          return (
            <ul>
              {data.projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
                    {project.slug}
                  </Link>{" "}
                  <span className="text-muted">({project.years})</span> {project.summary}
                </li>
              ))}
            </ul>
          );
        if (arg === "skills")
          return <Table rows={data.skills.map((group) => [group.name, group.skills.join(", ")])} />;
        if (arg === "jobs")
          return (
            <Table rows={data.jobs.map((job) => [job.period, `${job.role}, ${job.company}`])} />
          );
        return t("usageLs");
      case "cat":
        return arg === "about" ? data.about : t("usageCat");
      case "open": {
        if (!arg) return t("usageOpen");
        const project = data.projects.find((p) => p.slug === arg);
        const page = data.pages.find((p) => p.name === arg);
        const href = project ? `/projects/${project.slug}` : page?.href;
        if (!href) return t("unknownTarget", { name: arg });
        router.push(href);
        return t("opening", { name: project?.title ?? page?.label ?? arg });
      }
      case "contact":
        return (
          <ul>
            <li>
              email: <EmailLink className="text-accent hover:underline" />
            </li>
            {data.links.map((link) => (
              <li key={link.name}>
                {link.name}:{" "}
                <a href={link.url} className="text-accent hover:underline">
                  {link.url.replace(/^https:\/\//, "")}
                </a>
              </li>
            ))}
          </ul>
        );
      case "exit":
        router.push("/");
        return t("opening", { name: "/" });
      default:
        return t("notFound", { command });
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const command = value.trim();
    setValue("");
    setHistoryIndex(undefined);
    if (!command) return;
    setHistory((previous) => [...previous, command]);
    if (command.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    const output = run(command);
    setEntries((previous) => [...previous, { id: nextId.current++, command, output }]);
    requestAnimationFrame(() => inputRef.current?.scrollIntoView({ block: "nearest" }));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (!history.length) return;
      event.preventDefault();
      const last = history.length - 1;
      const index =
        event.key === "ArrowUp"
          ? Math.max(0, (historyIndex ?? history.length) - 1)
          : (historyIndex ?? last) + 1;
      if (index > last) {
        setHistoryIndex(undefined);
        setValue("");
      } else {
        setHistoryIndex(index);
        setValue(history[index]);
      }
    } else if (event.key === "Tab") {
      const completed = complete(value, targets);
      if (completed !== value) {
        event.preventDefault();
        setValue(completed);
      }
    }
  }

  return (
    // Clicking anywhere in the window focuses the prompt, as in a real terminal.
    // biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: the input itself is the keyboard path
    <div
      onClick={() => inputRef.current?.focus()}
      className="overflow-hidden rounded-xl border border-line bg-surface font-mono text-sm shadow-sm"
    >
      <div aria-hidden className="flex gap-1.5 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-rose-400" />
        <span className="size-3 rounded-full bg-amber-400" />
        <span className="size-3 rounded-full bg-emerald-400" />
      </div>
      <div className="max-h-[60vh] min-h-80 overflow-y-auto p-4 leading-relaxed">
        <div role="log" aria-live="polite" className="grid gap-3">
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.command ? (
                <p>
                  <Prompt /> {entry.command}
                </p>
              ) : null}
              <div className="break-words whitespace-pre-wrap">{entry.output}</div>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="mt-3 flex items-center gap-2">
          <Prompt />
          <label htmlFor="terminal-input" className="sr-only">
            {t("inputLabel")}
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
        </form>
      </div>
    </div>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]">
      {rows.map(([term, detail]) => (
        <div key={term} className="contents">
          <dt className="text-accent">{term}</dt>
          <dd className="mb-1 text-muted sm:mb-0">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

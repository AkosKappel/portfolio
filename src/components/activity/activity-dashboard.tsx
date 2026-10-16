"use client";

import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  type ActivityData,
  addDays,
  type Category,
  calendarWeeks,
  categories,
  commitHours,
  languageYears,
  level,
  quartiles,
  shades,
  summarize,
} from "@/lib/activity";

export function ActivityDashboard({
  data,
  languageColors,
}: {
  data: ActivityData;
  /** Brand colour per language name, where the site has its logo. */
  languageColors: Record<string, string>;
}) {
  const t = useTranslations("activity");
  const locale = useLocale();
  const [year, setYear] = useState<number | null>(null);
  const [sourceIds, setSourceIds] = useState(data.sources.map((source) => source.id));

  const end =
    year && year < Number(data.generatedAt.slice(0, 4)) ? `${year}-12-31` : data.generatedAt;
  const start = year ? `${year}-01-01` : addDays(end, -364);
  const [selected, setSelected] = useState(end);
  // Hovering previews a day in the details; clicking or the arrow keys pin it.
  const [hovered, setHovered] = useState<string | null>(null);
  const shown = hovered ?? selected;
  const summary = summarize(data, sourceIds, start, end);
  const weeks = calendarWeeks(start, end);

  const firstYear = Number(
    Object.keys(data.days).sort()[0]?.slice(0, 4) ?? data.generatedAt.slice(0, 4),
  );
  const years = Array.from(
    { length: Number(data.generatedAt.slice(0, 4)) - firstYear + 1 },
    (_, index) => Number(data.generatedAt.slice(0, 4)) - index,
  );

  const number = new Intl.NumberFormat(locale);
  const formatDate = (date: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(
      new Date(`${date}T00:00:00Z`),
    );

  // The newest days are on the right; show them first when the calendar has to scroll.
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ left: scroller.current.scrollWidth });
  }, []);

  function selectRange(next: number | null) {
    setYear(next);
    const nextEnd =
      next && next < Number(data.generatedAt.slice(0, 4)) ? `${next}-12-31` : data.generatedAt;
    setSelected(nextEnd);
  }

  function toggleSource(id: string) {
    setSourceIds((current) =>
      current.includes(id)
        ? current.length > 1
          ? current.filter((item) => item !== id)
          : current
        : data.sources
            .map((source) => source.id)
            .filter((item) => current.includes(item) || item === id),
    );
  }

  const allIds = data.sources.map((source) => source.id);
  const presets = [
    { key: "all" as const, ids: allIds },
    ...(["personal", "work"] as const).map((kind) => ({
      key: kind,
      ids: data.sources.filter((source) => source.kind === kind).map((source) => source.id),
    })),
  ].filter((preset) => preset.ids.length);
  const isSelection = (ids: string[]) =>
    ids.length === sourceIds.length && ids.every((id) => sourceIds.includes(id));

  function onCalendarKey(event: React.KeyboardEvent) {
    const step = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = addDays(selected, step);
    if (next < start || next > end) return;
    setSelected(next);
    scroller.current?.querySelector<HTMLElement>(`[data-date="${next}"]`)?.focus();
  }

  const days = (count: number) => t("days", { count });
  const selectedSources = data.sources.filter((source) => sourceIds.includes(source.id));
  const dayCounts = data.days[shown] ?? {};
  const maxCategory = Math.max(1, ...Object.values(summary.byCategory));
  const maxSource = Math.max(1, ...Object.values(summary.bySource));

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="mb-2 text-sm font-medium text-muted">{t("range")}</legend>
          {[null, ...years].map((option) => (
            <button
              key={option ?? "last"}
              type="button"
              aria-pressed={year === option}
              onClick={() => selectRange(option)}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:bg-accent-soft aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
            >
              {option ?? t("lastYear")}
            </button>
          ))}
        </fieldset>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="mb-2 text-sm font-medium text-muted">{t("sources")}</legend>
          {presets.map((preset) => (
            <button
              key={preset.key}
              type="button"
              aria-pressed={isSelection(preset.ids)}
              onClick={() => setSourceIds(preset.ids)}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:bg-accent-soft aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
            >
              {t(`presets.${preset.key}`)}
            </button>
          ))}
          <span aria-hidden className="mx-1 h-6 w-px bg-line" />
          {data.sources.map((source) => (
            <button
              key={source.id}
              type="button"
              aria-pressed={sourceIds.includes(source.id)}
              onClick={() => toggleSource(source.id)}
              className="group inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-accent-soft aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-ink"
            >
              <Check aria-hidden size={14} className="hidden group-aria-pressed:block" />
              {source.label}
              <span className="text-xs text-muted">{t(`kinds.${source.kind}`)}</span>
            </button>
          ))}
        </fieldset>
      </div>

      <section aria-labelledby="calendar-heading" className="min-w-0">
        <h2 id="calendar-heading" className="text-2xl font-semibold">
          {t("total", {
            count: summary.total,
            total: number.format(summary.total),
            period: year ? t("inYear", { year }) : t("inLastYear"),
          })}
        </h2>
        <div className="mt-5 rounded-2xl border border-line bg-surface p-4 sm:p-6">
          <div ref={scroller} className="overflow-x-auto">
            <fieldset
              aria-describedby="calendar-hint"
              onKeyDown={onCalendarKey}
              onMouseLeave={() => setHovered(null)}
              className="grid min-w-[44rem] gap-[3px] text-xs text-muted"
              style={{ gridTemplateColumns: `auto repeat(${weeks.length}, minmax(0, 1fr))` }}
            >
              <legend className="sr-only">{t("calendar")}</legend>
              {weeks.map((week, column) => {
                const monthStart = week.find((date) => date?.endsWith("-01"));
                return monthStart ? (
                  <span
                    key={monthStart}
                    aria-hidden
                    className="pb-1 whitespace-nowrap"
                    style={{ gridColumn: column + 2, gridRow: 1 }}
                  >
                    {formatDate(monthStart, { month: "short" })}
                  </span>
                ) : null;
              })}
              {[0, 2, 4, 6].map((weekday) => (
                <span
                  key={weekday}
                  aria-hidden
                  className="self-center pr-2 leading-none"
                  style={{ gridColumn: 1, gridRow: weekday + 2 }}
                >
                  {formatDate(addDays("2024-01-01", weekday), { weekday: "short" })}
                </span>
              ))}
              {weeks.flatMap((week, column) =>
                week.map((date, weekday) => {
                  if (!date) return null;
                  const count = summary.totals.get(date) ?? 0;
                  return (
                    <button
                      key={date}
                      type="button"
                      data-date={date}
                      tabIndex={date === selected ? 0 : -1}
                      aria-label={t("day", {
                        date: formatDate(date, { dateStyle: "medium" }),
                        count,
                      })}
                      aria-pressed={date === selected}
                      onClick={() => setSelected(date)}
                      onMouseEnter={() => setHovered(date)}
                      style={{ gridColumn: column + 2, gridRow: weekday + 2 }}
                      className={`aspect-square rounded-[3px] ${shades[level(count, summary.thresholds)]} outline-offset-1 hover:outline-2 hover:outline-muted aria-pressed:outline-2 aria-pressed:outline-ink`}
                    />
                  );
                }),
              )}
            </fieldset>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <p id="calendar-hint">{t("keyboardHint")}</p>
            <div aria-hidden className="flex items-center gap-1">
              {t("less")}
              {shades.map((shade) => (
                <span key={shade} className={`size-3 rounded-[3px] ${shade}`} />
              ))}
              {t("more")}
            </div>
          </div>
        </div>

        <div
          aria-live="polite"
          className="mt-4 rounded-2xl border border-line bg-surface p-4 sm:p-6"
        >
          <p className="font-medium">
            {formatDate(shown, { dateStyle: "full" })}
            <span className="text-muted">
              {" · "}
              {t("contributions", { count: summary.totals.get(shown) ?? 0 })}
            </span>
          </p>
          <ul className="mt-2 grid gap-1 text-muted">
            {selectedSources
              .filter((source) => dayCounts[source.id])
              .map((source) => (
                <li key={source.id}>
                  <span className="text-ink">{source.label}</span>
                  {": "}
                  {categories
                    .filter((category) => dayCounts[source.id][category])
                    .map((category) =>
                      t(`counts.${category}`, { count: dayCounts[source.id][category] ?? 0 }),
                    )
                    .join(", ")}
                </li>
              ))}
          </ul>
        </div>
      </section>

      <dl className={`grid grid-cols-2 gap-4 ${year ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {[
          { label: t("activeDays"), value: days(summary.activeDays) },
          { label: t("longestStreak"), value: days(summary.longestStreak) },
          ...(year ? [] : [{ label: t("currentStreak"), value: days(summary.currentStreak) }]),
          {
            label: t("busiestDay"),
            value: summary.busiest.count
              ? t("contributions", { count: summary.busiest.count })
              : "–",
            detail: summary.busiest.count
              ? formatDate(summary.busiest.date, { dateStyle: "medium" })
              : undefined,
          },
        ].map(({ label, value, detail }) => (
          <div key={label} className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1 text-xl font-semibold">{value}</dd>
            {detail ? <dd className="text-sm text-muted">{detail}</dd> : null}
          </div>
        ))}
      </dl>

      <div className="grid gap-8 md:grid-cols-2">
        <section aria-labelledby="by-type">
          <h2 id="by-type" className="text-2xl font-semibold">
            {t("byType")}
          </h2>
          <Bars
            rows={categories.map((category: Category) => ({
              key: category,
              label: t(`categories.${category}`),
              value: summary.byCategory[category],
            }))}
            max={maxCategory}
            format={number.format}
          />
        </section>
        <section aria-labelledby="by-source">
          <h2 id="by-source" className="text-2xl font-semibold">
            {t("bySource")}
          </h2>
          <Bars
            rows={selectedSources.map((source) => ({
              key: source.id,
              label:
                source.kind === "work" ? (
                  <Link
                    href={`/experience#${source.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {source.label}
                  </Link>
                ) : (
                  source.label
                ),
              value: summary.bySource[source.id],
            }))}
            max={maxSource}
            format={number.format}
          />
        </section>
      </div>

      <CommitPattern
        grid={commitHours(data, sourceIds)}
        formatWeekday={(weekday, style) =>
          formatDate(addDays("2024-01-01", weekday), { weekday: style })
        }
      />

      <LanguagesOverTime
        {...languageYears(data, sourceIds)}
        colors={languageColors}
        highlight={year ? String(year) : null}
      />

      <p className="text-sm text-muted">
        {t("updated", { date: formatDate(data.generatedAt, { dateStyle: "long" }) })}
      </p>
    </div>
  );
}

function Bars({
  rows,
  max,
  format,
}: {
  rows: { key: string; label: React.ReactNode; value: number }[];
  max: number;
  format: (value: number) => string;
}) {
  return (
    <ul className="mt-4 grid gap-3">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="flex justify-between gap-4 text-sm">
            <span>{row.label}</span>
            <span className="tabular-nums text-muted">{format(row.value)}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-ink/8">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function CommitPattern({
  grid,
  formatWeekday,
}: {
  grid: number[][];
  formatWeekday: (weekday: number, style: "short" | "long") => string;
}) {
  const t = useTranslations("activity");
  const total = grid.flat().reduce((sum, count) => sum + count, 0);
  const thresholds = quartiles(grid.flat());
  const byWeekday = grid.map((row) => row.reduce((sum, count) => sum + count, 0));
  const byHour = grid[0].map((_, hour) => grid.reduce((sum, row) => sum + row[hour], 0));
  const percent = (part: number) => Math.round((part / Math.max(1, total)) * 100);

  return (
    <section aria-labelledby="commit-pattern">
      <h2 id="commit-pattern" className="text-2xl font-semibold">
        {t("pattern.title")}
      </h2>
      <p className="mt-2 text-muted">
        {total
          ? t("pattern.summary", {
              weekday: formatWeekday(byWeekday.indexOf(Math.max(...byWeekday)), "long"),
              hour: byHour.indexOf(Math.max(...byHour)),
              weekend: percent(byWeekday[5] + byWeekday[6]),
              evening: percent(byHour.slice(19).reduce((sum, count) => sum + count, 0)),
            })
          : t("pattern.empty")}
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div
          aria-hidden
          className="grid min-w-[36rem] gap-[3px] text-xs text-muted"
          style={{ gridTemplateColumns: "auto repeat(24, minmax(0, 1fr))" }}
        >
          {grid.map((row, weekday) => [
            <span
              key={`label-${formatWeekday(weekday, "short")}`}
              className="self-center pr-2 leading-none"
            >
              {formatWeekday(weekday, "short")}
            </span>,
            ...row.map((count, hour) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: the grid is a fixed 7 by 24
                key={`${weekday}-${hour}`}
                title={t("pattern.cell", { weekday: formatWeekday(weekday, "long"), hour, count })}
                className={`h-4 rounded-[3px] sm:h-5 ${shades[level(count, thresholds)]}`}
              />
            )),
          ])}
          <span />
          {byHour.map((_, hour) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: one label per hour
              key={hour}
              className="pt-1 text-center whitespace-nowrap"
            >
              {hour % 3 === 0 ? hour : ""}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">{t("pattern.note")}</p>
      </div>
    </section>
  );
}

function LanguagesOverTime({
  languages,
  rows,
  colors,
  highlight,
}: {
  languages: string[];
  rows: { year: string; commits: number; shares: number[] }[];
  colors: Record<string, string>;
  highlight: string | null;
}) {
  const t = useTranslations("activity");
  const names = [...languages, t("languages.other")];
  const color = (index: number) =>
    index < languages.length ? (colors[languages[index]] ?? "var(--muted)") : "var(--line)";
  const percent = (share: number) => `${Math.round(share * 100)} %`;

  return (
    <section aria-labelledby="languages-over-time">
      <h2 id="languages-over-time" className="text-2xl font-semibold">
        {t("languages.title")}
      </h2>
      <p className="mt-2 text-muted">{t("languages.lead")}</p>
      {rows.length ? (
        <div className="mt-4 rounded-2xl border border-line bg-surface p-4 sm:p-6">
          <ul aria-label={t("languages.legend")} className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {names.map((name, index) => (
              <li key={name} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="size-3 rounded-[3px]"
                  style={{ backgroundColor: color(index) }}
                />
                {name}
              </li>
            ))}
          </ul>
          <ul className="mt-5 grid gap-3">
            {rows.map((row) => (
              <li
                key={row.year}
                className={`grid grid-cols-[3rem_1fr] items-center gap-3 text-sm sm:grid-cols-[3rem_1fr_6rem] ${row.year === highlight ? "font-semibold" : ""}`}
              >
                <span className="tabular-nums">{row.year}</span>
                <div aria-hidden className="flex h-3 gap-px overflow-hidden rounded-full">
                  {row.shares.map((share, index) =>
                    share > 0 ? (
                      <span
                        key={names[index]}
                        title={`${names[index]} ${percent(share)}`}
                        style={{ width: `${share * 100}%`, backgroundColor: color(index) }}
                      />
                    ) : null,
                  )}
                </div>
                <span className="sr-only">
                  {row.shares
                    .map((share, index) =>
                      share >= 0.005 ? `${names[index]} ${percent(share)}` : "",
                    )
                    .filter(Boolean)
                    .join(", ")}
                </span>
                <span className="hidden text-right text-muted tabular-nums sm:block">
                  {t("counts.commits", { count: row.commits })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-muted">{t("pattern.empty")}</p>
      )}
    </section>
  );
}

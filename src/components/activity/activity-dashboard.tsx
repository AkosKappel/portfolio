"use client";

import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  type ActivityData,
  addDays,
  type Category,
  calendarWeeks,
  categories,
  commitHours,
  type LanguageMeasure,
  languageYears,
  level,
  quartiles,
  shades,
  summarize,
  yearTotals,
} from "@/lib/activity";

// Creating a formatter is slow, and the calendar labels a few hundred days on every render.
const dateFormats = new Map<string, Intl.DateTimeFormat>();
function dateFormat(locale: string, options: Intl.DateTimeFormatOptions) {
  const key = `${locale} ${JSON.stringify(options)}`;
  let format = dateFormats.get(key);
  if (!format) {
    format = new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" });
    dateFormats.set(key, format);
  }
  return format;
}

export function ActivityDashboard({ data }: { data: ActivityData }) {
  const t = useTranslations("activity");
  const locale = useLocale();
  const [year, setYear] = useState<number | null>(null);
  const [sourceIds, setSourceIds] = useState(data.sources.map((source) => source.id));
  const [category, setCategory] = useState<Category | null>(null);

  const end =
    year && year < Number(data.generatedAt.slice(0, 4)) ? `${year}-12-31` : data.generatedAt;
  const start = year ? `${year}-01-01` : addDays(end, -364);
  const [selected, setSelected] = useState(end);
  // Hovering previews a day in the details; clicking or the arrow keys pin it.
  const [hovered, setHovered] = useState<string | null>(null);
  const shown = hovered ?? selected;
  const summary = summarize(data, sourceIds, start, end, category);
  // A year always spans its full grid, so the current one doesn't start as a few lone columns.
  const weeks = calendarWeeks(start, year ? `${year}-12-31` : end);

  const firstYear = Number(
    Object.keys(data.days).sort()[0]?.slice(0, 4) ?? data.generatedAt.slice(0, 4),
  );
  const years = Array.from(
    { length: Number(data.generatedAt.slice(0, 4)) - firstYear + 1 },
    (_, index) => Number(data.generatedAt.slice(0, 4)) - index,
  );

  const number = new Intl.NumberFormat(locale);
  const formatDate = (date: string, options: Intl.DateTimeFormatOptions) =>
    dateFormat(locale, options).format(new Date(`${date}T00:00:00Z`));

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
  // Sources with nothing in the selected period are hidden rather than listed at zero.
  const inRange = summarize(data, allIds, start, end).bySource;
  const presets = [
    { key: "all" as const, ids: allIds },
    ...(["personal", "work"] as const).map((kind) => ({
      key: kind,
      ids: data.sources.filter((source) => source.kind === kind).map((source) => source.id),
    })),
  ].filter((preset) => preset.ids.some((id) => inRange[id]));
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
  const perYear = yearTotals(data, sourceIds, category);
  const maxYear = Math.max(1, ...perYear.values());
  const period = year ? t("inYear", { year }) : t("inLastYear");
  const rowButton =
    "text-left underline-offset-4 hover:underline disabled:no-underline disabled:opacity-60 aria-pressed:font-semibold aria-pressed:underline";

  return (
    // One explicit column, so a wide chart scrolls inside its card instead of widening the page.
    <div className="grid grid-cols-1 gap-8">
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
          {data.sources
            .filter((source) => inRange[source.id])
            .map((source) => (
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
          {category
            ? `${t(`counts.${category}`, { count: summary.total })} ${period}`
            : t("total", { count: summary.total, total: number.format(summary.total), period })}
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
                  if (date > end) {
                    return (
                      <span
                        key={date}
                        aria-hidden
                        style={{ gridColumn: column + 2, gridRow: weekday + 2 }}
                        className="aspect-square rounded-[3px] border border-ink/8"
                      />
                    );
                  }
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

      <LanguagesOverTime data={data} sourceIds={sourceIds} highlight={year ? String(year) : null} />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <section aria-labelledby="by-type">
          <h2 id="by-type" className="text-2xl font-semibold">
            {t("byType")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("byTypeHint")}</p>
          <Bars
            rows={categories.map((type) => ({
              key: type,
              label: (
                <button
                  type="button"
                  aria-pressed={category === type}
                  disabled={!summary.byCategory[type] && category !== type}
                  onClick={() => setCategory(category === type ? null : type)}
                  className={rowButton}
                >
                  {t(`categories.${type}`)}
                </button>
              ),
              value: summary.byCategory[type],
            }))}
            max={maxCategory}
            format={number.format}
            selected={category}
          />
        </section>
        <section aria-labelledby="by-source">
          <h2 id="by-source" className="text-2xl font-semibold">
            {t("bySource")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("bySourceHint")}</p>
          <Bars
            rows={selectedSources
              .filter((source) => summary.bySource[source.id])
              .map((source) => ({
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
        <section aria-labelledby="by-year">
          <h2 id="by-year" className="text-2xl font-semibold">
            {t("byYear")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("byYearHint")}</p>
          <Bars
            rows={years.map((option) => ({
              key: String(option),
              label: (
                <button
                  type="button"
                  aria-pressed={year === option}
                  onClick={() => selectRange(year === option ? null : option)}
                  className={rowButton}
                >
                  {option}
                </button>
              ),
              value: perYear.get(option) ?? 0,
            }))}
            max={maxYear}
            format={number.format}
            selected={year ? String(year) : null}
          />
        </section>
      </div>

      <CommitPattern
        grid={commitHours(data, sourceIds)}
        formatWeekday={(weekday, style) =>
          formatDate(addDays("2024-01-01", weekday), { weekday: style })
        }
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
  selected = null,
}: {
  rows: { key: string; label: React.ReactNode; value: number }[];
  max: number;
  format: (value: number) => string;
  /** Row to emphasise; the others fade while one is selected. */
  selected?: string | null;
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
              className={`h-full rounded-full bg-accent transition-opacity ${selected && selected !== row.key ? "opacity-30" : ""}`}
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
      <div className="mt-4 rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div
          aria-hidden
          className="grid gap-px text-xs text-muted sm:gap-[3px]"
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
                className={`group/tip relative h-4 rounded-[3px] hover:ring-2 hover:ring-ink/50 sm:h-5 ${shades[level(count, thresholds)]}`}
              >
                <HoverTip align={hour < 4 ? "start" : hour > 19 ? "end" : "center"}>
                  {t("pattern.cell", { weekday: formatWeekday(weekday, "long"), hour, count })}
                </HoverTip>
              </span>
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

/**
 * Shown on hover of its `group/tip` parent, at once, unlike the browser's delayed title.
 * Visual only: the parents are hidden from screen readers, which get the same facts as text.
 */
function HoverTip({
  align = "center",
  children,
}: {
  align?: "start" | "center" | "end";
  children: ReactNode;
}) {
  const position = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];
  return (
    <span
      className={`pointer-events-none absolute bottom-full z-10 mb-2 hidden rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs font-normal whitespace-nowrap text-ink shadow-md group-hover/tip:block ${position}`}
    >
      {children}
    </span>
  );
}

type LanguageRow = ReturnType<typeof languageYears>["rows"][number];

const seriesColor = (index: number) => `var(--series-${index + 1})`;
const percent = (share: number) => `${Math.round(share * 100)} %`;

function LanguagesOverTime({
  data,
  sourceIds,
  highlight,
}: {
  data: ActivityData;
  sourceIds: string[];
  highlight: string | null;
}) {
  const t = useTranslations("activity");
  const locale = useLocale();
  const [measure, setMeasure] = useState<LanguageMeasure>("commits");
  const { languages, rows } = languageYears(data, sourceIds, measure);
  const number = new Intl.NumberFormat(locale);
  const compact = new Intl.NumberFormat(locale, { notation: "compact" });
  const totals = rows.reduce(
    (sum, row) => ({
      commits: sum.commits + row.commits,
      added: sum.added + row.added,
      removed: sum.removed + row.removed,
    }),
    { commits: 0, added: 0, removed: 0 },
  );
  const otherName = t("languages.other");
  const otherShare = (row: LanguageRow) => row.other.reduce((sum, item) => sum + item.share, 0);
  const shown = languages.flatMap((name, index) =>
    rows.some((row) => row.shares[index] > 0) ? [{ name, color: seriesColor(index), index }] : [],
  );
  const hasOther = rows.some((row) => otherShare(row) >= 0.005);
  const segments = (row: LanguageRow) => [
    ...shown.map(({ name, color, index }) => ({
      name,
      color,
      share: row.shares[index],
      detail: "",
    })),
    {
      name: otherName,
      color: "var(--series-other)",
      share: otherShare(row),
      detail: row.other
        .filter((item) => item.share >= 0.005)
        .slice(0, 4)
        .map((item) => `${item.language} ${percent(item.share)}`)
        .join(", "),
    },
  ];

  return (
    <section aria-labelledby="languages-over-time">
      <h2 id="languages-over-time" className="text-2xl font-semibold">
        {t("languages.title")}
      </h2>
      <p className="mt-2 text-muted">
        {t("languages.lead")}{" "}
        {rows.length
          ? t("languages.summary", {
              from: rows[0].year,
              commits: totals.commits,
              added: number.format(totals.added),
              removed: number.format(totals.removed),
            })
          : null}
      </p>
      <fieldset className="mt-4 flex flex-wrap items-center gap-2">
        <legend className="sr-only">{t("languages.measure")}</legend>
        {(["commits", "lines"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={measure === option}
            onClick={() => setMeasure(option)}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:bg-accent-soft aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
          >
            {t(`languages.by.${option}`)}
          </button>
        ))}
      </fieldset>
      {rows.length ? (
        <div className="mt-4 rounded-2xl border border-line bg-surface p-4 sm:p-6">
          <ul aria-label={t("languages.legend")} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[
              ...shown,
              ...(hasOther ? [{ name: otherName, color: "var(--series-other)" }] : []),
            ].map(({ name, color }) => (
              <li key={name} className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-3 rounded-[3px]"
                  style={{ backgroundColor: color }}
                />
                {name}
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-3.5">
            {rows.map((row) => (
              <li
                key={row.year}
                className={`grid grid-cols-[3rem_1fr] items-center gap-3 text-sm sm:grid-cols-[3rem_1fr_8.5rem] ${row.year === highlight ? "font-semibold" : ""}`}
              >
                <span className="tabular-nums">{row.year}</span>
                <div aria-hidden className="flex h-6 gap-0.5">
                  {segments(row).map((segment) =>
                    segment.share >= 0.005 ? (
                      <span
                        key={segment.name}
                        className="group/tip relative min-w-1 rounded-[4px] transition-[filter] hover:brightness-110"
                        // Grow factors summing below 1 would leave part of the row empty, so scale them up.
                        style={{
                          flex: `${segment.share * 100} 1 0`,
                          backgroundColor: segment.color,
                        }}
                      >
                        <HoverTip>
                          <span className="font-semibold">{segment.name}</span>{" "}
                          {percent(segment.share)}
                          {segment.detail ? (
                            <span className="block text-muted">{segment.detail}</span>
                          ) : null}
                        </HoverTip>
                      </span>
                    ) : null,
                  )}
                </div>
                <span className="sr-only">
                  {segments(row)
                    .filter((segment) => segment.share >= 0.005)
                    .map((segment) => `${segment.name} ${percent(segment.share)}`)
                    .join(", ")}
                </span>
                <span className="hidden text-right text-xs leading-tight text-muted tabular-nums sm:block">
                  {t("counts.commits", { count: row.commits })}
                  <span className="block">
                    {t("languages.changed", {
                      added: compact.format(row.added),
                      removed: compact.format(row.removed),
                    })}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <details className="mt-5 text-sm">
            <summary className="cursor-pointer text-muted hover:text-ink">
              {t("languages.table")}
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-right tabular-nums">
                <thead className="text-muted">
                  <tr>
                    <th scope="col" className="py-1 pr-3 text-left font-medium">
                      {t("languages.year")}
                    </th>
                    {[...shown.map((item) => item.name), ...(hasOther ? [otherName] : [])].map(
                      (name) => (
                        <th
                          key={name}
                          scope="col"
                          className="px-2 py-1 font-medium whitespace-nowrap"
                        >
                          {name}
                        </th>
                      ),
                    )}
                    {[t("languages.commits"), t("languages.added"), t("languages.removed")].map(
                      (name) => (
                        <th
                          key={name}
                          scope="col"
                          className="px-2 py-1 font-medium whitespace-nowrap"
                        >
                          {name}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.year} className="border-t border-line">
                      <th scope="row" className="py-1 pr-3 text-left font-medium">
                        {row.year}
                      </th>
                      {shown.map(({ name, index }) => (
                        <td key={name} className="px-2 py-1">
                          {row.shares[index] >= 0.005 ? percent(row.shares[index]) : "–"}
                        </td>
                      ))}
                      {hasOther ? (
                        <td className="px-2 py-1">
                          {otherShare(row) >= 0.005 ? percent(otherShare(row)) : "–"}
                        </td>
                      ) : null}
                      <td className="px-2 py-1">{number.format(row.commits)}</td>
                      <td className="px-2 py-1">{number.format(row.added)}</td>
                      <td className="px-2 py-1">{number.format(row.removed)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <p className="mt-4 text-xs text-muted">{t(`languages.note.${measure}`)}</p>
        </div>
      ) : (
        <p className="mt-4 text-muted">{t("pattern.empty")}</p>
      )}
    </section>
  );
}

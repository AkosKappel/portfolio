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
  level,
  summarize,
} from "@/lib/activity";

const shades = ["bg-ink/8", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];

export function ActivityDashboard({ data }: { data: ActivityData }) {
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
              <span className="text-xs text-muted">{t(source.kind)}</span>
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

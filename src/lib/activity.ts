/** Contribution types, in display order. Pull requests include GitLab merge requests. */
export const categories = [
  "commits",
  "pullRequests",
  "reviews",
  "issues",
  "comments",
  "other",
] as const;

export type Category = (typeof categories)[number];
export type Counts = Partial<Record<Category, number>>;

export type ActivitySource = { id: string; label: string; kind: "personal" | "work" };

/** The shape of `src/content/activity.json`, written by `scripts/activity.mts`. */
export type ActivityData = {
  /** ISO date of the last collection; the calendar ends here. */
  generatedAt: string;
  sources: ActivitySource[];
  /** ISO date, then source id; days and types without activity are left out. */
  days: Record<string, Record<string, Counts>>;
};

export function addDays(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function sum(counts: Counts) {
  return categories.reduce((total, category) => total + (counts[category] ?? 0), 0);
}

/** Columns of seven days, Monday first; days outside the range are null. */
export function calendarWeeks(start: string, end: string) {
  const weekday = (new Date(`${start}T00:00:00Z`).getUTCDay() + 6) % 7;
  const weeks: (string | null)[][] = [];
  for (let monday = addDays(start, -weekday); monday <= end; monday = addDays(monday, 7)) {
    weeks.push(
      Array.from({ length: 7 }, (_, index) => {
        const date = addDays(monday, index);
        return date >= start && date <= end ? date : null;
      }),
    );
  }
  return weeks;
}

/** Totals, streaks and breakdowns for the selected sources between two dates. */
export function summarize(data: ActivityData, sourceIds: string[], start: string, end: string) {
  const totals = new Map<string, number>();
  const byCategory = Object.fromEntries(categories.map((category) => [category, 0])) as Record<
    Category,
    number
  >;
  const bySource = Object.fromEntries(sourceIds.map((id) => [id, 0]));

  for (const [date, sources] of Object.entries(data.days)) {
    if (date < start || date > end) continue;
    for (const id of sourceIds) {
      const counts = sources[id];
      if (!counts) continue;
      for (const category of categories) byCategory[category] += counts[category] ?? 0;
      bySource[id] += sum(counts);
      totals.set(date, (totals.get(date) ?? 0) + sum(counts));
    }
  }

  let longestStreak = 0;
  let run = 0;
  for (let date = start; date <= end; date = addDays(date, 1)) {
    run = totals.get(date) ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  }
  // A streak is still current when the last day has no activity yet.
  let currentStreak = 0;
  let day = totals.get(end) ? end : addDays(end, -1);
  while (day >= start && totals.get(day)) {
    currentStreak++;
    day = addDays(day, -1);
  }

  const active = [...totals.values()].filter(Boolean).sort((a, b) => a - b);
  let busiest = { date: "", count: 0 };
  for (const [date, count] of totals) if (count > busiest.count) busiest = { date, count };

  return {
    totals,
    total: active.reduce((total, count) => total + count, 0),
    activeDays: active.length,
    longestStreak,
    currentStreak,
    busiest,
    byCategory,
    bySource,
    // Quartiles of the active days, so one busy day doesn't wash out the rest of the calendar.
    thresholds: [0.25, 0.5, 0.75].map((q) => active[Math.floor(q * (active.length - 1))] ?? 0),
  };
}

/** Heatmap shade from 0 (no activity) to 4. */
export function level(count: number, thresholds: number[]) {
  if (!count) return 0;
  return 1 + thresholds.filter((threshold) => count > threshold).length;
}

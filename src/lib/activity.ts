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
  /** Source id, then commits per weekday (Monday first) and hour, in Central European time. */
  hours: Record<string, number[][]>;
  /**
   * Source id, year, then language. Each commit adds up to one, split by the lines it changed
   * per language (local clones) or by the repository's languages (GitHub).
   */
  languages: Record<string, Record<string, Record<string, number>>>;
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

  const active = [...totals.values()].filter(Boolean);
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
    thresholds: quartiles(active),
  };
}

/** Quartiles of the non-zero values, so one busy day doesn't wash out the rest of a heatmap. */
export function quartiles(values: number[]) {
  const active = values.filter(Boolean).sort((a, b) => a - b);
  return [0.25, 0.5, 0.75].map((q) => active[Math.floor(q * (active.length - 1))] ?? 0);
}

/** Heatmap background per level, from no activity to the busiest quarter. */
export const shades = ["bg-ink/8", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];

/** Heatmap shade from 0 (no activity) to 4. */
export function level(count: number, thresholds: number[]) {
  if (!count) return 0;
  return 1 + thresholds.filter((threshold) => count > threshold).length;
}

/** Commits per weekday (Monday first) and hour, summed over the selected sources. */
export function commitHours(data: ActivityData, sourceIds: string[]) {
  const grid = Array.from({ length: 7 }, () => Array<number>(24).fill(0));
  for (const id of sourceIds) {
    data.hours[id]?.forEach((row, weekday) => {
      row.forEach((count, hour) => {
        grid[weekday][hour] += count;
      });
    });
  }
  return grid;
}

/**
 * Each year's share per language for the selected sources, with the `top` languages overall
 * named and the rest summed as "other".
 */
export function languageYears(data: ActivityData, sourceIds: string[], top = 6) {
  const years: Record<string, Record<string, number>> = {};
  const overall: Record<string, number> = {};
  for (const id of sourceIds) {
    for (const [year, shares] of Object.entries(data.languages[id] ?? {})) {
      years[year] ??= {};
      for (const [language, share] of Object.entries(shares)) {
        years[year][language] = (years[year][language] ?? 0) + share;
        overall[language] = (overall[language] ?? 0) + share;
      }
    }
  }
  const languages = Object.entries(overall)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([language]) => language);
  const rows = Object.entries(years)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, shares]) => {
      const total = Object.values(shares).reduce((sum, share) => sum + share, 0);
      const named = languages.map((language) => (shares[language] ?? 0) / total);
      return {
        year,
        commits: Math.round(total),
        shares: [...named, Math.max(0, 1 - named.reduce((sum, share) => sum + share, 0))],
      };
    });
  return { languages, rows };
}

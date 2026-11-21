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

/** One type's count, or every type's when `category` is null. */
function count(counts: Counts, category: Category | null) {
  return category ? (counts[category] ?? 0) : sum(counts);
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

/**
 * Totals, streaks and breakdowns for the selected sources between two dates. A `category` limits
 * everything except `byCategory` to that type, so the type breakdown stays complete.
 */
export function summarize(
  data: ActivityData,
  sourceIds: string[],
  start: string,
  end: string,
  category: Category | null = null,
) {
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
      for (const type of categories) byCategory[type] += counts[type] ?? 0;
      const value = count(counts, category);
      if (!value) continue;
      bySource[id] += value;
      totals.set(date, (totals.get(date) ?? 0) + value);
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

/** Contributions per calendar year for the selected sources and type. */
export function yearTotals(data: ActivityData, sourceIds: string[], category: Category | null) {
  const totals = new Map<number, number>();
  for (const [date, sources] of Object.entries(data.days)) {
    const year = Number(date.slice(0, 4));
    for (const id of sourceIds) {
      if (sources[id]) totals.set(year, (totals.get(year) ?? 0) + count(sources[id], category));
    }
  }
  return totals;
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

/** Variants that read as one language on the chart, so they share a colour and a slot. */
const languageFamilies: Record<string, string> = {
  "Jupyter Notebook": "Python",
  Blade: "PHP",
  HTML: "HTML & CSS",
  CSS: "HTML & CSS",
  SCSS: "HTML & CSS",
  C: "C++",
  CMake: "C++",
  PowerShell: "Shell",
  Batchfile: "Shell",
  PLpgSQL: "SQL",
};

/** Each year's commit share per language, summed over the given sources. */
function sharesByYear(data: ActivityData, sourceIds: string[]) {
  const years: Record<string, Record<string, number>> = {};
  for (const id of sourceIds) {
    for (const [year, shares] of Object.entries(data.languages[id] ?? {})) {
      years[year] ??= {};
      for (const [language, share] of Object.entries(shares)) {
        const name = languageFamilies[language] ?? language;
        years[year][name] = (years[year][name] ?? 0) + share;
      }
    }
  }
  return years;
}

const sumOf = (values: number[]) => values.reduce((total, value) => total + value, 0);

/**
 * The languages the chart names, at most `slots`, ordered by total share (their colour
 * order). A language that made up a tenth of any year gets a slot first, so a year never
 * shows mostly "other". Picked from all sources, so a source filter never repaints a language.
 */
export function chartLanguages(data: ActivityData, slots = 8) {
  const years = Object.values(
    sharesByYear(
      data,
      data.sources.map((source) => source.id),
    ),
  );
  const total: Record<string, number> = {};
  const peak: Record<string, number> = {};
  for (const shares of years) {
    const yearTotal = sumOf(Object.values(shares));
    for (const [language, share] of Object.entries(shares)) {
      total[language] = (total[language] ?? 0) + share;
      peak[language] = Math.max(peak[language] ?? 0, share / yearTotal);
    }
  }
  const byTotal = Object.keys(total).sort((a, b) => total[b] - total[a]);
  const leading = byTotal.filter((language) => peak[language] >= 0.1);
  return [...new Set([...leading, ...byTotal])].slice(0, slots).sort((a, b) => total[b] - total[a]);
}

/**
 * Each year's share per named language for the selected sources, plus "other" with the
 * languages it holds, largest first.
 */
export function languageYears(data: ActivityData, sourceIds: string[], slots = 8) {
  const languages = chartLanguages(data, slots);
  const rows = Object.entries(sharesByYear(data, sourceIds))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, shares]) => {
      const total = sumOf(Object.values(shares));
      const other = Object.entries(shares)
        .filter(([language]) => !languages.includes(language))
        .map(([language, share]) => ({ language, share: share / total }))
        .sort((a, b) => b.share - a.share);
      return {
        year,
        commits: Math.round(total),
        shares: languages.map((language) => (shares[language] ?? 0) / total),
        other,
      };
    });
  return { languages, rows };
}

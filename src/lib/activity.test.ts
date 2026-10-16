import { describe, expect, it } from "vitest";
import activity from "../content/activity.json";
import {
  type ActivityData,
  addDays,
  calendarWeeks,
  categories,
  level,
  summarize,
} from "./activity";

const data: ActivityData = {
  generatedAt: "2026-10-16",
  sources: [
    { id: "github", label: "GitHub", kind: "personal" },
    { id: "work", label: "Work", kind: "work" },
  ],
  days: {
    "2026-10-10": { github: { commits: 2 } },
    "2026-10-11": { github: { commits: 1 }, work: { commits: 3, reviews: 1 } },
    "2026-10-12": { work: { pullRequests: 1 } },
    "2026-10-14": { work: { commits: 8 } },
    "2026-10-15": { github: { issues: 1 } },
  },
};

describe("calendarWeeks", () => {
  it("starts columns on Monday and blanks days outside the range", () => {
    // 2026-10-14 is a Wednesday.
    const weeks = calendarWeeks("2026-10-14", "2026-10-20");
    expect(weeks).toHaveLength(2);
    expect(weeks[0]).toEqual([
      null,
      null,
      "2026-10-14",
      "2026-10-15",
      "2026-10-16",
      "2026-10-17",
      "2026-10-18",
    ]);
    expect(weeks[1].slice(0, 3)).toEqual(["2026-10-19", "2026-10-20", null]);
  });
});

describe("summarize", () => {
  it("adds up the selected sources only", () => {
    const all = summarize(data, ["github", "work"], "2026-10-01", "2026-10-16");
    expect(all.total).toBe(17);
    expect(all.totals.get("2026-10-11")).toBe(5);
    expect(all.byCategory).toMatchObject({ commits: 14, reviews: 1, pullRequests: 1, issues: 1 });
    expect(all.bySource).toEqual({ github: 4, work: 13 });
    expect(all.busiest).toEqual({ date: "2026-10-14", count: 8 });

    expect(summarize(data, ["github"], "2026-10-01", "2026-10-16").total).toBe(4);
  });

  it("counts streaks, keeping today's streak alive before the first contribution", () => {
    const summary = summarize(data, ["github", "work"], "2026-10-01", "2026-10-16");
    expect(summary.longestStreak).toBe(3);
    expect(summary.currentStreak).toBe(2);
    expect(summary.activeDays).toBe(5);
  });

  it("ignores days outside the range", () => {
    expect(summarize(data, ["github", "work"], "2026-10-12", "2026-10-13").total).toBe(1);
  });
});

describe("level", () => {
  it("maps counts to shades by quartile", () => {
    expect(level(0, [1, 2, 5])).toBe(0);
    expect(level(1, [1, 2, 5])).toBe(1);
    expect(level(3, [1, 2, 5])).toBe(3);
    expect(level(50, [1, 2, 5])).toBe(4);
  });
});

describe("activity.json", () => {
  const { generatedAt, sources, days } = activity as ActivityData;
  const ids = new Set(sources.map((source) => source.id));

  it("only holds counts per known source and type", () => {
    for (const [date, day] of Object.entries(days)) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(date <= addDays(generatedAt, 1)).toBe(true);
      for (const [id, counts] of Object.entries(day)) {
        expect(ids).toContain(id);
        for (const [category, count] of Object.entries(counts)) {
          expect(categories).toContain(category);
          expect(Number.isInteger(count) && count > 0).toBe(true);
        }
      }
    }
  });
});

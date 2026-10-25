import type { Locale } from "@/i18n/routing";

/** Formats an ISO month ("2025-02") as "Feb 2025" in English and "02/2025" in Slovak. */
export function formatMonth(isoMonth: string, locale: Locale) {
  const [year, month] = isoMonth.split("-").map(Number);
  // Slovak month names change with the grammatical case ("od februára"), so use numbers there.
  if (locale === "sk") return `${String(month).padStart(2, "0")}/${year}`;
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** Whole months between two ISO months, counting both ends. */
export function monthsBetween(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

/** Length of a period as whole years and the months left over; an open end means this month. */
export function yearsAndMonths(start: string, end?: string) {
  const months = monthsBetween(start, end ?? new Date().toISOString().slice(0, 7));
  return { years: Math.floor(months / 12), months: months % 12 };
}

/** "2 yrs 3 mos", with the unit labels from the "common" messages. */
export function formatDuration(
  start: string,
  end: string | undefined,
  t: (key: "years" | "months", values: { count: number }) => string,
) {
  const { years, months } = yearsAndMonths(start, end);
  return [years ? t("years", { count: years }) : "", months ? t("months", { count: months }) : ""]
    .filter(Boolean)
    .join(" ");
}

export function yearRange(start: number, end?: number) {
  return end && end !== start ? `${start} – ${end}` : `${start}`;
}

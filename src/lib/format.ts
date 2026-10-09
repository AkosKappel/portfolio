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

export function yearRange(start: number, end?: number) {
  return end && end !== start ? `${start} – ${end}` : `${start}`;
}

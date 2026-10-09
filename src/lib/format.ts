const monthFormat = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

/** Formats an ISO month ("2025-02") as "Feb 2025". */
export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-").map(Number);
  return monthFormat.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatPeriod(start: string, end?: string) {
  return `${formatMonth(start)} to ${end ? formatMonth(end) : "now"}`;
}

/** Whole months between two ISO months, counting both ends. */
export function monthsBetween(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

export function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr`);
  if (rest) parts.push(`${rest} mo`);
  return parts.join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import activity from "@/content/activity.json";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  type ActivityData,
  addDays,
  calendarWeeks,
  level,
  shades,
  summarize,
} from "@/lib/activity";

const data = activity as ActivityData;

/** The last 12 months of the activity calendar, for the home page. */
export async function ActivityCard({ locale }: { locale: Locale }) {
  const t = await getTranslations("activity.card");
  const end = data.generatedAt;
  const start = addDays(end, -364);
  const summary = summarize(
    data,
    data.sources.map((source) => source.id),
    start,
    end,
  );
  const weeks = calendarWeeks(start, end);

  return (
    <section
      aria-labelledby="activity"
      className="mt-24 grid gap-8 border-t border-line pt-14 lg:grid-cols-[1fr_2fr]"
    >
      <div>
        <h2 id="activity" className="text-3xl font-semibold sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-muted">
          {t("lead", {
            count: summary.total,
            total: new Intl.NumberFormat(locale).format(summary.total),
          })}
        </p>
        <Link href="/activity" className="mt-4 inline-flex items-center gap-1.5 hover:text-accent">
          {t("link")}
          <ArrowRight aria-hidden size={16} />
        </Link>
      </div>
      <div
        aria-hidden
        className="reveal grid content-center gap-[3px] self-center"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
      >
        {weeks.flatMap((week, column) =>
          week.map((date, weekday) =>
            date ? (
              <span
                key={date}
                className={`aspect-square rounded-[2px] ${shades[level(summary.totals.get(date) ?? 0, summary.thresholds)]}`}
                style={{ gridColumn: column + 1, gridRow: weekday + 1 }}
              />
            ) : null,
          ),
        )}
      </div>
    </section>
  );
}

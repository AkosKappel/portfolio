import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Page, PageHeader } from "@/components/ui/page";
import type { Locale } from "@/i18n/routing";
import { assistantConfig, type EvalRun, modelLabel, passRate } from "@/lib/assistant";
import { alternates } from "@/lib/metadata";

// The weekly eval results come from the Worker (`GET /evals`) and are fetched again once a day.
const EVALS_REVALIDATE_SECONDS = 86_400;

async function loadEvalRuns(): Promise<EvalRun[]> {
  if (!assistantConfig.url) return [];
  try {
    const response = await fetch(`${assistantConfig.url}/evals`, {
      next: { revalidate: EVALS_REVALIDATE_SECONDS },
    });
    if (!response.ok) return [];
    const { runs } = (await response.json()) as { runs?: EvalRun[] };
    return Array.isArray(runs) ? runs : [];
  } catch {
    // Builds without network access, or the Worker down: the page says the results are missing.
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/assistant">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "assistantPage" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/assistant"),
  };
}

export default async function AssistantPage({ params }: PageProps<"/[locale]/assistant">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("assistantPage");
  const format = await getFormatter();
  const runs = await loadEvalRuns();
  const latest = runs.at(-1);
  const date = (value: string) =>
    format.dateTime(new Date(value), { dateStyle: "long", timeZone: "UTC" });

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <div className="grid max-w-3xl gap-12 pb-16 text-lg">
        <section aria-labelledby="flow">
          <h2 id="flow" className="text-2xl font-semibold">
            {t("flowTitle")}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 ps-6">
            {(t.raw("steps") as string[]).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="models">
          <h2 id="models" className="text-2xl font-semibold">
            {t("modelsTitle")}
          </h2>
          <p className="mt-4">{t("modelsText")}</p>
        </section>

        <section aria-labelledby="quality">
          <h2 id="quality" className="text-2xl font-semibold">
            {t("qualityTitle")}
          </h2>
          <p className="mt-4">{t("qualityText")}</p>
          {latest ? (
            <>
              <h3 className="mt-8 font-semibold">{t("latest", { date: date(latest.date) })}</h3>
              <ul className="mt-4 grid gap-5">
                {latest.models.map((result) => {
                  const rate = passRate(result);
                  return (
                    <li key={result.model} className="grid gap-1.5">
                      <div className="flex items-baseline justify-between gap-4 text-base">
                        <span className="font-medium">{modelLabel(result.model)}</span>
                        <span className="tabular-nums">
                          {rate === undefined ? "–" : `${rate} %`}
                        </span>
                      </div>
                      {/* The bar repeats the number next to it, so it is hidden from screen readers. */}
                      <div aria-hidden className="h-2 rounded-full bg-line/60">
                        <div
                          className="h-2 rounded-full bg-accent"
                          style={{ width: `${rate ?? 0}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted">
                        {t("passed", { passed: result.passed, answered: result.answered })}
                        {result.errors ? ` · ${t("notAnswered", { count: result.errors })}` : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <details className="mt-6 text-base">
                <summary className="cursor-pointer font-medium">{t("history")}</summary>
                <table className="mt-3 w-full text-left text-sm">
                  <thead className="text-muted">
                    <tr>
                      <th scope="col" className="py-1.5 pe-4 font-medium">
                        {t("date")}
                      </th>
                      <th scope="col" className="py-1.5 pe-4 font-medium">
                        {t("model")}
                      </th>
                      <th scope="col" className="py-1.5 font-medium">
                        {t("correct")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...runs].reverse().flatMap((run) =>
                      run.models.map((result) => (
                        <tr key={`${run.date}-${result.model}`} className="border-t border-line">
                          <td className="py-1.5 pe-4 whitespace-nowrap">{date(run.date)}</td>
                          <td className="py-1.5 pe-4">{modelLabel(result.model)}</td>
                          <td className="py-1.5 tabular-nums">
                            {result.passed}/{result.answered}
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </details>
            </>
          ) : (
            <p className="mt-4 text-muted">{t("unavailable")}</p>
          )}
        </section>

        <section aria-labelledby="privacy">
          <h2 id="privacy" className="text-2xl font-semibold">
            {t("privacyTitle")}
          </h2>
          <p className="mt-4">{t("privacyText")}</p>
        </section>

        <section aria-labelledby="built">
          <h2 id="built" className="text-2xl font-semibold">
            {t("builtTitle")}
          </h2>
          <p className="mt-4">{t("builtText")}</p>
        </section>
      </div>
    </Page>
  );
}

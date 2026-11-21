import { projects } from "../content/projects";

export type DemoStatus = "up" | "down";

/**
 * A demo counts as up when it answers below 500. Cloudflare answers 502 or 530 when the
 * home server or its tunnel is off, and a hung server runs into the timeout.
 */
export async function checkDemo(url: string, fetcher: typeof fetch = fetch): Promise<DemoStatus> {
  try {
    const response = await fetcher(url, {
      method: "HEAD",
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    return response.status < 500 ? "up" : "down";
  } catch {
    return "down";
  }
}

/** Status of every demo that runs on the home server, keyed by project slug. */
export async function checkDemos(fetcher: typeof fetch = fetch) {
  const demos = projects.flatMap((project) =>
    project.selfHosted && project.liveUrl ? [{ slug: project.slug, url: project.liveUrl }] : [],
  );
  const results = await Promise.all(
    demos.map(async ({ slug, url }) => [slug, await checkDemo(url, fetcher)] as const),
  );
  return Object.fromEntries(results) as Record<string, DemoStatus>;
}

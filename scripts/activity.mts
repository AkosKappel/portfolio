/**
 * Collects daily contribution counts from GitHub, GitLab instances and local clones into
 * src/content/activity.json. The file is public, so it holds only counts per day, source and
 * type: never repository, project or issue names.
 *
 * Tokens come from .env.local: GITHUB_TOKEN (falls back to the gh CLI login), GITLAB_TOKEN and
 * IGT_GITLAB_TOKEN (read_api scope). A collector without its token is skipped; a source whose
 * collector fails keeps its previous data, so old jobs without access stay in the history.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { ActivityData, ActivitySource, Category, Counts } from "../src/lib/activity";

type Collector =
  | { type: "github" }
  /** `commits: false` when local clones count the commits more precisely than pushes do. */
  | { type: "gitlab"; host: string; tokenEnv: string; commits?: boolean }
  | { type: "git"; path: string };

/** Source ids match the job ids on the experience page. */
const sources: (ActivitySource & { collectors: Collector[] })[] = [
  { id: "github", label: "GitHub", kind: "personal", collectors: [{ type: "github" }] },
  {
    id: "gitlab",
    label: "GitLab",
    kind: "personal",
    collectors: [{ type: "gitlab", host: "gitlab.com", tokenEnv: "GITLAB_TOKEN" }],
  },
  {
    id: "igt-systems",
    label: "IGT Systems",
    kind: "work",
    collectors: [
      { type: "git", path: "../IGT-systems" },
      {
        type: "gitlab",
        host: "gitlab.igtconsulting.eu",
        tokenEnv: "IGT_GITLAB_TOKEN",
        commits: false,
      },
    ],
  },
  { id: "svarba", label: "Švarba", kind: "work", collectors: [{ type: "git", path: "../Svarba" }] },
  {
    id: "softpoint",
    label: "SoftPoint",
    kind: "work",
    collectors: [{ type: "git", path: "../SoftPoint" }],
  },
];

/** Matches my name and every e-mail address I committed with. */
const author = "kappel";
const output = "src/content/activity.json";
const today = new Date().toISOString().slice(0, 10);

type Days = Record<string, Counts>;
/** `since` is the first day the collector can see; older days are kept from the last run. */
type Collected = { days: Days; since?: string };

function add(days: Days, date: string, category: Category, count = 1) {
  if (count <= 0) return;
  days[date] ??= {};
  days[date][category] = (days[date][category] ?? 0) + count;
}

const localDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bratislava" });

async function github(): Promise<Collected> {
  const token =
    process.env.GITHUB_TOKEN ?? execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  async function query(text: string, variables: Record<string, unknown> = {}) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      body: JSON.stringify({ query: text, variables }),
    });
    const body = await response.json();
    if (!response.ok || body.errors) throw new Error(`GitHub: ${JSON.stringify(body.errors)}`);
    return body.data.viewer;
  }

  const days: Days = {};
  const totals: Record<string, number> = {};
  const { createdAt } = await query("{ viewer { createdAt } }");
  for (let year = Number(createdAt.slice(0, 4)); year <= Number(today.slice(0, 4)); year++) {
    // A contributions collection spans at most one year.
    const range = { from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` };
    const calendar = await query(
      `query($from: DateTime!, $to: DateTime!) { viewer { contributionsCollection(from: $from, to: $to) {
        contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`,
      range,
    );
    for (const week of calendar.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) totals[day.date] = day.contributionCount;
    }

    const typed = [
      ["pullRequestContributions", "pullRequests"],
      ["pullRequestReviewContributions", "reviews"],
      ["issueContributions", "issues"],
      ["repositoryContributions", "other"],
    ] as const;
    for (const [field, category] of typed) {
      let after: string | null = null;
      do {
        const page = await query(
          `query($from: DateTime!, $to: DateTime!, $after: String) { viewer {
            contributionsCollection(from: $from, to: $to) { ${field}(first: 100, after: $after) {
              nodes { occurredAt } pageInfo { hasNextPage endCursor } } } } }`,
          { ...range, after },
        );
        const { nodes, pageInfo } = page.contributionsCollection[field];
        // The calendar counts in UTC days, so these do too.
        for (const node of nodes) add(days, node.occurredAt.slice(0, 10), category);
        after = pageInfo.hasNextPage ? pageInfo.endCursor : null;
      } while (after);
    }
  }

  // The calendar total covers every type; what the typed lists don't explain is commits.
  for (const [date, total] of Object.entries(totals)) {
    const typed = Object.values(days[date] ?? {}).reduce((sum, count) => sum + count, 0);
    add(days, date, "commits", total - typed);
  }
  return { days };
}

function gitlabCategory(event: {
  action_name: string;
  target_type: string | null;
}): Category | null {
  const { action_name: action, target_type: target } = event;
  // Membership changes and deleted branches are not contributions, as on GitLab's own calendar.
  if (["joined", "left", "expired", "deleted", "destroyed"].includes(action)) return null;
  if (target === "MergeRequest") {
    if (action === "opened") return "pullRequests";
    if (action === "approved") return "reviews";
  }
  if ((target === "Issue" || target === "WorkItem") && action === "opened") return "issues";
  if (action === "commented on") return "comments";
  return "other";
}

async function gitlab({
  host,
  tokenEnv,
  commits = true,
}: Extract<Collector, { type: "gitlab" }>): Promise<Collected | null> {
  const token = process.env[tokenEnv];
  if (!token) {
    console.warn(`${host}: skipped, ${tokenEnv} is not set`);
    return null;
  }
  // GitLab keeps events for three years.
  const since = new Date(Date.now() - 3 * 365 * 86_400_000).toISOString().slice(0, 10);
  const days: Days = {};
  let page = "1";
  while (page) {
    const response = await fetch(
      `https://${host}/api/v4/events?after=${since}&per_page=100&page=${page}`,
      { headers: { "PRIVATE-TOKEN": token } },
    );
    if (!response.ok) throw new Error(`${host}: ${response.status} ${response.statusText}`);
    for (const event of await response.json()) {
      const date = localDate.format(new Date(event.created_at));
      if (event.action_name.startsWith("pushed")) {
        if (commits) add(days, date, "commits", event.push_data?.commit_count ?? 0);
        continue;
      }
      const category = gitlabCategory(event);
      if (category) add(days, date, category);
    }
    page = response.headers.get("x-next-page") ?? "";
  }
  return { days, since };
}

function repositories(dir: string, depth = 3): string[] {
  if (existsSync(join(dir, ".git"))) return [dir];
  if (depth === 0) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .flatMap((entry) => repositories(join(dir, entry.name), depth - 1));
}

function git({ path }: Extract<Collector, { type: "git" }>): Collected {
  const root = resolve(path);
  if (!existsSync(root)) throw new Error(`${root} does not exist`);
  const days: Days = {};
  // A commit can live in several clones, and a rebase copies it under a new hash but keeps its
  // author time and subject; count it once.
  const seen = new Set<string>();
  for (const repository of repositories(root)) {
    const log = execFileSync(
      "git",
      [
        "-C",
        repository,
        "log",
        "--all",
        "--no-merges",
        "-i",
        `--author=${author}`,
        "--format=%as %at %s",
      ],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    );
    for (const line of log.split("\n").filter(Boolean)) {
      const date = line.slice(0, 10);
      if (seen.has(line)) continue;
      seen.add(line);
      add(days, date, "commits");
    }
  }
  return { days };
}

function collect(collector: Collector) {
  if (collector.type === "github") return github();
  if (collector.type === "gitlab") return gitlab(collector);
  return git(collector);
}

const previous: ActivityData = existsSync(output)
  ? JSON.parse(readFileSync(output, "utf8"))
  : { generatedAt: today, sources: [], days: {} };
const days: ActivityData["days"] = {};
function countsOf(date: string, sourceId: string) {
  days[date] ??= {};
  days[date][sourceId] ??= {};
  return days[date][sourceId];
}

for (const { collectors, ...source } of sources) {
  const keepPrevious = (before: string) => {
    for (const [date, day] of Object.entries(previous.days)) {
      if (day[source.id] && date < before) Object.assign(countsOf(date, source.id), day[source.id]);
    }
  };
  try {
    const results = (await Promise.all(collectors.map(collect))).filter(
      (result) => result !== null,
    );
    if (!results.length) {
      keepPrevious(today);
      continue;
    }
    let total = 0;
    // Collectors of one source cover different types, so their counts add up.
    for (const result of results) {
      for (const [date, counts] of Object.entries(result.days)) {
        const target = countsOf(date, source.id);
        for (const [category, count] of Object.entries(counts) as [Category, number][]) {
          target[category] = (target[category] ?? 0) + count;
          total += count;
        }
      }
    }
    keepPrevious(results.map((result) => result.since ?? "").sort()[0]);
    console.log(`${source.label}: ${total} contributions collected`);
  } catch (error) {
    console.warn(`${source.label}: kept previous data (${(error as Error).message})`);
    process.exitCode = 1;
    keepPrevious(today);
  }
}

const used = sources
  .filter((source) => Object.values(days).some((day) => day[source.id]))
  .map(({ id, label, kind }) => ({ id, label, kind }));
const dates = Object.keys(days).sort();
// One line per day keeps the diff of each refresh readable.
writeFileSync(
  output,
  `{
  "generatedAt": "${today}",
  "sources": ${JSON.stringify(used)},
  "days": {
${dates.map((date) => `    "${date}": ${JSON.stringify(days[date])}`).join(",\n")}
  }
}
`,
);
console.log(`Wrote ${dates.length} active days to ${output}`);

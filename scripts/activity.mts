/**
 * Collects daily contribution counts from GitHub, GitLab instances and local clones into
 * src/content/activity.json, plus when commits happen (weekday and hour) and which languages
 * they touch per year. The file is public, so it holds only counts: never repository, project
 * or issue names.
 *
 * Tokens come from .env.local: GITHUB_TOKEN (falls back to the gh CLI login), GITLAB_TOKEN and
 * IGT_GITLAB_TOKEN (read_api scope). A collector without its token is skipped; a source whose
 * collector fails keeps its previous data, so old jobs without access stay in the history. The
 * same goes for a missing clone folder, which lets CI refresh the personal sources alone.
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
type Languages = ActivityData["languages"][string];
/** `since` is the first day the collector can see; older days are kept from the last run. */
type Collected = { days: Days; since?: string; hours?: number[][]; languages?: Languages };

function add(days: Days, date: string, category: Category, count = 1) {
  if (count <= 0) return;
  days[date] ??= {};
  days[date][category] = (days[date][category] ?? 0) + count;
}

const timeZone = "Europe/Bratislava";
const localDate = new Intl.DateTimeFormat("en-CA", { timeZone });
const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone,
  year: "numeric",
  weekday: "short",
  hour: "2-digit",
  hourCycle: "h23",
});
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Adds a commit to the weekday and hour grid and splits one unit across its languages. */
function addCommit(result: Collected, time: Date, languages: Record<string, number>) {
  const parts = Object.fromEntries(
    clock.formatToParts(time).map((part) => [part.type, part.value]),
  );
  result.hours ??= weekdays.map(() => Array(24).fill(0));
  result.hours[weekdays.indexOf(parts.weekday)][Number(parts.hour)]++;
  const total = Object.values(languages).reduce((sum, size) => sum + size, 0);
  if (!total) return;
  result.languages ??= {};
  result.languages[parts.year] ??= {};
  const year = result.languages[parts.year];
  for (const [language, size] of Object.entries(languages)) {
    year[language] = (year[language] ?? 0) + size / total;
  }
}

/** `fetch` that retries dropped connections, which long paginated runs hit now and then. */
async function request(url: string, init?: RequestInit, attempts = 3): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (error) {
    if (attempts <= 1) throw error;
    await new Promise((done) => setTimeout(done, 2000));
    return request(url, init, attempts - 1);
  }
}

/** File extensions to GitHub's language names, so local clones and GitHub agree. */
const extensions: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TypeScript",
  mts: "TypeScript",
  js: "JavaScript",
  jsx: "JavaScript",
  mjs: "JavaScript",
  cjs: "JavaScript",
  ex: "Elixir",
  exs: "Elixir",
  heex: "Elixir",
  kt: "Kotlin",
  kts: "Kotlin",
  java: "Java",
  py: "Python",
  ipynb: "Jupyter Notebook",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  vue: "Vue",
  svelte: "Svelte",
  php: "PHP",
  dart: "Dart",
  swift: "Swift",
  go: "Go",
  rs: "Rust",
  c: "C",
  h: "C",
  cpp: "C++",
  cs: "C#",
  sh: "Shell",
  tex: "TeX",
};

async function github(): Promise<Collected> {
  const token =
    process.env.GITHUB_TOKEN || execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  async function query(text: string, variables: Record<string, unknown> = {}) {
    const response = await request("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      body: JSON.stringify({ query: text, variables }),
    });
    const body = await response.json();
    if (!response.ok || body.errors) throw new Error(`GitHub: ${JSON.stringify(body.errors)}`);
    return body.data;
  }

  const result: Collected = { days: {} };
  const days = result.days;
  const totals: Record<string, number> = {};
  /** Repositories with my commits, and their language sizes in bytes. */
  const languagesByRepository = new Map<string, Record<string, number>>();
  const {
    viewer: { id, createdAt },
  } = await query("{ viewer { id createdAt } }");
  for (let year = Number(createdAt.slice(0, 4)); year <= Number(today.slice(0, 4)); year++) {
    // A contributions collection spans at most one year.
    const range = { from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` };
    const { viewer: calendar } = await query(
      `query($from: DateTime!, $to: DateTime!) { viewer { contributionsCollection(from: $from, to: $to) {
        contributionCalendar { weeks { contributionDays { date contributionCount } } }
        commitContributionsByRepository(maxRepositories: 100) { repository { nameWithOwner
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name } } } } } } } }`,
      range,
    );
    for (const week of calendar.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) totals[day.date] = day.contributionCount;
    }
    for (const { repository } of calendar.contributionsCollection.commitContributionsByRepository) {
      languagesByRepository.set(
        repository.nameWithOwner,
        Object.fromEntries(
          repository.languages.edges.map((edge: { size: number; node: { name: string } }) => [
            edge.node.name,
            edge.size,
          ]),
        ),
      );
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
        const { viewer: page } = await query(
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

  // Commit times come from the default branch of each repository, where GitHub counts commits too.
  // A commit's languages are the repository's, weighted by size.
  for (const [nameWithOwner, languages] of languagesByRepository) {
    const [owner, name] = nameWithOwner.split("/");
    let after: string | null = null;
    do {
      const { repository } = await query(
        `query($owner: String!, $name: String!, $author: ID!, $after: String) {
          repository(owner: $owner, name: $name) { defaultBranchRef { target { ... on Commit {
            history(first: 100, after: $after, author: { id: $author }) {
              nodes { authoredDate } pageInfo { hasNextPage endCursor } } } } } } }`,
        { owner, name, author: id, after },
      );
      const history = repository?.defaultBranchRef?.target?.history;
      for (const node of history?.nodes ?? []) {
        addCommit(result, new Date(node.authoredDate), languages);
      }
      after = history?.pageInfo.hasNextPage ? history.pageInfo.endCursor : null;
    } while (after);
  }
  return result;
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
    const response = await request(
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

function git({ path }: Extract<Collector, { type: "git" }>): Collected | null {
  const root = resolve(path);
  if (!existsSync(root)) {
    console.warn(`${path}: skipped, the folder does not exist`);
    return null;
  }
  const result: Collected = { days: {} };
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
        "--format=%x00%at %s",
        "--numstat",
      ],
      { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 },
    );
    for (const commit of log.split("\0").slice(1)) {
      const [header, ...files] = commit.split("\n");
      if (seen.has(header)) continue;
      seen.add(header);
      const time = new Date(Number(header.slice(0, header.indexOf(" "))) * 1000);
      add(result.days, localDate.format(time), "commits");
      // Lines changed per language; binary files show "-" and are left out.
      const languages: Record<string, number> = {};
      for (const file of files) {
        const [added, deleted, filePath] = file.split("\t");
        const language = extensions[filePath?.split(".").pop()?.toLowerCase() ?? ""];
        if (language && added !== "-") {
          languages[language] = (languages[language] ?? 0) + Number(added) + Number(deleted);
        }
      }
      addCommit(result, time, languages);
    }
  }
  return result;
}

function collect(collector: Collector) {
  if (collector.type === "github") return github();
  if (collector.type === "gitlab") return gitlab(collector);
  return git(collector);
}

const previous: ActivityData = existsSync(output)
  ? JSON.parse(readFileSync(output, "utf8"))
  : { generatedAt: today, sources: [], days: {}, hours: {}, languages: {} };
const days: ActivityData["days"] = {};
const hours: ActivityData["hours"] = {};
const languages: ActivityData["languages"] = {};
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
  const keepEverything = () => {
    keepPrevious(today);
    if (previous.hours?.[source.id]) hours[source.id] = previous.hours[source.id];
    if (previous.languages?.[source.id]) languages[source.id] = previous.languages[source.id];
  };
  try {
    const results = (await Promise.all(collectors.map(collect))).filter(
      (result) => result !== null,
    );
    if (!results.length) {
      keepEverything();
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
      if (result.hours) {
        hours[source.id] ??= weekdays.map(() => Array(24).fill(0));
        result.hours.forEach((row, weekday) => {
          row.forEach((count, hour) => {
            hours[source.id][weekday][hour] += count;
          });
        });
      }
      for (const [year, shares] of Object.entries(result.languages ?? {})) {
        languages[source.id] ??= {};
        languages[source.id][year] ??= {};
        for (const [language, share] of Object.entries(shares)) {
          const target = languages[source.id][year];
          target[language] = Math.round(((target[language] ?? 0) + share) * 100) / 100;
        }
      }
    }
    keepPrevious(results.map((result) => result.since ?? "").sort()[0]);
    console.log(`${source.label}: ${total} contributions collected`);
  } catch (error) {
    console.warn(`${source.label}: kept previous data (${(error as Error).message})`);
    process.exitCode = 1;
    keepEverything();
  }
}

const used = sources
  .filter((source) => Object.values(days).some((day) => day[source.id]))
  .map(({ id, label, kind }) => ({ id, label, kind }));
const dates = Object.keys(days).sort();
const lines = (record: Record<string, unknown>) =>
  Object.entries(record)
    .map(([key, value]) => `    "${key}": ${JSON.stringify(value)}`)
    .join(",\n");
// One line per day or source keeps the diff of each refresh readable.
writeFileSync(
  output,
  `{
  "generatedAt": "${today}",
  "sources": ${JSON.stringify(used)},
  "days": {
${lines(Object.fromEntries(dates.map((date) => [date, days[date]])))}
  },
  "hours": {
${lines(hours)}
  },
  "languages": {
${lines(languages)}
  }
}
`,
);
console.log(`Wrote ${dates.length} active days to ${output}`);

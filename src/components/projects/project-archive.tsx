"use client";

import { rankItem, rankings } from "@tanstack/match-sorter-utils";
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createSortedRowModel,
  type FilterFn,
  filterFn_equalsString,
  functionalUpdate,
  globalFilteringFeature,
  rowSortingFeature,
  type SortingState,
  sortFn_alphanumeric,
  sortFn_basic,
  tableFeatures,
  type Updater,
  useTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Brain,
  Gamepad2,
  Globe,
  LayoutGrid,
  type LucideIcon,
  Rows3,
  Search,
  Server,
  Shapes,
  Trophy,
  X,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useId, useMemo } from "react";
import { StackList } from "@/components/ui/tech-badge";
import { type Project, type ProjectArea, pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ProjectCard, projectYears } from "./project-card";

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { equalsString: filterFn_equalsString },
  sortFns: { alphanumeric: sortFn_alphanumeric, basic: sortFn_basic },
});

type Features = typeof features;

/**
 * Ranks each field on its own so a loose match in a long summary cannot win:
 * titles and technologies allow missing letters ("kotln" finds Kotlin),
 * the summary only matches whole substrings.
 */
function fuzzyFilter(locale: Locale): FilterFn<Features, Project> {
  return (row, _columnId, value: string) =>
    rankItem(row.original, value, {
      accessors: [
        (project) => project.title,
        (project) => project.stack,
        { accessor: (project) => pick(project.summary, locale), threshold: rankings.CONTAINS },
      ],
    }).passed;
}

const helper = createColumnHelper<Features, Project>();
// Headers are message keys in "projects.columns".
const columns = helper.columns([
  helper.accessor("title", { header: "title", sortFn: "alphanumeric" }),
  helper.accessor("year", { header: "year", sortFn: "basic", sortDescFirst: true }),
  helper.accessor("area", { header: "area", filterFn: "equalsString", enableSorting: false }),
  helper.accessor("kind", { header: "kind", enableSorting: false }),
  // Target column for the global search; the filter ranks the project's fields itself.
  helper.accessor((project) => project.title, { id: "search", header: "search" }),
]);

const areas: { value: ProjectArea | ""; Icon: LucideIcon }[] = [
  { value: "", Icon: Shapes },
  { value: "web", Icon: Globe },
  { value: "ai", Icon: Brain },
  { value: "infrastructure", Icon: Server },
  { value: "games", Icon: Gamepad2 },
  { value: "challenges", Icon: Trophy },
];
const sortOptions = [
  { value: "", key: "recommended" },
  { value: "year-desc", key: "newest" },
  { value: "year-asc", key: "oldest" },
  { value: "title-asc", key: "name" },
] as const;

function toSorting(value: string | null): SortingState {
  const [id, direction] = (value ?? "").split("-");
  return id && direction ? [{ id, desc: direction === "desc" }] : [];
}

function fromSorting(sorting: SortingState) {
  const [first] = sorting;
  return first ? `${first.id}-${first.desc ? "desc" : "asc"}` : "";
}

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  // The real browser path (with the locale prefix), for history updates.
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();
  const globalFilterFn = useMemo(() => fuzzyFilter(locale), [locale]);

  const query = searchParams.get("q") ?? "";
  const area = searchParams.get("area") ?? "";
  const view = searchParams.get("view") === "table" ? "table" : "grid";
  const sorting = toSorting(searchParams.get("sort"));

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    const search = params.toString();
    // Native history updates keep useSearchParams in sync without a server round trip.
    window.history.replaceState(null, "", search ? `${pathname}?${search}` : pathname);
  };

  const table = useTable({
    features,
    columns,
    data: projects,
    state: {
      globalFilter: query,
      columnFilters: area ? [{ id: "area", value: area }] : [],
      sorting,
    },
    onSortingChange: (updater: Updater<SortingState>) =>
      setParam("sort", fromSorting(functionalUpdate(updater, sorting))),
    globalFilterFn,
    getColumnCanGlobalFilter: (column) => column.id === "search",
  });

  const rows = table.getRowModel().rows;
  const filtered = Boolean(query || area);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center">
        <div className="relative lg:w-72">
          <label htmlFor={searchId} className="sr-only">
            {t("searchLabel")}
          </label>
          <Search
            aria-hidden
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setParam("q", event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-line bg-surface py-2 pr-4 pl-10 placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <fieldset className="flex flex-wrap gap-1.5">
          <legend className="sr-only">{t("area")}</legend>
          {areas.map(({ value, Icon }) => (
            <button
              key={value || "all"}
              type="button"
              aria-pressed={area === value}
              onClick={() => setParam("area", value)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
            >
              <Icon aria-hidden size={15} />
              {value ? t(`areas.${value}`) : t("all")}
            </button>
          ))}
        </fieldset>
        <div className="flex items-center gap-2 lg:ml-auto">
          <label className="flex items-center gap-2 text-sm text-muted">
            {t("sort")}
            <select
              value={fromSorting(sorting)}
              onChange={(event) => setParam("sort", event.target.value)}
              className="rounded-md border border-line bg-surface px-2 py-1.5 text-ink"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(`sortOptions.${option.key}`)}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="flex rounded-full border border-line p-0.5">
            <legend className="sr-only">{t("view")}</legend>
            <ViewButton
              active={view === "grid"}
              label={t("gridView")}
              onClick={() => setParam("view", "")}
            >
              <LayoutGrid aria-hidden size={16} />
            </ViewButton>
            <ViewButton
              active={view === "table"}
              label={t("tableView")}
              onClick={() => setParam("view", "table")}
            >
              <Rows3 aria-hidden size={16} />
            </ViewButton>
          </fieldset>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {rows.length === projects.length
          ? t("count", { count: projects.length })
          : t("countFiltered", { count: rows.length, total: projects.length })}
        {filtered ? (
          <button
            type="button"
            onClick={() => window.history.replaceState(null, "", pathname)}
            className="ml-3 inline-flex items-center gap-1 text-ink hover:text-accent"
          >
            <X aria-hidden size={14} />
            {t("clearFilters")}
          </button>
        ) : null}
      </p>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold">{t("emptyTitle")}</p>
          <p className="mt-2 text-muted">{t("emptyText")}</p>
        </div>
      ) : view === "grid" ? (
        <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <li key={row.original.slug}>
              <ProjectCard project={row.original} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left">
            <caption className="sr-only">{t("tableCaption")}</caption>
            <thead className="border-b border-line text-sm text-muted">
              <tr>
                {table
                  .getHeaderGroups()[0]
                  .headers.filter((header) => header.column.id !== "search")
                  .map((header) => {
                    const sorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className="py-3 pr-4 font-medium"
                        aria-sort={
                          sorted ? (sorted === "desc" ? "descending" : "ascending") : undefined
                        }
                      >
                        {header.column.getCanSort() ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1 hover:text-ink"
                          >
                            {t(`columns.${header.column.id as "title" | "year"}`)}
                            {sorted === "asc" ? <ArrowUp aria-hidden size={14} /> : null}
                            {sorted === "desc" ? <ArrowDown aria-hidden size={14} /> : null}
                          </button>
                        ) : (
                          t(`columns.${header.column.id as "area" | "kind"}`)
                        )}
                      </th>
                    );
                  })}
                <th scope="col" className="py-3 font-medium">
                  {t("columns.stack")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ original: project }) => (
                <tr key={project.slug} className="border-b border-line align-top">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                      {project.title}
                    </Link>
                  </th>
                  <td className="py-3 pr-4 whitespace-nowrap text-muted">
                    {projectYears(project)}
                  </td>
                  <td className="py-3 pr-4 text-muted">{t(`areas.${project.area}`)}</td>
                  <td className="py-3 pr-4 text-muted">{t(`kinds.${project.kind}`)}</td>
                  <td className="py-3">
                    <StackList items={project.stack} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ViewButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className="grid size-8 place-items-center rounded-full text-muted aria-pressed:bg-accent aria-pressed:text-on-accent"
    >
      {children}
    </button>
  );
}

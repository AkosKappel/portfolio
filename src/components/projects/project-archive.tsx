"use client";

import { rankItem } from "@tanstack/match-sorter-utils";
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
import { LayoutGrid, Rows3, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useId } from "react";
import { StackList } from "@/components/ui/page";
import type { Project, ProjectArea } from "@/content/types";
import { ProjectCard, projectDate } from "./project-card";

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

/** Typo-tolerant match over title, summary and stack ("pythn" still finds Python). */
const fuzzyFilter: FilterFn<Features, Project> = (row, columnId, value: string) =>
  rankItem(row.getValue(columnId), value).passed;

const helper = createColumnHelper<Features, Project>();
const columns = helper.columns([
  helper.accessor("title", { header: "Project", sortFn: "alphanumeric" }),
  helper.accessor("year", { header: "Year", sortFn: "basic", sortDescFirst: true }),
  helper.accessor("area", { header: "Area", filterFn: "equalsString", enableSorting: false }),
  helper.accessor("kind", { header: "Type", enableSorting: false }),
  helper.accessor((project) => [project.title, project.summary, ...project.stack].join(" "), {
    id: "search",
    header: "Search",
  }),
]);

const areas: ProjectArea[] = ["Web", "AI", "Infrastructure", "Games", "Challenges"];
const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "year-desc", label: "Newest" },
  { value: "year-asc", label: "Oldest" },
  { value: "title-asc", label: "Name" },
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();

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
    globalFilterFn: fuzzyFilter,
    getColumnCanGlobalFilter: (column) => column.id === "search",
  });

  const rows = table.getRowModel().rows;
  const filtered = Boolean(query || area);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center">
        <div className="relative lg:w-72">
          <label htmlFor={searchId} className="sr-only">
            Search projects
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
            placeholder="Search by name or technology"
            className="w-full rounded-full border border-line bg-surface py-2 pr-4 pl-10 placeholder:text-muted focus:border-clean focus:outline-none"
          />
        </div>
        <fieldset className="flex flex-wrap gap-1.5">
          <legend className="sr-only">Area</legend>
          {["", ...areas].map((value) => (
            <button
              key={value || "all"}
              type="button"
              aria-pressed={area === value}
              onClick={() => setParam("area", value)}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {value || "All"}
            </button>
          ))}
        </fieldset>
        <div className="flex items-center gap-2 lg:ml-auto">
          <label className="flex items-center gap-2 text-sm text-muted">
            Sort
            <select
              value={fromSorting(sorting)}
              onChange={(event) => setParam("sort", event.target.value)}
              className="rounded-md border border-line bg-surface px-2 py-1.5 text-ink"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="flex rounded-full border border-line p-0.5">
            <legend className="sr-only">View</legend>
            <ViewButton
              active={view === "grid"}
              label="Grid view"
              onClick={() => setParam("view", "")}
            >
              <LayoutGrid aria-hidden size={16} />
            </ViewButton>
            <ViewButton
              active={view === "table"}
              label="Table view"
              onClick={() => setParam("view", "table")}
            >
              <Rows3 aria-hidden size={16} />
            </ViewButton>
          </fieldset>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {rows.length === projects.length
          ? `${projects.length} projects`
          : `${rows.length} of ${projects.length} projects`}
        {filtered ? (
          <button
            type="button"
            onClick={() => window.history.replaceState(null, "", pathname)}
            className="ml-3 inline-flex items-center gap-1 text-ink hover:text-clean"
          >
            <X aria-hidden size={14} />
            Clear filters
          </button>
        ) : null}
      </p>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold">No projects match these filters</p>
          <p className="mt-2 text-muted">
            Try another technology, or clear the filters to see everything.
          </p>
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
            <caption className="sr-only">Projects, sortable by name and year</caption>
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
                            {String(header.column.columnDef.header)}
                            <span aria-hidden>
                              {sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : ""}
                            </span>
                          </button>
                        ) : (
                          String(header.column.columnDef.header)
                        )}
                      </th>
                    );
                  })}
                <th scope="col" className="py-3 font-medium">
                  Stack
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ original: project }) => (
                <tr key={project.slug} className="border-b border-line align-top">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    <Link href={`/projects/${project.slug}`} className="hover:text-clean">
                      {project.title}
                    </Link>
                  </th>
                  <td className="py-3 pr-4 whitespace-nowrap text-muted">{projectDate(project)}</td>
                  <td className="py-3 pr-4 text-muted">{project.area}</td>
                  <td className="py-3 pr-4 text-muted">{project.kind}</td>
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
      className="grid size-8 place-items-center rounded-full text-muted aria-pressed:bg-ink aria-pressed:text-paper"
    >
      {children}
    </button>
  );
}

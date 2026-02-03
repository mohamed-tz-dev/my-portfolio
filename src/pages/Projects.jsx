import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ArrowUpDown, X } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const FILTERS = ["all", "frontend", "backend", "ui", "api", "devops"];
const SORTS = [
  { id: "new", label: "Newest" },
  { id: "az", label: "A → Z" }
];

export default function Projects() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.stack || []).join(" ").toLowerCase().includes(q);

      const matchesFilter = filter === "all" || (p.tags || []).includes(filter);

      return matchesQuery && matchesFilter;
    });

    // sort
    if (sort === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // "new": if no dates, keep original order (assumed newest first)
      list = [...list];
    }

    return list;
  }, [query, filter, sort]);

  const clearQuery = () => setQuery("");

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="opacity-80 max-w-2xl">
          Tafuta kwa jina/stack, chagua category, na panga list. Hii ni interaction ya “real product”.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-4 md:p-5 space-y-4
                      bg-white/60 dark:bg-zinc-950/40 backdrop-blur">
        {/* Search + Sort */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-2xl border bg-transparent pl-10 pr-10 py-2
                         border-zinc-200/70 dark:border-zinc-800/70
                         focus:outline-none focus:ring-2 focus:ring-zinc-300/60 dark:focus:ring-zinc-700/60"
            />
            {query ? (
              <button
                onClick={clearQuery}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2
                           hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
                aria-label="Clear search"
                title="Clear"
              >
                <X size={16} className="opacity-70" />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm
                            border-zinc-200/70 dark:border-zinc-800/70 opacity-80">
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">Sort</span>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-2xl border bg-transparent px-3 py-2 text-sm
                         border-zinc-200/70 dark:border-zinc-800/70"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  "px-3 py-2 rounded-2xl border text-sm transition",
                  "border-zinc-200/70 dark:border-zinc-800/70",
                  active
                    ? "bg-zinc-100/80 dark:bg-zinc-900/70 font-semibold"
                    : "opacity-80 hover:opacity-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
                ].join(" ")}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              exit={reduce ? false : { opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 opacity-80">
            No projects found. Try another keyword or filter.
          </div>
        ) : null}
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { projects } from "../data/projects";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const FILTERS = ["all", "frontend", "backend", "ui", "api", "devops"];

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-2xl border text-sm transition",
        "border-slate-200/80 dark:border-slate-800/80",
        active
          ? "bg-indigo-600/10 text-indigo-700 dark:text-indigo-200 dark:bg-indigo-400/10 font-semibold"
          : "text-slate-700 dark:text-slate-200 opacity-90 hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return (projects || []).filter((p) => {
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const matchesQuery = !q || title.includes(q) || desc.includes(q);
      const matchesFilter = filter === "all" || (p.tags || []).includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="opacity-80 max-w-2xl">
          A focused list of projects with clear descriptions and progress.
        </p>
      </header>

      {/* Controls */}
      <div className="space-y-4">
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-2xl border bg-transparent pl-10 pr-10 py-2
                       border-slate-200/80 dark:border-slate-800/80
                       focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2
                         hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
              aria-label="Clear"
            >
              <X size={16} className="opacity-70" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Chip key={f} active={f === filter} onClick={() => setFilter(f)}>
              {f}
            </Chip>
          ))}
          {(filter !== "all" || query) ? (
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="px-3 py-2 rounded-2xl border text-sm opacity-80 hover:opacity-100 transition
                         border-slate-200/80 dark:border-slate-800/80"
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70 border-t border-b
                      border-slate-200/70 dark:border-slate-800/70">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              exit={reduce ? false : { opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-bold tracking-tight">{p.title}</h3>
                  <p className="text-sm opacity-80 max-w-2xl">{p.description}</p>

                  {p.highlights?.length ? (
                    <ul className="text-sm opacity-80 list-disc pl-5 space-y-1">
                      {p.highlights.slice(0, 2).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {p.status ? (
                  <span className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-80">
                    {p.status}
                  </span>
                ) : null}
              </div>

              <div className="mt-3">
                <Link
                  to={`/projects/${p.id}`}
                  className="text-sm font-semibold text-indigo-700 dark:text-indigo-200 underline"
                >
                  View details
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <div className="py-6 opacity-80">No projects found.</div>
        ) : null}
      </div>
    </section>
  );
}

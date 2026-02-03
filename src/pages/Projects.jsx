import { useMemo, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
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
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          PROJECTS
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Work in progress, built with structure.</h1>
        <p className="opacity-80 max-w-2xl">
          Each project has a case study showing the problem, approach, decisions, and next steps.
        </p>
      </header>

      {/* Controls */}
      <div className="space-y-4">
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-2xl border bg-white/40 dark:bg-slate-950/20 pl-10 pr-10 py-2
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
      <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/55 dark:bg-slate-950/35 overflow-hidden">
        <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={reduce ? false : { opacity: 1, y: 0 }}
                exit={reduce ? false : { opacity: 0, y: 10 }}
                transition={{ duration: 0.18, delay: reduce ? 0 : Math.min(idx * 0.03, 0.12) }}
                className="p-5"
              >
                <motion.div
                  whileHover={reduce ? {} : { y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/40 grid place-items-center text-xl">
                        {p.hero || "⭐"}
                      </div>
                      <div>
                        <h3 className="font-bold tracking-tight">{p.title}</h3>
                        <p className="text-sm opacity-80 max-w-2xl">{p.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(p.stack || []).slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${p.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-200"
                    >
                      View case study <ArrowRight size={16} />
                    </Link>
                  </div>

                  {p.status ? (
                    <span className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-80">
                      {p.status}
                    </span>
                  ) : null}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-semibold">No results</p>
              <p className="text-sm opacity-75 mt-1">Try a different keyword or reset filters.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

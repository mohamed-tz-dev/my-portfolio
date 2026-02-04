import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { X, Search, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import MiniHeader from "../components/MiniHeader";
import { Reveal, Stagger, Item } from "../components/Reveal";
import PolishCard from "../components/PolishCard";

const FILTERS = ["all", "frontend", "backend", "ui", "api", "devops"];

function PageShell({ children }) {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 55%)," +
              "radial-gradient(900px 600px at 80% 15%, rgba(168,85,247,0.18), transparent 55%)," +
              "radial-gradient(1000px 700px at 50% 85%, rgba(14,165,233,0.14), transparent 60%)"
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-14">{children}</div>
    </div>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-2xl border text-sm transition",
        "border-white/12 text-white/80",
        active ? "bg-white/10 text-white" : "hover:bg-white/5"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ProjectRow({ p }) {
  return (
    <PolishCard className="p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs tracking-[0.22em] text-white/60">PROJECT</span>
            {p.status ? (
              <span className="text-xs rounded-full px-3 py-1 border border-white/12 text-white/75">
                {p.status}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
            {p.title}
          </h3>

          <p className="mt-2 text-white/70 max-w-3xl">
            {p.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(p.stack || []).slice(0, 6).map((s) => (
              <span
                key={s}
                className="text-xs rounded-full px-3 py-1 border border-white/12 text-white/75"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <Link
              to={`/projects/${p.id}`}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                         bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                         shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              View case study <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="hidden md:grid h-14 w-14 place-items-center rounded-3xl border border-white/10 bg-white/5 text-white/80 text-2xl shrink-0">
          {p.hero || "★"}
        </div>
      </div>
    </PolishCard>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const all = Array.isArray(projects) ? projects : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const matchesQuery = !q || title.includes(q) || desc.includes(q);
      const matchesFilter = filter === "all" || (p.tags || []).includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [all, query, filter]);

  const countsByFilter = useMemo(() => {
    const base = Object.fromEntries(FILTERS.map((f) => [f, 0]));
    for (const p of all) {
      base.all += 1;
      for (const t of p.tags || []) {
        if (base[t] !== undefined) base[t] += 1;
      }
    }
    return base;
  }, [all]);

  const hasActive = filter !== "all" || query.trim().length > 0;

  return (
    <PageShell>
      <MiniHeader />

      <Reveal className="mt-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.22em] text-white/70">PROJECTS</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Case studies & progress
            </h1>
            <p className="text-white/70 max-w-2xl">
              I publish progress in a structured way. Each case study shows decisions and next steps.
            </p>
          </div>

          <PolishCard className="p-4 w-full md:w-auto">
            <div className="text-xs tracking-[0.22em] text-white/60">SUMMARY</div>
            <div className="mt-1 text-white font-semibold">
              {filtered.length} shown
              <span className="text-white/60 font-normal"> / {all.length} total</span>
            </div>
          </PolishCard>
        </div>
      </Reveal>

      <Reveal delay={0.03} className="mt-8">
        <PolishCard className="p-5">
          <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full rounded-2xl border bg-white/[0.06] text-white/90 placeholder:text-white/45
                           border-white/12 pl-10 pr-10 py-3
                           focus:outline-none focus:ring-2 focus:ring-white/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 hover:bg-white/5"
                  aria-label="Clear"
                >
                  <X size={16} className="text-white/70" />
                </button>
              )}
            </div>

            {/* Reset */}
            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
                disabled={!hasActive}
                className={[
                  "rounded-2xl px-5 py-3 font-semibold transition border",
                  hasActive
                    ? "border-white/15 text-white hover:bg-white/5 active:scale-[0.99]"
                    : "border-white/10 text-white/40 cursor-not-allowed"
                ].join(" ")}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Chip key={f} active={f === filter} onClick={() => setFilter(f)}>
                {f}{" "}
                <span className="text-white/50 ml-1">
                  ({countsByFilter[f] ?? 0})
                </span>
              </Chip>
            ))}
          </div>
        </PolishCard>
      </Reveal>

      <Stagger className="mt-8 grid gap-4">
        {filtered.map((p) => (
          <Item key={p.id}>
            <ProjectRow p={p} />
          </Item>
        ))}

        {filtered.length === 0 && (
          <Item>
            <PolishCard className="p-10 text-center">
              <div className="text-white font-semibold text-xl">No results</div>
              <p className="mt-2 text-white/70">
                Try a different keyword, or reset filters.
              </p>
            </PolishCard>
          </Item>
        )}
      </Stagger>
    </PageShell>
  );
}

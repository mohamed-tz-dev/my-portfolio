import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const filters = ["all", "frontend", "backend", "api", "ui"];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);

      const matchesFilter =
        filter === "all" || (p.tags || []).includes(filter);

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="opacity-80 max-w-2xl">
          Tafuta project kwa jina/stack, au chagua category.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full md:max-w-sm rounded-2xl border px-4 py-2 bg-transparent
                     border-zinc-200/70 dark:border-zinc-800/70"
        />

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "px-3 py-2 rounded-2xl border text-sm transition",
                "border-zinc-200/70 dark:border-zinc-800/70",
                f === filter
                  ? "bg-zinc-100/70 dark:bg-zinc-900/70 font-semibold"
                  : "opacity-80 hover:opacity-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        {filtered.length === 0 ? (
          <div className="border rounded-2xl p-6 opacity-80">
            No projects found.
          </div>
        ) : null}
      </div>
    </section>
  );
}

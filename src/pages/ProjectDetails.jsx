import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

function Section({ title, children }) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <div className="text-slate-700 dark:text-slate-200 opacity-90">{children}</div>
    </section>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();

  const project = (projects || []).find((p) => p.id === id);

  // ✅ Defensive: show nice message instead of crashing
  if (!project) {
    return (
      <section className="space-y-4">
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">
          Project
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Project not found</h2>
        <p className="opacity-80 max-w-2xl">
          The project you’re looking for does not exist or the link is incorrect.
        </p>

        <div className="flex gap-3">
          <Link
            to="/projects"
            className="rounded-2xl px-4 py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Back to Projects
          </Link>
          <Link
            to="/"
            className="rounded-2xl px-4 py-2 border border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            Go Home
          </Link>
        </div>

        <div className="text-sm opacity-70">
          Debug: Requested id = <span className="font-semibold">{String(id)}</span>
        </div>
      </section>
    );
  }

  const {
    title,
    description,
    status,
    highlights = [],
    githubUrl,
    liveUrl
  } = project;

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">
          Project
        </p>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          {status ? (
            <span className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-80">
              {status}
            </span>
          ) : null}
        </div>

        <p className="text-lg opacity-80 max-w-3xl">{description}</p>

        <div className="flex flex-wrap gap-3 pt-1">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl px-4 py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              View on GitHub
            </a>
          ) : null}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl px-4 py-2 border border-slate-200/80 dark:border-slate-800/80
                         hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
            >
              Live Demo
            </a>
          ) : (
            <span className="text-sm opacity-60 self-center">Live demo: coming soon</span>
          )}

          <Link
            to="/projects"
            className="rounded-2xl px-4 py-2 border border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            Back
          </Link>
        </div>
      </header>

      {/* Body: case-study style */}
      <div className="space-y-6">
        <Section title="Overview">
          <p>
            This project is being built step by step with a focus on clean structure, stable workflows, and
            maintainable code.
          </p>
        </Section>

        <Section title="Key highlights">
          {highlights.length ? (
            <ul className="list-disc pl-5 space-y-2 opacity-90">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : (
            <p className="opacity-70">Highlights will be added soon.</p>
          )}
        </Section>

        <Section title="Next steps">
          <ul className="list-disc pl-5 space-y-2 opacity-90">
            <li>Complete core feature flow end-to-end.</li>
            <li>Add screenshots and short case-study notes.</li>
            <li>Polish UI and accessibility.</li>
          </ul>
        </Section>
      </div>

      {/* Footer */}
      <footer className="pt-2 text-sm opacity-70">
        Tip: Keep project pages short, clear, and updated as you build.
      </footer>
    </article>
  );
}

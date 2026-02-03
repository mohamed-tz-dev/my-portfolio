import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function Divider() {
  return <div className="h-px w-full bg-slate-200/70 dark:bg-slate-800/70" />;
}

function Pill({ children }) {
  return (
    <span className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-85">
      {children}
    </span>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="space-y-3 scroll-mt-24">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          {title}
        </h2>
        {subtitle ? <p className="text-sm opacity-80 max-w-3xl">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-sm opacity-70">Coming soon.</p>;
  }
  return (
    <ul className="list-disc pl-5 space-y-2 text-sm opacity-85">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

function hasContent(value) {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
}

export default function ProjectDetails() {
  const { id } = useParams();
  const project = (projects || []).find((p) => p.id === id);

  // Defensive not-found UI (no crash)
  if (!project) {
    return (
      <div className="space-y-4">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          PROJECT
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Project not found</h1>
        <p className="opacity-80 max-w-2xl">
          The project link is incorrect or the project was removed.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                       bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Back to Projects <ArrowRight size={18} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            Home
          </Link>
        </div>

        <p className="text-sm opacity-70">
          Debug: requested id = <span className="font-semibold">{String(id)}</span>
        </p>
      </div>
    );
  }

  const {
    title,
    description,
    status,
    stack = [],
    githubUrl,
    liveUrl,

    // Case-study fields
    role,
    timeline,
    problem,
    goals = [],
    approach = [],
    keyDecisions = [],
    challenges = [],
    outcomes = [],
    nextSteps = []
  } = project;

  // Chapters definition (ids match section ids for scroll)
  const chapters = useMemo(() => {
    return [
      { key: "problem", label: "1", name: "Problem", id: "cs-problem", done: hasContent(problem) },
      { key: "goals", label: "2", name: "Goals", id: "cs-goals", done: hasContent(goals) },
      { key: "approach", label: "3", name: "Approach", id: "cs-approach", done: hasContent(approach) },
      { key: "decisions", label: "4", name: "Decisions", id: "cs-decisions", done: hasContent(keyDecisions) },
      { key: "challenges", label: "5", name: "Challenges", id: "cs-challenges", done: hasContent(challenges) },
      { key: "outcomes", label: "6", name: "Outcome", id: "cs-outcomes", done: hasContent(outcomes) },
      { key: "next", label: "7", name: "Next", id: "cs-next", done: hasContent(nextSteps) }
    ];
  }, [problem, goals, approach, keyDecisions, challenges, outcomes, nextSteps]);

  const doneCount = chapters.filter((c) => c.done).length;
  const [active, setActive] = useState(chapters[0]?.id || "cs-problem");

  // Track active chapter while scrolling
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.4, 0.6], rootMargin: "-20% 0px -65% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chapters]);

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          PROJECT CASE STUDY
        </p>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {title}
          </h1>
          {status ? <Pill>{status}</Pill> : null}
        </div>

        <p className="text-lg opacity-80 max-w-3xl">{description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          {role ? <Pill>{role}</Pill> : null}
          {timeline ? <Pill>{timeline}</Pill> : null}
          {Array.isArray(stack) && stack.length ? stack.slice(0, 6).map((t) => <Pill key={t}>{t}</Pill>) : null}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-1">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                         bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              GitHub <Github size={18} />
            </a>
          ) : null}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                         border-slate-200/80 dark:border-slate-800/80
                         hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
            >
              Live <ExternalLink size={18} />
            </a>
          ) : (
            <span className="text-sm opacity-70 self-center">Live demo: coming soon</span>
          )}

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            Back
          </Link>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 p-5 bg-white/60 dark:bg-slate-950/40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Case study progress</div>
            <div className="text-sm opacity-75">
              {doneCount} / {chapters.length} sections completed
            </div>
          </div>

          <div className="text-xs opacity-70">
            Tip: Fill each section in <span className="font-semibold">projects.js</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {chapters.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => scrollTo(c.id)}
                className={[
                  "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition",
                  "border-slate-200/80 dark:border-slate-800/80",
                  isActive
                    ? "bg-indigo-600/10 text-indigo-700 dark:text-indigo-200 dark:bg-indigo-400/10 font-semibold"
                    : "hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
                ].join(" ")}
                aria-label={`Go to ${c.name}`}
                title={c.name}
              >
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full text-xs",
                    c.done
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200/80 dark:border-slate-800/80 opacity-80"
                  ].join(" ")}
                >
                  {c.label}
                </span>
                <span className="opacity-90">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* Chapters */}
      <Section
        id="cs-problem"
        title="CHAPTER 1 — PROBLEM"
        subtitle="What real problem this project is trying to solve."
      >
        {problem ? (
          <p className="text-sm opacity-85 max-w-3xl">{problem}</p>
        ) : (
          <p className="text-sm opacity-70">
            Coming soon. Add a short paragraph describing the problem and who it affects.
          </p>
        )}
      </Section>

      <Divider />

      <Section
        id="cs-goals"
        title="CHAPTER 2 — GOALS"
        subtitle="Clear targets that define what “done” means."
      >
        <BulletList items={goals} />
      </Section>

      <Divider />

      <Section
        id="cs-approach"
        title="CHAPTER 3 — APPROACH"
        subtitle="How the system is designed and built step by step."
      >
        <BulletList items={approach} />
      </Section>

      <Divider />

      <Section
        id="cs-decisions"
        title="CHAPTER 4 — KEY DECISIONS"
        subtitle="Important choices and why they were made."
      >
        <BulletList items={keyDecisions} />
      </Section>

      <Divider />

      <Section
        id="cs-challenges"
        title="CHAPTER 5 — CHALLENGES"
        subtitle="What was difficult, and how it was handled."
      >
        <BulletList items={challenges} />
      </Section>

      <Divider />

      <Section
        id="cs-outcomes"
        title="CHAPTER 6 — CURRENT OUTCOME"
        subtitle="What works today (even if the project is still in progress)."
      >
        <BulletList items={outcomes} />
      </Section>

      <Divider />

      <Section
        id="cs-next"
        title="CHAPTER 7 — NEXT STEPS"
        subtitle="Planned improvements and what comes next."
      >
        <BulletList items={nextSteps} />
      </Section>

      <Divider />

      <footer className="text-sm opacity-70">
        Tip: Strong case studies show how you think, not just what you build.
      </footer>
    </article>
  );
}

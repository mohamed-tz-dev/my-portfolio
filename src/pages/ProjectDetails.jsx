import { Link, useParams } from "react-router-dom";
import { Github, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import MiniHeader from "../components/MiniHeader";
import { projects } from "../data/projects";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";
import PolishCard from "../components/PolishCard";

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

      <div className="max-w-5xl mx-auto px-4 py-14">{children}</div>
    </div>
  );
}

function Glass({ children, className = "" }) {
  return <PolishCard className={className}>{children}</PolishCard>;
}

function Pill({ children }) {
  return (
    <span className="text-xs rounded-full px-3 py-1 border border-white/12 text-white/75">
      {children}
    </span>
  );
}

function BulletList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-white/70">Coming soon.</p>;
  }
  return (
    <ul className="list-disc pl-5 space-y-2 text-white/75">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

function TwoColList({ leftTitle, leftItems, rightTitle, rightItems }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Glass className="p-6">
        <div className="text-xs tracking-[0.22em] text-white/60">{leftTitle}</div>
        <div className="mt-3">
          <BulletList items={leftItems} />
        </div>
      </Glass>

      <Glass className="p-6">
        <div className="text-xs tracking-[0.22em] text-white/60">{rightTitle}</div>
        <div className="mt-3">
          <BulletList items={rightItems} />
        </div>
      </Glass>
    </div>
  );
}

function hasContent(v) {
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object" && v) return Object.keys(v).length > 0;
  return Boolean(v);
}

export default function ProjectDetails() {
  const { id } = useParams();
  const project = (projects || []).find((p) => p.id === id);

  if (!project) {
    return (
      <PageShell>
        <MiniHeader />
        <Reveal className="mt-8 space-y-4">
          <p className="text-xs tracking-[0.22em] text-white/70">PROJECT</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Project not found</h1>
          <p className="text-white/70">The project ID is invalid or the project was removed.</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                       bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                       shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            Back to projects <ArrowRight size={18} />
          </Link>
        </Reveal>
      </PageShell>
    );
  }

  const {
    title,
    description,
    status,
    hero,
    stack = [],
    tags = [],
    githubUrl,
    liveUrl,
    caseStudy = {}
  } = project;

  const chapters = useMemo(() => {
    return [
      { key: "overview", label: "0", name: "Overview", id: "cs-overview", done: true },
      { key: "problem", label: "1", name: "Problem", id: "cs-problem", done: hasContent(caseStudy.problem) },
      { key: "users", label: "2", name: "Users", id: "cs-users", done: hasContent(caseStudy.users) },
      { key: "scope", label: "3", name: "Scope", id: "cs-scope", done: hasContent(caseStudy.scope) },
      { key: "decisions", label: "4", name: "Decisions", id: "cs-decisions", done: hasContent(caseStudy.decisions) },
      { key: "progress", label: "5", name: "Progress", id: "cs-progress", done: hasContent(caseStudy.currentState) },
      { key: "next", label: "6", name: "Next steps", id: "cs-next", done: hasContent(caseStudy.nextSteps) }
    ];
  }, [caseStudy]);

  const doneCount = chapters.filter((c) => c.done).length;
  const [active, setActive] = useState(chapters[0]?.id || "cs-overview");

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: "-10% 0px -70% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chapters]);

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell>
      <MiniHeader />

      <Reveal className="mt-8 space-y-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-white/75 hover:text-white transition"
        >
          <ArrowLeft size={18} /> Back
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.22em] text-white/70">CASE STUDY</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{title}</h1>
            <p className="text-white/70 max-w-3xl">{description}</p>
          </div>

          <div className="hidden md:grid h-14 w-14 place-items-center rounded-3xl border border-white/10 bg-white/5 text-white/80 text-2xl">
            {hero || "★"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {status ? <Pill>{status}</Pill> : null}
          {stack.slice(0, 6).map((x) => <Pill key={x}>{x}</Pill>)}
          {tags.slice(0, 4).map((x) => <Pill key={x}>{x}</Pill>)}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                         bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                         shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              GitHub <Github size={18} />
            </a>
          ) : null}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                         border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
            >
              Live <ExternalLink size={18} />
            </a>
          ) : (
            <span className="self-center text-white/60 text-sm">Live: coming soon</span>
          )}
        </div>
      </Reveal>

      <div className="mt-10 lg:sticky lg:top-20 z-30">
        <Glass className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Case study progress</div>
              <div className="text-sm text-white/70">
                {doneCount}/{chapters.length} sections drafted
              </div>
            </div>
            <div className="hidden md:block text-xs tracking-[0.22em] text-white/50">
              CLICK TO JUMP
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {chapters.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.key}
                  onClick={() => scrollTo(c.id)}
                  className={[
                    "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition",
                    "border-white/10 text-white/80",
                    isActive ? "bg-white/10 text-white" : "hover:bg-white/5"
                  ].join(" ")}
                  title={c.name}
                >
                  <span
                    className={[
                      "inline-flex h-5 w-5 items-center justify-center rounded-full text-xs",
                      c.done ? "bg-white text-black" : "border border-white/12 text-white/75"
                    ].join(" ")}
                  >
                    {c.label}
                  </span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </Glass>
      </div>

      <div className="mt-10 space-y-8">
        <Reveal>
          <section id="cs-overview" className="scroll-mt-28">
            <Glass className="p-6">
              <div className="text-xs tracking-[0.22em] text-white/60">OVERVIEW</div>
              <div className="mt-3 grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Role</div>
                  <p className="text-white/70 text-sm mt-1">{caseStudy.role || "Coming soon"}</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Timeline</div>
                  <p className="text-white/70 text-sm mt-1">{caseStudy.timeline || "Coming soon"}</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Goal</div>
                  <p className="text-white/70 text-sm mt-1">{caseStudy.goal || "Coming soon"}</p>
                </div>
              </div>
            </Glass>
          </section>
        </Reveal>

        <Reveal>
          <section id="cs-problem" className="scroll-mt-28 space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/70">CHAPTER 1</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Problem</h2>
            <Glass className="p-6">
              <p className="text-white/75">{caseStudy.problem || "Coming soon."}</p>
            </Glass>
          </section>
        </Reveal>

        <Reveal>
          <section id="cs-users" className="scroll-mt-28 space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/70">CHAPTER 2</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Target users</h2>

            <TwoColList
              leftTitle="USERS"
              leftItems={caseStudy.users?.roles}
              rightTitle="NEEDS"
              rightItems={caseStudy.users?.needs}
            />
          </section>
        </Reveal>

        <Reveal>
          <section id="cs-scope" className="scroll-mt-28 space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/70">CHAPTER 3</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Scope</h2>

            <TwoColList
              leftTitle="IN SCOPE"
              leftItems={caseStudy.scope?.included}
              rightTitle="OUT OF SCOPE"
              rightItems={caseStudy.scope?.excluded}
            />
          </section>
        </Reveal>

        <Reveal>
          <section id="cs-decisions" className="scroll-mt-28 space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/70">CHAPTER 4</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Key decisions</h2>

            <Glass className="p-6">
              <BulletList items={caseStudy.decisions} />
            </Glass>

            <Glass className="p-6">
              <div className="text-xs tracking-[0.22em] text-white/60">WHY THIS MATTERS</div>
              <p className="mt-2 text-white/75">
                Decisions show how you think. Recruiters trust decisions more than screenshots.
              </p>
            </Glass>
          </section>
        </Reveal>

        <Reveal>
          <section id="cs-progress" className="scroll-mt-28 space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/70">CHAPTER 5</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Current progress</h2>

            <TwoColList
              leftTitle="COMPLETED"
              leftItems={caseStudy.currentState?.completed}
              rightTitle="IN PROGRESS"
              rightItems={caseStudy.currentState?.inProgress}
            />

            <Glass className="p-6 mt-4">
              <div className="text-xs tracking-[0.22em] text-white/60">KNOWN LIMITATIONS</div>
              <div className="mt-3">
                <BulletList items={caseStudy.currentState?.limitations} />
              </div>
            </Glass>
          </section>
        </Reveal>

        <Reveal>
          <section id="cs-next" className="scroll-mt-28 space-y-3">
            <div className="text-xs tracking-[0.22em] text-white/70">CHAPTER 6</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Next steps</h2>

            <Glass className="p-6">
              <BulletList items={caseStudy.nextSteps} />
            </Glass>
          </section>
        </Reveal>

        <Reveal>
          <Glass className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                           border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
              >
                <ArrowLeft size={18} /> Back to Projects
              </Link>

              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                             bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                             shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                >
                  View code <Github size={18} />
                </a>
              ) : null}
            </div>
          </Glass>
        </Reveal>
      </div>
    </PageShell>
  );
}
 
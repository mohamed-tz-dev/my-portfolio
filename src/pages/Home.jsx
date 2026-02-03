import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";
import { projects } from "../data/projects";
import { useActiveSection } from "../context/activeSection";

function Divider() {
  return (
    <div className="h-px w-full bg-slate-200/70 dark:bg-slate-800/70" />
  );
}

function FeaturedRow({ p }) {
  return (
    <div className="py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/80
                            bg-white/60 dark:bg-slate-950/40 grid place-items-center text-xl">
              {p.hero || "⭐"}
            </div>
            <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
          </div>
          <p className="text-sm opacity-80 max-w-2xl">{p.description}</p>

          {p.highlights?.length ? (
            <ul className="text-sm opacity-80 list-disc pl-5 space-y-1">
              {p.highlights.slice(0, 2).map((h) => <li key={h}>{h}</li>)}
            </ul>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to={`/projects/${p.id}`}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                         bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              View case study <ArrowRight size={18} />
            </Link>
            {p.githubUrl ? (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                           border-slate-200/80 dark:border-slate-800/80
                           hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
              >
                GitHub <Github size={18} />
              </a>
            ) : null}
          </div>
        </div>

        {p.status ? (
          <span className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-80">
            {p.status}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function Home() {
  const featured = projects.slice(0, 2);
  const { setActiveSection } = useActiveSection();

  // Track active chapter using IntersectionObserver
  useEffect(() => {
    const ids = ["intro", "work", "proof", "cta"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: "-15% 0px -65% 0px" }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [setActiveSection]);

  return (
    <div className="space-y-14">
      {/* CHAPTER 1 */}
      <section id="intro" className="space-y-5">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          CHAPTER 1 — INTRODUCTION
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          I build clean web systems and improve them step by step.
        </h1>

        <p className="text-lg opacity-80 max-w-2xl">
          My focus is simple: clear structure, practical features, and steady progress through real projects.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                       bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Explore Projects <ArrowRight size={18} />
          </Link>

          <a
            href="https://github.com/mohamed-tz-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            GitHub <Github size={18} />
          </a>
        </div>
      </section>

      <Divider />

      {/* CHAPTER 2 */}
      <section id="work" className="space-y-4">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          CHAPTER 2 — FEATURED WORK
        </p>

        <div className="border-t border-b border-slate-200/70 dark:border-slate-800/70 divide-y divide-slate-200/70 dark:divide-slate-800/70">
          {featured.map((p) => (
            <FeaturedRow key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Divider />

      {/* CHAPTER 3 */}
      <section id="proof" className="space-y-4">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          CHAPTER 3 — PROOF OF WORK
        </p>

        <div className="space-y-3">
          <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 p-5 bg-white/60 dark:bg-slate-950/40">
            <div className="text-sm font-semibold">How I work</div>
            <p className="text-sm opacity-80 mt-1">
              I build in small steps, commit regularly, and keep the structure clean so features are easy to add later.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 p-5 bg-white/60 dark:bg-slate-950/40">
            <div className="text-sm font-semibold">What I’m improving</div>
            <ul className="text-sm opacity-80 list-disc pl-5 mt-2 space-y-1">
              <li>Case-study pages (problem → approach → decisions).</li>
              <li>Better testing habits and stable workflows.</li>
              <li>Polished UI that stays readable and fast.</li>
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      {/* CHAPTER 4 */}
      <section id="cta" className="space-y-4">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          CHAPTER 4 — CONTACT
        </p>

        <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 p-6 bg-white/60 dark:bg-slate-950/40">
          <h2 className="text-2xl font-bold tracking-tight">Let’s build something solid.</h2>
          <p className="opacity-80 mt-2 max-w-2xl">
            If you want to collaborate or ask a question, email is the fastest way to reach me.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="mailto:mohamedhalf360@gmail.com?subject=Project%20Inquiry"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                         bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Email me <ArrowRight size={18} />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                         border-slate-200/80 dark:border-slate-800/80
                         hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
            >
              Contact page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

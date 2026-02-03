import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { projects } from "../data/projects";

function ProgressBar({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="h-2 w-full rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 overflow-hidden">
      <div
        className="h-full rounded-full bg-zinc-900/80 dark:bg-zinc-100/80"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

function FeaturedCard({ p }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? {} : { y: -5 }}
      transition={{ duration: 0.2 }}
      className="group rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60
                 bg-white/60 dark:bg-zinc-950/40 backdrop-blur overflow-hidden"
    >
      {/* Visual header */}
      <div className={`relative p-6 bg-gradient-to-br ${p.tone}`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                        bg-gradient-to-r from-white/10 to-transparent" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60
                            bg-white/60 dark:bg-zinc-950/50 grid place-items-center text-xl">
              {p.hero || "⭐"}
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight leading-snug">
                {p.title}
              </h3>
              <p className="text-sm opacity-80">{p.badge || "Featured"}</p>
            </div>
          </div>

          <span className="text-xs rounded-full px-3 py-1 border border-zinc-200/70 dark:border-zinc-800/70 opacity-80">
            {p.status || "In Progress"}
          </span>
        </div>

        <div className="relative mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs opacity-80">
            <span>Progress</span>
            <span>{p.progress ?? 0}%</span>
          </div>
          <ProgressBar value={p.progress} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <p className="opacity-80">{p.description}</p>

        <ul className="space-y-2">
          {(p.highlights || []).slice(0, 3).map((h) => (
            <li key={h} className="text-sm opacity-80 flex gap-2">
              <span className="opacity-60">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            to={`/projects/${p.id}`}
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-semibold
                       border-zinc-200/70 dark:border-zinc-800/70
                       hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
          >
            View details <ArrowRight size={18} />
          </Link>

          {p.githubUrl ? (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-80
                         border-zinc-200/70 dark:border-zinc-800/70
                         hover:opacity-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
            >
              GitHub <Github size={18} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const reduce = useReducedMotion();
  const featured = projects.slice(0, 2);

  return (
    <section className="space-y-10">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60
                      bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 p-8 md:p-10">
        {/* subtle glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25
                        bg-zinc-400 dark:bg-zinc-700" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full blur-3xl opacity-20
                        bg-zinc-400 dark:bg-zinc-700" />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 dark:border-zinc-800/70
                          px-3 py-1 text-xs opacity-80">
            <Sparkles size={14} />
            Building real projects • Clean structure • Step-by-step improvement
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            I build modern web experiences with a clean, professional look.
          </h1>

          <p className="text-lg opacity-80 max-w-2xl">
            This portfolio highlights what I’m currently building and how I work: clear structure, practical features,
            and steady progress.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-semibold
                         border-zinc-200/70 dark:border-zinc-800/70
                         hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
            >
              Explore Projects <ArrowRight size={18} />
            </Link>

            <a
              href="https://github.com/mohamed-tz-dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-80
                         border-zinc-200/70 dark:border-zinc-800/70
                         hover:opacity-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
            >
              GitHub <Github size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* FEATURED */}
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold">Featured projects</h2>
          <Link to="/projects" className="text-sm underline opacity-80 hover:opacity-100">
            See all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <FeaturedCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

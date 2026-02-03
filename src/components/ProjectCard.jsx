import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project }) {
  const reduce = useReducedMotion();

  // ✅ Defensive defaults: prevents "map of undefined"
  const {
    id = "unknown",
    title = "Untitled Project",
    description = "No description yet.",
    stack = [],          // <-- default empty array
    status = "",
    githubUrl = "",
    liveUrl = ""
  } = project || {};

  return (
    <motion.article
      whileHover={reduce ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 p-6 space-y-4
                 bg-white/60 dark:bg-slate-950/40 backdrop-blur
                 hover:bg-slate-100/60 dark:hover:bg-slate-900/50 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight leading-snug">{title}</h3>
          <p className="opacity-80">{description}</p>
        </div>

        {status ? (
          <span className="text-xs border rounded-full px-3 py-1 opacity-80 border-slate-200/80 dark:border-slate-800/80">
            {status}
          </span>
        ) : null}
      </div>

      {/* ✅ Only map if stack is a real array */}
      {Array.isArray(stack) && stack.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="text-xs border rounded-full px-3 py-1 opacity-80 border-slate-200/80 dark:border-slate-800/80"
            >
              {t}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm opacity-60">Stack: coming soon</p>
      )}

      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          to={`/projects/${id}`}
          className="rounded-2xl px-4 py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Details
        </Link>

        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-90
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            GitHub <Github size={16} />
          </a>
        ) : null}

        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-90
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            Live <ExternalLink size={16} />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

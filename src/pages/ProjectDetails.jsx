import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project }) {
  const reduce = useReducedMotion();
  const { id, title, description, stack = [], status, githubUrl, liveUrl } = project;

  return (
    <motion.article
      whileHover={reduce ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 space-y-4
                 bg-white/60 dark:bg-zinc-950/40 backdrop-blur
                 hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight leading-snug">{title}</h3>
          <p className="opacity-80">{description}</p>
        </div>

        {status ? (
          <span className="text-xs border rounded-full px-3 py-1 opacity-80 border-zinc-200/70 dark:border-zinc-800/70">
            {status}
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {stack.map((t) => (
          <span
            key={t}
            className="text-xs border rounded-full px-3 py-1 opacity-80 border-zinc-200/70 dark:border-zinc-800/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          to={`/projects/${id}`}
          className="rounded-2xl border px-4 py-2 font-semibold
                     border-zinc-200/70 dark:border-zinc-800/70
                     hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
        >
          Details
        </Link>

        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-80
                       border-zinc-200/70 dark:border-zinc-800/70
                       hover:opacity-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
          >
            GitHub <Github size={16} />
          </a>
        ) : null}

        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-80
                       border-zinc-200/70 dark:border-zinc-800/70
                       hover:opacity-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
          >
            Live <ExternalLink size={16} />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

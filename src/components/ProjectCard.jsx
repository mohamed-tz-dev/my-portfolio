import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const { id, title, description, stack, status, githubUrl, liveUrl } = project;

  return (
    <article className="border rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
          <p className="opacity-80">{description}</p>
        </div>

        <span className="text-xs border rounded-full px-3 py-1 opacity-80">
          {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {stack.map((t) => (
          <span
            key={t}
            className="text-xs border rounded-full px-3 py-1 opacity-80"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/projects/${id}`}
          className="rounded-xl border px-4 py-2 font-semibold"
        >
          Details
        </Link>

        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border px-4 py-2 opacity-80 hover:opacity-100"
          >
            GitHub
          </a>
        ) : null}

        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border px-4 py-2 opacity-80 hover:opacity-100"
          >
            Live
          </a>
        ) : null}
      </div>
    </article>
  );
}

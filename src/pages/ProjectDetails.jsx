import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link to="/projects" className="underline">
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{project.title}</h2>
        <p className="opacity-80 max-w-2xl">{project.description}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Highlights</h3>
        <ul className="list-disc pl-6 space-y-1 opacity-80">
          {project.highlights?.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/projects" className="rounded-xl border px-4 py-2">
          Back
        </Link>

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border px-4 py-2"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </section>
  );
}

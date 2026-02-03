import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="opacity-80 max-w-2xl">
          Hizi ni baadhi ya projects zangu. Kila moja ina summary, tech stack, na link.
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

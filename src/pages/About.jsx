const skills = [
  "React",
  "Vite",
  "TailwindCSS",
  "Git & GitHub",
  "REST APIs",
  "Linux basics",
  "Problem solving"
];

const focusNow = [
  "Building clean UI with reusable components",
  "Improving Git workflow (branches, PRs, CI basics)",
  "Finishing School Management System and E-commerce projects"
];

export default function About() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">About</h2>
        <p className="opacity-80 max-w-2xl">
          I’m Mohamed, a developer focused on building modern web applications with clean UI and a reliable workflow.
          I care about structure, readability, and shipping features step by step.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 space-y-3
                        bg-white/60 dark:bg-zinc-950/40 backdrop-blur">
          <h3 className="font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="text-xs border rounded-full px-3 py-1 opacity-80
                           border-zinc-200/70 dark:border-zinc-800/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 space-y-3
                        bg-white/60 dark:bg-zinc-950/40 backdrop-blur">
          <h3 className="font-semibold">Focus right now</h3>
          <ul className="list-disc pl-5 space-y-2 opacity-80">
            {focusNow.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 space-y-2
                      bg-white/60 dark:bg-zinc-950/40 backdrop-blur">
        <h3 className="font-semibold">What you can expect from my work</h3>
        <p className="opacity-80 max-w-3xl">
          Clean structure, consistent UI, and practical problem solving. I prefer simple solutions that are easy to
          maintain and improve over time.
        </p>
      </div>
    </section>
  );
}

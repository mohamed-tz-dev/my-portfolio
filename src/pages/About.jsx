import { motion, useReducedMotion } from "framer-motion";

function SkillPill({ children }) {
  return (
    <span className="text-xs rounded-full px-3 py-1 border border-slate-200/80 dark:border-slate-800/80 opacity-85">
      {children}
    </span>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 p-6 bg-white/55 dark:bg-slate-950/35">
      <div className="space-y-1">
        <h3 className="font-bold tracking-tight">{title}</h3>
        {subtitle ? <p className="text-sm opacity-80">{subtitle}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          ABOUT
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Building with structure, not chaos.</h1>
        <p className="opacity-80 max-w-2xl">
          I focus on clean architecture, readable UI, and steady progress through real projects.
        </p>
      </header>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid gap-4"
      >
        <Card
          title="Core skills"
          subtitle="Tools I use to build and ship web systems."
        >
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "TailwindCSS",
              "Django",
              "PostgreSQL",
              "Git & GitHub",
              "REST APIs",
              "Linux basics"
            ].map((s) => (
              <SkillPill key={s}>{s}</SkillPill>
            ))}
          </div>
        </Card>

        <Card
          title="How I work"
          subtitle="The workflow that keeps projects stable."
        >
          <ul className="list-disc pl-5 space-y-2 text-sm opacity-85">
            <li>Start with structure (routes, data shape, permissions).</li>
            <li>Build in small steps and commit regularly.</li>
            <li>Keep UI consistent and readable before adding fancy effects.</li>
          </ul>
        </Card>

        <Card
          title="What I’m building now"
          subtitle="Short and honest progress snapshot."
        >
          <ul className="list-disc pl-5 space-y-2 text-sm opacity-85">
            <li>School Management System (role-based workflows).</li>
            <li>E-commerce Website (clean product and cart flow).</li>
          </ul>
        </Card>
      </motion.div>
    </section>
  );
}

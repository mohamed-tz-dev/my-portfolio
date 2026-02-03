import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { projects } from "../data/projects";

export default function Home() {
  const reduce = useReducedMotion();
  const featured = projects.slice(0, 2);

  return (
    <section className="space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60
                      bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 p-8">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-30
                        bg-zinc-400 dark:bg-zinc-600" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-20
                        bg-zinc-400 dark:bg-zinc-700" />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative space-y-4"
        >
          <p className="text-sm opacity-80">
            Full-stack mindset • Clean UI • Real Git workflow
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            I build modern web apps that feel fast and clean.
          </h1>

          <p className="text-lg opacity-80 max-w-2xl">
            Ninatengeneza interfaces zenye muonekano wa kitaalamu, structure safi, na projects zinazoonyesha uwezo wa kweli.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-semibold
                         hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
            >
              View Projects <ArrowRight size={18} />
            </Link>

            <a
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 opacity-80
                         hover:opacity-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
            >
              GitHub <Github size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Featured</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <motion.div
              key={p.id}
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-5
                         hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition"
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 opacity-80">{p.description}</p>
              <Link to={`/projects/${p.id}`} className="mt-4 inline-block underline opacity-80 hover:opacity-100">
                See details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

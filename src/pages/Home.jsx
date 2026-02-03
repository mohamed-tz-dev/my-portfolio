import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { projects } from "../data/projects";

export default function Home() {
  const reduce = useReducedMotion();
  const featured = projects.slice(0, 2);

  return (
    <section className="space-y-10">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60
                      bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 p-8 md:p-10">
        {/* soft glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30
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
            Clean UI • Real Git workflow • Fast builds
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Modern web apps that feel <span className="underline decoration-zinc-400/60">fast</span> and{" "}
            <span className="underline decoration-zinc-400/60">clean</span>.
          </h1>

          <p className="text-lg opacity-80 max-w-2xl">
            Ninatengeneza interfaces zenye muonekano wa kitaalamu, structure safi, na projects zinazoonyesha uwezo wa
            kweli—si maneno tu.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-semibold
                         border-zinc-200/70 dark:border-zinc-800/70
                         hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
            >
              View Projects <ArrowRight size={18} />
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
          <h2 className="text-xl font-bold">Featured</h2>
          <Link to="/projects" className="text-sm underline opacity-80 hover:opacity-100">
            See all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <motion.div
              key={p.id}
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6
                         hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition"
            >
              <h3 className="font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 opacity-80">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(p.stack || []).slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs border rounded-full px-3 py-1 opacity-80 border-zinc-200/70 dark:border-zinc-800/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link to={`/projects/${p.id}`} className="mt-5 inline-block underline opacity-80 hover:opacity-100">
                Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

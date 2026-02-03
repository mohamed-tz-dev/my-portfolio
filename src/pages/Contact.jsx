import { motion, useReducedMotion } from "framer-motion";
import { Mail, Github, ArrowRight } from "lucide-react";

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

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-wide text-indigo-700 dark:text-indigo-200">
          CONTACT
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Let’s talk.</h1>
        <p className="opacity-80 max-w-2xl">
          Email is the fastest way to reach me. I reply when I’m available.
        </p>
      </header>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid gap-4"
      >
        <Card title="Email" subtitle="Best for collaboration and questions.">
          <a
            href="mailto:mohamedhalf360@gmail.com?subject=Project%20Inquiry"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold
                       bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <Mail size={18} /> mohamedhalf360@gmail.com <ArrowRight size={18} />
          </a>
        </Card>

        <Card title="GitHub" subtitle="See progress and real code.">
          <a
            href="https://github.com/mohamed-tz-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            <Github size={18} /> github.com/mohamed-tz-dev
          </a>
        </Card>

        <Card title="Quick note" subtitle="What to include in your message.">
          <ul className="list-disc pl-5 space-y-2 text-sm opacity-85">
            <li>Your goal (what you want to build / discuss)</li>
            <li>Timeline (when you need it)</li>
            <li>Any links or screenshots</li>
          </ul>
        </Card>
      </motion.div>
    </section>
  );
}

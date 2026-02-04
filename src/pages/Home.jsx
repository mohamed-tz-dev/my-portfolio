import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, Item } from "../components/Reveal";
import PolishCard from "../components/PolishCard";

const CHAPTERS = [
  { id: "awakening", label: "I", title: "THE AWAKENING", subtitle: "Who I am and what I build" },
  { id: "work", label: "II", title: "THE WORK", subtitle: "Real projects, real progress" },
  { id: "craft", label: "III", title: "THE CRAFT", subtitle: "How I design and execute" },
  { id: "signal", label: "IV", title: "THE SIGNAL", subtitle: "Contact and links" }
];

const PROOF = {
  completed: [
    "Cinematic chapter layout + consistent page theme",
    "Projects filtering + case study template",
    "Mini header navigation across pages"
  ],
  inProgress: [
    "School Management System: RBAC + core workflows",
    "E-commerce: cart/order flow + validations",
    "More animations + micro-interactions (subtle)"
  ],
  next: [
    "Finish RBAC end-to-end (frontend + backend)",
    "Ship one complete workflow: teacher → admin visibility",
    "Improve case studies with screenshots and metrics"
  ]
};

function useActiveChapter(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: "-10% 0px -70% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

function ChapterRail({ activeId }) {
  const reduce = useReducedMotion();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur px-4 py-4 w-[270px]">
        <div className="text-xs tracking-[0.22em] opacity-70 text-white">CHAPTERS</div>

        <div className="mt-3 space-y-2">
          {CHAPTERS.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollTo(c.id)}
                className={[
                  "w-full text-left rounded-2xl px-3 py-3 border transition",
                  "border-white/10",
                  isActive ? "bg-white/10" : "hover:bg-white/5"
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-[0.22em] text-white/70">{c.label}</div>
                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={reduce ? false : { opacity: 1, x: 0 }}
                        exit={reduce ? false : { opacity: 0, x: -6 }}
                        className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                      />
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="mt-1 text-sm font-semibold tracking-wide text-white">
                  {c.title}
                </div>
                <div className="text-xs text-white/70">{c.subtitle}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold
                       bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                       shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            Projects
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold
                       border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
          >
            About
          </Link>
        </div>
      </div>
    </aside>
  );
}

function SectionShell({ id, children }) {
  return (
    <section id={id} className="min-h-[100svh] snap-start flex items-center">
      <div className="max-w-5xl mx-auto px-4 py-16 w-full">{children}</div>
    </section>
  );
}

function ProofCard({ label, title, items }) {
  return (
    <PolishCard className="p-6">
      <div className="text-xs tracking-[0.22em] text-white/60">{label}</div>
      <div className="mt-2 text-lg font-bold text-white">{title}</div>

      <ul className="mt-3 space-y-2 text-white/75 list-disc pl-5">
        {(items || []).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </PolishCard>
  );
}

function FeatureCard({ to, emoji, title, desc }) {
  return (
    <PolishCard className="p-0">
      <Link to={to} className="group block p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/60">PROJECT</div>
            <div className="mt-2 text-2xl font-bold text-white">{title}</div>
            <div className="mt-2 text-white/70 max-w-3xl">{desc}</div>
          </div>

          <div className="hidden md:block h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/80">
            {emoji}
          </div>
        </div>

        <div className="mt-4 text-sm font-semibold text-white/85 group-hover:text-white transition">
          View case study →
        </div>
      </Link>
    </PolishCard>
  );
}

export default function Home() {
  const ids = useMemo(() => CHAPTERS.map((c) => c.id), []);
  const active = useActiveChapter(ids);

  return (
    <div className="relative">
      {/* Cinematic background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 opacity-85"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 10%, rgba(99,102,241,0.30), transparent 55%)," +
              "radial-gradient(900px 600px at 80% 15%, rgba(168,85,247,0.24), transparent 55%)," +
              "radial-gradient(1000px 700px at 50% 85%, rgba(14,165,233,0.18), transparent 60%)"
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")"
          }}
        />
      </div>

      <ChapterRail activeId={active} />

      <div className="snap-y snap-mandatory">
        {/* CHAPTER I */}
        <SectionShell id="awakening">
          <Reveal>
            <p className="text-xs tracking-[0.22em] text-white/70">CHAPTER I</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Clean systems.<span className="text-white/70"> Real progress.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              I’m Mohamed. I build web systems with clear structure, reliable workflows, and readable UI.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                           bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                           shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Explore projects <ArrowRight size={18} />
              </Link>

              <a
                href="https://github.com/mohamed-tz-dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                           border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
              >
                GitHub profile
              </a>
            </div>
          </Reveal>

          {/* PROOF (E) + STAGGER (C) + POLISH (F) */}
          <Reveal delay={0.05} className="mt-12">
            <div className="text-xs tracking-[0.22em] text-white/70">PROOF</div>
            <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-white">
              Evidence of progress
            </h3>
            <p className="mt-2 text-white/70 max-w-2xl">
              I document what is done, what is in progress, and what comes next.
            </p>

            <Stagger className="mt-6 grid md:grid-cols-3 gap-4">
              <Item><ProofCard label="COMPLETED" title="Working foundation" items={PROOF.completed} /></Item>
              <Item><ProofCard label="IN PROGRESS" title="Building now" items={PROOF.inProgress} /></Item>
              <Item><ProofCard label="NEXT" title="Next milestone" items={PROOF.next} /></Item>
            </Stagger>
          </Reveal>
        </SectionShell>

        {/* CHAPTER II */}
        <SectionShell id="work">
          <Reveal>
            <p className="text-xs tracking-[0.22em] text-white/70">CHAPTER II</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Featured projects
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              Two projects are in progress. Each has a case study that shows decisions and progress.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-4">
            <Item>
              <FeatureCard
                to="/projects/school-management-system"
                emoji="🏫"
                title="School Management System"
                desc="Role-based workflows for Headmaster and Teachers with clean permissions."
              />
            </Item>
            <Item>
              <FeatureCard
                to="/projects/ecommerce-website"
                emoji="🛒"
                title="E-commerce Website"
                desc="Clean product-to-cart flow designed to scale into orders and payments."
              />
            </Item>
          </Stagger>

          <Reveal delay={0.03} className="mt-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                         border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
            >
              View projects page <ArrowRight size={18} />
            </Link>
          </Reveal>
        </SectionShell>

        {/* CHAPTER III */}
        <SectionShell id="craft">
          <Reveal>
            <p className="text-xs tracking-[0.22em] text-white/70">CHAPTER III</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
              The craft
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              I focus on structure first, then polish. That keeps projects stable as they grow.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid md:grid-cols-3 gap-4">
            <Item>
              <PolishCard className="p-6">
                <div className="text-lg font-bold text-white">Structure first</div>
                <p className="mt-2 text-white/75">
                  Data shape, routes, and permissions come before styling.
                </p>
              </PolishCard>
            </Item>
            <Item>
              <PolishCard className="p-6">
                <div className="text-lg font-bold text-white">Small steps</div>
                <p className="mt-2 text-white/75">
                  Frequent commits. Each step stays testable and stable.
                </p>
              </PolishCard>
            </Item>
            <Item>
              <PolishCard className="p-6">
                <div className="text-lg font-bold text-white">Consistency</div>
                <p className="mt-2 text-white/75">
                  Same spacing and hierarchy across pages for readability.
                </p>
              </PolishCard>
            </Item>
          </Stagger>

          <Reveal delay={0.03} className="mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                         bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                         shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              See skills <ArrowRight size={18} />
            </Link>
          </Reveal>
        </SectionShell>

        {/* CHAPTER IV */}
        <SectionShell id="signal">
          <Reveal>
            <p className="text-xs tracking-[0.22em] text-white/70">CHAPTER IV</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Contact
            </h2>
            <p className="mt-4 max-w-2xl text-white/75">
              Email is the fastest way to reach me.
            </p>
          </Reveal>

          <Reveal delay={0.04} className="mt-7">
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:mohamedhalf360@gmail.com?subject=Project%20Inquiry"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                           bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                           shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Email me <ArrowRight size={18} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                           border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
              >
                Contact page
              </Link>
            </div>

            <div className="mt-10 text-xs tracking-[0.22em] text-white/50">
              © {new Date().getFullYear()} — mohamed-tz-dev
            </div>
          </Reveal>
        </SectionShell>
      </div>
    </div>
  );
}

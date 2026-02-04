import MiniHeader from "../components/MiniHeader";
import { Reveal, Stagger, Item } from "../components/Reveal";
import PolishCard from "../components/PolishCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function PageShell({ children }) {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(900px 600px at 25% 10%, rgba(99,102,241,0.20), transparent 55%)," +
              "radial-gradient(900px 600px at 80% 15%, rgba(168,85,247,0.16), transparent 55%)," +
              "radial-gradient(1000px 700px at 50% 85%, rgba(14,165,233,0.12), transparent 60%)"
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-14">{children}</div>
    </div>
  );
}

function Skill({ children }) {
  return (
    <span className="text-xs rounded-full px-3 py-1 border border-white/12 text-white/75">
      {children}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <PolishCard className="p-5">
      <div className="text-xs tracking-[0.22em] text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold text-white">{value}</div>
    </PolishCard>
  );
}

export default function About() {
  return (
    <PageShell>
      <MiniHeader />

      <Reveal className="mt-8">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.22em] text-white/70">ABOUT</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              I build stable systems with clean structure.
            </h1>
            <p className="text-white/70 max-w-2xl">
              I focus on role-based workflows, readable UI, and progress you can verify on GitHub.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                           bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                           shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                View projects <ArrowRight size={18} />
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="FOCUS" value="Systems" />
            <Stat label="STYLE" value="Clean UI" />
            <Stat label="WORKFLOW" value="RBAC" />
            <Stat label="PROOF" value="Case Studies" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.03} className="mt-10">
        <Stagger className="grid lg:grid-cols-3 gap-4">
          <Item>
            <PolishCard className="p-6">
              <div className="text-xs tracking-[0.22em] text-white/60">CORE SKILLS</div>
              <h3 className="mt-2 text-xl font-bold text-white">Stack I use</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "TailwindCSS", "Django", "PostgreSQL", "REST APIs", "Git & GitHub", "Linux"].map((s) => (
                  <Skill key={s}>{s}</Skill>
                ))}
              </div>
            </PolishCard>
          </Item>

          <Item>
            <PolishCard className="p-6">
              <div className="text-xs tracking-[0.22em] text-white/60">WORK PRINCIPLES</div>
              <h3 className="mt-2 text-xl font-bold text-white">How I work</h3>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-white/75">
                <li>Define structure first: routes, data, permissions.</li>
                <li>Build in small steps and commit frequently.</li>
                <li>Make UI readable before adding effects.</li>
              </ul>
            </PolishCard>
          </Item>

          <Item>
            <PolishCard className="p-6">
              <div className="text-xs tracking-[0.22em] text-white/60">CURRENT GOALS</div>
              <h3 className="mt-2 text-xl font-bold text-white">What I’m improving</h3>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-white/75">
                <li>Finish RBAC workflows end-to-end.</li>
                <li>Write strong case studies with real screenshots.</li>
                <li>Improve edge-case handling and UX polish.</li>
              </ul>
            </PolishCard>
          </Item>
        </Stagger>
      </Reveal>
    </PageShell>
  );
}

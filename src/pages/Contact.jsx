import MiniHeader from "../components/MiniHeader";
import { ArrowRight, Mail, Github } from "lucide-react";
import { Reveal, Stagger, Item } from "../components/Reveal";
import PolishCard from "../components/PolishCard";

function PageShell({ children }) {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(900px 600px at 30% 10%, rgba(99,102,241,0.18), transparent 55%)," +
              "radial-gradient(900px 600px at 80% 15%, rgba(168,85,247,0.14), transparent 55%)," +
              "radial-gradient(1000px 700px at 50% 85%, rgba(14,165,233,0.10), transparent 60%)"
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-14">{children}</div>
    </div>
  );
}

function ContactCard({ icon, title, subtitle, action, foot }) {
  return (
    <PolishCard className="p-6">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/80">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="text-white/70">{subtitle}</div>
        </div>
      </div>

      <div className="mt-5">{action}</div>

      {foot ? <div className="mt-4 text-white/60 text-sm">{foot}</div> : null}
    </PolishCard>
  );
}

export default function Contact() {
  return (
    <PageShell>
      <MiniHeader />

      <Reveal className="mt-8">
        <header className="space-y-3">
          <p className="text-xs tracking-[0.22em] text-white/70">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Work with me
          </h1>
          <p className="text-white/70 max-w-2xl">
            The fastest way is email. If you want to review code, use GitHub.
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.03} className="mt-10">
        <Stagger className="grid lg:grid-cols-2 gap-4">
          <Item>
            <ContactCard
              icon={<Mail size={18} />}
              title="Email"
              subtitle="Best for collaboration, questions, and feedback."
              action={
                <a
                  href="mailto:mohamedhalf360@gmail.com?subject=Project%20Inquiry"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                             bg-white text-black transition hover:opacity-95 active:scale-[0.99]
                             shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                >
                  Send email <ArrowRight size={18} />
                </a>
              }
              foot="mohamedhalf360@gmail.com"
            />
          </Item>

          <Item>
            <ContactCard
              icon={<Github size={18} />}
              title="GitHub"
              subtitle="Follow my progress and real commits."
              action={
                <a
                  href="https://github.com/mohamed-tz-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold
                             border border-white/15 text-white transition hover:bg-white/5 active:scale-[0.99]"
                >
                  Open GitHub <ArrowRight size={18} />
                </a>
              }
              foot="github.com/mohamed-tz-dev"
            />
          </Item>
        </Stagger>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <PolishCard className="p-6">
          <div className="text-xs tracking-[0.22em] text-white/60">NOTE</div>
          <p className="mt-2 text-white/75">
            If you are messaging about a project, include: goal, timeline, and key requirements.
          </p>
        </PolishCard>
      </Reveal>
    </PageShell>
  );
}

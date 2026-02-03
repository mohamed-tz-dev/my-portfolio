import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Github, Mail } from "lucide-react";
import { useActiveSection } from "../context/activeSection";

const navClass = ({ isActive }) =>
  [
    "block rounded-2xl px-3 py-2 text-sm transition",
    isActive
      ? "bg-indigo-600/10 text-indigo-700 dark:text-indigo-200 dark:bg-indigo-400/10 font-semibold"
      : "text-slate-700 dark:text-slate-200 opacity-90 hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
  ].join(" ");

function ChapterButton({ id, title, subtitle, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-2xl border px-3 py-3 transition",
        "border-slate-200/80 dark:border-slate-800/80",
        active
          ? "bg-indigo-600/10 text-indigo-700 dark:text-indigo-200 dark:bg-indigo-400/10"
          : "hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
      ].join(" ")}
      aria-label={`Go to ${title}`}
    >
      <div className="text-xs font-semibold tracking-wide opacity-80">{title}</div>
      <div className="text-sm opacity-85">{subtitle}</div>
    </button>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const { activeSection } = useActiveSection();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:justify-between lg:fixed lg:inset-y-0 lg:w-[320px]
                 border-r border-slate-200/70 dark:border-slate-800/70
                 bg-white/70 dark:bg-slate-950/70 backdrop-blur"
    >
      <div className="p-6 space-y-6">
        {/* Accent strip */}
        <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

        {/* Identity */}
        <div className="space-y-1">
          <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Mohamed<span className="opacity-60">.</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Clean structure. Steady progress. Real projects.
          </p>
        </div>

        {/* Main nav */}
        <nav className="space-y-2">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/projects" className={navClass}>Projects</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </nav>

        {/* Chapters (only on Home) */}
        {onHome ? (
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200 opacity-80">
              CHAPTERS
            </div>

            <div className="space-y-2">
              <ChapterButton
                id="intro"
                title="CHAPTER 1"
                subtitle="Introduction"
                active={activeSection === "intro"}
                onClick={() => scrollTo("intro")}
              />
              <ChapterButton
                id="work"
                title="CHAPTER 2"
                subtitle="Featured work"
                active={activeSection === "work"}
                onClick={() => scrollTo("work")}
              />
              <ChapterButton
                id="proof"
                title="CHAPTER 3"
                subtitle="Proof of work"
                active={activeSection === "proof"}
                onClick={() => scrollTo("proof")}
              />
              <ChapterButton
                id="cta"
                title="CHAPTER 4"
                subtitle="Contact"
                active={activeSection === "cta"}
                onClick={() => scrollTo("cta")}
              />
            </div>
          </div>
        ) : null}

        {/* Quick links */}
        <div className="space-y-2">
          <a
            href="https://github.com/mohamed-tz-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-sm
                       border-slate-200/80 dark:border-slate-800/80
                       text-slate-800 dark:text-slate-100
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            <Github size={16} /> GitHub
          </a>

          <a
            href="mailto:mohamedhalf360@gmail.com?subject=Project%20Inquiry"
            className="inline-flex w-full items-center gap-2 rounded-2xl border px-3 py-2 text-sm
                       border-slate-200/80 dark:border-slate-800/80
                       text-slate-800 dark:text-slate-100
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            <Mail size={16} /> Email
          </a>
        </div>
      </div>

      <div className="p-6 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/70">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()}
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}

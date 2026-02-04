import { NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-2xl text-sm font-semibold transition border border-white/10";
const linkInactive = "text-white/75 hover:bg-white/5";
const linkActive = "text-white bg-white/10";

export default function MiniHeader() {
  return (
    <header className="sticky top-0 z-40">
      {/* top blur bar */}
      <div className="border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/80">
              ✦
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-white tracking-tight">
                Mohamed <span className="text-white/55">• Chapters</span>
              </div>
              <div className="text-xs text-white/60">
                Clean structure • steady progress
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-2">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

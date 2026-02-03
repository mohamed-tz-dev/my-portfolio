import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const navClass = ({ isActive }) =>
  [
    "block rounded-2xl px-3 py-2 text-sm transition",
    isActive
      ? "bg-indigo-600/10 text-indigo-700 dark:text-indigo-200 dark:bg-indigo-400/10 font-semibold"
      : "text-slate-700 dark:text-slate-200 opacity-90 hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
  ].join(" ");

export default function MobileTopbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-800/70
                       bg-white/70 dark:bg-slate-950/70 backdrop-blur">
      <div className="px-4 py-3 flex items-center justify-between">
        <NavLink to="/" end className="font-bold tracking-tight">
          Mohamed<span className="opacity-60">.</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-2xl border px-3 py-2
                       border-slate-200/80 dark:border-slate-800/80
                       hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="px-4 pb-4 space-y-2">
          <NavLink to="/" end className={navClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navClass} onClick={() => setOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </nav>
      ) : null}
    </header>
  );
}

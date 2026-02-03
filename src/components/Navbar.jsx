import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const linkClass = ({ isActive }) =>
  [
    "px-3 py-2 rounded-2xl text-sm transition",
    "hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70",
    isActive ? "font-semibold bg-zinc-100/70 dark:bg-zinc-900/70" : "opacity-80 hover:opacity-100"
  ].join(" ");

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800/60
                       bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="font-bold tracking-tight text-lg">
          Mohamed<span className="opacity-60">.</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

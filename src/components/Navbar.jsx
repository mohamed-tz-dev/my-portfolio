import { NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-lg text-sm";
const linkActive = "font-semibold underline";
const linkIdle = "opacity-80 hover:opacity-100";

export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-lg">
          Mohamed
        </NavLink>

        <div className="flex gap-2">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

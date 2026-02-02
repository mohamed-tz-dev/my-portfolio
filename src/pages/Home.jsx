import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold leading-tight">
          I build clean web apps with React.
        </h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Portfolio inayoonyesha projects zangu, skills, na namna ninavyoandika code kwa “real workflow”.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/projects"
          className="rounded-xl border px-4 py-2 font-semibold"
        >
          View Projects
        </Link>
        <Link
          to="/contact"
          className="rounded-xl border px-4 py-2 opacity-80 hover:opacity-100"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}

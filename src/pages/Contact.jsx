import { useState } from "react";
import { Copy, Check, Github, Mail } from "lucide-react";

function ContactCard({ icon: Icon, label, value, href, onCopy, copied }) {
  return (
    <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6
                    bg-white/60 dark:bg-zinc-950/40 backdrop-blur space-y-3">
      <div className="flex items-center gap-2 opacity-80 text-sm">
        <Icon size={16} />
        <span>{label}</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="font-semibold underline underline-offset-4 hover:opacity-90 break-all"
          >
            {value}
          </a>
        ) : (
          <p className="font-semibold break-all">{value}</p>
        )}

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-sm
                     border-zinc-200/70 dark:border-zinc-800/70
                     hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // fallback: no clipboard permissions
      setCopiedKey(null);
      alert("Copy failed. Please copy manually.");
    }
  };

  const email = "mohamedhalf360@gmail.com";
  const github = "https://github.com/mohamed-tz-dev";

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
        <p className="opacity-80 max-w-2xl">
          Want to work together or ask a question? The fastest way is email. You can also find my code on GitHub.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <ContactCard
          icon={Mail}
          label="Email"
          value={email}
          href={`mailto:${email}`}
          copied={copiedKey === "email"}
          onCopy={() => copyText("email", email)}
        />
        <ContactCard
          icon={Github}
          label="GitHub"
          value={github}
          href={github}
          copied={copiedKey === "github"}
          onCopy={() => copyText("github", github)}
        />
      </div>

      <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 p-6
                      bg-white/60 dark:bg-zinc-950/40 backdrop-blur space-y-3">
        <h3 className="font-semibold">Quick note</h3>
        <p className="opacity-80 max-w-3xl">
          I usually reply within a reasonable time. When you email, please include a short message about your goal and
          timeline.
        </p>
      </div>
    </section>
  );
}

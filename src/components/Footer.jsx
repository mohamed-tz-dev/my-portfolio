export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm opacity-70">
        © {new Date().getFullYear()} Mohamed — All rights reserved.
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm opacity-70">
        © {new Date().getFullYear()} Mohamed — Built with React + Vite + Tailwind
      </div>
    </footer>
  );
}

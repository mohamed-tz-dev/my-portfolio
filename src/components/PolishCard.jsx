import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function PolishCard({
  children,
  className = "",
  as = "div",
  hoverLift = true
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const lift = !reduce && hoverLift;

  return (
    <motion.div
      ref={ref}
      as={as}
      onMouseMove={handleMove}
      whileHover={lift ? { y: -3 } : undefined}
      transition={{ duration: 0.16 }}
      className={[
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur",
        "transition-colors hover:bg-white/[0.09]",
        // spotlight
        "after:absolute after:inset-0 after:pointer-events-none after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        "after:bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(255,255,255,0.11),transparent_62%)]",
        // subtle inner outline
        "before:absolute before:inset-0 before:pointer-events-none before:rounded-3xl",
        "before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
        className
      ].join(" ")}
    >
      {/* content must be above pseudo layers */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

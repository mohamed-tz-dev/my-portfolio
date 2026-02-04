import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const reduce = useReducedMotion();

  if (reduce) {
    // Respect accessibility: no motion
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 opacity-85"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 10%, rgba(99,102,241,0.28), transparent 55%)," +
              "radial-gradient(900px 600px at 80% 15%, rgba(168,85,247,0.22), transparent 55%)," +
              "radial-gradient(1000px 700px at 50% 85%, rgba(14,165,233,0.16), transparent 60%)"
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.9), transparent 60%)"
        }}
        animate={{ x: [0, 140, 0], y: [0, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-10 -right-48 h-[580px] w-[580px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(168,85,247,0.9), transparent 60%)"
        }}
        animate={{ x: [0, -160, 0], y: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-64 left-1/3 h-[720px] w-[720px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.9), transparent 60%)"
        }}
        animate={{ x: [0, -120, 0], y: [0, -70, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft overlay gradient to unify */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 700px at 50% 10%, rgba(255,255,255,0.06), transparent 60%)," +
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.70))"
        }}
      />

      {/* Drifting grid (super subtle) */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
        animate={{ backgroundPositionX: [0, 200], backgroundPositionY: [0, 120] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Film grain (static but gives premium feel) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")"
        }}
      />
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";

/* ── Type metadata ─────────────────────────────────────────── */
const TYPE_ICONS: Record<string, string> = {
  achievement: "🏆",
  platform:    "🖥️",
  education:   "🎓",
  competition: "⚔️",
};

const TYPE_COLORS: Record<string, string> = {
  achievement: "border-cyber-green  bg-cyber-green/10  text-cyber-green",
  platform:    "border-cyber-blue   bg-cyber-blue/10   text-cyber-blue",
  education:   "border-neon-purple  bg-neon-purple/10  text-neon-purple",
  competition: "border-neon-pink    bg-neon-pink/10    text-neon-pink",
};

const DOT_COLORS: Record<string, string> = {
  achievement: "#00ff88",
  platform:    "#00d4ff",
  education:   "#bf5af2",
  competition: "#ff2d78",
};

/* ── Shared card ───────────────────────────────────────────── */
function TimelineCard({
  item,
  i,
  inView,
}: {
  item: (typeof experience)[number];
  i: number;
  inView: boolean;
}) {
  return (
    <div className="glass-card rounded-xl p-4">
      {/* Badge row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border ${TYPE_COLORS[item.type]}`}
        >
          {TYPE_ICONS[item.type]} {item.type}
        </span>
        <span className="text-xs text-slate-500 font-mono">{item.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-white text-sm md:text-base mb-1 leading-snug">
        {item.title}
      </h3>

      {/* Org + marks */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <p className="text-cyber-green text-xs font-mono">{item.org}</p>
        {"marks" in item && item.marks && (
          <motion.span
            initial={{ opacity: 0, scale: 0.75 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold border border-green-500/30 bg-green-500/10 text-green-400"
            style={{ boxShadow: "0 0 8px rgba(34,197,94,0.15)" }}
          >
            🎯 {item.marks}
          </motion.span>
        )}
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

/* ── Desktop centre dot ─────────────────────────────────────── */
function TimelineDot({ color = "#00ff88" }: { color?: string }) {
  return (
    <div
      className="w-5 h-5 rounded-full bg-dark-base border-2 flex items-center justify-center z-10 flex-shrink-0"
      style={{ borderColor: color, boxShadow: `0 0 10px ${color}60` }}
    >
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main section
═══════════════════════════════════════════════════════════════ */
export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ git log --oneline
          </p>
          <h2 className="section-header text-white">
            My <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            MOBILE LAYOUT  (< md)
            Two-column: [40px gutter | flex-1 card]
            The gutter holds the dot+track so they NEVER overlap
        ═══════════════════════════════════════════════════════ */}
        <div className="md:hidden">
          {experience.map((item, i) => {
            const dotColor = DOT_COLORS[item.type] ?? "#00ff88";
            const isLast   = i === experience.length - 1;

            return (
              <motion.div
                key={`mob-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                /* Two-column flex: gutter + card */
                className="flex gap-0 items-stretch"
                style={{ marginBottom: isLast ? 0 : "1.25rem" }}
              >
                {/* ── Left gutter: track + dot ── */}
                <div className="flex flex-col items-center flex-shrink-0 w-10">
                  {/* Top connector — hidden on first item so track starts at dot */}
                  <div
                    className="w-px flex-none"
                    style={{
                      height: "20px",               /* ~half card-top padding */
                      background: i === 0
                        ? "transparent"
                        : "linear-gradient(to bottom, #1a2035, #1a2035)",
                    }}
                  />

                  {/* Dot */}
                  <div
                    className="rounded-full flex-shrink-0 flex items-center justify-center bg-dark-base border-2 z-10"
                    style={{
                      width: "18px",
                      height: "18px",
                      borderColor: dotColor,
                      boxShadow: `0 0 8px ${dotColor}70`,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{ width: "7px", height: "7px", background: dotColor }}
                    />
                  </div>

                  {/* Bottom connector — draw line down to next item, hidden on last */}
                  {!isLast && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{
                        minHeight: "24px",
                        background:
                          "linear-gradient(to bottom, #1a2035 0%, #1a2035 100%)",
                      }}
                    />
                  )}
                </div>

                {/* ── Right column: card ── */}
                <div className="flex-1 min-w-0 pb-0">
                  <TimelineCard item={item} i={i} inView={inView} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════
            DESKTOP LAYOUT  (≥ md)
            Alternating left / right, timeline line in centre
        ═══════════════════════════════════════════════════════ */}
        <div className="relative max-w-3xl mx-auto hidden md:block">
          {/* Centre vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-dark-border overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-cyber-green via-cyber-blue to-neon-purple"
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          {experience.map((item, i) => {
            const isLeft   = i % 2 === 0;
            const dotColor = DOT_COLORS[item.type] ?? "#00ff88";
            return (
              <motion.div
                key={`desk-${i}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className={`relative flex items-start mb-10 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Dot pinned to centre */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 z-10">
                  <TimelineDot color={dotColor} />
                </div>

                {/* Card — 45% wide, pushed to the correct side */}
                <div className={`w-[45%] ${isLeft ? "mr-auto pr-6" : "ml-auto pl-6"}`}>
                  <TimelineCard item={item} i={i} inView={inView} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

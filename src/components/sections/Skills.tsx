"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";
import RadarChart from "@/components/3d/RadarChart";

const CATEGORIES = [
  {
    key: "offensive" as const,
    label: "Offensive Security",
    icon: "🗡️",
    color: "#00ff88",
    glowColor: "rgba(0,255,136,0.5)",
    textColor: "text-cyber-green",
  },
  {
    key: "programming" as const,
    label: "Programming",
    icon: "💻",
    color: "#00d4ff",
    glowColor: "rgba(0,212,255,0.5)",
    textColor: "text-cyber-blue",
  },
  {
    key: "tools" as const,
    label: "Security Tools",
    icon: "🔧",
    color: "#bf5af2",
    glowColor: "rgba(191,90,242,0.5)",
    textColor: "text-neon-purple",
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding grid-bg" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ skill --list --verbose
          </p>
          <h2 className="section-header text-white">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        {/* Radar charts grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 self-start">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className={`font-mono font-bold text-sm ${cat.textColor}`}>
                  {cat.label}
                </h3>
              </div>

              {/* Radar chart */}
              <RadarChart
                data={skills[cat.key]}
                color={cat.color}
                glowColor={cat.glowColor}
                size={200}
              />

              {/* Legend */}
              <div className="mt-4 w-full space-y-1.5">
                {skills[cat.key].map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">{skill.name}</span>
                    <span style={{ color: cat.color }} className="font-bold">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom panel — unchanged */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,255,136,0.04) 0%, transparent 70%)",
            }}
          />
          <p className="font-mono text-sm text-slate-400 mb-2">
            <span className="text-cyber-green">[SYSTEM]</span> Skill acquisition in progress...
          </p>
          <p className="text-xs text-slate-500 font-mono">
            Continuously learning · OSCP In Progress · Next: Advanced Exploit Development
          </p>
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {["OSCP Prep", "Exploit Dev", "Red Team", "Malware Analysis"].map((cert) => (
              <span key={cert} className="tag-chip">{cert}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

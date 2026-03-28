"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";

type SkillBar = { name: string; level: number };

function SkillBar({ name, level, delay, color }: SkillBar & { delay: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 font-mono">{name}</span>
        <span className={`text-xs font-mono font-bold ${color}`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color.includes("green") ? "bg-cyber-green" : color.includes("blue") ? "bg-cyber-blue" : "bg-neon-purple"}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          style={{
            boxShadow: color.includes("green")
              ? "0 0 8px rgba(0,255,136,0.5)"
              : color.includes("blue")
              ? "0 0 8px rgba(0,212,255,0.5)"
              : "0 0 8px rgba(191,90,242,0.5)",
          }}
        />
      </div>
    </div>
  );
}

const CATEGORIES = [
  {
    key: "offensive" as const,
    label: "Offensive Security",
    icon: "🗡️",
    color: "text-cyber-green",
    barColor: "text-cyber-green",
  },
  {
    key: "programming" as const,
    label: "Programming",
    icon: "💻",
    color: "text-cyber-blue",
    barColor: "text-cyber-blue",
  },
  {
    key: "tools" as const,
    label: "Security Tools",
    icon: "🔧",
    color: "text-neon-purple",
    barColor: "text-neon-purple",
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

        <div className="grid md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.5 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className={`font-mono font-bold text-sm ${cat.color}`}>
                  {cat.label}
                </h3>
              </div>
              <div className="space-y-4">
                {skills[cat.key].map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={ci * 0.15 + si * 0.1}
                    color={cat.barColor}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Radar-style decoration */}
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
          <div className="mt-4 flex justify-center gap-2">
            {["OSCP Prep", "Exploit Dev", "Red Team", "Malware Analysis"].map((cert) => (
              <span key={cert} className="tag-chip">{cert}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

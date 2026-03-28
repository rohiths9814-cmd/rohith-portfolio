"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, ExternalLink, Lock, Filter } from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type FilterType = "All" | "Web Security" | "Tools" | "Labs" | "CTF";
const FILTERS: FilterType[] = ["All", "Web Security", "Tools", "Labs", "CTF"];

const COLOR_MAP: Record<string, string> = {
  "cyber-green": "border-cyber-green/20 hover:border-cyber-green/40 hover:shadow-cyber",
  "cyber-blue": "border-cyber-blue/20 hover:border-cyber-blue/40 hover:shadow-cyber-blue",
  "neon-purple": "border-neon-purple/20 hover:border-neon-purple/40",
  "neon-pink": "border-neon-pink/20 hover:border-neon-pink/40",
};

const BADGE_MAP: Record<string, string> = {
  "cyber-green": "text-cyber-green bg-cyber-green/10 border-cyber-green/25",
  "cyber-blue": "text-cyber-blue bg-cyber-blue/10 border-cyber-blue/25",
  "neon-purple": "text-neon-purple bg-neon-purple/10 border-neon-purple/25",
  "neon-pink": "text-neon-pink bg-neon-pink/10 border-neon-pink/25",
};

function tagMatchesFilter(tags: string[], filter: FilterType): boolean {
  if (filter === "All") return true;
  const map: Record<FilterType, string[]> = {
    All: [],
    "Web Security": ["XSS", "SQLi", "OWASP", "Web Security"],
    Tools: ["Automation", "Detection", "DFIR"],
    Labs: ["Red Team", "Full Engagement", "Labs"],
    CTF: ["CTF", "HackTheBox", "TryHackMe"],
  };
  return tags.some((t) => map[filter].includes(t));
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = projects.filter((p) =>
    tagMatchesFilter(p.tags, activeFilter)
  );

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ ls -la ./projects
          </p>
          <h2 className="section-header text-white mb-6">
            Featured <span className="gradient-text">Work</span>
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-slate-500" />
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-4 py-2 rounded font-mono text-xs transition-all duration-300",
                  activeFilter === f
                    ? "bg-cyber-green/15 border border-cyber-green/40 text-cyber-green"
                    : "border border-dark-border text-slate-500 hover:border-slate-600 hover:text-slate-300"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={cn(
                "glass-card rounded-2xl p-6 flex flex-col gap-4 border transition-all duration-300 group",
                COLOR_MAP[project.color] || COLOR_MAP["cyber-green"]
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Lock className={cn(
                    "w-4 h-4 transition-colors",
                    `text-${project.color === "cyber-green" ? "[#00ff88]" : project.color === "cyber-blue" ? "[#00d4ff]" : project.color === "neon-purple" ? "[#bf5af2]" : "[#ff2d78]"}`
                  )} />
                  {project.featured && (
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-mono", BADGE_MAP[project.color])}>
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyber-green transition-colors"
                    aria-label="GitHub"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyber-blue transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title + desc */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyber-green transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-chip text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mt-auto pt-4 border-t border-dark-border">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-slate-500 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono">
            No projects matched that filter.
          </div>
        )}
      </div>
    </section>
  );
}

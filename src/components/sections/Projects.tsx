"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, Lock, Filter, Play, X, RotateCcw } from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import FlipCard from "@/components/FlipCard";
import TiltCard from "@/components/3d/TiltCard";
import { useIsMobile } from "@/hooks/useIsMobile";

type FilterType = "All" | "Web Security" | "Tools" | "Labs" | "CTF";
const FILTERS: FilterType[] = ["All", "Web Security", "Tools", "Labs", "CTF"];

/* ── Color mappings ── */
const COLOR_MAP: Record<string, string> = {
  "cyber-green":  "border-cyber-green/20 hover:border-cyber-green/50",
  "cyber-blue":   "border-cyber-blue/20  hover:border-cyber-blue/50",
  "neon-purple":  "border-neon-purple/20 hover:border-neon-purple/50",
  "neon-pink":    "border-neon-pink/20   hover:border-neon-pink/50",
};

const GLOW_CLASS: Record<string, string> = {
  "cyber-green":  "glow-green",
  "cyber-blue":   "glow-blue",
  "neon-purple":  "glow-purple",
  "neon-pink":    "glow-pink",
};

const BADGE_MAP: Record<string, string> = {
  "cyber-green":  "text-cyber-green  bg-cyber-green/10  border-cyber-green/25",
  "cyber-blue":   "text-cyber-blue   bg-cyber-blue/10   border-cyber-blue/25",
  "neon-purple":  "text-neon-purple  bg-neon-purple/10  border-neon-purple/25",
  "neon-pink":    "text-neon-pink    bg-neon-pink/10    border-neon-pink/25",
};

const ACCENT_HEX: Record<string, string> = {
  "cyber-green":  "#00ff88",
  "cyber-blue":   "#00d4ff",
  "neon-purple":  "#bf5af2",
  "neon-pink":    "#ff2d78",
};

const LOCK_COLOR: Record<string, string> = {
  "cyber-green":  "text-[#00ff88]",
  "cyber-blue":   "text-[#00d4ff]",
  "neon-purple":  "text-[#bf5af2]",
  "neon-pink":    "text-[#ff2d78]",
};

/* ── Filter helper ── */
function tagMatchesFilter(tags: string[], filter: FilterType): boolean {
  if (filter === "All") return true;
  const map: Record<FilterType, string[]> = {
    All: [],
    "Web Security": ["XSS", "SQLi", "OWASP", "Web Security"],
    Tools:          ["Automation", "Detection", "DFIR"],
    Labs:           ["Red Team", "Full Engagement", "Labs"],
    CTF:            ["CTF", "HackTheBox", "TryHackMe"],
  };
  return tags.some((t) => map[filter].includes(t));
}

/* ── Demo media back-face ── */
function DemoBackFace({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  const accent = ACCENT_HEX[project.color] ?? "#00ff88";
  const isVideo =
    typeof project.demoFile === "string" &&
    project.demoFile.endsWith(".mp4");
  const isImage =
    typeof project.demoFile === "string" &&
    !project.demoFile.endsWith(".mp4");

  return (
    <div
      className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full border"
      style={{ borderColor: `${accent}33` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-mono font-semibold tracking-widest uppercase"
          style={{ color: accent }}
        >
          ▶ Demo
        </span>
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Media */}
      <div className="flex-1 rounded-lg overflow-hidden bg-dark-base/60 flex items-center justify-center min-h-0">
        {isVideo && (
          <video
            src={project.demoFile as string}
            controls
            playsInline
            preload="none"
            className="w-full h-full object-contain rounded"
            style={{ maxHeight: "200px" }}
          >
            Your browser does not support the video tag.
          </video>
        )}

        {isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.demoFile as string}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-full object-contain rounded"
            style={{ maxHeight: "200px" }}
          />
        )}

        {!project.demoFile && (
          <div className="flex flex-col items-center gap-2 text-slate-500 font-mono text-xs text-center px-4">
            <Play className="w-8 h-8 opacity-30" />
            <p>No local demo file.</p>
            <p className="text-slate-600">
              Drop a file in{" "}
              <span className="text-slate-400">/public/demo/</span> and set{" "}
              <span className="text-slate-400">demoFile</span> in portfolio.ts
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        onClick={onClose}
        className="flex items-center justify-center gap-2 text-xs font-mono py-2 px-4 rounded border border-dark-border text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-200"
      >
        <RotateCcw className="w-3 h-3" />
        Flip back
      </button>
    </div>
  );
}

/* ── Project card front face ── */
function ProjectFront({
  project,
  onDemoClick,
}: {
  project: (typeof projects)[number];
  onDemoClick: () => void;
}) {
  const accent = ACCENT_HEX[project.color] ?? "#00ff88";
  const hasDemoAction = !!(project.demo || project.demoFile);

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 flex flex-col gap-4 border h-full transition-all duration-300 group",
        COLOR_MAP[project.color] ?? COLOR_MAP["cyber-green"],
        GLOW_CLASS[project.color] ?? "glow-green"
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Lock
            className={cn(
              "w-4 h-4 transition-colors",
              LOCK_COLOR[project.color]
            )}
          />
          {project.featured && (
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border font-mono",
                BADGE_MAP[project.color]
              )}
            >
              Featured
            </span>
          )}
        </div>

        {/* Action icons — visible on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyber-green transition-colors"
            aria-label="GitHub repository"
            onClick={(e) => e.stopPropagation()}
          >
            <Code2 className="w-4 h-4" />
          </a>
          {project.demo && !project.demoFile && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyber-blue transition-colors"
              aria-label="External demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h3
          className="text-white font-semibold text-lg mb-2 group-hover:transition-colors"
          style={{ transition: "color 0.2s" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLHeadingElement).style.color = accent)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLHeadingElement).style.color = "white")
          }
        >
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

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-dark-border flex items-center justify-between gap-3">
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-slate-500 font-mono">
              {t}
            </span>
          ))}
        </div>

        {/* Demo button */}
        {hasDemoAction && (
          <button
            onClick={() => {
              if (project.demoFile) {
                onDemoClick();
              } else if (project.demo) {
                window.open(project.demo, "_blank", "noopener,noreferrer");
              }
            }}
            className="demo-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold border transition-all duration-200"
            style={{
              borderColor: `${accent}50`,
              color: accent,
              background: `${accent}0d`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `${accent}1a`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 12px ${accent}40`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `${accent}0d`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
            aria-label={project.demoFile ? "View demo (flip card)" : "Open external demo"}
          >
            {project.demoFile ? (
              <>
                <Play className="w-3 h-3" />
                Demo
              </>
            ) : (
              <>
                <ExternalLink className="w-3 h-3" />
                Live
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Projects section
═══════════════════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const filtered = projects.filter((p) =>
    tagMatchesFilter(p.tags, activeFilter)
  );

  const handleFlip = useCallback((id: number) => {
    setFlippedId((prev) => (prev === id ? null : id));
  }, []);

  const handleFilterChange = (f: FilterType) => {
    setFlippedId(null);
    setActiveFilter(f);
  };

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* ── Header ── */}
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
                onClick={() => handleFilterChange(f)}
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

        {/* ── Project grid ── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="relative"
                style={{ minHeight: "360px" }}
              >
                <TiltCard
                  glowColor={ACCENT_HEX[project.color] ?? "#00ff88"}
                  disabled={isMobile}
                  className="w-full h-full"
                >
                  <FlipCard
                    isFlipped={flippedId === project.id}
                    className="w-full h-full"
                    front={
                      <ProjectFront
                        project={project}
                        onDemoClick={() => handleFlip(project.id)}
                      />
                    }
                    back={
                      <DemoBackFace
                        project={project}
                        onClose={() => setFlippedId(null)}
                      />
                    }
                  />
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
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

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Eye, Target, Skull, AlertTriangle, Activity, Lock, Wifi } from "lucide-react";

/* ── Attack methodology phases ─────────────────────────────── */
const PHASES = [
  {
    icon: Eye,
    title: "Reconnaissance",
    cmd: "$ nmap -sn 192.168.1.0/24",
    description: "Passive & active information gathering. OSINT, DNS enumeration, subdomain discovery, network mapping.",
    color: "#00ff88",
    tools: ["Nmap", "theHarvester", "Shodan", "Recon-ng"],
  },
  {
    icon: Target,
    title: "Scanning & Enumeration",
    cmd: "$ nmap -sV -sC -p- target.com",
    description: "Port scanning, service detection, vulnerability assessment. Identifying attack vectors.",
    color: "#00d4ff",
    tools: ["Nmap", "Nikto", "Dirb", "enum4linux"],
  },
  {
    icon: Skull,
    title: "Exploitation",
    cmd: "$ msfconsole -x 'use exploit/...'",
    description: "Leveraging discovered vulnerabilities. Web app attacks, privilege escalation, buffer overflows.",
    color: "#bf5af2",
    tools: ["Metasploit", "Burp Suite", "SQLMap", "Hydra"],
  },
  {
    icon: Lock,
    title: "Post-Exploitation",
    cmd: "$ python3 -c 'import pty;pty.spawn(\"/bin/bash\")'",
    description: "Maintaining access, pivoting, data exfiltration simulation. Documenting findings.",
    color: "#ff2d78",
    tools: ["Mimikatz", "BloodHound", "LinPEAS", "Chisel"],
  },
];

/* ── Threat stats ──────────────────────────────────────────── */
const STATS = [
  { label: "Vulnerabilities Found", value: "50+", icon: AlertTriangle },
  { label: "CTF Challenges", value: "50+", icon: Shield },
  { label: "Networks Tested", value: "10+", icon: Wifi },
  { label: "Reports Written", value: "15+", icon: Activity },
];

/* ── Typing animation hook ─────────────────────────────────── */
function useTypeText(text: string, active: boolean, speed = 30) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);

  return displayed;
}

/* ── Phase card ────────────────────────────────────────────── */
function PhaseCard({
  phase,
  index,
  inView,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = phase.icon;
  const typed = useTypeText(phase.cmd, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
      className="security-panel group"
      style={{
        borderColor: `${phase.color}20`,
        ["--panel-glow" as string]: `${phase.color}08`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${phase.color}12`, border: `1px solid ${phase.color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color: phase.color }} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded"
              style={{ background: `${phase.color}15`, color: phase.color }}
            >
              PHASE {index + 1}
            </span>
          </div>
          <h4 className="text-white font-semibold text-sm mt-0.5">{phase.title}</h4>
        </div>
      </div>

      {/* Terminal command */}
      <div className="bg-dark-base/80 rounded-lg p-3 mb-3 border border-dark-border/50 font-mono text-xs">
        <span className="text-cyber-green">{typed}</span>
        <span className="animate-blink text-cyber-green">█</span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs leading-relaxed mb-3">{phase.description}</p>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5">
        {phase.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs font-mono px-2 py-0.5 rounded-full border"
            style={{
              borderColor: `${phase.color}25`,
              color: phase.color,
              background: `${phase.color}08`,
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${phase.color}60, transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main SecurityDashboard section
═══════════════════════════════════════════════════════════════ */
export default function SecurityDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" });

  return (
    <section id="security" className="section-padding grid-bg" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ sudo ./attack_methodology.sh
          </p>
          <h2 className="section-header text-white">
            Security <span className="gradient-text">Mindset</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl">
            Thinking like an attacker to build better defenses. Here&apos;s how I approach
            security assessments — methodically, ethically, and thoroughly.
          </p>
        </motion.div>

        {/* Phase grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.title} phase={phase} index={i} inView={inView} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-mono text-xs text-cyber-green tracking-widest">
              SYSTEM STATUS: ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <Icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold font-mono text-cyber-green glow-text-green">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Scan line decoration */}
          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent" />
          <p className="mt-4 text-center text-xs text-slate-500 font-mono">
            <span className="text-cyber-green">[INFO]</span> All testing conducted on authorized
            targets only — responsible disclosure practices followed
          </p>
        </motion.div>
      </div>
    </section>
  );
}

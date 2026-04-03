"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Terminal, ChevronDown, Shield, Download, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { personalInfo } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ── Lazy-loaded 3D / FX components ────────────────────────── */
const ParticleNetwork = dynamic(() => import("@/components/3d/ParticleNetwork"), {
  ssr: false,
});
const MatrixRain = dynamic(() => import("@/components/fx/MatrixRain"), {
  ssr: false,
});

const TITLES = [
  "Cybersecurity Specialist",
  "Ethical Hacker",
  "Security Researcher",
  "Bug Bounty Hunter",
  "Penetration Tester",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const isMobile = useIsMobile();

  /* ── Mouse parallax for text ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const textX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const textY = useTransform(mouseY, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (isMobile) return;
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [isMobile, mouseX, mouseY]);

  /* ── Typewriter effect ── */
  const typewrite = useCallback(() => {
    const current = TITLES[titleIndex];
    if (!isDeleting && charIdx < current.length) {
      setDisplayed(current.slice(0, charIdx + 1));
      setCharIdx((c) => c + 1);
    } else if (!isDeleting && charIdx === current.length) {
      setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIdx > 0) {
      setDisplayed(current.slice(0, charIdx - 1));
      setCharIdx((c) => c - 1);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }
  }, [titleIndex, charIdx, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? 50 : 90;
    const timer = setTimeout(typewrite, speed);
    return () => clearTimeout(timer);
  }, [typewrite, isDeleting]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* 3D Particle Network (desktop) / Matrix Rain (mobile) */}
      {isMobile ? <MatrixRain /> : <ParticleNetwork />}

      {/* Radial glow */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" aria-hidden />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* CRT Scanline overlay */}
      <div className="crt-scanlines" aria-hidden />

      {/* Content */}
      <motion.div
        className="container-custom relative z-10 text-center"
        style={isMobile ? {} : { x: textX, y: textY }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyber-green/20 text-xs font-mono text-cyber-green mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          {personalInfo.available ? "Available for opportunities" : "Not currently available"}
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="section-header gradient-text mb-4 relative"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Typewriter title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center items-center gap-2 text-xl md:text-2xl font-mono text-slate-300 mb-6 h-10"
        >
          <Shield className="w-5 h-5 text-cyber-green flex-shrink-0" />
          <span className="text-cyber-green glow-text-green">{displayed}</span>
          <span className="text-cyber-green animate-blink text-2xl font-light">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 text-lg max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          Breaking things responsibly — finding vulnerabilities before the bad guys do.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="cyber-btn cyber-btn-solid text-sm"
          >
            <Terminal className="w-4 h-4" />
            View Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="cyber-btn text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            Contact Me
          </button>
          <button
            className="cyber-btn text-sm border-slate-700 text-slate-500 cursor-not-allowed opacity-60 relative group"
            disabled
            title="CV coming soon"
          >
            <Download className="w-4 h-4" />
            Download CV
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-dark-card border border-dark-border px-2 py-1 rounded font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Coming soon
            </span>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex justify-center gap-12 mt-16"
        >
          {[
            { val: "50+", label: "CTF Challenges" },
            { val: "10+", label: "Projects" },
            { val: "100+", label: "THM Rooms" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold font-mono text-cyber-green glow-text-green">
                {val}
              </div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyber-green transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}

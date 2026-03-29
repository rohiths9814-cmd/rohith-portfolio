"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { motion, useInView } from "framer-motion";
import { projects, skills, personalInfo } from "@/data/portfolio";

/* ─── Types ─────────────────────────────────────────────────── */
type Line = { type: "cmd" | "out" | "err" | "info"; text: string };

const PROMPT = "rohith@portfolio:~$";

/* ─── Banner lines (shown on load and after clear) ───────────── */
const BANNER_LINES: Line[] = [
  { type: "info", text: "  ██████╗  ██████╗ ██╗  ██╗██╗████████╗██╗  ██╗" },
  { type: "info", text: "  ██╔══██╗██╔═══██╗██║  ██║██║╚══██╔══╝██║  ██║" },
  { type: "info", text: "  ██████╔╝██║   ██║███████║██║   ██║   ███████║" },
  { type: "info", text: "  ██╔══██╗██║   ██║██╔══██║██║   ██║   ██╔══██║" },
  { type: "info", text: "  ██║  ██║╚██████╔╝██║  ██║██║   ██║   ██║  ██║" },
  { type: "out",  text: "  ─────────────────────────────────────────────" },
  { type: "out",  text: "  Cybersecurity Specialist │ Ethical Hacker │ Researcher" },
  { type: "out",  text: "" },
  { type: "out",  text: "  Type 'help' to see available commands." },
  { type: "out",  text: "" },
];

const CMD_HISTORY_MAX = 50;

/* ─── Command registry ─────────────────────────────────────── */
function buildOutput(cmd: string): Line[] {
  const raw = cmd.trim().toLowerCase();
  const [base, ...args] = raw.split(/\s+/);

  switch (base) {
    /* ── help ── */
    case "help":
      return [
        { type: "info", text: "┌──── Available Commands ────────────────────────┐" },
        { type: "out",  text: "  help        Show this help menu" },
        { type: "out",  text: "  whoami      About Rohith S" },
        { type: "out",  text: "  projects    List featured projects" },
        { type: "out",  text: "  skills      Show skill categories" },
        { type: "out",  text: "  contact     Display contact info" },
        { type: "out",  text: "  social      Social media links" },
        { type: "out",  text: "  banner      Show welcome banner" },
        { type: "out",  text: "  clear       Clear the terminal" },
        { type: "info", text: "└────────────────────────────────────────────────┘" },
      ];

    /* ── whoami ── */
    case "whoami":
      return [
        { type: "info", text: `╔══ ${personalInfo.name} ══╗` },
        { type: "out",  text: `  Role    : ${personalInfo.title}` },
        { type: "out",  text: `  Focus   : ${personalInfo.tagline}` },
        { type: "out",  text: `  Location: ${personalInfo.location}` },
        { type: "out",  text: `  Status  : ${personalInfo.available ? "✅ Open to opportunities" : "🔴 Not available"}` },
        { type: "out",  text: "" },
        { type: "out",  text: `  ${personalInfo.bio.split("\n")[0]}` },
      ];

    /* ── projects ── */
    case "projects": {
      const idx = args[0] ? parseInt(args[0]) - 1 : -1;
      if (idx >= 0 && projects[idx]) {
        const p = projects[idx];
        return [
          { type: "info", text: `── Project #${idx + 1}: ${p.title} ──` },
          { type: "out",  text: `  ${p.description}` },
          { type: "out",  text: "" },
          { type: "out",  text: `  Tech  : ${p.tech.join(", ")}` },
          { type: "out",  text: `  Tags  : ${p.tags.join(", ")}` },
          { type: "out",  text: `  GitHub: ${p.github}` },
          ...(p.demo ? [{ type: "out" as const, text: `  Demo  : ${p.demo}` }] : []),
        ];
      }
      return [
        { type: "info", text: "── Featured Projects ──────────────────────────" },
        ...projects.map((p, i) => ({
          type: "out" as const,
          text: `  [${i + 1}] ${p.title}${p.featured ? " ★" : ""}  —  ${p.tech.slice(0, 3).join(", ")}`,
        })),
        { type: "out", text: "" },
        { type: "out", text: "  Usage: projects <number>  →  show project details" },
      ];
    }

    /* ── skills ── */
    case "skills": {
      const cat = args[0];
      if (cat === "offensive" || cat === "programming" || cat === "tools") {
        const list = skills[cat as keyof typeof skills];
        return [
          { type: "info", text: `── ${cat.toUpperCase()} ──────────────────────────────` },
          ...list.map((s) => {
            const filled = Math.round(s.level / 10);
            const bar = "█".repeat(filled) + "░".repeat(10 - filled);
            return { type: "out" as const, text: `  ${s.name.padEnd(22)} [${bar}] ${s.level}%` };
          }),
        ];
      }
      return [
        { type: "info", text: "── Skill Categories ───────────────────────────" },
        { type: "out",  text: "  skills offensive    → Penetration testing skills" },
        { type: "out",  text: "  skills programming  → Programming languages" },
        { type: "out",  text: "  skills tools        → Security tools" },
      ];
    }

    /* ── contact ── */
    case "contact":
      return [
        { type: "info", text: "── Contact Info ───────────────────────────────" },
        { type: "out",  text: `  📧 Email   : ${personalInfo.email}` },
        { type: "out",  text: `  📍 Location: ${personalInfo.location}` },
        { type: "out",  text: `  ⚡ Status  : ${personalInfo.available ? "Available for work" : "Unavailable"}` },
        { type: "out",  text: "" },
        { type: "out",  text: "  Scroll down to the contact form to send a message ↓" },
      ];

    /* ── social ── */
    case "social":
      return [
        { type: "info", text: "── Social Links ───────────────────────────────" },
        { type: "out",  text: `  🐙 GitHub  : ${personalInfo.github}` },
        { type: "out",  text: `  💼 LinkedIn: ${personalInfo.linkedin}` },
        { type: "out",  text: `  🐦 Twitter : ${personalInfo.twitter}` },
      ];

    /* ── banner ── */
    case "banner":
      return BANNER_LINES;

    /* ── clear ── */
    case "clear":
      return [{ type: "cmd", text: "__CLEAR__" }];

    /* ── empty ── */
    case "":
      return [];

    /* ── unknown ── */
    default:
      return [
        { type: "err", text: `bash: ${base}: command not found` },
        { type: "out", text: "  Type 'help' to see available commands." },
      ];
  }
}

/* ─── Component ────────────────────────────────────────────── */
export default function TerminalSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const bodyRef      = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);
  const inView       = useInView(sectionRef, { once: true, margin: "-80px" });

  const [history,    setHistory]    = useState<Line[]>(BANNER_LINES);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [input,      setInput]      = useState("");
  const [isTyping,   setIsTyping]   = useState(false);

  /* Auto-scroll to bottom whenever history changes */
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  /* Focus input on section click */
  const focusInput = () => inputRef.current?.focus();

  const submit = useCallback(() => {
    if (isTyping) return;
    const cmd = input.trim();

    if (cmd) {
      setCmdHistory((prev) => [cmd, ...prev].slice(0, CMD_HISTORY_MAX));
    }
    setHistoryIdx(-1);
    setInput("");

    const output = buildOutput(cmd);

    /* Handle clear — reset to banner */
    if (output.length === 1 && output[0].text === "__CLEAR__") {
      setHistory(BANNER_LINES);
      return;
    }

    /* Append the command echo + output */
    setHistory((prev) => [
      ...prev,
      { type: "cmd", text: cmd },
      ...output,
    ]);
  }, [input, isTyping]);

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        submit();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIdx((idx) => {
          const next = Math.min(idx + 1, cmdHistory.length - 1);
          setInput(cmdHistory[next] ?? "");
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIdx((idx) => {
          const next = Math.max(idx - 1, -1);
          setInput(next === -1 ? "" : cmdHistory[next] ?? "");
          return next;
        });
      } else if (e.key === "Tab") {
        e.preventDefault();
        const cmds = [
          "help", "whoami", "projects", "skills", "contact", "social", "clear", "banner",
          "skills offensive", "skills programming", "skills tools", "projects 1", "projects 2",
        ];
        const match = cmds.find((c) => c.startsWith(input) && c !== input);
        if (match) setInput(match);
      }
    },
    [submit, cmdHistory, input]
  );

  /* Entrance animation lock */
  useEffect(() => {
    if (!inView) return;
    setIsTyping(true);
    const t = setTimeout(() => setIsTyping(false), 600);
    return () => clearTimeout(t);
  }, [inView]);

  /* Quick-inject command (hint buttons) */
  const runCmd = (cmd: string) => {
    const output = buildOutput(cmd);
    if (output.length === 1 && output[0].text === "__CLEAR__") {
      setHistory(BANNER_LINES);
      return;
    }
    setHistory((prev) => [
      ...prev,
      { type: "cmd", text: cmd },
      ...output,
    ]);
    inputRef.current?.focus();
  };

  return (
    <section
      id="terminal"
      className="section-padding grid-bg"
      ref={sectionRef}
      onClick={focusInput}
    >
      <div className="container-custom">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ ./interactive_shell.sh
          </p>
          <h2 className="section-header text-white">
            Live <span className="gradient-text">Terminal</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            An interactive shell — type{" "}
            <code className="text-cyber-green font-mono bg-cyber-green/10 px-1.5 py-0.5 rounded text-sm">
              help
            </code>{" "}
            to explore commands. Use ↑ ↓ arrows for history, Tab to autocomplete.
          </p>
        </motion.div>

        {/* Terminal window — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="terminal-window max-w-3xl mx-auto select-none"
        >
          {/* Titlebar */}
          <div className="terminal-header">
            <div className="terminal-dot bg-[#ff5f57]" />
            <div className="terminal-dot bg-[#febc2e]" />
            <div className="terminal-dot bg-[#28c840]" />
            <span className="ml-3 text-xs text-slate-500 font-mono">
              rohith@portfolio — interactive shell
            </span>
            <span className="ml-auto text-xs text-cyber-green/60 font-mono animate-pulse">
              ● ONLINE
            </span>
          </div>

          {/* Scrollable body */}
          <div
            ref={bodyRef}
            className="p-5 font-mono text-sm leading-relaxed overflow-y-auto"
            style={{ minHeight: "380px", maxHeight: "480px" }}
          >
            {/* History lines */}
            {history.map((line, i) => {
              if (line.type === "cmd") {
                return (
                  <div key={i} className="flex gap-2 mt-2">
                    <span className="text-slate-500 select-none flex-shrink-0">
                      <span className="text-cyber-green">rohith</span>
                      <span className="text-slate-400">@portfolio</span>
                      <span className="text-white">:~</span>
                      <span className="text-cyber-blue">#</span>
                      <span className="text-white"> </span>
                    </span>
                    <span className="text-cyber-green break-all">{line.text}</span>
                  </div>
                );
              }
              if (line.type === "err") {
                return (
                  <div key={i} className="text-neon-pink pl-2 mt-0.5">
                    {line.text}
                  </div>
                );
              }
              if (line.type === "info") {
                return (
                  <div key={i} className="text-cyber-blue pl-2 mt-0.5 whitespace-pre">
                    {line.text}
                  </div>
                );
              }
              /* "out" */
              return (
                <div key={i} className="text-slate-400 pl-2 mt-0.5 whitespace-pre">
                  {line.text}
                </div>
              );
            })}

            {/* Input row */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-slate-500 flex-shrink-0 select-none">
                <span className="text-cyber-green">rohith</span>
                <span className="text-slate-400">@portfolio</span>
                <span className="text-white">:~</span>
                <span className="text-cyber-blue">#</span>
                <span className="text-white"> </span>
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal input"
                className="flex-1 bg-transparent text-cyber-green caret-cyber-green outline-none border-none font-mono text-sm min-w-0"
                style={{ caretColor: "#00ff88" }}
              />
              <span className="animate-blink text-cyber-green select-none" aria-hidden>
                █
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hint buttons — centered below terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-4 flex flex-wrap gap-2 justify-center"
        >
          {["help", "whoami", "projects", "skills", "contact", "social", "clear"].map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                runCmd(c);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded border border-dark-border text-slate-500 hover:text-cyber-green hover:border-cyber-green/40 transition-all duration-200"
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Ethical note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-4 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs text-slate-600 font-mono px-4 py-2 rounded-full border border-dark-border">
            ⚠️ All testing performed on authorized targets only — ethical hacking principles apply
          </span>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { terminalCommands } from "@/data/portfolio";

function TerminalLine({ text, delay, isCommand }: { text: string; delay: number; isCommand: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx = 0;
    const speed = isCommand ? 40 : 8;
    const timer = setInterval(() => {
      if (idx <= text.length) {
        setDisplayed(text.slice(0, idx));
        idx++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    const start = setTimeout(() => { /* start */ }, delay);
    return () => { clearInterval(timer); clearTimeout(start); };
  }, [text, delay, isCommand]);

  return (
    <div className={isCommand ? "text-cyber-green" : "text-slate-400"}>
      {isCommand && <span className="text-slate-500">$ </span>}
      {displayed}
    </div>
  );
}

export default function TerminalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalCommands.forEach((_, i) => {
      timers.push(setTimeout(() => setPhase(i + 1), i * 4000 + 500));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="terminal" className="section-padding grid-bg" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ ./live_demo.sh
          </p>
          <h2 className="section-header text-white">
            Live <span className="gradient-text">Terminal</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Watch a simulated penetration testing session. This is what a typical recon and exploitation workflow looks like.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="terminal-window max-w-3xl mx-auto"
        >
          {/* Terminal titlebar */}
          <div className="terminal-header">
            <div className="terminal-dot bg-[#ff5f57]" />
            <div className="terminal-dot bg-[#febc2e]" />
            <div className="terminal-dot bg-[#28c840]" />
            <span className="ml-3 text-xs text-slate-500 font-mono">root@kali — ~/pentest</span>
            <span className="ml-auto text-xs text-slate-600">● LIVE</span>
          </div>

          {/* Terminal body */}
          <div className="p-5 space-y-4 min-h-[400px] font-mono text-sm leading-relaxed">
            {terminalCommands.slice(0, phase + 1).map((cmd, i) => (
              <div key={i} className="space-y-1">
                <div className="flex gap-2 text-cyber-green">
                  <span className="text-slate-500">
                    <span className="text-cyber-green">root</span>
                    <span className="text-slate-400">@kali</span>
                    <span className="text-white">:</span>
                    <span className="text-cyber-blue">~/pentest</span>
                    <span className="text-white"># </span>
                  </span>
                  <span className={i < phase ? "text-cyber-green" : "text-cyber-green"}>{cmd.cmd}</span>
                </div>
                {i < phase && (
                  <pre className="text-slate-400 text-xs whitespace-pre-wrap pl-4 border-l border-dark-border">
                    {cmd.output}
                  </pre>
                )}
              </div>
            ))}
            {/* Blinking cursor */}
            <div className="flex items-center gap-1 text-cyber-green">
              <span className="text-slate-500">root@kali:~/pentest# </span>
              <span className="animate-blink">█</span>
            </div>
          </div>
        </motion.div>

        {/* Warning badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs text-slate-500 font-mono px-4 py-2 rounded-full border border-dark-border">
            ⚠️ All testing performed on authorized targets only — ethical hacking principles apply
          </span>
        </motion.div>
      </div>
    </section>
  );
}

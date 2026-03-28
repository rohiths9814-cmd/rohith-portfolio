"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Globe, Terminal, Bug } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const SKILL_GROUPS = [
  {
    icon: <Globe className="w-4 h-4" />,
    label: "Networking",
    chips: ["TCP/IP", "DNS", "HTTP/S", "VPN", "Firewall", "Wireshark"],
  },
  {
    icon: <Shield className="w-4 h-4" />,
    label: "Web Security",
    chips: ["OWASP Top 10", "Burp Suite", "SQLi", "XSS", "CSRF", "IDOR"],
  },
  {
    icon: <Terminal className="w-4 h-4" />,
    label: "Linux",
    chips: ["Kali Linux", "Bash Scripting", "Privilege Escalation", "cron", "iptables"],
  },
  {
    icon: <Bug className="w-4 h-4" />,
    label: "Bug Bounty",
    chips: ["HackerOne", "Bugcrowd", "Recon", "Subdomain Enum", "CVSS Scoring"],
  },
];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding grid-bg" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ cat about.txt
          </p>
          <h2 className="section-header text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-green/5 rounded-bl-full" />
              
              <div className="w-12 h-12 rounded-xl bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-cyber-green" />
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                {personalInfo.bio}
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2">
                <span className="tag-chip">📍 {personalInfo.location}</span>
                <span className="tag-chip-blue">🎓 CS Student</span>
                <span className="tag-chip-purple">🐛 Bug Hunter</span>
              </div>
            </div>

            {/* Animated cyber accent */}
            <motion.div
              className="mt-6 glass-card p-4 rounded-xl font-mono text-xs"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <span className="text-cyber-green">rohith@kali</span>
              <span className="text-slate-400">:~$ </span>
              <span className="text-slate-200">whoami --verbose</span>
              <div className="mt-2 text-slate-400 space-y-1">
                <div><span className="text-cyber-blue">Role:</span> Ethical Hacker</div>
                <div><span className="text-cyber-blue">Focus:</span> Offensive Security</div>
                <div><span className="text-cyber-blue">Status:</span> <span className="text-cyber-green">● Active</span></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {SKILL_GROUPS.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + gi * 0.1 }}
                className="glass-card p-5 rounded-xl"
              >
                <div className="flex items-center gap-2 text-cyber-green font-mono text-sm font-semibold mb-3">
                  {group.icon}
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.chips.map((chip, ci) => (
                    <motion.span
                      key={chip}
                      variants={chipVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      custom={gi * 6 + ci}
                      className={ci % 3 === 0 ? "tag-chip" : ci % 3 === 1 ? "tag-chip-blue" : "tag-chip-purple"}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

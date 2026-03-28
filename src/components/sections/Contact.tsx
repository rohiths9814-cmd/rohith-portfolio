"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Code2, Globe, X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Auto-dismiss error after 4 s — fixed: useEffect reacts to actual state change
  useEffect(() => {
    if (status === "error") {
      const t = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const SOCIALS = [
    { icon: <Code2 className="w-5 h-5" />, label: "GitHub", href: personalInfo.github },
    { icon: <Globe className="w-5 h-5" />, label: "LinkedIn", href: personalInfo.linkedin },
    { icon: <X className="w-5 h-5" />, label: "Twitter/X", href: personalInfo.twitter },
    { icon: <Mail className="w-5 h-5" />, label: "Email", href: `mailto:${personalInfo.email}` },
  ];

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ ping me
          </p>
          <h2 className="section-header text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg">
            Have a project, opportunity, or just want to talk security? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-slate-400 mb-2">
                  $ name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/20 transition-colors font-mono"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-slate-400 mb-2">
                  $ email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/20 transition-colors font-mono"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 mb-2">
                  $ message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/20 transition-colors font-mono resize-none"
                />
              </div>

              {/* Status feedback */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-cyber-green text-sm font-mono">
                  <CheckCircle className="w-4 h-4" />
                  Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-neon-pink text-sm font-mono">
                  <AlertCircle className="w-4 h-4" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="cyber-btn cyber-btn-solid w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Socials + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick info */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyber-green flex-shrink-0" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-slate-400 hover:text-cyber-green transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyber-green w-4 text-center">📍</span>
                  <span className="text-slate-400">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyber-green w-4 text-center">⚡</span>
                  <span className={personalInfo.available ? "text-cyber-green" : "text-slate-400"}>
                    {personalInfo.available ? "Available for work" : "Not available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Find Me Online</h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-dark-border hover:border-cyber-green/30 hover:bg-cyber-green/5 text-slate-400 hover:text-cyber-green transition-all duration-300"
                  >
                    {s.icon}
                    <span className="text-sm font-mono">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className="text-center glass-card rounded-xl p-4 font-mono text-xs text-slate-500">
              <span className="text-cyber-green">●</span> Average response time: &lt;24 hours
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

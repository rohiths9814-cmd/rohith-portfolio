"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Zap,
  Code2,
  Globe,
  X,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";

/* ─── Social data ───────────────────────────────────────────── */
const SOCIALS = [
  {
    icon: Code2,
    label: "GitHub",
    href: personalInfo.github,
    color: "#e2e8f0",
    glow: "rgba(226,232,240,0.15)",
  },
  {
    icon: Globe,
    label: "LinkedIn",
    href: personalInfo.linkedin,
    color: "#0a66c2",
    glow: "rgba(10,102,194,0.2)",
  },
  {
    icon: X,
    label: "Twitter",
    href: personalInfo.twitter,
    color: "#1d9bf0",
    glow: "rgba(29,155,240,0.2)",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    color: "#00ff88",
    glow: "rgba(0,255,136,0.2)",
  },
];

/* ─── Info items ────────────────────────────────────────────── */
const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "text-cyber-green",
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
    color: "text-cyber-blue",
  },
  {
    icon: Zap,
    label: "Status",
    value: personalInfo.available ? "Available for work" : "Not available",
    href: null,
    color: personalInfo.available ? "text-cyber-green" : "text-slate-400",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

/* ─── Component ─────────────────────────────────────────────── */
export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error — please check your connection and retry.");
    }
  };

  /* Animation variants */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container-custom">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
            $ contact --me
          </p>
          <h2 className="section-header text-white">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Have an exciting project, a CTF team spot, or just want to chat
            security? Drop a message — I respond within 24 hours.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/* ── LEFT — Contact form ── */}
          <motion.div {...fadeUp(0.15)}>
            <div className="contact-form-card">

              {/* Card header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-cyber-green/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-cyber-green" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Send a Message</h3>
                  <p className="text-slate-500 text-sm">I&apos;ll get back to you promptly</p>
                </div>
              </div>

              {/* Success state */}
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-cyber-green/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-cyber-green" />
                  </div>
                  <h4 className="text-white font-semibold text-xl">Message Sent!</h4>
                  <p className="text-slate-400 max-w-xs">
                    Thanks for reaching out. I&apos;ll reply to your inbox within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-cyber-green font-mono text-sm hover:underline"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      <AtSign className="w-3.5 h-3.5" /> Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      <MessageSquare className="w-3.5 h-3.5" /> Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hi Rohith — I'd like to discuss..."
                      className="form-input resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-neon-pink/10 border border-neon-pink/20"
                    >
                      <AlertCircle className="w-4 h-4 text-neon-pink flex-shrink-0 mt-0.5" />
                      <p className="text-neon-pink text-sm">{errMsg}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="submit-btn w-full"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT — Info + Socials ── */}
          <div className="space-y-6">

            {/* Contact info card */}
            <motion.div {...fadeUp(0.25)}>
              <div className="contact-info-card">
                <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-cyber-green rounded-full inline-block" />
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  {INFO.map(({ icon: Icon, label, value, href, color }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-dark-border/60 flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-mono mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className={`text-sm font-medium hover:underline ${color}`}>
                            {value}
                          </a>
                        ) : (
                          <p className={`text-sm font-medium ${color}`}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Availability badge */}
                <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-cyber-green/5 border border-cyber-green/15">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse flex-shrink-0" />
                  <span className="text-cyber-green text-sm font-mono">
                    Average response time:{" "}
                    <span className="text-white font-semibold">&lt;24 hours</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.35)}>
              <div className="contact-info-card">
                <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-cyber-blue rounded-full inline-block" />
                  Find Me Online
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map(({ icon: Icon, label, href, color, glow }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-card group"
                      style={{ "--glow": glow } as React.CSSProperties}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${glow}`, border: `1px solid ${color}22` }}
                      >
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <p className="text-white text-sm font-semibold">{label}</p>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

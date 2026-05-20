"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  Coffee,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  Sparkles,
} from "lucide-react";
import Script from "next/script";

/* ─── Types ─────────────────────────────────────────────────── */
type PaymentStatus = "idle" | "loading" | "success" | "error";

// Cashfree SDK global type
declare global {
  interface Window {
    Cashfree?: (config: { mode: string }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget: string;
      }) => Promise<{
        error?: { message: string };
        redirect?: boolean;
      }>;
    };
  }
}

/* ─── Confetti generator ────────────────────────────────────── */
function launchConfetti() {
  const colors = ["#00ff88", "#00d4ff", "#bf5af2", "#fdcb6e", "#ff2d78", "#55efc4"];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.style.cssText = `
      position: fixed;
      z-index: 200;
      width: ${Math.random() * 8 + 6}px;
      height: ${Math.random() * 8 + 6}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 2px;
      left: ${Math.random() * 100}vw;
      top: -10px;
      pointer-events: none;
      animation: confetti-fall ${Math.random() * 2 + 1.5}s ease-out ${Math.random() * 0.8}s forwards;
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

/* ─── Component ─────────────────────────────────────────────── */
export default function SupportMe() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [sdkReady, setSdkReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check if SDK is already loaded (e.g., from cache)
  useEffect(() => {
    if (window.Cashfree) setSdkReady(true);
  }, []);

  /* ─── Payment handler ── */
  const handlePayment = async () => {
    if (status === "loading") return;

    // Check if Cashfree SDK is loaded
    if (!window.Cashfree) {
      setStatus("error");
      setErrorMsg("Payment SDK is still loading. Please try again in a moment.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // STEP 1: Create order via our backend API
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Supporter" }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // STEP 2: Initialize Cashfree SDK with matching mode
      const cashfree = window.Cashfree({
        mode: orderData.mode, // "sandbox" or "production" from backend
      });

      // STEP 3: Open Cashfree checkout modal
      const result = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal",
      });

      if (result.error) {
        setStatus("error");
        setErrorMsg("Payment was not completed. Please try again.");
        return;
      }

      if (result.redirect) {
        return; // Redirecting...
      }

      // STEP 4: Verify payment from backend
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderData.order_id }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.verified) {
        setStatus("success");
        launchConfetti();
      } else {
        setStatus("error");
        setErrorMsg(
          `Payment status: ${verifyData.order_status || "Unknown"}. Please try again.`
        );
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setStatus("error");
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    }
  };

  /* ─── Animation variants ── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <>
      {/* Cashfree JS SDK — loaded asynchronously */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="lazyOnload"
        onLoad={() => setSdkReady(true)}
      />

      {/* Confetti keyframes (injected once) */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>

      <section id="support" className="section-padding" ref={ref}>
        <div className="container-custom">
          {/* ── Header ── */}
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="font-mono text-cyber-green text-sm tracking-widest mb-3">
              $ support --sponsor
            </p>
            <h2 className="section-header text-white">
              Support My{" "}
              <span className="gradient-text">Work</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto">
              If you find my work valuable — security tools, open-source
              contributions, or research — consider buying me a coffee to
              fuel the next hack session.
            </p>
          </motion.div>

          {/* ── Card ── */}
          <motion.div
            {...fadeUp(0.15)}
            className="max-w-md mx-auto"
          >
            <div className="contact-form-card relative overflow-hidden">
              {/* Decorative corner glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)",
                }}
                aria-hidden
              />

              {/* ── Success State ── */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-cyber-green/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-cyber-green" />
                  </div>
                  <h4 className="text-white font-semibold text-xl">
                    Thank You! 🎉
                  </h4>
                  <p className="text-slate-400 max-w-xs">
                    Your support means the world. More hacking sessions incoming!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-cyber-green font-mono text-sm hover:underline"
                  >
                    Support again →
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyber-green/10 flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-cyber-green" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Buy Me a Coffee
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Fuel the next security research
                      </p>
                    </div>
                  </div>

                  {/* Amount display */}
                  <div className="flex items-center justify-center gap-3 py-6 mb-6 rounded-xl bg-dark-base/50 border border-dark-border/60">
                    <div className="text-center">
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
                        Amount
                      </p>
                      <p className="text-4xl font-extrabold text-white tracking-tight">
                        <span className="text-cyber-green text-2xl">₹</span>10
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Shield, text: "Secured by Cashfree Payments" },
                      { icon: Zap, text: "Instant UPI, Cards & Wallets" },
                      { icon: Heart, text: "Supports cybersecurity research" },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-3 text-sm text-slate-400"
                      >
                        <Icon className="w-4 h-4 text-cyber-green flex-shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-neon-pink/10 border border-neon-pink/20 mb-4"
                    >
                      <AlertCircle className="w-4 h-4 text-neon-pink flex-shrink-0 mt-0.5" />
                      <p className="text-neon-pink text-sm">{errorMsg}</p>
                    </motion.div>
                  )}

                  {/* Pay button */}
                  <button
                    onClick={handlePayment}
                    disabled={status === "loading" || !sdkReady}
                    className="submit-btn w-full"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing…
                      </>
                    ) : !sdkReady ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading SDK…
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Pay ₹10
                      </>
                    )}
                  </button>

                  {/* Sandbox badge */}
                  {process.env.NEXT_PUBLIC_CASHFREE_ENV !== "PRODUCTION" && (
                    <p className="text-center mt-4 text-xs font-mono text-slate-600">
                      🧪 Sandbox / Test Mode
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

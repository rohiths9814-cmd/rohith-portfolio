import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-green": "#00ff88",
        "cyber-blue": "#00d4ff",
        "neon-purple": "#bf5af2",
        "neon-pink": "#ff2d78",
        "dark-base": "#050810",
        "dark-card": "#0a0f1e",
        "dark-border": "#1a2035",
        "dark-muted": "#8892b0",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #bf5af2 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(10,15,30,0.9) 0%, rgba(5,8,16,0.95) 100%)",
        "hero-gradient": "radial-gradient(ellipse at center, rgba(0,255,136,0.08) 0%, transparent 70%)",
      },
      animation: {
        "matrix-fall": "matrixFall 20s linear infinite",
        "glitch": "glitch 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "scan": "scan 4s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "type": "type 3s steps(30) 1s forwards",
        "blink": "blink 0.8s infinite",
      },
      keyframes: {
        matrixFall: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0.3" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,255,136,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,255,136,0.6), 0 0 80px rgba(0,255,136,0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        type: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        "cyber": "0 0 20px rgba(0,255,136,0.3)",
        "cyber-blue": "0 0 20px rgba(0,212,255,0.3)",
        "neon": "0 0 40px rgba(0,255,136,0.4), 0 0 80px rgba(0,255,136,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.4)",
        "card-hover": "0 20px 60px rgba(0,255,136,0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

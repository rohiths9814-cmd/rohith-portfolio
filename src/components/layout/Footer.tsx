"use client";

import { Code2, Globe, X, Shield, Heart } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border py-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-green" />
            <span className="font-mono text-sm text-cyber-green font-bold tracking-widest">
              RS<span className="text-white">://PORTFOLIO</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-slate-600 font-mono text-center">
            &quot;Breaking systems so you don&apos;t have to.&quot; — Rohith S
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-green transition-colors"
              aria-label="GitHub"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-neon-purple transition-colors"
              aria-label="Twitter/X"
            >
              <X className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-dark-border/50 text-center">
          <p className="text-xs text-slate-600 font-mono flex items-center justify-center gap-1">
            © {year} Rohith S — Made with
            <Heart className="w-3 h-3 text-neon-pink inline" />
            & caffeine
          </p>
        </div>
      </div>
    </footer>
  );
}

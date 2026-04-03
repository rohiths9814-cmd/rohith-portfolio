"use client";

import { useRef, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;      // max tilt degrees — default 12
  glowColor?: string;    // glow color e.g. "#00ff88"
  scale?: number;        // hover scale — default 1.02
  disabled?: boolean;    // disable on mobile
}

/**
 * 3D mouse-tracking tilt wrapper.
 * Pure CSS transforms — no Three.js overhead.
 * Adds perspective, rotateX/Y, and a dynamic
 * light-source glow that follows the cursor.
 */
export default function TiltCard({
  children,
  className = "",
  tiltMax = 12,
  glowColor = "#00ff88",
  scale = 1.02,
  disabled = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (disabled || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0..1
      const y = (e.clientY - rect.top) / rect.height;    // 0..1

      const rotateX = (y - 0.5) * -tiltMax * 2;
      const rotateY = (x - 0.5) * tiltMax * 2;

      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glowColor}15, transparent 60%)`;
      }
    },
    [tiltMax, scale, glowColor, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        position: "relative",
      }}
    >
      {/* Dynamic glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}

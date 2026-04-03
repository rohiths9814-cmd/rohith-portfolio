"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";

interface RadarChartProps {
  /** Skill data: [{ name, level (0-100) }] */
  data: { name: string; level: number }[];
  /** Accent color for the filled area */
  color: string;
  /** Glow color (CSS) */
  glowColor: string;
  /** Size in px */
  size?: number;
}

/**
 * SVG-based radar / spider chart with animated fill.
 * Draws on scroll-entry from center outward.
 */
export default function RadarChart({
  data,
  color,
  glowColor,
  size = 220,
}: RadarChartProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  const n = data.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 30; // leave room for labels

  const angleStep = (2 * Math.PI) / n;

  // Generate grid rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Data polygon points
  const dataPoints = useMemo(
    () =>
      data.map((d, i) => {
        const angle = i * angleStep - Math.PI / 2; // start from top
        const r = (d.level / 100) * maxR;
        return {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          labelX: cx + Math.cos(angle) * (maxR + 18),
          labelY: cy + Math.sin(angle) * (maxR + 18),
          name: d.name,
          level: d.level,
        };
      }),
    [data, n, angleStep, maxR, cx, cy]
  );

  const polyPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {rings.map((r) => (
          <polygon
            key={r}
            points={Array.from({ length: n }, (_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const radius = r * maxR;
              return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
            }).join(" ")}
            fill="none"
            stroke="rgba(26, 32, 53, 0.8)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(angle) * maxR}
              y2={cy + Math.sin(angle) * maxR}
              stroke="rgba(26, 32, 53, 0.6)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data area — animated */}
        <motion.polygon
          points={
            inView
              ? polyPath
              : dataPoints.map(() => `${cx},${cy}`).join(" ")
          }
          fill={`${color}18`}
          stroke={color}
          strokeWidth="2"
          style={{
            filter: `drop-shadow(0 0 6px ${glowColor})`,
            transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Data points — dots */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={inView ? p.x : cx}
            cy={inView ? p.y : cy}
            r="4"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 4px ${glowColor})`,
              transition: `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`,
            }}
          />
        ))}

        {/* Labels */}
        {dataPoints.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#8892b0"
            fontSize="9"
            fontFamily="var(--font-mono)"
            className="select-none"
          >
            {p.name}
          </text>
        ))}
      </svg>
    </div>
  );
}

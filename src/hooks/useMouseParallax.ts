"use client";

import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Returns normalised mouse‐position motion values in [-1, 1].
 * Disabled on mobile (returns static 0).
 */
export function useMouseParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch device

    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set((e.clientX / window.innerWidth) * 2 - 1);
        y.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  return { x, y };
}

"use client";

import { useEffect, useState } from "react";

/**
 * Detects mobile / low-performance devices.
 * Heavy 3D is disabled on mobile to maintain 60fps.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Detects underpowered hardware (low core count OR mobile).
 */
export function useIsLowPerf(breakpoint = 768) {
  const isMobile = useIsMobile(breakpoint);
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 2;
    setIsLow(isMobile || cores <= 2);
  }, [isMobile]);

  return isLow;
}

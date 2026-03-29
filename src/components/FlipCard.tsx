"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  /** Content for the front face */
  front: React.ReactNode;
  /** Content for the back face */
  back: React.ReactNode;
  /** Controls whether the card is showing the back face */
  isFlipped: boolean;
  className?: string;
}

/**
 * FlipCard — smooth CSS 3D flip card.
 * Uses hardware-accelerated perspective + rotateY transform.
 * Both faces use backface-visibility:hidden so only one shows at a time.
 */
export default function FlipCard({
  front,
  back,
  isFlipped,
  className,
}: FlipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn("flip-card-scene", className)}
      // Prevent layout shift — must have explicit height via parent
    >
      <div className={cn("flip-card-inner w-full h-full", isFlipped && "is-flipped")}>
        {/* ── Front face ── */}
        <div className="flip-card-face flip-card-front absolute inset-0 w-full h-full">
          {front}
        </div>

        {/* ── Back face ── */}
        <div className="flip-card-face flip-card-back absolute inset-0 w-full h-full">
          {back}
        </div>
      </div>
    </div>
  );
}

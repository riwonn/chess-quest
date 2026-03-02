"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import type { CardVariant } from "./Card";

interface ShuffleProps {
  onComplete: () => void;
}

// 5 cards with their Figma positions and animation classes
const CARDS: { variant: CardVariant; animClass: string; style: React.CSSProperties }[] = [
  {
    variant: "1",
    animClass: "animate-shuffle1",
    style: { left: "207px", top: "308px", transform: "rotate(-15deg)" },
  },
  {
    variant: "4",
    animClass: "animate-shuffle2",
    style: { left: "691px", top: "346px", transform: "rotate(15deg)" },
  },
  {
    variant: "5",
    animClass: "animate-shuffle3",
    style: { left: "905px", top: "301px", transform: "rotate(-6.88deg)" },
  },
  {
    variant: "3",
    animClass: "animate-shuffle1",
    style: { left: "413px", top: "443px", transform: "rotate(-6.88deg)" },
  },
  {
    variant: "2",
    animClass: "animate-shuffle2",
    style: { left: "551px", top: "321px" },
  },
];

export default function Shuffle({ onComplete }: ShuffleProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade-out after shuffle plays
    const t1 = setTimeout(() => setFading(true), 1200);
    // Notify parent to transition to Result
    const t2 = setTimeout(onComplete, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="min-h-screen bg-bg flex flex-col items-center relative overflow-hidden pt-12 pb-24 transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-end px-2 py-8 h-[160px]">
        <p className="font-corbert text-[28px] text-pink leading-none tracking-tight">
          Seoul Chess Club Quest
        </p>
      </div>

      {/* ── Status text ───────────────────────────────────────── */}
      <div className="absolute top-[190px] left-1/2 -translate-x-1/2 z-20">
        <p className="font-sans text-[22px] text-white/80 text-center tracking-wide">
          Shuffling the cards…
        </p>
      </div>

      {/* ── Animated cards ────────────────────────────────────── */}
      <div className="relative w-full h-screen">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`absolute ${card.animClass}`}
            style={{ width: "280px", height: "420px", ...card.style }}
          >
            <Card variant={card.variant} page="Front" />
          </div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1e2430)" }}
      />
    </div>
  );
}

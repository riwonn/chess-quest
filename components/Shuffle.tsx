"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import type { CardVariant } from "./Card";

interface ShuffleProps {
  onComplete: () => void;
}

const W = 280;
const H = 420;

const CARDS: { variant: CardVariant; anim: string; delay: string; z: number }[] = [
  { variant: "3", anim: "shuffle-a", delay: "0ms",   z: 11 },
  { variant: "5", anim: "shuffle-b", delay: "60ms",  z: 12 },
  { variant: "1", anim: "shuffle-c", delay: "120ms", z: 13 },
  { variant: "4", anim: "shuffle-d", delay: "180ms", z: 14 },
  { variant: "2", anim: "shuffle-e", delay: "240ms", z: 15 },
];

export default function Shuffle({ onComplete }: ShuffleProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800);
    const t2 = setTimeout(onComplete, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="min-h-screen bg-bg flex flex-col items-center relative overflow-hidden transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-end px-2 py-8 h-[160px]">
        <p className="font-corbert text-[28px] text-pink leading-none tracking-tight">
          Seoul Chess Club Quest
        </p>
      </div>

      {/* Status text */}
      <div className="absolute top-[190px] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
        <p className="font-sans text-[22px] text-white/80 text-center tracking-wide">
          Shuffling the cards…
        </p>
      </div>

      {/* Card stack — centered */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          marginTop: -H / 2,
          marginLeft: -W / 2,
          width: W,
          height: H,
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: card.z,
              animation: `${card.anim} 1.6s cubic-bezier(0.34,1.2,0.64,1) ${card.delay} forwards`,
            }}
          >
            <Card variant={card.variant} page="Front" />
          </div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-0"
        style={{ background: "linear-gradient(to bottom, transparent, #1e2430)" }}
      />
    </div>
  );
}

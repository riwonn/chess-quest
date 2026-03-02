"use client";

import { useState } from "react";
import Card from "./Card";

// Card size
const W = 280;
const H = 420;

// Container size — enough room for the spread
const CW = 560;
const CH = 500;

// Each card starts at the center of the container
const centerLeft = (CW - W) / 2; // 140px
const centerTop  = (CH - H) / 2; // 40px

export default function CardFan() {
  const [spread, setSpread] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);

  // ── Resting: cards close together, overlapping like a hand ──
  // transform-origin defaults to 50% 50% (center of element)
  const rest = {
    left:   { transform: "rotate(-18deg) translateX(-80px) translateY(16px)" },
    center: { transform: "rotate(0deg)" },
    right:  { transform: "rotate(14deg)  translateX(70px)  translateY(16px)" },
  };

  // ── Spread: fan out wider when hovered ──────────────────────
  const fanned = {
    left:   { transform: "rotate(-24deg) translateX(-110px) translateY(24px)" },
    center: { transform: "rotate(0deg)   translateY(-14px)" },
    right:  { transform: "rotate(20deg)  translateX(100px)  translateY(24px)" },
  };

  const pos  = spread ? fanned : rest;
  const ease = "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

  return (
    <div
      className="relative cursor-default"
      style={{ width: CW, height: CH }}
      onMouseEnter={() => setSpread(true)}
      onMouseLeave={() => { setSpread(false); setTooltipHovered(false); }}
    >
      {/* ── Left: variant 1 (dark maroon) ─────────────────────── */}
      <div
        className={`absolute ${ease}`}
        style={{ top: centerTop, left: centerLeft, zIndex: 10, ...pos.left }}
      >
        <Card variant="1" page="Front" />
      </div>

      {/* ── Center: variant 2 (pink) ───────────────────────────── */}
      <div
        className={`absolute ${ease}`}
        style={{ top: centerTop, left: centerLeft, zIndex: 20, ...pos.center }}
        onMouseEnter={() => setTooltipHovered(true)}
        onMouseLeave={() => setTooltipHovered(false)}
      >
        <Card variant="2" page="Front" />

        {/* Tooltip */}
        {tooltipHovered && (
          <div
            className="animate-tooltip-in absolute -top-[84px] left-1/2 -translate-x-1/2
                       bg-[#1a2035] border border-white/10 rounded-xl
                       px-4 py-3 shadow-card whitespace-nowrap pointer-events-none"
            style={{ zIndex: 50 }}
          >
            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2
                            w-3 h-3 bg-[#1a2035] border-r border-b border-white/10 rotate-45" />
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
              Example Question
            </p>
            <p className="font-serif text-sm italic text-white/85">
              "Which chess piece do you like most?"
            </p>
          </div>
        )}
      </div>

      {/* ── Right: variant 3 (ivory) ───────────────────────────── */}
      <div
        className={`absolute ${ease}`}
        style={{ top: centerTop, left: centerLeft, zIndex: 15, ...pos.right }}
      >
        <Card variant="3" page="Front" />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[140px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1e2430)" }}
      />
    </div>
  );
}

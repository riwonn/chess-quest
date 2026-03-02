"use client";

import { useState } from "react";
import Card from "./Card";

export default function CardFan() {
  const [spread, setSpread] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);

  // ── Card transforms: resting → spread ───────────────────────
  // On container hover, cards fan out wider with more rotation
  const leftStyle = spread
    ? { transform: "rotate(-24deg) translateX(-40px) translateY(8px)" }
    : { transform: "rotate(-15deg)" };

  const centerStyle = spread
    ? { transform: "translateY(-14px)" }
    : { transform: "translateY(0px)" };

  const rightStyle = spread
    ? { transform: "rotate(24deg) translateX(40px) translateY(8px)" }
    : { transform: "rotate(15deg)" };

  return (
    <div
      className="relative w-[560px] h-[478px] flex items-center justify-center cursor-default"
      onMouseEnter={() => setSpread(true)}
      onMouseLeave={() => { setSpread(false); setTooltipHovered(false); }}
    >
      {/* ── Left card: variant 1 (dark maroon) ───────────────── */}
      <div
        className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ left: "60px", top: "29px", zIndex: 10, ...leftStyle }}
      >
        <Card variant="1" page="Front" />
      </div>

      {/* ── Center card: variant 2 (pink) ────────────────────── */}
      <div
        className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ left: "140px", top: "29px", zIndex: 20, ...centerStyle }}
        onMouseEnter={() => setTooltipHovered(true)}
        onMouseLeave={() => setTooltipHovered(false)}
      >
        <Card variant="2" page="Front" />

        {/* Tooltip — shows when hovering center card */}
        {tooltipHovered && (
          <div
            className="animate-tooltip-in absolute -top-[80px] left-1/2 -translate-x-1/2
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

      {/* ── Right card: variant 4 (ivory) ────────────────────── */}
      <div
        className="absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ left: "220px", top: "29px", zIndex: 30, ...rightStyle }}
      >
        <Card variant="4" page="Front" />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1e2430)" }}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Card from "./Card";

export default function CardFan() {
  const [spread, setSpread] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);

  // ── Resting transforms ───────────────────────────────────────
  // Cards overlap naturally like a hand of cards
  const restLeft   = "rotate(-18deg) translate(-20px, 20px)";
  const restCenter = "rotate(0deg)   translate(0px, 0px)";
  const restRight  = "rotate(14deg)  translate(20px, 20px)";

  // ── Spread transforms (on hover) ────────────────────────────
  const spreadLeft   = "rotate(-24deg) translate(-60px, 28px)";
  const spreadCenter = "rotate(0deg)   translate(0px, -16px)";
  const spreadRight  = "rotate(20deg)  translate(60px, 28px)";

  const TRANSITION = "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

  return (
    <div
      className="relative flex items-center justify-center cursor-default"
      style={{ width: 520, height: 460 }}
      onMouseEnter={() => setSpread(true)}
      onMouseLeave={() => { setSpread(false); setTooltipHovered(false); }}
    >
      {/* ── Left card: variant 1 (dark maroon) ───────────────── */}
      <div
        className={`absolute ${TRANSITION}`}
        style={{
          transform: spread ? spreadLeft : restLeft,
          zIndex: 10,
        }}
      >
        <Card variant="1" page="Front" />
      </div>

      {/* ── Center card: variant 2 (pink) ────────────────────── */}
      <div
        className={`absolute ${TRANSITION}`}
        style={{
          transform: spread ? spreadCenter : restCenter,
          zIndex: 20,
        }}
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

      {/* ── Right card: variant 3 (ivory) ────────────────────── */}
      <div
        className={`absolute ${TRANSITION}`}
        style={{
          transform: spread ? spreadRight : restRight,
          zIndex: 15,
        }}
      >
        <Card variant="3" page="Front" />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[140px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1e2430)" }}
      />
    </div>
  );
}

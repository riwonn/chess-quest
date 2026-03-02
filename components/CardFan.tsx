"use client";

import { useState } from "react";
import Card from "./Card";

export default function CardFan() {
  const [hovered, setHovered] = useState(false);

  return (
    // Container sized to the full fan spread
    <div className="relative w-[560px] h-[478px] flex items-center justify-center">

      {/* ── Left card: variant 1 (dark maroon), -15deg ───────── */}
      <div
        className="absolute transition-transform duration-300 ease-out"
        style={{ transform: "rotate(-15deg)", left: "60px", top: "29px", zIndex: 10 }}
      >
        <Card variant="1" page="Front" />
      </div>

      {/* ── Center card: variant 2 (pink), 0deg ──────────────── */}
      <div
        className="absolute transition-transform duration-300 ease-out"
        style={{ left: "140px", top: "29px", zIndex: 20 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card variant="2" page="Front" />

        {/* Tooltip — fades in on hover */}
        {hovered && (
          <div
            className="animate-tooltip-in absolute -top-[80px] left-1/2 -translate-x-1/2
                       bg-[#1a2035] border border-white/10 rounded-xl
                       px-4 py-3 shadow-card whitespace-nowrap pointer-events-none"
            style={{ zIndex: 50 }}
          >
            {/* Arrow */}
            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2
                            w-3 h-3 bg-[#1a2035] border-r border-b border-white/10
                            rotate-45" />
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
              Example Question
            </p>
            <p className="font-serif text-sm italic text-white/85">
              "Which chess piece do you like most?"
            </p>
          </div>
        )}
      </div>

      {/* ── Right card: variant 4 (ivory), +15deg ────────────── */}
      <div
        className="absolute transition-transform duration-300 ease-out"
        style={{ transform: "rotate(15deg)", left: "220px", top: "29px", zIndex: 30 }}
      >
        <Card variant="4" page="Front" />
      </div>

      {/* Gradient fade at bottom (matches Figma) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #1e2430)",
        }}
      />
    </div>
  );
}

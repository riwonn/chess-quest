"use client";

import CardFan from "./CardFan";

interface LandingProps {
  onDraw: () => void;
}

export default function Landing({ onDraw }: LandingProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-16 overflow-hidden">

      {/* ── Club label ────────────────────────────────────────── */}
      <p className="font-corbert text-[22px] text-pink mb-5 tracking-tight">
        Seoul Chess Club Quest
      </p>

      {/* ── Main title ────────────────────────────────────────── */}
      <h1 className="font-corbert text-[56px] leading-tight text-white text-center mb-4 max-w-[800px]">
        Draw Today's Chess Club Quest
      </h1>

      {/* ── Subtitle ──────────────────────────────────────────── */}
      <p className="font-sans text-[18px] text-white/55 text-center mb-10">
        A small quest that opens a conversation
      </p>

      {/* ── Card fan ──────────────────────────────────────────── */}
      <CardFan />

      {/* ── CTA button — flows with content ───────────────────── */}
      <button
        onClick={onDraw}
        className="
          mt-2 bg-pink text-pink-dark
          font-corbert text-[22px]
          px-12 py-4 rounded-2xl
          hover:brightness-105 active:scale-[0.97]
          transition-all duration-150 shadow-card
        "
      >
        Receive a Quest
      </button>
    </div>
  );
}

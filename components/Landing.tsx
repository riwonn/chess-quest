"use client";

import CardFan from "./CardFan";

interface LandingProps {
  onDraw: () => void;
}

export default function Landing({ onDraw }: LandingProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center relative overflow-hidden pt-12 pb-24">

      {/* ── Top header ────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-end px-2 py-8 h-[160px]">
        <p className="font-corbert text-[28px] text-pink leading-none tracking-tight">
          Seoul Chess Club Quest
        </p>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-6 mt-8">

        {/* Title + subtitle */}
        <div className="text-center">
          <h1 className="font-corbert text-[52px] text-white leading-tight tracking-tight">
            Draw Today's Chess Club Quest
          </h1>
          <p className="font-sans text-[20px] text-white/70 mt-3">
            A small quest that opens a conversation
          </p>
        </div>

        {/* Card fan (hover center card for tooltip) */}
        <CardFan />
      </div>

      {/* ── CTA button — fixed at bottom ──────────────────────── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={onDraw}
          className="
            bg-pink-cta text-pink-dark
            font-serif font-bold text-[22px]
            px-10 py-4 rounded-[14px]
            hover:opacity-90 active:scale-[0.97]
            transition-all duration-150 shadow-card
          "
        >
          Receive a Quest
        </button>
      </div>
    </div>
  );
}

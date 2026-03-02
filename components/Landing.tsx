"use client";

import { useState } from "react";
import Card from "./Card";
import TickerFooter from "./TickerFooter";
import type { Lang } from "@/app/page";

interface LandingProps {
  onDraw: () => void;
  lang: Lang;
  onLangToggle: () => void;
}

// ── Language toggle ───────────────────────────────────────────
function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 font-sans text-[13px] tracking-wide hover:opacity-80 transition-opacity"
    >
      <span style={{ color: lang === "en" ? "#fcacf3" : "rgba(255,255,255,0.35)" }}>EN</span>
      <span className="text-white/20">|</span>
      <span style={{ color: lang === "kr" ? "#fcacf3" : "rgba(255,255,255,0.35)" }}>KR</span>
    </button>
  );
}

// Card size
const W = 280;
const H = 420;

// Container size for the fan
const CW = 560;
const CH = 500;

const centerLeft = (CW - W) / 2; // 140px
const centerTop  = (CH - H) / 2; // 40px

export default function Landing({ onDraw, lang, onLangToggle }: LandingProps) {
  const [spread, setSpread] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);

  const rest = {
    left:   { transform: "rotate(-15deg) translateX(-220px) translateY(16px)" },
    center: { transform: "rotate(0deg) translateY(20px)" },
    right:  { transform: "rotate(15deg) translateX(220px) translateY(16px)" },
  };

  const fanned = {
    left:   { transform: "rotate(-15deg) translateX(-240px) translateY(16px)" },
    center: { transform: "rotate(0deg) translateY(-4px)" },
    right:  { transform: "rotate(15deg) translateX(240px) translateY(16px)" },
  };

  const pos  = spread ? fanned : rest;
  const ease = "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

  return (
    <div
      className="min-h-screen w-full bg-[#1e2430] flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="w-full h-[160px] absolute top-0 left-0 right-0 z-40">
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-corbert text-[28px] text-[#fcacf3] leading-none tracking-tight whitespace-nowrap">
          Seoul Chess Club Quest
        </p>
        <div className="absolute bottom-5 right-6">
          <LangToggle lang={lang} onToggle={onLangToggle} />
        </div>
      </div>

      {/* Title and subtitle */}
      <div className="absolute top-[160px] left-1/2 -translate-x-1/2 w-full max-w-[1108px] text-center flex flex-col gap-3 px-4">
        <h1 className="font-corbert text-[56px] text-white leading-tight tracking-tight">
          {lang === "en" ? "Draw Today's Chess Club Quest" : "오늘의 체스 클럽 퀘스트 뽑기"}
        </h1>
        <p className="font-sans text-[20px] text-white leading-relaxed tracking-tight">
          {lang === "en" ? "A small quest that opens a conversation" : "대화를 여는 작은 퀘스트"}
        </p>
      </div>

      {/* Cards fan — centered horizontally */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "270px" }}
      >
        <div
          className="relative cursor-default"
          style={{ width: CW, height: CH }}
          onMouseEnter={() => setSpread(true)}
          onMouseLeave={() => { setSpread(false); setTooltipHovered(false); }}
        >
          {/* Left: variant 1 (dark maroon) */}
          <div
            className={`absolute ${ease}`}
            style={{ top: centerTop, left: centerLeft, zIndex: 10, ...pos.left }}
          >
            <Card variant="1" page="Front" />
          </div>

          {/* Center: variant 2 (pink) */}
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
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1 text-center">
                  Sample quest
                </p>
                <p className="font-serif text-sm italic text-white/85 text-center">
                  &quot;Which chess piece do you like the most?&quot;
                </p>
              </div>
            )}
          </div>

          {/* Right: variant 4 (teal) */}
          <div
            className={`absolute ${ease}`}
            style={{ top: centerTop, left: centerLeft, zIndex: 15, ...pos.right }}
          >
            <Card variant="4" page="Front" />
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute bottom-[100px] left-0 right-0 w-full h-[333px] bg-gradient-to-b from-transparent to-[#1e2430] pointer-events-none z-20"
      />

      {/* Button section */}
      <div className="absolute bottom-[40px] left-0 right-0 w-full h-[260px] flex items-center justify-center z-30 pb-10">
        <button
          onClick={onDraw}
          className="bg-[#fe9ff7] text-[#2a0d29] font-corbert text-[20px] px-6 py-3 rounded-[14px] hover:opacity-90 transition-opacity"
        >
          {lang === "en" ? "Receive a Quest" : "퀘스트 받기"}
        </button>
      </div>

      <TickerFooter />
    </div>
  );
}

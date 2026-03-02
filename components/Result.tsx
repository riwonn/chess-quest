"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Card from "./Card";
import TickerFooter from "./TickerFooter";
import type { Quest } from "@/data/quests";
import { getVariant } from "@/data/quests";
import { shareCard } from "@/lib/shareCard";
import type { Lang } from "@/app/page";

interface ResultProps {
  quest: Quest;
  onRetry: () => void;
  lang: Lang;
  onLangToggle: () => void;
}

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

// ── FlipCard: front pattern → back content reveal ────────────
function FlipCard({ quest, lang }: { quest: Quest; lang: Lang }) {
  const [flipped, setFlipped] = useState(false);
  const variant = getVariant(quest.id);

  // Auto-flip after entrance animation settles (~700ms)
  // Fire confetti when the back face is revealed (~700ms + flip duration 850ms)
  useEffect(() => {
    const t1 = setTimeout(() => setFlipped(true), 700);
    const t2 = setTimeout(() => {
      // Two bursts from left and right edges
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#fcacf3", "#fe9ff7", "#ffffff", "#b08d57", "#f5f1ea"],
        scalar: 0.9,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#fcacf3", "#fe9ff7", "#ffffff", "#b08d57", "#f5f1ea"],
        scalar: 0.9,
      });
    }, 1600); // flip starts at 700ms, lasts 850ms → burst at 1550ms
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    // Perspective wrapper — required for 3D effect
    <div style={{ perspective: "1200px" }}>
      {/*
        Inner: rotates on Y axis.
        - Not flipped: shows front (pattern face)
        - Flipped: rotates 180deg to reveal back (quest content)
      */}
      <div
        id="share-card"
        style={{
          position: "relative",
          width: "280px",
          height: "420px",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transition: "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT face (pattern side) ───────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <Card variant={variant} page="Front" />
        </div>

        {/* ── BACK face (quest content) ────────────────────────── */}
        <div
          id="card-back-face"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            // Pre-rotate 180deg so it faces back; flip reveals it
            transform: "rotateY(180deg)",
          }}
        >
          <Card
            variant={variant}
            page="Back"
            title={lang === "en" ? quest.enTitle   : quest.krTitle}
            mission={lang === "en" ? quest.enMission : quest.krMission}
            starter={lang === "en" ? `"${quest.enStarter}"` : `"${quest.krStarter}"`}
            iconSeed={quest.id}
          />
        </div>
      </div>
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────────
export default function Result({ quest, onRetry, lang, onLangToggle }: ResultProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareCard(quest);
    } finally {
      setTimeout(() => setIsSharing(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[160px] z-10">
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-corbert text-[28px] text-pink leading-none tracking-tight whitespace-nowrap">
          Seoul Chess Club Quest
        </p>
        <div className="absolute bottom-5 right-6">
          <LangToggle lang={lang} onToggle={onLangToggle} />
        </div>
      </div>

      {/* ── Center content — between header and buttons ───────── */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center justify-center gap-5 px-4 animate-result-in"
        style={{ top: "160px", bottom: "260px" }}
      >
        {/* Subtitle */}
        <p className="font-sans text-[20px] text-white leading-relaxed tracking-tight text-center">
          {lang === "en"
            ? "Complete this quest at today's meetup to earn a free ticket to the next one!"
            : "오늘 밋업에서 이 퀘스트를 완료하면 다음 티켓이 무료!"}
        </p>

        {/* Flip card */}
        <FlipCard quest={quest} lang={lang} />
      </div>

      {/* ── Buttons ───────────────────────────────────────────── */}
      <div className="absolute bottom-[40px] left-0 right-0 h-[260px] flex items-center justify-center gap-4 z-30 pb-10">

        {/* Retry */}
        <button
          onClick={onRetry}
          className="
            bg-ivory text-pink-dark
            font-corbert text-[20px]
            px-8 py-3.5 rounded-[14px]
            hover:opacity-90 active:scale-[0.97]
            transition-all duration-150
            flex items-center gap-2.5 min-w-[180px] justify-center
          "
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
          </svg>
          {lang === "en" ? "Draw Again" : "다시 뽑기"}
        </button>

        {/* Share the Image */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="
            bg-gold text-white
            font-corbert text-[20px]
            px-8 py-3.5 rounded-[14px]
            hover:opacity-90 active:scale-[0.97]
            transition-all duration-150 shadow-card
            flex items-center gap-2.5 min-w-[200px] justify-center
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-2.5-7.5L2 9l20-7z" />
          </svg>
          {isSharing
            ? (lang === "en" ? "Saving…" : "저장 중…")
            : (lang === "en" ? "Save Card" : "카드 저장")}
        </button>
      </div>

      <TickerFooter />
    </div>
  );
}

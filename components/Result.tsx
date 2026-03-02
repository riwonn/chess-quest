"use client";

import { useState, useEffect } from "react";
import Card from "./Card";
import type { Quest } from "@/data/quests";
import { getVariant } from "@/data/quests";
import { shareCard } from "@/lib/shareCard";

interface ResultProps {
  quest: Quest;
  onRetry: () => void;
}

// ── FlipCard: front pattern → back content reveal ────────────
function FlipCard({ quest }: { quest: Quest }) {
  const [flipped, setFlipped] = useState(false);
  const variant = getVariant(quest.id);

  // Auto-flip after entrance animation settles (~700ms)
  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 700);
    return () => clearTimeout(t);
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
          }}
        >
          <Card variant={variant} page="Front" />
        </div>

        {/* ── BACK face (quest content) ────────────────────────── */}
        <div
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
            title={quest.enTitle}
            mission={quest.enMission}
            starter={`"${quest.enStarter}"`}
          />
        </div>
      </div>
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────────
export default function Result({ quest, onRetry }: ResultProps) {
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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center relative overflow-hidden pt-12 pb-32">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-end px-2 py-8 h-[160px]">
        <p className="font-corbert text-[28px] text-pink leading-none tracking-tight">
          Seoul Chess Club Quest
        </p>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="w-full flex flex-col items-center gap-8 mt-4 animate-result-in">

        {/* Quest title */}
        <h1 className="font-corbert text-[44px] text-white leading-tight tracking-tight text-center px-4">
          {quest.enTitle}
        </h1>

        {/* Flip card — front first, then auto-flips to back */}
        <FlipCard quest={quest} />
      </div>

      {/* ── Buttons — fixed at bottom ─────────────────────────── */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-10">

        {/* Retry */}
        <button
          onClick={onRetry}
          className="
            bg-ivory text-pink-dark
            font-serif font-bold text-[20px]
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
          Retry
        </button>

        {/* Share the Image */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="
            bg-gold text-white
            font-serif font-bold text-[20px]
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
          {isSharing ? "Saving…" : "Share the Image"}
        </button>
      </div>
    </div>
  );
}

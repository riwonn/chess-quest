"use client";

import React from "react";
import Image from "next/image";

export type CardVariant = "1" | "2" | "3" | "4" | "5";
type CardPage = "Front" | "Back";

interface CardProps {
  className?: string;
  variant?: CardVariant;
  page?: CardPage;
  title?: string;
  mission?: string;
  starter?: string;
}

// ── Background colors ─────────────────────────────────────────
const BG: Record<CardVariant, string> = {
  "1": "#6B0440",
  "2": "#FCACF3",
  "3": "#F5F1EA",
  "4": "#2F6F6D",
  "5": "#B08D57",
};

// ── Text colors (primary / muted) ─────────────────────────────
const TEXT: Record<CardVariant, { primary: string; muted: string; logo: string }> = {
  "1": { primary: "#ffffff",  muted: "rgba(255,255,255,0.75)", logo: "#ffffff" },
  "2": { primary: "#2a0d29",  muted: "rgba(42,13,41,0.65)",   logo: "#2a0d29" },
  "3": { primary: "#7a5c2e",  muted: "rgba(122,92,46,0.75)",  logo: "#7a5c2e" },
  "4": { primary: "#ffffff",  muted: "rgba(255,255,255,0.75)", logo: "#ffffff" },
  "5": { primary: "#ffffff",  muted: "rgba(255,255,255,0.75)", logo: "#ffffff" },
};

// ── Border separator color (used on card back footer) ─────────
const BORDER_COLOR: Record<CardVariant, string> = {
  "1": "rgba(255,255,255,0.18)",
  "2": "rgba(42,13,41,0.15)",
  "3": "rgba(122,92,46,0.20)",
  "4": "rgba(255,255,255,0.18)",
  "5": "rgba(255,255,255,0.18)",
};

// ── Mandala images per variant ────────────────────────────────
const MANDALA: Record<CardVariant, string> = {
  "1": "/images/mandala-1.png",
  "2": "/images/mandala-2.png",
  "3": "/images/mandala-3.png",
  "4": "/images/mandala-4.png",
  "5": "/images/mandala-5.png",
};

// ── Knight SVG (recolored per variant) ───────────────────────
function KnightIcon({ color, size = 22 }: { color: string; size?: number }) {
  const scale = size / 31;
  return (
    <svg
      width={27 * scale}
      height={31 * scale}
      viewBox="0 0 27 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 22.1691L6.1579 12.7992L3.47163 14.1097L0 11.9461L0 8.88773L8.21001 2.46099H10.0415V0L17.6615 0L21.864 4.67574L27 24.3748L22.7216 25.8777L27 27.3193V31H0L0 27.3193L5.49926 25.8777L0 22.1691Z"
        fill={color}
      />
    </svg>
  );
}

// BorderPattern removed — replaced by image-based borders

// ── Main Card component ───────────────────────────────────────
export default function Card({
  className,
  variant = "1",
  page = "Front",
  title,
  mission,
  starter,
}: CardProps) {
  const bg      = BG[variant];
  const text    = TEXT[variant];
  const border  = BORDER_COLOR[variant];
  const mandala: string = MANDALA[variant];

  const W = 280;
  const H = 420;

  return (
    <div
      className={className ?? "relative overflow-hidden"}
      style={{
        width: W,
        height: H,
        borderRadius: 28,
        backgroundColor: bg,
        flexShrink: 0,
      }}
    >
      {/* ── FRONT ─────────────────────────────────────────────── */}
      {page === "Front" && (
        <>
          {/* Border image — stretched to fill card exactly */}
          <Image
            src={`/images/border-${variant}.png`}
            alt=""
            fill
            style={{ objectFit: "fill" }}
            className="absolute inset-0 pointer-events-none"
            priority
          />

          {/* Knight icon — top center */}
          <div className="absolute top-7 left-0 right-0 flex justify-center" style={{ zIndex: 1 }}>
            <KnightIcon color={text.primary} size={26} />
          </div>

          {/* Mandala illustration — center */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
            <Image
              src={mandala}
              alt="card illustration"
              width={180}
              height={180}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </>
      )}

      {/* ── BACK ──────────────────────────────────────────────── */}
      {page === "Back" && (
        <div className="h-full flex flex-col">
          {/* Upper empty area */}
          <div className="flex-1" />

          {/* Text block — bottom portion */}
          <div className="px-6 pb-5">
            <h3
              className="font-corbert text-[26px] leading-tight mb-1"
              style={{ color: text.primary }}
            >
              {title ?? "Quest Title"}
            </h3>
            <p
              className="font-sans text-[15px] leading-snug"
              style={{ color: text.muted }}
            >
              {mission ?? "Quest Description"}
            </p>

            {/* Starter (if provided) */}
            {starter && (
              <p
                className="font-serif text-[13px] italic mt-3 leading-snug"
                style={{ color: text.muted }}
              >
                {starter}
              </p>
            )}
          </div>

          {/* Footer — Seoul Chess Club + logo */}
          <div
            className="px-6 py-4 flex items-center gap-2"
            style={{ borderTop: `1px solid ${border}` }}
          >
            <span
              className="font-serif text-[13px]"
              style={{ color: text.muted }}
            >
              Seoul Chess Club
            </span>
            <KnightIcon color={text.logo} size={18} />
          </div>
        </div>
      )}
    </div>
  );
}

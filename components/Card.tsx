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
  iconSeed?: number;
}

// ── Background gradients (top → bottom) ───────────────────────
const BG: Record<CardVariant, string> = {
  "1": "linear-gradient(to bottom, #9B1560, #6B0440)",
  "2": "linear-gradient(to bottom, #fde8fc, #FCACF3)",
  "3": "linear-gradient(to bottom, #ffffff, #F5F1EA)",
  "4": "linear-gradient(to bottom, #3D8F8C, #2F6F6D)",
  "5": "linear-gradient(to bottom, #C9A870, #B08D57)",
};

// ── Solid fallback (used for canvas share) ────────────────────
const BG_SOLID: Record<CardVariant, string> = {
  "1": "#6B0440",
  "2": "#FCACF3",
  "3": "#F5F1EA",
  "4": "#2F6F6D",
  "5": "#B08D57",
};

// ── Text colors (primary / muted) ─────────────────────────────
const TEXT: Record<CardVariant, { primary: string; muted: string; logo: string }> = {
  "1": { primary: "#FCACF3",  muted: "rgba(255,255,255,0.75)", logo: "#FCACF3" },
  "2": { primary: "#6C0A41",  muted: "rgba(42,13,41,0.65)",   logo: "#6C0A41" },
  "3": { primary: "#B18E5B",  muted: "rgba(122,92,46,0.75)",  logo: "#B18E5B" },
  "4": { primary: "#F3EEE8",  muted: "rgba(255,255,255,0.75)", logo: "#F3EEE8" },
  "5": { primary: "#F3EEE8",  muted: "rgba(255,255,255,0.75)", logo: "#F3EEE8" },
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

// ── Quest icons (chess + social themed) ──────────────────────
function QuestIcon({ index, color, size = 40 }: { index: number; color: string; size?: number }) {
  const icons = [
    // 0: Pawn
    <svg key={0} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="12" r="7" fill={color} />
      <path d="M13 34h14l-2-10H15L13 34z" fill={color} />
      <rect x="11" y="32" width="18" height="3" rx="1.5" fill={color} />
    </svg>,
    // 1: Bishop (mitre shape)
    <svg key={1} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="30" rx="9" ry="4" fill={color} />
      <path d="M20 4 C14 10 12 18 14 26h12c2-8 0-16-6-22z" fill={color} />
      <circle cx="20" cy="11" r="2.5" fill={color} opacity="0.4" />
    </svg>,
    // 2: Rook / Castle
    <svg key={2} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="10" y="18" width="20" height="16" rx="2" fill={color} />
      <rect x="10" y="10" width="4" height="10" rx="1" fill={color} />
      <rect x="18" y="10" width="4" height="10" rx="1" fill={color} />
      <rect x="26" y="10" width="4" height="10" rx="1" fill={color} />
      <rect x="10" y="32" width="20" height="3" rx="1.5" fill={color} />
    </svg>,
    // 3: Queen (crown)
    <svg key={3} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 28h24l-4-16-6 8-2-10-2 10-6-8-4 16z" fill={color} />
      <rect x="8" y="28" width="24" height="4" rx="2" fill={color} />
      <circle cx="8" cy="14" r="2.5" fill={color} />
      <circle cx="20" cy="10" r="2.5" fill={color} />
      <circle cx="32" cy="14" r="2.5" fill={color} />
    </svg>,
    // 4: King (cross)
    <svg key={4} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="18" y="4" width="4" height="12" rx="2" fill={color} />
      <rect x="14" y="7" width="12" height="4" rx="2" fill={color} />
      <path d="M12 18h16l3 14H9L12 18z" fill={color} />
      <rect x="9" y="30" width="22" height="4" rx="2" fill={color} />
    </svg>,
    // 5: Speech bubble
    <svg key={5} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M6 8a4 4 0 014-4h20a4 4 0 014 4v16a4 4 0 01-4 4H16l-8 6V28a4 4 0 01-2-3.46V8z" fill={color} />
    </svg>,
    // 6: Star (6-point)
    <svg key={6} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <polygon points="20,4 24,16 36,16 26,24 30,36 20,28 10,36 14,24 4,16 16,16" fill={color} />
    </svg>,
    // 7: Handshake / Two hands
    <svg key={7} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 20c0 0 6-8 10-8h4l8 8-4 2-4-4H16" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M36 20c0 0-6-8-10-8h-2" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M14 20l2 2 4-2 4 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M8 28l8-8M16 28l8-8M24 28l4-4" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>,
  ];
  return icons[index % icons.length];
}

// ── Knight SVG (recolored per variant) ───────────────────────
function KnightIcon({ color, size = 27 }: { color: string; size?: number }) {
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
  iconSeed = 0,
}: CardProps) {
  const bg      = BG[variant];
  const _bgSolid = BG_SOLID[variant]; // reserved for canvas share
  void _bgSolid;
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
        background: bg,
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
          <div className="absolute left-0 right-0 flex justify-center" style={{ zIndex: 1, top: "100px" }}>
            <KnightIcon color={text.primary} size={31} />
          </div>

          {/* Mandala illustration — center */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
            <Image
              src={mandala}
              alt="card illustration"
              width={126}
              height={126}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </>
      )}

      {/* ── BACK ──────────────────────────────────────────────── */}
      {page === "Back" && (
        <div className="h-full flex flex-col">
          {/* Icon — upper center */}
          <div className="flex-1 flex items-center justify-center">
            <QuestIcon index={iconSeed} color={text.primary} size={48} />
          </div>

          {/* Text block — bottom portion */}
          <div className="px-6 pb-5 text-center">
            <h3
              className="font-corbert text-[26px] leading-tight mb-1"
              style={{ color: text.primary }}
            >
              {title ?? "Quest Title"}
            </h3>
            <p
              className="font-sans text-[14px] leading-relaxed"
              style={{ color: text.muted }}
            >
              {mission ?? "Quest Description"}
            </p>

            {/* Starter (if provided) */}
            {starter && (
              <p
                className="font-serif text-[13px] italic mt-3 leading-relaxed"
                style={{ color: text.muted }}
              >
                {starter}
              </p>
            )}
          </div>

          {/* Footer — Seoul Chess Club */}
          <div className="px-6 py-4 flex justify-center">
            <span
              className="font-serif text-[13px]"
              style={{ color: text.muted }}
            >
              Seoul Chess Club
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

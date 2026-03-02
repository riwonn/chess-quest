"use client";

import React from "react";

export type CardVariant = "1" | "2" | "3" | "4" | "5";
type CardPage = "Front" | "Back";

interface CardProps {
  className?: string;
  variant?: CardVariant;
  page?: CardPage;
  // Back-side content
  title?: string;
  mission?: string;
  starter?: string;
}

// ── Background colors per variant ────────────────────────────
const bgByVariant: Record<CardVariant, string> = {
  "1": "#6b0440",
  "2": "#fcacf3",
  "3": "#2f6f6d",
  "4": "#f5f1ea",
  "5": "#b08d57",
};

// ── Border / pattern colors per variant ──────────────────────
const borderByVariant: Record<CardVariant, { outer: string; inner: string }> = {
  "1": { outer: "rgba(252,172,243,0.30)", inner: "rgba(252,172,243,0.20)" },
  "2": { outer: "rgba(42,13,41,0.20)",   inner: "rgba(42,13,41,0.12)" },
  "3": { outer: "rgba(252,172,243,0.30)", inner: "rgba(252,172,243,0.20)" },
  "4": { outer: "rgba(200,150,100,0.30)", inner: "rgba(200,150,100,0.20)" },
  "5": { outer: "rgba(252,172,243,0.30)", inner: "rgba(252,172,243,0.20)" },
};

// ── Text color per variant ────────────────────────────────────
const textByVariant: Record<CardVariant, { primary: string; muted: string }> = {
  "1": { primary: "#ffffff",       muted: "rgba(255,255,255,0.6)" },
  "2": { primary: "#2a0d29",       muted: "rgba(42,13,41,0.55)" },
  "3": { primary: "#ffffff",       muted: "rgba(255,255,255,0.6)" },
  "4": { primary: "#2a0d29",       muted: "rgba(42,13,41,0.55)" },
  "5": { primary: "#ffffff",       muted: "rgba(255,255,255,0.6)" },
};

export default function Card({
  className,
  variant = "1",
  page = "Front",
  title,
  mission,
  starter,
}: CardProps) {
  const bg      = bgByVariant[variant];
  const border  = borderByVariant[variant];
  const text    = textByVariant[variant];

  return (
    <div
      className={className ?? "h-[420px] w-[280px] rounded-[30px] overflow-hidden relative"}
      style={{ backgroundColor: bg }}
    >
      {/* ── FRONT ───────────────────────────────────────────── */}
      {page === "Front" && (
        <>
          {/* Circle-pattern SVG overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.4 }}
          >
            <defs>
              <pattern
                id={`dots-${variant}`}
                x="20" y="20"
                width="30" height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="15" cy="15" r="8"
                  fill="none"
                  stroke={border.outer}
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            {/* Outer decorative rect */}
            <rect
              x="10" y="10" width="260" height="400" rx="18"
              fill="none"
              stroke={border.outer}
              strokeWidth="2"
            />
            {/* Pattern fill */}
            <rect
              x="10" y="10" width="260" height="400" rx="18"
              fill={`url(#dots-${variant})`}
            />
          </svg>

          {/* Inner border */}
          <div
            className="absolute rounded-[18px] pointer-events-none"
            style={{ inset: "10px", border: `1px solid ${border.inner}` }}
          />

          {/* Center monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif text-5xl font-light"
              style={{ color: border.outer, opacity: 0.6 }}
            >
              ♟
            </span>
          </div>
        </>
      )}

      {/* ── BACK ────────────────────────────────────────────── */}
      {page === "Back" && (
        <div
          className="h-full flex flex-col px-7 pt-7 pb-6"
          style={{ color: text.primary }}
        >
          {/* Club label */}
          <p
            className="font-sans text-[11px] tracking-[0.22em] uppercase mb-5"
            style={{ color: text.muted }}
          >
            Seoul Chess Club Quest
          </p>

          {/* Quest title */}
          <h3
            className="font-serif text-[22px] font-bold leading-snug mb-4"
            style={{ color: text.primary }}
          >
            {title ?? "Quest Title"}
          </h3>

          {/* Thin divider */}
          <div
            className="w-8 h-px mb-4"
            style={{ backgroundColor: text.muted }}
          />

          {/* Mission text */}
          <p
            className="font-sans text-[13px] leading-relaxed flex-1"
            style={{ color: text.muted }}
          >
            {mission ?? ""}
          </p>

          {/* Conversation starter */}
          {starter && (
            <div
              className="mt-4 pt-4"
              style={{ borderTop: `1px solid ${border.inner}` }}
            >
              <p
                className="font-sans text-[9px] tracking-[0.2em] uppercase mb-1.5"
                style={{ color: text.muted }}
              >
                Try saying
              </p>
              <p
                className="font-serif text-[13px] italic leading-snug"
                style={{ color: text.primary }}
              >
                {starter}
              </p>
            </div>
          )}

          {/* Footer */}
          <div
            className="mt-4 flex items-center justify-center gap-1.5"
            style={{ color: text.muted }}
          >
            <span className="font-serif text-[11px]">Seoul Chess Club</span>
            <span className="text-[13px]">♟</span>
          </div>
        </div>
      )}
    </div>
  );
}

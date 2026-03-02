import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Figma palette ─────────────────────────────────────
        bg:      "#1e2430",   // main background
        surface: "#232c3d",   // elevated surface

        // Card variants (matches Card.tsx)
        "card-1": "#6b0440",  // dark maroon/pink
        "card-2": "#fcacf3",  // bright pink
        "card-3": "#2f6f6d",  // teal
        "card-4": "#f5f1ea",  // ivory
        "card-5": "#b08d57",  // gold

        // Brand
        pink:       "#fcacf3",
        "pink-cta": "#fe9ff7",
        "pink-dark":"#2a0d29",

        // Buttons
        ivory: "#f5f1ea",
        gold:  "#b08d57",

        // Typography
        "text-primary": "#ffffff",
        "text-muted":   "rgba(255,255,255,0.55)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:       "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        "card-hover":"0 16px 48px rgba(0,0,0,0.55)",
        glow:       "0 0 24px rgba(252,172,243,0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "tooltip-in": {
          "0%":   { opacity: "0", transform: "translateY(4px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        // Shuffle: 3 distinct motion paths
        shuffle1: {
          "0%":   { transform: "rotate(-15deg) translate(0px, 0px)" },
          "20%":  { transform: "rotate(18deg)  translate(110px, -40px)" },
          "45%":  { transform: "rotate(-20deg) translate(-70px, 30px)" },
          "70%":  { transform: "rotate(10deg)  translate(80px, -15px)" },
          "100%": { transform: "rotate(-15deg) translate(0px, 0px)" },
        },
        shuffle2: {
          "0%":   { transform: "rotate(0deg)   translate(0px,  0px)" },
          "25%":  { transform: "rotate(-22deg) translate(-90px, 25px)" },
          "55%":  { transform: "rotate(25deg)  translate(100px,-30px)" },
          "80%":  { transform: "rotate(-8deg)  translate(-30px, 10px)" },
          "100%": { transform: "rotate(0deg)   translate(0px,  0px)" },
        },
        shuffle3: {
          "0%":   { transform: "rotate(15deg)  translate(0px,  0px)" },
          "30%":  { transform: "rotate(-12deg) translate(-80px,-20px)" },
          "60%":  { transform: "rotate(28deg)  translate(120px, 35px)" },
          "85%":  { transform: "rotate(-18deg) translate(-40px,-25px)" },
          "100%": { transform: "rotate(15deg)  translate(0px,  0px)" },
        },
        "result-in": {
          "0%":   { opacity: "0", transform: "scale(0.88) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1)    translateY(0)" },
        },
      },
      animation: {
        "fade-in":   "fade-in 0.5s ease forwards",
        "tooltip-in":"tooltip-in 0.18s ease forwards",
        shuffle1:    "shuffle1 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
        shuffle2:    "shuffle2 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
        shuffle3:    "shuffle3 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
        "result-in": "result-in 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;

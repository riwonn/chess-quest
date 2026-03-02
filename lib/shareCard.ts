import type { Quest } from "@/data/quests";
import { getVariant } from "@/data/quests";

// ── Card colors (must match Card.tsx) ────────────────────────
const BG: Record<string, string> = {
  "1": "#6b0440",
  "2": "#fcacf3",
  "3": "#2f6f6d",
  "4": "#f5f1ea",
  "5": "#b08d57",
};

// ── Helper: filled rounded rect ───────────────────────────────
function fillRounded(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
  fill: string
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

// ── Helper: stroked rounded rect ─────────────────────────────
function strokeRounded(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
  stroke: string,
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

// ── Helper: word-wrap text ────────────────────────────────────
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== "") {
      ctx.fillText(line.trim(), x, currentY);
      line = word + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

/**
 * Draws the quest card directly onto a Canvas and downloads as PNG.
 * Pure canvas — no DOM capture, no CORS font issues.
 */
export async function shareCard(quest: Quest): Promise<void> {
  const W = 280;
  const H = 420;
  const SCALE = 2;       // retina
  const PAD = 28;

  const canvas = document.createElement("canvas");
  canvas.width  = W * SCALE;
  canvas.height = H * SCALE;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.scale(SCALE, SCALE);

  const variant   = getVariant(quest.id);
  const isLight   = variant === "2" || variant === "4";
  const bg        = BG[variant];
  const textCol   = isLight ? "#2a0d29"                : "#ffffff";
  const mutedCol  = isLight ? "rgba(42,13,41,0.55)"   : "rgba(255,255,255,0.55)";
  const borderCol = isLight ? "rgba(42,13,41,0.15)"   : "rgba(255,255,255,0.18)";
  const dotCol    = isLight ? "rgba(42,13,41,0.12)"   : "rgba(252,172,243,0.22)";

  // ── Background ───────────────────────────────────────────────
  fillRounded(ctx, 0, 0, W, H, 30, bg);

  // ── Clip to card shape ───────────────────────────────────────
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(30, 0); ctx.lineTo(W - 30, 0);
  ctx.quadraticCurveTo(W, 0, W, 30);
  ctx.lineTo(W, H - 30); ctx.quadraticCurveTo(W, H, W - 30, H);
  ctx.lineTo(30, H);    ctx.quadraticCurveTo(0, H, 0, H - 30);
  ctx.lineTo(0, 30);    ctx.quadraticCurveTo(0, 0, 30, 0);
  ctx.closePath();
  ctx.clip();

  // Subtle circle dot pattern (mimics Card.tsx SVG overlay)
  ctx.globalAlpha = 0.35;
  for (let px = 20; px < W; px += 30) {
    for (let py = 20; py < H; py += 30) {
      ctx.beginPath();
      ctx.arc(px + 15, py + 15, 8, 0, Math.PI * 2);
      ctx.strokeStyle = dotCol;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // ── Inner border ─────────────────────────────────────────────
  strokeRounded(ctx, 10, 10, W - 20, H - 20, 18, borderCol, 1);

  // ── Club label ───────────────────────────────────────────────
  ctx.fillStyle = mutedCol;
  ctx.font      = "500 9.5px system-ui, sans-serif";
  ctx.fillText("SEOUL CHESS CLUB QUEST", PAD, 48);

  // ── Quest title ──────────────────────────────────────────────
  ctx.fillStyle = textCol;
  ctx.font      = `bold 21px Georgia, "Times New Roman", serif`;
  const titleBottom = wrapText(ctx, quest.enTitle, PAD, 80, W - PAD * 2, 26);

  // ── Divider ──────────────────────────────────────────────────
  ctx.strokeStyle = mutedCol;
  ctx.lineWidth   = 0.8;
  ctx.beginPath();
  ctx.moveTo(PAD, titleBottom + 4);
  ctx.lineTo(PAD + 32, titleBottom + 4);
  ctx.stroke();

  // ── Mission ──────────────────────────────────────────────────
  ctx.fillStyle = mutedCol;
  ctx.font      = "400 12.5px system-ui, sans-serif";
  const missionBottom = wrapText(
    ctx,
    quest.enMission,
    PAD,
    titleBottom + 22,
    W - PAD * 2,
    19
  );

  // ── Separator line ───────────────────────────────────────────
  const sepY = Math.max(missionBottom + 12, H - 120);
  ctx.strokeStyle = borderCol;
  ctx.lineWidth   = 0.6;
  ctx.beginPath();
  ctx.moveTo(PAD, sepY);
  ctx.lineTo(W - PAD, sepY);
  ctx.stroke();

  // ── "Try saying" label ───────────────────────────────────────
  ctx.fillStyle = mutedCol;
  ctx.font      = "500 8.5px system-ui, sans-serif";
  ctx.fillText("TRY SAYING", PAD, sepY + 18);

  // ── Starter text ─────────────────────────────────────────────
  ctx.fillStyle = textCol;
  ctx.font      = `italic 13px Georgia, "Times New Roman", serif`;
  wrapText(ctx, `"${quest.enStarter}"`, PAD, sepY + 36, W - PAD * 2, 19);

  // ── Footer ───────────────────────────────────────────────────
  const footer   = "Seoul Chess Club  \u265F";
  ctx.fillStyle  = mutedCol;
  ctx.font       = "400 11px Georgia, serif";
  const fw       = ctx.measureText(footer).width;
  ctx.fillText(footer, (W - fw) / 2, H - 18);

  // ── Download ─────────────────────────────────────────────────
  const dataUrl = canvas.toDataURL("image/png");
  const link    = document.createElement("a");
  link.download = `chess-quest-${quest.id}-${slugify(quest.enTitle)}.png`;
  link.href     = dataUrl;
  link.click();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

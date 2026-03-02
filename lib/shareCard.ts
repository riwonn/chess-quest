import { toPng } from "html-to-image";
import type { Quest } from "@/data/quests";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Captures the rendered card back face as PNG and downloads it.
 * Uses html-to-image on the actual DOM element so the image matches
 * exactly what the user sees on screen.
 */
export async function shareCard(quest: Quest): Promise<void> {
  const el = document.getElementById("card-back-face");
  if (!el) return;

  // Temporarily reset the 3D transform so html-to-image captures it flat
  const prev = el.style.transform;
  el.style.transform = "none";

  try {
    const dataUrl = await toPng(el, {
      pixelRatio: 2,
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = `chess-quest-${quest.id}-${slugify(quest.enTitle)}.png`;
    link.href = dataUrl;
    link.click();
  } finally {
    el.style.transform = prev;
  }
}

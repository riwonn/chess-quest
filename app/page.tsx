"use client";

import { useState, useCallback } from "react";
import Landing from "@/components/Landing";
import Shuffle from "@/components/Shuffle";
import Result from "@/components/Result";
import { quests, type Quest } from "@/data/quests";

/* ─── App states ─────────────────────────────────────────────── */
type AppState = "landing" | "shuffling" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("landing");
  const [quest, setQuest] = useState<Quest | null>(null);

  /* Called when user presses "Receive a Quest" */
  const handleDraw = useCallback(() => {
    setState("shuffling");
  }, []);

  /* Called by Shuffle after its animation finishes (~1.7s) */
  const handleShuffleComplete = useCallback(() => {
    const picked = quests[Math.floor(Math.random() * quests.length)];
    setQuest(picked);
    setState("result");
  }, []);

  /* Called when user presses "Retry" */
  const handleRetry = useCallback(() => {
    setQuest(null);
    setState("landing");
  }, []);

  return (
    <>
      {state === "landing" && <Landing onDraw={handleDraw} />}
      {state === "shuffling" && <Shuffle onComplete={handleShuffleComplete} />}
      {state === "result" && quest && <Result quest={quest} onRetry={handleRetry} />}
    </>
  );
}

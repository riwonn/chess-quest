"use client";

import { useState, useCallback } from "react";
import Landing from "@/components/Landing";
import Shuffle from "@/components/Shuffle";
import Result from "@/components/Result";
import { quests, type Quest } from "@/data/quests";

export type Lang = "en" | "kr";

type AppState = "landing" | "shuffling" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("landing");
  const [quest, setQuest] = useState<Quest | null>(null);
  const [lang, setLang] = useState<Lang>("en");

  const handleDraw = useCallback(() => setState("shuffling"), []);

  const handleShuffleComplete = useCallback(() => {
    const picked = quests[Math.floor(Math.random() * quests.length)];
    setQuest(picked);
    setState("result");
  }, []);

  const handleRetry = useCallback(() => {
    setQuest(null);
    setState("landing");
  }, []);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "en" ? "kr" : "en"));
  }, []);

  return (
    <>
      {state === "landing"   && <Landing  onDraw={handleDraw} lang={lang} onLangToggle={toggleLang} />}
      {state === "shuffling" && <Shuffle  onComplete={handleShuffleComplete} lang={lang} onLangToggle={toggleLang} />}
      {state === "result"    && quest && <Result quest={quest} onRetry={handleRetry} lang={lang} onLangToggle={toggleLang} />}
    </>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import { TAROT_TOPICS } from "@/data/saju/tarot";
import type { TarotTopic } from "@/data/saju/types";
import { saveTarotDraw, shuffleDeck, type DrawnCard, type TarotSpread } from "@/lib/saju/tarot";
import { PhotoIcon } from "@/components/PhotoIcon";
import { TarotCardBack } from "@/components/saju/TarotCardView";

const STORAGE_ERROR = "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";

export function TarotStart({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const router = useRouter();
  const [topic, setTopic] = useState<TarotTopic | null>(null);
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [deck, setDeck] = useState<DrawnCard[] | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [shuffling, setShuffling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const color = test.accentColor;
  const need = spread === "three" ? 3 : 1;

  function shuffle() {
    setPicked([]);
    setShuffling(true);
    setDeck(shuffleDeck());
    window.setTimeout(() => setShuffling(false), 700);
  }

  function choose(nextSpread: TarotSpread) {
    setSpread(nextSpread);
    shuffle();
  }

  function toggle(index: number) {
    if (shuffling) return;
    setPicked((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : current.length < need ? [...current, index] : current
    );
  }

  function reveal() {
    if (!topic || !spread || !deck || picked.length !== need) return;
    if (!saveTarotDraw({ topic, spread, cards: picked.map((index) => deck[index]) })) {
      setError(STORAGE_ERROR);
      return;
    }
    router.push(`/s/${test.id}/me`);
  }

  const topicInfo = TAROT_TOPICS.find((item) => item.key === topic);

  if (spread && deck && topicInfo) {
    return (
      <div className="flex w-full flex-col items-center gap-5 text-center">
        <div className="flex w-full items-center justify-between text-sm font-semibold text-zinc-400">
          <button type="button" onClick={() => setSpread(null)}>
            ← 이전
          </button>
          <span>
            {topicInfo.emoji} {topicInfo.name} · {spread === "three" ? "세 장" : "한 장"}
          </span>
        </div>
        <h1 className="text-xl font-extrabold leading-snug">
          마음속으로 질문을 떠올리고
          <br />
          끌리는 카드 {need}장을 골라 주세요
        </h1>
        <p className="-mt-2 text-sm text-zinc-500">“{topicInfo.question}”</p>
        <div className="grid grid-cols-6 gap-2">
          {deck.map((_, index) => {
            const order = picked.indexOf(index);
            return (
              <button
                key={index}
                type="button"
                onClick={() => toggle(index)}
                aria-label={`${index + 1}번째 카드${order >= 0 ? ` (${order + 1}번째로 고름)` : ""}`}
                className="relative transition-transform duration-500"
                style={{
                  transform: shuffling
                    ? `translate(${((index * 37) % 21) - 10}px, ${((index * 53) % 17) - 8}px) rotate(${((index * 29) % 31) - 15}deg)`
                    : order >= 0
                      ? "translateY(-8px)"
                      : undefined,
                  opacity: picked.length === need && order < 0 ? 0.45 : 1,
                }}
              >
                <TarotCardBack size="sm" />
                {order >= 0 && (
                  <span
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {order + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <button
            type="button"
            onClick={reveal}
            disabled={picked.length !== need}
            className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-40"
            style={{ backgroundColor: color }}
          >
            {picked.length === need ? "카드 펼치기" : `${picked.length} / ${need}장 골랐어요`}
          </button>
          <button type="button" onClick={shuffle} className="text-sm font-semibold text-zinc-400 underline underline-offset-4">
            다시 섞기
          </button>
        </div>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {test.image ? <PhotoIcon src={test.image} size="xl" /> : <div className="text-7xl">{test.emoji}</div>}
      <p className="text-sm font-bold" style={{ color }}>
        {seriesNameOf(test)}
      </p>
      <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{test.description}</p>

      <div className="flex w-full flex-col gap-5 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">① 무엇이 궁금한가요?</span>
          <div className="grid grid-cols-2 gap-2">
            {TAROT_TOPICS.map((item) => {
              const active = topic === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTopic(item.key)}
                  className={`rounded-xl border px-3 py-3 text-base font-semibold transition-colors ${active ? "text-white" : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"}`}
                  style={active ? { backgroundColor: color, borderColor: color } : undefined}
                >
                  {item.emoji} {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">② 몇 장을 뽑을까요?</span>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { key: "one", title: "한 장", text: "오늘의 메시지" },
                { key: "three", title: "세 장", text: "과거 · 현재 · 미래" },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                disabled={!topic}
                onClick={() => choose(item.key)}
                className="flex flex-col items-center gap-0.5 rounded-xl border border-zinc-200 px-3 py-3 transition-colors disabled:opacity-40 dark:border-zinc-700"
              >
                <span className="text-base font-bold">{item.title}</span>
                <span className="text-xs text-zinc-500">{item.text}</span>
              </button>
            ))}
          </div>
          {!topic && <span className="text-xs text-zinc-400">먼저 궁금한 주제를 골라 주세요.</span>}
        </div>
      </div>

      {guide}
    </div>
  );
}

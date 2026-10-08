"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import { TAROT_TOPICS } from "@/data/saju/tarot";
import type { TarotTopic } from "@/data/saju/types";
import { saveTarotDraw, shuffleDeck, type DrawnCard, type TarotSpread } from "@/lib/saju/tarot";
import { PhotoIcon } from "@/components/PhotoIcon";
import { TarotCardBack } from "@/components/saju/TarotCardView";

const STORAGE_ERROR = "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";

// 섞기 모션 — 실제 순서는 shuffleDeck()이 정하고, 이 모션은 보여주기용이다.
// 모으기 → 두 덩어리로 나누기 → 양쪽에서 한 장씩 엇갈려 끼워 넣기(리플 셔플) → 다시 펼치기
type ShufflePhase = "idle" | "gather" | "split" | "riffle" | "deal";
const DECK_SIZE = 22;
const HALF = DECK_SIZE / 2;
/** 쌓인 카드가 한 장마다 올라가는 높이(px) — 덩어리에 두께가 보이게 한다 */
const LAYER = 0.6;
/** 나눈 두 덩어리가 가운데에서 좌우로 벌어지는 거리(px) */
const SPLIT_GAP = 46;
const RIFFLE_STEP = 26;
const DEAL_STEP = 16;
const PHASE_MS = {
  gather: 450,
  split: 380,
  riffle: DECK_SIZE * RIFFLE_STEP + 260,
  deal: DECK_SIZE * DEAL_STEP + 420,
};

/** 왼쪽 덩어리 i번째 → 2i, 오른쪽 덩어리 i번째 → 2i+1 순서로 떨어져 한 덩어리가 된다 */
const riffleOrder = (index: number) => (index < HALF ? index * 2 : (index - HALF) * 2 + 1);

function cardMotion(phase: ShufflePhase, index: number, offset: { x: number; y: number } | undefined) {
  if (phase === "idle" || !offset) return null;
  const { x, y } = offset;
  switch (phase) {
    case "gather":
      return {
        transform: `translate(${x}px, ${y - index * LAYER}px) rotate(${((index * 5) % 7) - 3}deg)`,
        transition: `transform 380ms cubic-bezier(.3,.7,.4,1) ${index * 6}ms`,
        zIndex: index + 1,
      };
    case "split": {
      const left = index < HALF;
      const layer = left ? index : index - HALF;
      return {
        // 두 덩어리를 안쪽 모서리가 내려가게 살짝 기울여 손으로 튕기기 직전처럼 보이게 한다
        transform: `translate(${x + (left ? -SPLIT_GAP : SPLIT_GAP)}px, ${y - 10 - layer * LAYER}px) rotate(${left ? 9 : -9}deg)`,
        transition: "transform 320ms ease-in-out",
        zIndex: layer + 1,
      };
    }
    case "riffle": {
      const order = riffleOrder(index);
      return {
        transform: `translate(${x}px, ${y - order * LAYER}px) rotate(0deg)`,
        transition: `transform 200ms ease-in ${order * RIFFLE_STEP}ms`,
        zIndex: order + 1,
      };
    }
    case "deal":
      return {
        transform: "translate(0px, 0px) rotate(0deg)",
        transition: `transform 400ms cubic-bezier(.2,.8,.3,1) ${index * DEAL_STEP}ms`,
        zIndex: DECK_SIZE - index,
      };
  }
}

export function TarotStart({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const router = useRouter();
  const [topic, setTopic] = useState<TarotTopic | null>(null);
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [deck, setDeck] = useState<DrawnCard[] | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [phase, setPhase] = useState<ShufflePhase>("idle");
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const shuffling = phase !== "idle";
  const color = test.accentColor;
  const need = spread === "three" ? 3 : 1;

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  /** 카드마다 제자리에서 카드 묶음 가운데까지의 거리 — 변형(transform)의 영향을 받지 않는 offset 값으로 잰다 */
  function measure() {
    const grid = gridRef.current;
    if (!grid) return null;
    const centerX = grid.clientWidth / 2;
    const centerY = grid.clientHeight / 2;
    return cardRefs.current.map((card) =>
      card
        ? { x: centerX - (card.offsetLeft + card.offsetWidth / 2), y: centerY - (card.offsetTop + card.offsetHeight / 2) }
        : { x: 0, y: 0 }
    );
  }

  function animate() {
    clearTimers();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measured = measure();
    if (reduce || !measured) {
      setPhase("idle");
      return;
    }
    setOffsets(measured);
    const steps: (keyof typeof PHASE_MS)[] = ["gather", "split", "riffle", "deal"];
    let at = 0;
    steps.forEach((step) => {
      timers.current.push(window.setTimeout(() => setPhase(step), at));
      at += PHASE_MS[step];
    });
    timers.current.push(window.setTimeout(() => setPhase("idle"), at));
  }

  function shuffle() {
    setPicked([]);
    setDeck(shuffleDeck());
    setPhase("gather");
    // 카드 판이 그려진 뒤에 자리를 재고 모션을 시작한다 (처음 펼칠 때도 같은 모션이 보이게).
    // requestAnimationFrame 은 탭이 가려지면 멈춰서 '섞는 중'에 갇힐 수 있어 타이머를 쓴다.
    clearTimers();
    timers.current.push(window.setTimeout(animate, 30));
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
          <button
            type="button"
            onClick={() => {
              clearTimers();
              setPhase("idle");
              setSpread(null);
            }}
          >
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
        <div ref={gridRef} className="relative grid grid-cols-6 gap-2" aria-busy={shuffling}>
          {deck.map((_, index) => {
            const order = picked.indexOf(index);
            const motion = cardMotion(phase, index, offsets[index]);
            return (
              <button
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                type="button"
                onClick={() => toggle(index)}
                aria-label={`${index + 1}번째 카드${order >= 0 ? ` (${order + 1}번째로 고름)` : ""}`}
                className="relative"
                style={
                  motion ?? {
                    transform: order >= 0 ? "translateY(-8px)" : "translateY(0px)",
                    transition: "transform 200ms ease-out, opacity 200ms",
                    opacity: picked.length === need && order < 0 ? 0.45 : 1,
                  }
                }
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
            disabled={shuffling || picked.length !== need}
            className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-40"
            style={{ backgroundColor: color }}
          >
            {shuffling ? "카드를 섞는 중…" : picked.length === need ? "카드 펼치기" : `${picked.length} / ${need}장 골랐어요`}
          </button>
          <button
            type="button"
            onClick={shuffle}
            disabled={shuffling}
            className="text-sm font-semibold text-zinc-400 underline underline-offset-4 disabled:opacity-40"
          >
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
          data-track="start"
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

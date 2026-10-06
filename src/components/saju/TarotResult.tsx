"use client";

import { useEffect, useState } from "react";
import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import { getTarotCard, TAROT_TOPICS } from "@/data/saju/tarot";
import { loadTarotDraw, romanOf, SPREAD_POSITIONS, type TarotDraw } from "@/lib/saju/tarot";
import { PhotoIcon } from "@/components/PhotoIcon";
import { TarotCardBack, TarotCardFace } from "@/components/saju/TarotCardView";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

type State = { status: "loading" } | { status: "missing" } | { status: "ready"; draw: TarotDraw };

/** 세 장 펼침의 흐름 한 줄 — 정방향 카드 수로 고른다 */
const FLOW = [
  "세 장 모두 역방향이에요. 지금은 속도를 늦추고, 막힌 곳이 어디인지 차분히 들여다볼 때라는 신호로 읽어요.",
  "정방향이 한 장뿐이라 아직은 정리할 것이 남아 있는 흐름이에요. 바로 서 있는 카드가 실마리가 되어 줄 거예요.",
  "정방향이 두 장이라 대체로 순한 흐름이에요. 거꾸로 놓인 한 장만 조금 더 신경 써 주면 돼요.",
  "세 장 모두 정방향이에요. 흐름이 막힘없이 이어지는 편이니, 마음먹은 일을 믿고 밀고 나가 보세요.",
];

const hasFinal = (word: string) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
};

export function TarotResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });
  /** 뒤집은 카드 순번 */
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    const draw = loadTarotDraw();
    // sessionStorage 는 마운트 후에만 읽을 수 있어서 effect 안에서 상태를 정한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(draw ? { status: "ready", draw } : { status: "missing" });
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">카드를 펼치는 중이에요…</p>;
  }
  if (state.status === "missing") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        {test.image ? <PhotoIcon src={test.image} size="lg" /> : <div className="text-5xl">{test.emoji}</div>}
        <p className="text-base font-semibold">고른 카드가 없어요</p>
        <a
          href={`/s/${test.id}`}
          className="rounded-full px-6 py-3 text-base font-bold text-white"
          style={{ backgroundColor: test.accentColor }}
        >
          카드 뽑으러 가기
        </a>
      </div>
    );
  }

  const { draw } = state;
  const color = test.accentColor;
  const topic = TAROT_TOPICS.find((item) => item.key === draw.topic)!;
  const positions = SPREAD_POSITIONS[draw.spread];
  const cards = draw.cards.map((drawn) => ({ ...drawn, card: getTarotCard(drawn.number) }));
  const allFlipped = flipped.length === cards.length;
  const upright = cards.filter((item) => !item.reversed).length;
  const main = cards[cards.length - 1];
  const flip = (index: number) => setFlipped((current) => (current.includes(index) ? current : [...current, index]));

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">
          {seriesNameOf(test)} · {test.title}
        </p>
        <h1 className="text-2xl font-extrabold">
          {topic.emoji} {topic.name} 타로
        </h1>
        <p className="text-sm text-zinc-500">“{topic.question}”</p>
      </div>

      <div className="flex w-full justify-center gap-3">
        {cards.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => flip(index)}
            className="flex flex-col items-center gap-1.5"
            aria-label={flipped.includes(index) ? item.card.nameKo : `${positions[index]} 카드 뒤집기`}
          >
            <span className="text-xs font-bold text-zinc-400">{positions[index]}</span>
            <span className="relative" style={{ perspective: "800px" }}>
              <span
                className="relative block transition-transform duration-700"
                style={{ transformStyle: "preserve-3d", transform: flipped.includes(index) ? "rotateY(180deg)" : undefined }}
              >
                <span className="block" style={{ backfaceVisibility: "hidden" }}>
                  <TarotCardBack size={cards.length === 1 ? "lg" : "md"} />
                </span>
                <span
                  className="absolute inset-0 block"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <TarotCardFace card={item.card} reversed={item.reversed} size={cards.length === 1 ? "lg" : "md"} />
                </span>
              </span>
            </span>
            <span className="h-4 text-xs font-semibold" style={{ color }}>
              {flipped.includes(index) ? `${item.card.nameKo}${item.reversed ? " · 역" : ""}` : "탭해서 뒤집기"}
            </span>
          </button>
        ))}
      </div>

      {!allFlipped && (
        <button
          type="button"
          onClick={() => setFlipped(cards.map((_, index) => index))}
          className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: color }}
        >
          {cards.length === 1 ? "카드 뒤집기" : "모두 뒤집기"}
        </button>
      )}

      {allFlipped && (
        <>
          {cards.length > 1 && (
            <p
              className="w-full rounded-2xl px-4 py-3 text-left text-sm leading-relaxed"
              style={{ backgroundColor: `${color}14` }}
            >
              <b>흐름 한 줄 · </b>
              {FLOW[upright]}
            </p>
          )}

          {cards.map((item, index) => {
            const orientation = item.reversed ? "reversed" : "upright";
            return (
              <section
                key={index}
                className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800"
              >
                <p className="text-xs font-bold text-zinc-400">
                  {positions[index]} · {romanOf(item.card.number)}
                </p>
                <h2 className="text-lg font-extrabold">
                  {item.card.nameKo}{" "}
                  <span className="text-sm font-semibold text-zinc-400">
                    {item.card.nameEn} · {item.reversed ? "역방향" : "정방향"}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {item.card.keywords[orientation].map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: `${color}14`, color }}
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.card.meanings[orientation][draw.topic]}
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">{item.card.symbol}</p>
                <p className="rounded-2xl bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-900">
                  <b>카드의 조언 · </b>
                  <span className="text-zinc-600 dark:text-zinc-400">{item.card.advice[orientation]}</span>
                </p>
              </section>
            );
          })}

          <ShareBar
            title={`🃏 ${topic.name} 타로 · ${main.card.nameKo}`}
            text={`${topic.name} 타로를 봤더니 ${cards.length > 1 ? "미래 카드로 " : ""}"${main.card.nameKo}"${hasFinal(main.card.nameKo) ? "이" : "가"} 나왔어!\n너도 카드 한 장 뽑아 봐 👉`}
            accentColor={color}
            path={`/s/${test.id}`}
          />
        </>
      )}

      <p className="text-xs leading-relaxed text-zinc-400">
        카드는 볼 때마다 새로 섞여요. 타로는 지금의 마음을 비춰 보는 재미용 풀이로, 앞날을 정하지 않아요.
      </p>

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a href={`/s/${test.id}`} className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다시 뽑기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="tarot-result-bottom" />
      </div>
    </div>
  );
}

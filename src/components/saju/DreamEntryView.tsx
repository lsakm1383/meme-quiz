import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import type { DreamEntry } from "@/data/saju/types";
import { DREAM_CATEGORIES, dreams } from "@/data/saju/dreams";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { RelatedTests } from "@/components/RelatedTests";

export const DREAM_TONE = {
  lucky: { label: "길몽", icon: "🌟", color: "#b45309" },
  neutral: { label: "상황 따라 달라요", icon: "🌗", color: "#0369a1" },
  caution: { label: "조심 신호", icon: "🌧️", color: "#6b21a8" },
} as const;

// 꿈 하나의 풀이 화면 — 입력 없이 고정된 내용이라 서버에서 그린다.
export function DreamEntryView({ test, dream }: { test: SajuTestConfig; dream: DreamEntry }) {
  const tone = DREAM_TONE[dream.tone];
  const category = DREAM_CATEGORIES.find((item) => item.key === dream.category)!;
  const siblings = dreams.filter((item) => item.category === dream.category && item.slug !== dream.slug);
  const color = test.accentColor;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-zinc-400">
          {seriesNameOf(test)} · {test.title} · {category.name}
        </p>
        <div className="text-6xl">{dream.emoji}</div>
        <h1 className="text-2xl font-extrabold">{dream.title} 해몽</h1>
        <div className="flex flex-wrap justify-center gap-1.5">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: `${tone.color}14`, color: tone.color }}
          >
            {tone.icon} {tone.label}
          </span>
          {dream.taemong && (
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700 dark:bg-pink-950 dark:text-pink-300">
              👶 태몽으로도 많이 꿔요
            </span>
          )}
        </div>
      </div>

      <section
        className="w-full rounded-3xl px-5 py-6 text-left text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
        style={{ backgroundColor: `${color}12` }}
      >
        {dream.summary}
      </section>

      <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">🔎 상황별 풀이</h2>
        <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
          {dream.cases.map((item) => (
            <li key={item.situation} className="flex flex-col gap-1 py-3">
              <span className="flex items-start justify-between gap-2">
                <span className="text-sm font-extrabold">{item.situation}</span>
                <span className="shrink-0 text-xs font-bold" style={{ color: DREAM_TONE[item.tone].color }}>
                  {DREAM_TONE[item.tone].icon} {DREAM_TONE[item.tone].label}
                </span>
              </span>
              <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.meaning}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="w-full rounded-2xl bg-zinc-50 px-4 py-3 text-left text-sm dark:bg-zinc-900">
        <span className="font-bold">이 꿈을 꾼 날 · </span>
        <span className="text-zinc-600 dark:text-zinc-400">{dream.tip}</span>
      </div>

      <ShareBar
        title={`${dream.emoji} ${dream.title} 해몽`}
        text={`${dream.title} 꿨는데 "${tone.label}"래!${dream.taemong ? " 태몽으로도 많이 꾼대 👶" : ""}\n너도 어젯밤 꿈 찾아봐 👉`}
        accentColor={color}
        path={`/s/${test.id}/t/${dream.slug}`}
      />

      <section className="flex w-full flex-col gap-2 text-left">
        <p className="text-sm font-bold">
          {category.emoji} 다른 {category.name} 꿈
        </p>
        <div className="flex flex-wrap gap-1.5">
          {siblings.map((item) => (
            <a
              key={item.slug}
              href={`/s/${test.id}/t/${item.slug}`}
              className="rounded-full bg-zinc-50 px-3 py-1.5 text-sm dark:bg-zinc-900"
            >
              {item.emoji} {item.title}
            </a>
          ))}
        </div>
      </section>

      <p className="text-xs leading-relaxed text-zinc-400">
        꿈해몽은 전통 해몽과 마음 상태로 읽는 풀이를 바탕으로 새로 쓴 재미용 풀이예요. 앞날을 단정하지 않아요.
      </p>

      <RelatedTests current={`s/${test.id}`} />

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a href={`/s/${test.id}`} className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 꿈 찾아보기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="dream-entry-bottom" />
      </div>
    </div>
  );
}

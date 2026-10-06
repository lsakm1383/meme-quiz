import type { ReactNode } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { DREAM_CATEGORIES, dreams, getDream } from "@/data/saju/dreams";
import type { DreamIndexItem } from "@/lib/saju/dream-search";
import { PhotoIcon } from "@/components/PhotoIcon";
import { DreamSearch } from "@/components/saju/DreamSearch";

const POPULAR = ["teeth", "pig", "snake", "poop", "death", "flying", "ex", "money", "fire", "dragon", "chased", "falling"];

// 꿈해몽 시작 화면 — 검색은 브라우저에서, 분류별 목록은 서버에서 그린다 (검색용으로는 가벼운 색인만 넘긴다).
export function DreamStart({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const index: DreamIndexItem[] = dreams.map((dream) => ({
    slug: dream.slug,
    title: dream.title,
    emoji: dream.emoji,
    tone: dream.tone,
    keywords: dream.keywords,
    situations: dream.cases.map((item) => item.situation),
  }));
  const popular = POPULAR.map(getDream).filter((dream) => dream !== undefined);
  const href = (slug: string) => `/s/${test.id}/t/${slug}`;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {test.image ? <PhotoIcon src={test.image} size="xl" /> : <div className="text-7xl">{test.emoji}</div>}
      <p className="text-sm font-bold" style={{ color: test.accentColor }}>
        사주 시리즈
      </p>
      <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{test.description}</p>

      <DreamSearch index={index} accentColor={test.accentColor} testId={test.id} />

      <section className="flex w-full flex-col gap-2 text-left">
        <h2 className="text-sm font-bold">🔥 많이 찾는 꿈</h2>
        <div className="flex flex-wrap gap-2">
          {popular.map((dream) => (
            <a
              key={dream.slug}
              href={href(dream.slug)}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-semibold dark:border-zinc-800"
            >
              {dream.emoji} {dream.title}
            </a>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-3 text-left">
        <h2 className="text-sm font-bold">📚 분류별로 보기</h2>
        {DREAM_CATEGORIES.map((category) => {
          const items = dreams.filter((dream) => dream.category === category.key);
          return (
            <details key={category.key} className="rounded-2xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <summary className="cursor-pointer text-base font-bold">
                {category.emoji} {category.name}{" "}
                <span className="text-xs font-normal text-zinc-400">{items.length}가지</span>
              </summary>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {items.map((dream) => (
                  <a
                    key={dream.slug}
                    href={href(dream.slug)}
                    className="rounded-full bg-zinc-50 px-3 py-1.5 text-sm dark:bg-zinc-900"
                  >
                    {dream.emoji} {dream.title}
                  </a>
                ))}
              </div>
            </details>
          );
        })}
      </section>

      {guide}
    </div>
  );
}

"use client";

import Link from "next/link";
import type { ToppingTestConfig } from "@/data/topping-types";
import { groupComboByCategory, describeCombo } from "@/data/toppings";
import { computeRarity } from "@/lib/topping-rarity";
import { useIngredientStats } from "@/lib/use-ingredient-stats";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { ToppingIngredientStats } from "@/components/ToppingIngredientStats";
import { ToppingIcon } from "@/components/ToppingIcon";

export function ToppingResultView({
  test,
  comboKey,
  toppingIds,
}: {
  test: ToppingTestConfig;
  comboKey: string;
  toppingIds: string[];
}) {
  const stats = useIngredientStats(test.id, comboKey);
  const grouped = groupComboByCategory(test, toppingIds).filter(
    (group) => group.items.length > 0
  );

  // 통계가 아직 없으면(로딩 중이거나 Redis 미설정) 고른 조합 자체를 설명하는 문구로 대신 보여준다.
  const fallback = describeCombo(test, toppingIds);
  const rarity = stats ? computeRarity(test, toppingIds, stats.counts) : null;
  const headline = rarity
    ? { title: rarity.title, subtitle: `희귀도 ${rarity.percent}% · ${rarity.subtitle}` }
    : fallback;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">{test.title} 결과</p>

      <div
        className="flex w-full flex-col items-center gap-3 rounded-3xl px-6 py-10 shadow-sm"
        style={{ backgroundColor: `${test.accentColor}1a` }}
      >
        <div className="text-6xl">{test.emoji}</div>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
          {headline.title}
        </h1>
        <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
          {headline.subtitle}
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 text-left">
        {grouped.map((group) => (
          <div key={group.categoryId} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-bold text-zinc-400">
              {group.label}
            </span>
            <span className="flex flex-1 flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item.id}
                  className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium dark:bg-zinc-800"
                >
                  <ToppingIcon topping={item} size="sm" />
                  {item.name}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <ToppingIngredientStats test={test} toppingIds={toppingIds} stats={stats} />

      <ShareBar
        title={`나의 마라탕: ${headline.title}`}
        text={`${test.title} — ${headline.title}\n${headline.subtitle}`}
        accentColor={test.accentColor}
      />

      <div className="flex items-center gap-4">
        <Link
          href={`/c/${test.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 만들기
        </Link>
        <span className="text-zinc-300">·</span>
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다른 테스트 살펴보기
        </Link>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="combo-result-bottom" />
      </div>
    </div>
  );
}

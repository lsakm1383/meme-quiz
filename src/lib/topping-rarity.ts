import type { ToppingTestConfig } from "@/data/topping-types";
import { noneOptionId } from "@/data/toppings";

export type RarityResult = {
  percent: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
};

// 낮을수록 흔한 조합, 높을수록 남들과 다르게 먹는 조합. emoji/color는 결과 카드에 그대로 쓰인다.
const TIERS: {
  max: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}[] = [
  {
    max: 20,
    title: "완전 국룰 마라탕",
    subtitle: "이 조합, 다들 비슷하게 먹어요",
    emoji: "🍚",
    color: "#e4e4e7",
  },
  {
    max: 40,
    title: "무난한 마라탕",
    subtitle: "평범하지만 실패 없는 조합",
    emoji: "🙂",
    color: "#dbeafe",
  },
  {
    max: 60,
    title: "개성있는 마라탕",
    subtitle: "취향이 살짝 묻어나는 조합",
    emoji: "✨",
    color: "#ede9fe",
  },
  {
    max: 80,
    title: "희귀템 마라탕",
    subtitle: "이렇게 먹는 사람 흔치 않아요",
    emoji: "💎",
    color: "#fef3c7",
  },
  {
    max: Infinity,
    title: "전설의 이단아 마라탕",
    subtitle: "지금까지 이런 조합은 없었다",
    emoji: "👑",
    color: "#fecaca",
  },
];

/**
 * 카테고리마다 내가 고른 선택지(또는 "선택 안 함")의 그 카테고리 안에서의 인기 점유율을 구해
 * 1에서 뺀 값을 "희귀도"로 쓴다. 여러 카테고리의 희귀도를 평균 내 전체 희귀도(%)로 만든다.
 * 통계가 아직 없으면(Redis 미설정) null.
 */
export function computeRarity(
  test: ToppingTestConfig,
  toppingIds: string[],
  counts: Record<string, number>
): RarityResult | null {
  const mineSet = new Set(toppingIds);
  const categoryRarities: number[] = [];

  for (const category of test.categories) {
    const picked = category.toppings.filter((topping) => mineSet.has(topping.id));
    const pickedNone = category.minSelect === 0 && picked.length === 0;

    const categoryTotal =
      category.toppings.reduce((sum, topping) => sum + (counts[topping.id] ?? 0), 0) +
      (category.minSelect === 0 ? (counts[noneOptionId(category.id)] ?? 0) : 0);
    if (categoryTotal === 0) continue;

    let avgPopularity: number;
    if (pickedNone) {
      avgPopularity = (counts[noneOptionId(category.id)] ?? 0) / categoryTotal;
    } else if (picked.length > 0) {
      avgPopularity =
        picked.reduce((sum, topping) => sum + (counts[topping.id] ?? 0) / categoryTotal, 0) /
        picked.length;
    } else {
      continue;
    }
    categoryRarities.push(1 - avgPopularity);
  }

  if (categoryRarities.length === 0) return null;

  const percent = Math.round(
    (categoryRarities.reduce((a, b) => a + b, 0) / categoryRarities.length) * 100
  );
  const tier = TIERS.find((t) => percent < t.max) ?? TIERS[TIERS.length - 1];

  return {
    percent,
    title: tier.title,
    subtitle: tier.subtitle,
    emoji: tier.emoji,
    color: tier.color,
  };
}

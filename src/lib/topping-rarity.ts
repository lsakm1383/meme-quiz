import type { ToppingTestConfig } from "@/data/topping-types";

export type RarityResult = {
  percent: number;
  title: string;
  subtitle: string;
};

// 낮을수록 흔한 조합, 높을수록 남들과 다르게 먹는 조합.
const TIERS: { max: number; title: string; subtitle: string }[] = [
  { max: 20, title: "완전 국룰 마라탕", subtitle: "이 조합, 다들 비슷하게 먹어요" },
  { max: 40, title: "무난한 마라탕", subtitle: "평범하지만 실패 없는 조합" },
  { max: 60, title: "개성있는 마라탕", subtitle: "취향이 살짝 묻어나는 조합" },
  { max: 80, title: "희귀템 마라탕", subtitle: "이렇게 먹는 사람 흔치 않아요" },
  { max: Infinity, title: "전설의 이단아 마라탕", subtitle: "지금까지 이런 조합은 없었다" },
];

/**
 * 카테고리마다, 내가 고른 토핑들의 (그 카테고리 안에서의) 평균 인기 점유율을 구해
 * 1에서 뺀 값을 "희귀도"로 쓴다. 여러 카테고리의 희귀도를 평균 내 전체 희귀도(%)로 만든다.
 * 통계가 아직 없거나(Redis 미설정) 내가 아무것도 고르지 않은 카테고리뿐이면 null.
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
    if (picked.length === 0) continue;

    const total = category.toppings.reduce(
      (sum, topping) => sum + (counts[topping.id] ?? 0),
      0
    );
    if (total === 0) continue;

    const avgPopularity =
      picked.reduce((sum, topping) => sum + (counts[topping.id] ?? 0) / total, 0) /
      picked.length;
    categoryRarities.push(1 - avgPopularity);
  }

  if (categoryRarities.length === 0) return null;

  const percent = Math.round(
    (categoryRarities.reduce((a, b) => a + b, 0) / categoryRarities.length) * 100
  );
  const tier = TIERS.find((t) => percent < t.max) ?? TIERS[TIERS.length - 1];

  return { percent, title: tier.title, subtitle: tier.subtitle };
}

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
 * 카테고리마다, 내가 고른 선택지(또는 "선택 안 함")가 그 카테고리 안에서 얼마나 인기 없는
 * 쪽인지를 "그 카테고리에서 가장 인기 있는 선택지 대비 상대적인 위치"로 환산한다.
 *
 * 단순히 "1 - 내 점유율"을 쓰면, 보기가 4~6개인 카테고리는 다들 거의 비슷한 확률로 갈리기
 * 때문에(예: 6개 중 하나면 평균 점유율이 이미 1/6≈17%) 뭘 고르든 늘 "80% 근처"로 나오는
 * 문제가 있었다. 그래서 그 카테고리의 최고 점유율/최저 점유율 구간 안에서 내 선택이 어디에
 * 있는지를 0~1로 정규화한다 — 가장 잘 나가는 선택지를 고르면 항상 0(흔함)에 가깝고,
 * 가장 안 팔리는 선택지를 고르면 항상 1(희귀함)에 가깝다.
 *
 * 여러 카테고리의 희귀도를 평균 내 전체 희귀도(%)로 만든다. 통계가 아직 없으면 null.
 */
export function computeRarity(
  test: ToppingTestConfig,
  toppingIds: string[],
  counts: Record<string, number>
): RarityResult | null {
  const mineSet = new Set(toppingIds);
  const categoryRarities: number[] = [];

  for (const category of test.categories) {
    const options = category.toppings.map((topping) => ({
      id: topping.id,
      count: counts[topping.id] ?? 0,
    }));
    if (category.minSelect === 0) {
      options.push({ id: noneOptionId(category.id), count: counts[noneOptionId(category.id)] ?? 0 });
    }

    const categoryTotal = options.reduce((sum, option) => sum + option.count, 0);
    if (categoryTotal === 0) continue;

    const picked = category.toppings.filter((topping) => mineSet.has(topping.id));
    const pickedNone = category.minSelect === 0 && picked.length === 0;
    const selectedIds = pickedNone ? [noneOptionId(category.id)] : picked.map((t) => t.id);
    if (selectedIds.length === 0) continue;

    const shares = options.map((option) => option.count / categoryTotal);
    const maxShare = Math.max(...shares);
    const minShare = Math.min(...shares);
    const spread = maxShare - minShare;

    const rarityOf = (id: string) => {
      if (spread === 0) return 0;
      const option = options.find((o) => o.id === id);
      const share = (option?.count ?? 0) / categoryTotal;
      return (maxShare - share) / spread;
    };

    const avgRarity =
      selectedIds.reduce((sum, id) => sum + rarityOf(id), 0) / selectedIds.length;
    categoryRarities.push(avgRarity);
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

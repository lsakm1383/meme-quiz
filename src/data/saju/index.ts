import type { DayMasterProfile, ElementKey, ElementLevel, ElementProfile } from "@/data/saju/types";
import dayMasters from "@/data/saju/day-masters";
import elements from "@/data/saju/elements";
import fortunes from "@/data/saju/fortunes";
import type { FortuneKey } from "@/lib/saju/fortune";

// 사주 시리즈 설정. 첫 테스트는 원국(8글자)·오행·일간 성향 풀이이고, 이후 테스트(재물운·결혼운 등)도
// 같은 계산 엔진(src/lib/saju)과 /s/<id> 경로를 쓰도록 목록으로 둔다.
export type SajuTestConfig = {
  id: string;
  /** chart: 원국 풀이(개인) · fortune: 운세 점수(개인 또는 그룹 순위) */
  kind: "chart" | "fortune";
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  /** 홈 카드·시작 화면용 대표 일러스트 (public 기준 경로, 정사각형). 없으면 emoji. */
  image?: string;
};

export const sajuTests: SajuTestConfig[] = [
  {
    id: "saju",
    kind: "chart",
    emoji: "🔮",
    title: "내 사주 원국 풀이",
    description:
      "생년월일과 태어난 시간으로 사주 여덟 글자를 세우고, 오행 분포와 타고난 성향을 풀어드려요.",
    accentColor: "#6d28d9",
    image: "/saju/cover.webp",
  },
  {
    id: "fortune",
    kind: "fortune",
    emoji: "🏆",
    title: "우리 그룹 사주 운세 랭킹",
    description:
      "사주 원국으로 재물운·연애운·결혼운·직업운 점수를 매겨요. 친구들과 그룹을 만들면 운세별 순위를 한눈에 비교할 수 있어요.",
    accentColor: "#b45309",
  },
];

export function getSajuTest(id: string): SajuTestConfig | undefined {
  return sajuTests.find((test) => test.id === id);
}

export { dayMasters, elements, fortunes };

export function getFortune(key: FortuneKey) {
  return fortunes.find((fortune) => fortune.key === key)!;
}

/** 점수에 맞는 구간(별칭·풀이) — tiers 는 높은 구간부터 정렬돼 있다 */
export function fortuneTier(key: FortuneKey, score: number) {
  const fortune = getFortune(key);
  return fortune.tiers.find((tier) => score >= tier.min) ?? fortune.tiers[fortune.tiers.length - 1];
}

export function getDayMaster(slug: string): DayMasterProfile | undefined {
  return dayMasters.find((profile) => profile.slug === slug);
}

export function getElement(key: ElementKey): ElementProfile {
  return elements.find((element) => element.key === key)!;
}

/** 원국 글자 중 개수 → 단계 (8글자 기준, 평균은 1.6개) */
export function elementLevel(count: number): ElementLevel {
  if (count === 0) return "none";
  if (count === 1) return "low";
  if (count === 2) return "balanced";
  if (count === 3) return "strong";
  return "excessive";
}

export const LEVEL_LABEL: Record<ElementLevel, string> = {
  none: "없음",
  low: "약함",
  balanced: "적당",
  strong: "발달",
  excessive: "과다",
};

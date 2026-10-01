import type { DayMasterProfile, ElementKey, ElementLevel, ElementProfile } from "@/data/saju/types";
import dayMasters from "@/data/saju/day-masters";
import elements from "@/data/saju/elements";

// 사주 시리즈 설정. 1편은 원국(8글자)·오행·일간 성향 풀이이고, 이후 편(재물운·결혼운 등)도
// 같은 계산 엔진(src/lib/saju)과 /s/<id> 경로를 쓰도록 목록으로 둔다.
export type SajuTestConfig = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  /** 시리즈 회차 표시 (예: "1편") */
  episode: string;
};

export const sajuTests: SajuTestConfig[] = [
  {
    id: "saju",
    emoji: "🔮",
    title: "내 사주 원국 풀이",
    description:
      "생년월일과 태어난 시간으로 사주 여덟 글자를 세우고, 오행 분포와 타고난 성향을 풀어드려요.",
    accentColor: "#6d28d9",
    episode: "1편",
  },
];

export function getSajuTest(id: string): SajuTestConfig | undefined {
  return sajuTests.find((test) => test.id === id);
}

export { dayMasters, elements };

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

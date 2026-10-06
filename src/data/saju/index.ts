import type { DayMasterProfile, ElementKey, ElementLevel, ElementProfile } from "@/data/saju/types";
import dayMasters from "@/data/saju/day-masters";
import elements from "@/data/saju/elements";
import fortunes from "@/data/saju/fortunes";
import type { FortuneKey } from "@/lib/saju/fortune";

// 사주 시리즈·전통 운세 설정. 첫 테스트는 원국(8글자)·오행·일간 성향 풀이이고, 이후 테스트(재물운·결혼운 등)도
// 같은 계산 엔진(src/lib/saju)과 /s/<id> 경로를 쓰도록 목록으로 둔다.
export type SajuTestConfig = {
  id: string;
  /** chart: 원국 풀이(개인) · fortune: 운세 점수(개인 또는 그룹 순위) · daily: 오늘의 운세 · yearly: 신년 운세 */
  kind: "chart" | "fortune" | "daily" | "daeun" | "compat" | "yearly" | "zodiac" | "tojeong" | "dream" | "palm" | "tarot";
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  /** 홈 카드·시작 화면용 대표 일러스트 (public 기준 경로, 정사각형). 없으면 emoji. */
  image?: string;
  /** 사주(생년월일시의 여덟 글자)로 보지 않는 토정비결·꿈해몽 등은 "전통 운세"로 따로 묶는다 */
  series?: "saju" | "traditional";
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
    title: "사주 랭킹 확인하기",
    description:
      "사주 원국으로 재물운·연애운·인기운·귀인운 등 10가지 운세 점수를 매겨요. 친구들과 그룹을 만들면 운세별 순위를 한눈에 비교할 수 있어요.",
    accentColor: "#b45309",
    image: "/saju/fortune-cover.webp",
  },
  {
    id: "today",
    kind: "daily",
    emoji: "🌅",
    title: "오늘의 사주 운세",
    description:
      "오늘의 일진을 내 사주에 대 보고 총운과 분야별 운, 오늘 특히 주의할 점, 나에게 운이 되어 줄 행운 아이템을 알려드려요. 매일 자정에 바뀌어요.",
    accentColor: "#0e7490",
    image: "/saju/today-cover.webp",
  },
  {
    id: "daeun",
    kind: "daeun",
    emoji: "🧭",
    title: "내 대운 흐름 보기",
    description:
      "10년마다 바뀌는 큰 운의 흐름, 대운을 계산해 인생 그래프로 보여드려요. 지금 지나고 있는 대운의 테마와 기회, 주의할 점도 함께 알려드려요.",
    accentColor: "#4d7c0f",
    image: "/saju/daeun-cover.webp",
  },
  {
    id: "compat",
    kind: "compat",
    emoji: "💞",
    title: "사주 궁합 보기",
    description:
      "두 사람의 생년월일로 성격·생활·띠·오행 네 가지 궁합을 풀어드려요. 연인은 물론 친구, 동료, 가족과도 볼 수 있어요.",
    accentColor: "#be185d",
    image: "/saju/compat-cover.webp",
  },
  {
    id: "newyear",
    kind: "yearly",
    emoji: "🎍",
    title: "신년 운세 보기",
    description:
      "그해의 간지를 내 사주에 대 보고 한 해의 테마와 분야별 운, 좋은 달과 조심할 달, 삼재 여부까지 알려드려요. 올해와 내년을 골라 볼 수 있어요.",
    accentColor: "#b91c1c",
    image: "/saju/newyear-cover.webp",
  },
  {
    id: "zodiac",
    kind: "zodiac",
    emoji: "🐲",
    title: "띠별 운세 보기",
    description:
      "생년월일 입력 없이 내 띠만 고르면 오늘의 띠별 운세와 년생별 한 줄 운세, 올해·내년 띠 운세, 잘 맞는 띠까지 알려드려요.",
    accentColor: "#4338ca",
    image: "/saju/zodiac-cover.webp",
  },
  {
    id: "tojeong",
    kind: "tojeong",
    emoji: "📜",
    title: "토정비결 보기",
    description:
      "음력 생년월일로 전통 작괘법에 따라 144괘 중 내 괘를 찾고, 한 해의 총론과 정월부터 섣달까지 달마다의 흐름을 풀어드려요. 올해와 내년을 골라 볼 수 있어요.",
    accentColor: "#92400e",
    series: "traditional",
    image: "/saju/tojeong-cover.webp",
  },
  {
    id: "dream",
    kind: "dream",
    emoji: "🌙",
    title: "꿈해몽 사전",
    description:
      "간밤에 꾼 꿈, 무슨 뜻일까요? 돼지 꿈·이빨 빠지는 꿈처럼 자주 꾸는 꿈 120여 가지를 검색하고, 상황별 풀이와 길몽·태몽 여부까지 확인해 보세요.",
    accentColor: "#0f766e",
    series: "traditional",
    image: "/saju/dream-cover.webp",
  },
  {
    id: "palm",
    kind: "palm",
    emoji: "🖐️",
    title: "손금 보기",
    description:
      "사진 없이 내 손바닥을 보고 그림에서 가장 비슷한 모양을 고르면 감정선·두뇌선으로 손금 유형을 알려주고, 생명선·운명선·결혼선까지 풀어드려요.",
    accentColor: "#c2410c",
    image: "/saju/palm-cover.webp",
    series: "traditional",
  },
  {
    id: "tarot",
    kind: "tarot",
    emoji: "🃏",
    title: "타로 카드 뽑기",
    description:
      "궁금한 주제를 떠올리고 메이저 아르카나 22장 중에서 직접 카드를 골라 보세요. 한 장으로 오늘의 메시지를, 세 장으로 과거·현재·미래의 흐름을 풀어드려요.",
    accentColor: "#7e22ce",
    image: "/saju/tarot-cover.webp",
    series: "traditional",
  },
];

export const SERIES_NAME = { saju: "사주 시리즈", traditional: "전통 운세" } as const;

/** 화면 위쪽에 붙이는 시리즈 이름 */
export const seriesNameOf = (test: SajuTestConfig) => SERIES_NAME[test.series ?? "saju"];

export const sajuSeriesTests = sajuTests.filter((test) => (test.series ?? "saju") === "saju");
export const traditionalTests = sajuTests.filter((test) => test.series === "traditional");

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

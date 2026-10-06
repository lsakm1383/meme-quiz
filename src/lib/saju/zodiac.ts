import { dayPillarForDate, type Pillar } from "@/lib/saju/engine";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import type { ElementKey, TenGod } from "@/data/saju/types";
import { tenGodOf, todayInKorea, type BranchRelation } from "@/lib/saju/daily";
import { yearPillarOf, type Samjae } from "@/lib/saju/yearly";

// 띠별 운세. 생년월일 없이 띠(태어난 해의 지지)만으로 보는 운세라,
// 오늘 일진·그해 간지가 띠와 맺는 합·충과 오행 관계, 년생별로는 태어난 해의 천간 기준 십성을 정해진 규칙으로 본다.

export const ZODIAC_SLUGS = [
  "rat",
  "ox",
  "tiger",
  "rabbit",
  "dragon",
  "snake",
  "horse",
  "sheep",
  "monkey",
  "rooster",
  "dog",
  "pig",
] as const;

export function zodiacBranchOf(slug: string): number | null {
  const index = (ZODIAC_SLUGS as readonly string[]).indexOf(slug);
  return index < 0 ? null : index;
}

/** 양력 연도로 본 띠 — 사주에서는 입춘(2월 4일 무렵)에 해가 바뀌므로 그 전 생일은 앞 띠다 */
export const zodiacOfYear = (year: number) => (((year - 4) % 12) + 12) % 12;

const GENERATES: Record<ElementKey, ElementKey> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
const CONTROLS: Record<ElementKey, ElementKey> = { wood: "earth", fire: "metal", earth: "water", metal: "wood", water: "fire" };

export type ElementRelation = "same" | "generated" | "generates" | "controls" | "controlled";

/** 들어오는 기운(other)이 내 띠 오행(me)에 어떤 관계인지 */
export function elementRelation(me: ElementKey, other: ElementKey): ElementRelation {
  if (me === other) return "same";
  if (GENERATES[other] === me) return "generated";
  if (GENERATES[me] === other) return "generates";
  if (CONTROLS[me] === other) return "controls";
  return "controlled";
}

export function branchRelation(a: number, b: number): BranchRelation {
  if (a !== b && (a + b) % 12 === 1) return "combine";
  if (Math.abs(a - b) === 6) return "clash";
  if (a !== b && a % 4 === b % 4) return "trine";
  if (a === b) return "same";
  return null;
}

const RELATION_SCORE: Record<string, number> = { combine: 12, trine: 8, same: 2, clash: -14, neutral: 0 };
const ELEMENT_SCORE: Record<ElementRelation, number> = { generated: 6, same: 3, controls: 3, generates: -1, controlled: -6 };
/** 년생별 — 태어난 해 천간 기준 오늘 천간의 십성 */
const TEN_GOD_SCORE: Record<TenGod, number> = {
  jeongin: 8,
  jeongjae: 7,
  siksin: 7,
  jeonggwan: 5,
  pyeonjae: 4,
  bigyeon: 2,
  pyeonin: 0,
  sanggwan: -3,
  geopjae: -5,
  pyeongwan: -6,
};

const clamp = (value: number) => Math.max(20, Math.min(98, Math.round(value)));
/** 점수 → 별 1~5개 */
export const starsOf = (score: number) => (score >= 85 ? 5 : score >= 72 ? 4 : score >= 58 ? 3 : score >= 44 ? 2 : 1);

/** 이 띠의 년생 목록 — 올해 기준 만 나이 대략 6~95세 */
export function birthYearsOf(branch: number, thisYear: number): number[] {
  const years: number[] = [];
  for (let y = thisYear - 95; y <= thisYear - 6; y++) if (zodiacOfYear(y) === branch) years.push(y);
  return years;
}

/** 60갑자 순번 — 날마다 바뀌는 문장 고르기용 */
const sexagenary = (pillar: Pillar) => (6 * pillar.stem - 5 * pillar.branch + 60) % 60;

export type ZodiacYearLine = { year: number; tenGod: TenGod; score: number; variant: number };

export type ZodiacDaily = {
  date: { year: number; month: number; day: number };
  pillar: Pillar;
  relation: Exclude<BranchRelation, null> | "neutral";
  element: ElementRelation;
  score: number;
  /** 문장 고르기용 순번 */
  rotation: number;
  years: ZodiacYearLine[];
};

export function computeZodiacDaily(branch: number, now = new Date()): ZodiacDaily {
  const date = todayInKorea(now);
  const pillar = dayPillarForDate(date.year, date.month, date.day);
  const relation = branchRelation(pillar.branch, branch) ?? "neutral";
  const me = BRANCHES[branch].element;
  const element = elementRelation(me, STEMS[pillar.stem].element);
  const branchElement = elementRelation(me, BRANCHES[pillar.branch].element);
  const base = 58 + RELATION_SCORE[relation] + ELEMENT_SCORE[element] + ELEMENT_SCORE[branchElement] * 0.5;
  const rotation = sexagenary(pillar);

  const years = birthYearsOf(branch, date.year).map((year, i) => {
    const tenGod = tenGodOf(yearPillarOf(year).stem, pillar.stem);
    return { year, tenGod, score: clamp(62 + (base - 62) * 1.2 + TEN_GOD_SCORE[tenGod] * 1.6), variant: rotation + i };
  });

  return { date, pillar, relation, element, score: clamp(62 + (base - 62) * 1.8), rotation, years };
}

/** 삼재: 띠의 삼합 무리마다 정해진 세 해 (신년 운세와 같은 규칙) */
const SAMJAE: Record<number, number[]> = { 0: [2, 3, 4], 2: [8, 9, 10], 1: [11, 0, 1], 3: [5, 6, 7] };

export type ZodiacYear = {
  year: number;
  pillar: Pillar;
  relation: Exclude<BranchRelation, null> | "neutral";
  element: ElementRelation;
  samjae: Samjae;
  score: number;
};

export function computeZodiacYear(branch: number, year: number): ZodiacYear {
  const pillar = yearPillarOf(year);
  const relation = branchRelation(pillar.branch, branch) ?? "neutral";
  const element = elementRelation(BRANCHES[branch].element, STEMS[pillar.stem].element);
  const index = SAMJAE[branch % 4].indexOf(pillar.branch);
  const samjae: Samjae = index === 0 ? "in" : index === 1 ? "stay" : index === 2 ? "out" : null;
  const score = clamp(62 + RELATION_SCORE[relation] + ELEMENT_SCORE[element] * 1.2 - (samjae ? 4 : 0));
  return { year, pillar, relation, element, samjae, score };
}

/** 잘 맞는 띠(삼합 둘 + 육합 하나)와 부딪히는 띠(충) */
export function zodiacMatches(branch: number) {
  return {
    trine: [(branch + 4) % 12, (branch + 8) % 12],
    combine: (13 - branch) % 12,
    clash: (branch + 6) % 12,
  };
}

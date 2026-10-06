import type { Pillar, SajuChart } from "@/lib/saju/engine";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import type { ElementKey, TenGod } from "@/data/saju/types";
import {
  tenGodOf,
  tenGodFit,
  isStrongChart,
  scarcestElement,
  DAILY_AREAS,
  type DailyAreaKey,
  type BranchRelation,
} from "@/lib/saju/daily";
import { computeDaeun } from "@/lib/saju/daeun";

// 신년 운세(세운). 그해의 간지(입춘부터 다음 입춘 전까지)를 내 원국에 대 보는 정해진 규칙으로 계산한다.
// 월별 흐름은 그해의 12달 월주(寅월=양력 2월 입춘 무렵 ~ 丑월=다음 해 1월)를 같은 방식으로 본다.

const branchCombine = (a: number, b: number) => a !== b && (a + b) % 12 === 1;
const branchTrine = (a: number, b: number) => a !== b && a % 4 === b % 4;
const branchClash = (a: number, b: number) => Math.abs(a - b) === 6;
const PEACH = new Set([0, 3, 6, 9]);

/** 지지 본기 오행·음양과 같은 천간으로 본 십성 */
function branchTenGod(dayStem: number, branch: number): TenGod {
  const b = BRANCHES[branch];
  return tenGodOf(dayStem, STEMS.findIndex((item) => item.element === b.element && item.yang === b.yang));
}

export function yearPillarOf(year: number): Pillar {
  const index = (((year - 4) % 60) + 60) % 60;
  return { stem: index % 10, branch: index % 12 };
}

/** 삼재: 띠(연지)의 삼합 무리마다 정해진 세 해 — 申子辰띠→寅卯辰년, 寅午戌띠→申酉戌년, 巳酉丑띠→亥子丑년, 亥卯未띠→巳午未년 */
const SAMJAE: Record<number, number[]> = { 0: [2, 3, 4], 2: [8, 9, 10], 1: [11, 0, 1], 3: [5, 6, 7] };
export type Samjae = "in" | "stay" | "out" | null;

function relationOf(a: number, b: number): BranchRelation {
  if (branchCombine(a, b)) return "combine";
  if (branchClash(a, b)) return "clash";
  if (branchTrine(a, b)) return "trine";
  if (a === b) return "same";
  return null;
}

const stretch = (value: number) => Math.max(20, Math.min(98, Math.round(62 + (value - 62) * 1.5)));

export type YearlyMonth = {
  /** 양력 기준 대략의 달 (절입일부터) — 2,3,…,12,1 */
  solarMonth: number;
  pillar: Pillar;
  stemGod: TenGod;
  score: number;
};

export type YearlyFortune = {
  year: number;
  pillar: Pillar;
  stemGod: TenGod;
  branchGod: TenGod;
  /** 그해 지지와 내 일지의 관계 */
  branchRelation: BranchRelation;
  /** 그해 지지가 내 띠(연지)와 충 */
  zodiacClash: boolean;
  samjae: Samjae;
  fillsLacking: boolean;
  luckyElement: ElementKey;
  score: number;
  areas: Record<DailyAreaKey, number>;
  months: YearlyMonth[];
  /** 그해 한가운데(7월 1일) 지나고 있는 대운의 간지 — 첫 대운 전이면 null */
  daeunPillar: Pillar | null;
};

export function computeYearly(chart: SajuChart, gender: "female" | "male", year: number): YearlyFortune {
  const pillar = yearPillarOf(year);
  const strong = isStrongChart(chart);
  const luckyElement = scarcestElement(chart);
  const stemGod = tenGodOf(chart.day.stem, pillar.stem);
  const branchGod = branchTenGod(chart.day.stem, pillar.branch);
  const branchRelation = relationOf(pillar.branch, chart.day.branch);
  const zodiacClash = branchClash(pillar.branch, chart.year.branch);
  const samjaeYears = SAMJAE[chart.year.branch % 4];
  const samjaeIndex = samjaeYears.indexOf(pillar.branch);
  const samjae: Samjae = samjaeIndex === 0 ? "in" : samjaeIndex === 1 ? "stay" : samjaeIndex === 2 ? "out" : null;
  const fillsLacking =
    STEMS[pillar.stem].element === luckyElement || BRANCHES[pillar.branch].element === luckyElement;

  let raw = 62 + tenGodFit(stemGod, strong) + tenGodFit(branchGod, strong) * 0.8;
  if (branchRelation === "combine") raw += 6;
  else if (branchRelation === "trine") raw += 4;
  else if (branchRelation === "clash") raw -= 8;
  else if (branchRelation === "same") raw -= 2;
  if (zodiacClash) raw -= 4;
  if (samjae) raw -= 3;
  if (fillsLacking) raw += 5;

  // 분야별 — 오늘의 운세와 같은 방식으로, 그해 천간 십성이 직접 닿는 분야를 더하고 뺀다
  const is = (...keys: TenGod[]) => keys.includes(stemGod) || keys.includes(branchGod);
  const spouseStar: TenGod[] = gender === "female" ? ["pyeongwan", "jeonggwan"] : ["pyeonjae", "jeongjae"];
  const areaRaw: Record<DailyAreaKey, number> = {
    work: raw + (is("jeonggwan", "pyeongwan", "jeongin", "pyeonin") ? 7 : 0) - (is("sanggwan") ? 4 : 0),
    money: raw + (is("jeongjae", "pyeonjae") ? (strong ? 9 : 2) : 0) + (is("siksin") ? 4 : 0) - (is("geopjae") ? 7 : 0),
    people:
      raw + (is("bigyeon", "siksin") ? 6 : 0) + (branchRelation === "combine" ? 4 : 0) - (branchRelation === "clash" ? 4 : 0),
    love: raw + (spouseStar.includes(stemGod) || spouseStar.includes(branchGod) ? 8 : 0) + (PEACH.has(pillar.branch) ? 5 : 0),
  };
  const areas = Object.fromEntries(DAILY_AREAS.map(({ key }) => [key, stretch(areaRaw[key])])) as Record<
    DailyAreaKey,
    number
  >;

  // 월별 흐름: 寅월(입춘)부터 丑월까지. 월간은 연간에 따라 정해진다 (甲己년 丙寅월 …)
  const firstMonthStem = ((pillar.stem % 5) * 2 + 2) % 10;
  const months: YearlyMonth[] = Array.from({ length: 12 }, (_, k) => {
    const monthPillar: Pillar = { stem: (firstMonthStem + k) % 10, branch: (2 + k) % 12 };
    const monthStemGod = tenGodOf(chart.day.stem, monthPillar.stem);
    let m = 62 + tenGodFit(monthStemGod, strong) + tenGodFit(branchTenGod(chart.day.stem, monthPillar.branch), strong) * 0.8;
    const rel = relationOf(monthPillar.branch, chart.day.branch);
    if (rel === "combine") m += 5;
    else if (rel === "trine") m += 3;
    else if (rel === "clash") m -= 6;
    if (STEMS[monthPillar.stem].element === luckyElement || BRANCHES[monthPillar.branch].element === luckyElement) m += 3;
    return { solarMonth: ((k + 1) % 12) + 1, pillar: monthPillar, stemGod: monthStemGod, score: stretch(m) };
  });

  const daeun = computeDaeun(chart, gender, Date.UTC(year, 6, 1));
  const daeunPillar = daeun.currentIndex !== null ? daeun.periods[daeun.currentIndex].pillar : null;

  return {
    year,
    pillar,
    stemGod,
    branchGod,
    branchRelation,
    zodiacClash,
    samjae,
    fillsLacking,
    luckyElement,
    score: stretch(raw),
    areas,
    months,
    daeunPillar,
  };
}

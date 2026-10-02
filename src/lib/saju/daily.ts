import type { SajuChart, Pillar } from "@/lib/saju/engine";
import { dayPillarForDate } from "@/lib/saju/engine";
import { STEMS, BRANCHES, ELEMENT_ORDER } from "@/lib/saju/constants";
import type { ElementKey, TenGod } from "@/data/saju/types";

// 오늘의 운세. 오늘(한국 날짜) 일진의 간지를 내 원국에 대 보는 정해진 규칙으로만 계산한다 —
// 같은 사람이 같은 날 보면 항상 같은 결과이고, 날짜가 바뀌면 일진이 바뀌어 결과도 바뀐다.

const GENERATES: Record<ElementKey, ElementKey> = {
  wood: "fire",
  fire: "earth",
  earth: "metal",
  metal: "water",
  water: "wood",
};
const CONTROLS: Record<ElementKey, ElementKey> = {
  wood: "earth",
  fire: "metal",
  earth: "water",
  metal: "wood",
  water: "fire",
};

/** 일간 기준으로 다른 천간이 어떤 십성인지 */
export function tenGodOf(dayStem: number, otherStem: number): TenGod {
  const me = STEMS[dayStem];
  const other = STEMS[otherStem];
  const same = me.yang === other.yang;
  if (other.element === me.element) return same ? "bigyeon" : "geopjae";
  if (GENERATES[me.element] === other.element) return same ? "siksin" : "sanggwan";
  if (CONTROLS[me.element] === other.element) return same ? "pyeonjae" : "jeongjae";
  if (CONTROLS[other.element] === me.element) return same ? "pyeongwan" : "jeonggwan";
  return same ? "pyeonin" : "jeongin";
}

const branchCombine = (a: number, b: number) => a !== b && (a + b) % 12 === 1;
const branchTrine = (a: number, b: number) => a !== b && a % 4 === b % 4;
const branchClash = (a: number, b: number) => Math.abs(a - b) === 6;
/** 子午卯酉 — 도화 */
const PEACH = new Set([0, 3, 6, 9]);

/** 한국 날짜로 오늘 */
export function todayInKorea(now = new Date()): { year: number; month: number; day: number } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value])
  );
  return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) };
}

export type BranchRelation = "combine" | "trine" | "clash" | "same" | null;

export type DailyAreaKey = "work" | "money" | "people" | "love";
export const DAILY_AREAS: { key: DailyAreaKey; name: string; emoji: string }[] = [
  { key: "work", name: "일·공부", emoji: "📚" },
  { key: "money", name: "금전", emoji: "💰" },
  { key: "people", name: "대인관계", emoji: "🤝" },
  { key: "love", name: "연애", emoji: "💘" },
];

export type DailyFortune = {
  date: { year: number; month: number; day: number };
  /** 오늘의 일진 */
  pillar: Pillar;
  /** 오늘 천간이 내게 무슨 십성인지 */
  tenGod: TenGod;
  /** 오늘 지지와 내 일지의 관계 */
  branchRelation: BranchRelation;
  /** 오늘 지지가 내 띠(연지)와 충인지 */
  yearClash: boolean;
  /** 신강(나를 돕는 기운이 많음) 여부 */
  strong: boolean;
  /** 오늘 일진이 내 원국에 가장 부족한 오행을 채워주는지 */
  fillsLacking: boolean;
  /** 행운 아이템을 정하는 오행 — 원국에서 가장 적은 오행 */
  luckyElement: ElementKey;
  /** 날마다 바뀌는 행운 아이템 고르기용 순번 (오늘 일진 인덱스) */
  rotation: number;
  /** 행운의 시간 — 오늘 지지와 육합인 지지의 시진 */
  luckyHour: { branch: number; label: string };
  score: number;
  areas: Record<DailyAreaKey, number>;
};

// 규칙 점수는 평균(62) 근처에 몰려 날마다 차이가 잘 안 느껴져서, 평균에서 벌어진 만큼을 1.5배로 넓힌다.
const clamp = (value: number) => Math.max(20, Math.min(98, Math.round(62 + (value - 62) * 1.5)));

/** 시진 표기 (한국 표준시 기준, 경도 보정 30분 반영): 子 23:30~01:30 … */
function hourLabel(branch: number): string {
  const start = (branch * 2 + 23) % 24;
  const end = (start + 2) % 24;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${BRANCHES[branch].hangul}시 (${pad(start)}:30~${pad(end)}:30)`;
}

export function computeDaily(chart: SajuChart, gender: "female" | "male", now = new Date()): DailyFortune {
  const date = todayInKorea(now);
  const pillar = dayPillarForDate(date.year, date.month, date.day);
  const me = STEMS[chart.day.stem];
  const tenGod = tenGodOf(chart.day.stem, pillar.stem);

  // 신강: 원국에서 일간과 같은 오행 + 일간을 생하는 오행이 절반 이상인가
  const total = ELEMENT_ORDER.reduce((sum, key) => sum + chart.elements[key], 0);
  const resourceElement = ELEMENT_ORDER.find((key) => GENERATES[key] === me.element)!;
  const support = chart.elements[me.element] + chart.elements[resourceElement];
  const strong = support / total >= 0.5;

  const dayBranch = chart.day.branch;
  const todayBranch = pillar.branch;
  const branchRelation: BranchRelation = branchCombine(dayBranch, todayBranch)
    ? "combine"
    : branchClash(dayBranch, todayBranch)
      ? "clash"
      : branchTrine(dayBranch, todayBranch)
        ? "trine"
        : dayBranch === todayBranch
          ? "same"
          : null;
  const yearClash = branchClash(chart.year.branch, todayBranch);

  // 행운의 오행: 원국에서 가장 적은 오행. 동률이면 일간을 생하는 오행 → 상생 순서대로.
  const order = [resourceElement, ...ELEMENT_ORDER.filter((key) => key !== resourceElement)];
  const luckyElement = order.reduce((best, key) => (chart.elements[key] < chart.elements[best] ? key : best));
  const fillsLacking =
    STEMS[pillar.stem].element === luckyElement || BRANCHES[pillar.branch].element === luckyElement;

  // 총운: 오늘 십성이 내 강약에 맞는지 + 일지와의 합·충 + 부족한 기운 보충
  let score = 62;
  if (tenGod === "bigyeon" || tenGod === "geopjae") score += strong ? -3 : 8;
  else if (tenGod === "pyeonin" || tenGod === "jeongin") score += strong ? 2 : 10;
  else if (tenGod === "siksin" || tenGod === "sanggwan") score += strong ? 9 : -2;
  else if (tenGod === "pyeonjae" || tenGod === "jeongjae") score += strong ? 10 : -4;
  else score += strong ? 6 : -6; // 관성
  if (tenGod === "sanggwan" || tenGod === "pyeongwan" || tenGod === "geopjae") score -= 2; // 기복이 큰 십성
  if (branchRelation === "combine") score += 8;
  else if (branchRelation === "trine") score += 5;
  else if (branchRelation === "clash") score -= 10;
  else if (branchRelation === "same") score -= 2;
  if (yearClash) score -= 3;
  if (fillsLacking) score += 5;

  // 분야별: 총운을 바탕으로 오늘 십성이 직접 닿는 분야를 더하고 뺀다
  const isTen = (...keys: TenGod[]) => keys.includes(tenGod);
  const spouseStar: TenGod[] = gender === "female" ? ["pyeongwan", "jeonggwan"] : ["pyeonjae", "jeongjae"];
  const areas: Record<DailyAreaKey, number> = {
    work: score + (isTen("jeonggwan", "pyeongwan", "jeongin", "pyeonin") ? 8 : 0) - (isTen("sanggwan") ? 5 : 0),
    money:
      score +
      (isTen("jeongjae", "pyeonjae") ? (strong ? 10 : 2) : 0) +
      (isTen("siksin") ? 5 : 0) -
      (isTen("geopjae") ? 8 : 0),
    people:
      score +
      (isTen("bigyeon", "siksin") ? 7 : 0) +
      (branchRelation === "combine" ? 4 : 0) -
      (branchRelation === "clash" ? 4 : 0),
    love:
      score +
      (spouseStar.includes(tenGod) ? 9 : 0) +
      (PEACH.has(todayBranch) ? 6 : 0) +
      (branchRelation === "combine" ? 4 : 0),
  };

  const luckyBranch = (13 - todayBranch) % 12; // 육합 짝: 두 인덱스 합이 12로 나눠 1 남는 지지

  return {
    date,
    pillar,
    tenGod,
    branchRelation,
    yearClash,
    strong,
    fillsLacking,
    luckyElement,
    rotation: (((6 * pillar.stem - 5 * pillar.branch) % 60) + 60) % 60, // 60갑자 순번
    luckyHour: { branch: luckyBranch, label: hourLabel(luckyBranch) },
    score: clamp(score),
    areas: {
      work: clamp(areas.work),
      money: clamp(areas.money),
      people: clamp(areas.people),
      love: clamp(areas.love),
    },
  };
}

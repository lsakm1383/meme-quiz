import type { Pillar, SajuChart } from "@/lib/saju/engine";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import type { ElementKey } from "@/data/saju/types";

// 그룹 운세 점수. 같은 원국이면 항상 같은 점수가 나오도록 정해진 규칙으로만 계산한다
// (그룹 순위가 들쭉날쭉하면 안 되므로 무작위·날짜 요소는 쓰지 않는다).
//
// 기본 재료는 일간을 기준으로 한 십성(十星)이다:
//   비겁(나와 같은 오행) · 식상(내가 생하는 오행) · 재성(내가 극하는 오행)
//   관성(나를 극하는 오행) · 인성(나를 생하는 오행)
// 자리마다 무게가 다르다. 계절을 정하는 월지가 가장 크고, 배우자 자리인 일지가 그다음이다.

export type FortuneKey =
  | "wealth"
  | "love"
  | "marriage"
  | "career"
  | "popularity"
  | "helper"
  | "travel"
  | "study"
  | "honor"
  | "relationship";
export const FORTUNE_KEYS: FortuneKey[] = [
  "wealth",
  "love",
  "marriage",
  "career",
  "popularity",
  "helper",
  "travel",
  "study",
  "honor",
  "relationship",
];

export type Gender = "female" | "male";

export type TenGodGroup = "peer" | "output" | "wealth" | "officer" | "resource";

/** 오행 상생 순서: 목→화→토→금→수→목 */
const GENERATES: Record<ElementKey, ElementKey> = {
  wood: "fire",
  fire: "earth",
  earth: "metal",
  metal: "water",
  water: "wood",
};
/** 오행 상극: 목극토, 화극금, 토극수, 금극목, 수극화 */
const CONTROLS: Record<ElementKey, ElementKey> = {
  wood: "earth",
  fire: "metal",
  earth: "water",
  metal: "wood",
  water: "fire",
};

function groupOf(day: ElementKey, other: ElementKey): TenGodGroup {
  if (other === day) return "peer";
  if (GENERATES[day] === other) return "output";
  if (CONTROLS[day] === other) return "wealth";
  if (CONTROLS[other] === day) return "officer";
  return "resource";
}

type Slot = {
  group: TenGodGroup;
  /** 일간과 음양이 다르면 정(正) 계열 — 정재·정관·정인·상관·겁재 */
  direct: boolean;
  weight: number;
  position: "yearStem" | "yearBranch" | "monthStem" | "monthBranch" | "dayBranch" | "hourStem" | "hourBranch";
  branch?: number;
};

const WEIGHTS: Record<Slot["position"], number> = {
  yearStem: 0.8,
  yearBranch: 0.8,
  monthStem: 1,
  monthBranch: 1.6,
  dayBranch: 1.3,
  hourStem: 0.9,
  hourBranch: 0.9,
};

function slotsOf(chart: SajuChart): Slot[] {
  const day = STEMS[chart.day.stem];
  const slots: Slot[] = [];
  const add = (position: Slot["position"], element: ElementKey, yang: boolean, branch?: number) =>
    slots.push({
      group: groupOf(day.element, element),
      direct: yang !== day.yang,
      weight: WEIGHTS[position],
      position,
      branch,
    });
  const stem = (pillar: Pillar) => STEMS[pillar.stem];
  const branch = (pillar: Pillar) => BRANCHES[pillar.branch];
  add("yearStem", stem(chart.year).element, stem(chart.year).yang);
  add("yearBranch", branch(chart.year).element, branch(chart.year).yang, chart.year.branch);
  add("monthStem", stem(chart.month).element, stem(chart.month).yang);
  add("monthBranch", branch(chart.month).element, branch(chart.month).yang, chart.month.branch);
  add("dayBranch", branch(chart.day).element, branch(chart.day).yang, chart.day.branch);
  if (chart.hour) {
    add("hourStem", stem(chart.hour).element, stem(chart.hour).yang);
    add("hourBranch", branch(chart.hour).element, branch(chart.hour).yang, chart.hour.branch);
  }
  return slots;
}

function weightOf(slots: Slot[], group: TenGodGroup, filter?: (slot: Slot) => boolean): number {
  return slots
    .filter((slot) => slot.group === group && (!filter || filter(slot)))
    .reduce((sum, slot) => sum + slot.weight, 0);
}

/** 子午卯酉 — 도화(桃花) 자리 */
const PEACH_BLOSSOM = new Set([0, 6, 3, 9]);

/** 두 지지가 정반대(6칸 차이)면 충(沖) */
function clashes(a: number, b: number): boolean {
  return Math.abs(a - b) === 6;
}

/** 지지 육합(六合): 子丑·寅亥·卯戌·辰酉·巳申·午未 — 인덱스 합이 12로 나눠 1 남는 짝 */
function combines(a: number, b: number): boolean {
  return a !== b && (a + b) % 12 === 1;
}

/** 일간(천간 인덱스)별 신살 자리 (지지 인덱스: 子0 丑1 寅2 卯3 辰4 巳5 午6 未7 申8 酉9 戌10 亥11) */
// 홍염살: 甲乙→午 丙→寅 丁→未 戊己→辰 庚→戌 辛→酉 壬→子 癸→申
const RED_FLAME = [6, 6, 2, 7, 4, 4, 10, 9, 0, 8];
// 천을귀인: 甲戊庚→丑未 乙己→子申 丙丁→亥酉 辛→寅午 壬癸→巳卯
const NOBLE: number[][] = [[1, 7], [0, 8], [11, 9], [11, 9], [1, 7], [0, 8], [1, 7], [2, 6], [5, 3], [5, 3]];
// 문창귀인: 甲→巳 乙→午 丙戊→申 丁己→酉 庚→亥 辛→子 壬→寅 癸→卯
const LITERARY = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
/** 역마(驛馬): 寅申巳亥 */
const TRAVELING_HORSE = new Set([2, 8, 5, 11]);

// 운세마다 규칙에서 나오는 원점수의 분포가 달라서(결혼운은 좁고 직업운은 높게 몰림),
// 무작위 생년월일 6,000개로 잰 평균·표준편차를 써서 모두 평균 62·표준편차 14로 맞춘다.
// 고정 상수라서 같은 원국이면 항상 같은 점수가 나온다.
const RAW_STATS: Record<FortuneKey, { mean: number; sd: number }> = {
  wealth: { mean: 64.5, sd: 11.8 },
  love: { mean: 64.2, sd: 13.2 },
  marriage: { mean: 56.1, sd: 8.3 },
  career: { mean: 69.8, sd: 11.6 },
  // 아래 여섯 운세는 1930년~현재 모든 날짜 × 12시진 × 성별 2로 잰 값 (기존 네 운세 상수는 그대로 둔다)
  popularity: { mean: 63.2, sd: 10.6 },
  helper: { mean: 60.3, sd: 11.2 },
  travel: { mean: 61.1, sd: 10.8 },
  study: { mean: 61.3, sd: 11.1 },
  honor: { mean: 55.7, sd: 11.0 },
  relationship: { mean: 57.8, sd: 9.2 },
};

function normalize(key: FortuneKey, raw: number): number {
  const { mean, sd } = RAW_STATS[key];
  const value = 62 + ((raw - mean) / sd) * 14;
  return Math.max(10, Math.min(99, Math.round(value)));
}

export type FortuneScores = Record<FortuneKey, number>;

/** 정규화 전 원점수 — 분포 상수(RAW_STATS)를 다시 잴 때만 직접 쓴다 */
export function computeRawFortunes(chart: SajuChart, gender: Gender): FortuneScores {
  const slots = slotsOf(chart);
  const total = slots.reduce((sum, slot) => sum + slot.weight, 0);
  // 시간을 모르면 글자가 적으니 비율로 맞춘다 (8글자 기준 총 무게 ≈ 7.3)
  const scale = 7.3 / total;
  const w = (group: TenGodGroup, filter?: (slot: Slot) => boolean) =>
    weightOf(slots, group, filter) * scale;

  const peer = w("peer");
  const output = w("output");
  const wealth = w("wealth");
  const officer = w("officer");
  const resource = w("resource");
  // 일간 강약: 나를 돕는 비겁·인성이 전체의 몇 %인지 (일간 자신도 1글자로 친다)
  const support = (peer + resource + 1) / (7.3 + 1);
  const strong = support >= 0.45;

  const spouseGroup: TenGodGroup = gender === "female" ? "officer" : "wealth";
  const spouse = w(spouseGroup);
  const spouseDirect = w(spouseGroup, (slot) => slot.direct);
  const dayBranchSlot = slots.find((slot) => slot.position === "dayBranch")!;
  const peach = slots.filter((slot) => slot.branch !== undefined && PEACH_BLOSSOM.has(slot.branch)).length;
  const dayBranch = chart.day.branch;
  const dayClash =
    clashes(dayBranch, chart.month.branch) || (chart.hour ? clashes(dayBranch, chart.hour.branch) : false);

  // 재물운: 재성이 적당히 있고, 식상이 재성을 만들어 주며, 재성을 감당할 힘(신강)이 있을수록 높다.
  let wealthScore = 38 + Math.min(wealth, 3) * 11 + Math.min(output, 2) * 5;
  if (wealth > 0 && output > 0) wealthScore += 7; // 식상생재
  if (wealth > 0) wealthScore += strong ? 8 : wealth > 2.5 ? -8 : 0; // 재다신약이면 감점
  if (peer > 2.5 && wealth > 0) wealthScore -= 6; // 비겁이 많으면 재물이 나뉜다
  if (wealth === 0 && output > 0) wealthScore += 5;

  // 연애운: 배우자별(여성은 관성, 남성은 재성)과 도화, 표현력(식상)이 끌림을 만든다.
  let loveScore = 36 + Math.min(spouse, 2.5) * 10 + Math.min(peach, 3) * 7 + Math.min(output, 2) * 5;
  if (dayBranchSlot.group === spouseGroup) loveScore += 6;
  if (spouse === 0) loveScore -= 4;

  // 결혼운: 배우자별이 정(正) 계열로 안정적이고, 배우자 자리(일지)가 충을 받지 않으면 높다.
  let marriageScore = 48 + Math.min(spouseDirect, 2) * 9 + Math.min(spouse - spouseDirect, 2) * 3;
  if (dayBranchSlot.group === spouseGroup) marriageScore += 9;
  if (dayBranchSlot.group === "resource" || dayBranchSlot.group === "output") marriageScore += 4;
  if (dayClash) marriageScore -= 9;
  if (gender === "male" && peer > 2.5) marriageScore -= 6; // 비겁이 재성을 다툼
  if (gender === "female" && w("output", (slot) => slot.direct) > 2) marriageScore -= 6; // 상관견관
  if (spouse > 3) marriageScore -= 5; // 배우자별이 지나치게 많음

  // 직업운: 관성(조직·책임)과 인성(배움·자격)이 함께 있으면 관인상생, 식상은 기술·표현력.
  let careerScore = 40 + Math.min(officer, 2.5) * 8 + Math.min(resource, 2.5) * 6 + Math.min(output, 2) * 4;
  if (officer > 0 && resource > 0) careerScore += 9; // 관인상생
  if (officer > 0) careerScore += strong ? 5 : officer > 2.5 ? -6 : 0;
  if (officer === 0 && output > 1) careerScore += 4; // 조직보다 기술·창작형

  const dayStem = chart.day.stem;
  const branches = [chart.year.branch, chart.month.branch, chart.day.branch];
  if (chart.hour) branches.push(chart.hour.branch);
  const branchScale = 4 / branches.length; // 시간을 모르면 지지 3개 → 4개 기준으로 맞춘다
  const pairs: [number, number][] = [];
  for (let i = 0; i < branches.length; i++)
    for (let j = i + 1; j < branches.length; j++) pairs.push([branches[i], branches[j]]);
  const clashCount = pairs.filter(([a, b]) => clashes(a, b)).length;
  const combineCount = pairs.filter(([a, b]) => combines(a, b)).length;
  const countIn = (targets: number[] | Set<number>) => {
    const set = targets instanceof Set ? targets : new Set(targets);
    return branches.filter((branch) => set.has(branch)).length * branchScale;
  };
  const inPillar = (targets: number[] | Set<number>, branch: number) =>
    (targets instanceof Set ? targets : new Set(targets)).has(branch);

  // 인기운: 도화(子午卯酉)·홍염살이 사람을 끌고, 식상(표현력)이 그 매력을 드러낸다.
  let popularityScore = 40 + Math.min(peach * branchScale, 3) * 8 + Math.min(output, 2.5) * 6;
  if (countIn([RED_FLAME[dayStem]]) > 0) popularityScore += 9;
  if (peer > 0.5 && peer < 2.5) popularityScore += 3; // 어울리는 또래(비겁)가 적당히 있음

  // 귀인운: 일간별 천을귀인이 원국에 있는지(월지·일지면 더 크게), 나를 돕는 인성이 있는지.
  const noble = NOBLE[dayStem];
  let helperScore = 42 + Math.min(countIn(noble), 2) * 12 + Math.min(resource, 2.5) * 6;
  if (inPillar(noble, chart.month.branch) || inPillar(noble, chart.day.branch)) helperScore += 6;
  if (resource > 0 && officer > 0) helperScore += 4; // 관인상생 — 윗사람의 도움

  // 이동운: 역마(寅申巳亥)와 지지끼리 부딪히는 충(沖)이 많을수록 움직임이 많다. 식상은 활동성.
  let travelScore = 40 + Math.min(countIn(TRAVELING_HORSE), 3) * 9 + Math.min(clashCount, 2) * 7;
  travelScore += Math.min(output, 2) * 3;
  if (inPillar(TRAVELING_HORSE, chart.day.branch) || inPillar(TRAVELING_HORSE, chart.month.branch)) travelScore += 4;

  // 학업운: 인성(배움)·문창귀인(글재주)이 중심, 관인상생이면 더하고 재성이 인성을 누르면(재극인) 뺀다.
  let studyScore = 40 + Math.min(resource, 2.5) * 9 + Math.min(countIn([LITERARY[dayStem]]), 1.5) * 10;
  if (resource > 0 && officer > 0) studyScore += 7;
  studyScore += Math.min(w("output", (slot) => !slot.direct), 1.5) * 4; // 식신 — 파고드는 탐구심
  if (wealth > 2.5 && resource > 0) studyScore -= 6;

  // 명예운: 관성 중에서도 정관, 월지의 관성, 관인상생, 관성을 감당할 힘(신강)을 본다. 상관이 많으면 감점.
  const directOfficer = w("officer", (slot) => slot.direct);
  let honorScore = 40 + Math.min(directOfficer, 2) * 10 + Math.min(officer - directOfficer, 2) * 5;
  if (slots.some((slot) => slot.position === "monthBranch" && slot.group === "officer")) honorScore += 7;
  if (officer > 0 && resource > 0) honorScore += 6;
  if (officer > 0 && strong) honorScore += 4;
  if (w("output", (slot) => slot.direct) > 2 && officer > 0) honorScore -= 6; // 상관견관

  // 인간관계운: 지지 육합이 많으면 어울림, 충이 많으면 부딪힘. 비겁은 적당할 때, 식상은 소통.
  let relationshipScore = 46 + Math.min(combineCount, 2) * 9 - Math.min(clashCount, 2) * 6;
  relationshipScore += Math.min(output, 2) * 4 + Math.min(resource, 2) * 2;
  if (peer > 0.5 && peer <= 2.5) relationshipScore += 6;
  else if (peer > 3) relationshipScore -= 5; // 비겁 과다 — 경쟁

  return {
    wealth: wealthScore,
    love: loveScore,
    marriage: marriageScore,
    career: careerScore,
    popularity: popularityScore,
    helper: helperScore,
    travel: travelScore,
    study: studyScore,
    honor: honorScore,
    relationship: relationshipScore,
  };
}

export function computeFortunes(chart: SajuChart, gender: Gender): FortuneScores {
  const raw = computeRawFortunes(chart, gender);
  return Object.fromEntries(
    FORTUNE_KEYS.map((key) => [key, normalize(key, raw[key])])
  ) as FortuneScores;
}

export function isValidScores(value: unknown): value is FortuneScores {
  if (!value || typeof value !== "object") return false;
  return FORTUNE_KEYS.every((key) => {
    const score = (value as Record<string, unknown>)[key];
    return typeof score === "number" && Number.isInteger(score) && score >= 0 && score <= 100;
  });
}

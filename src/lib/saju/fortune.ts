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

export type FortuneKey = "wealth" | "love" | "marriage" | "career";
export const FORTUNE_KEYS: FortuneKey[] = ["wealth", "love", "marriage", "career"];

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

// 운세마다 규칙에서 나오는 원점수의 분포가 달라서(결혼운은 좁고 직업운은 높게 몰림),
// 무작위 생년월일 6,000개로 잰 평균·표준편차를 써서 모두 평균 62·표준편차 14로 맞춘다.
// 고정 상수라서 같은 원국이면 항상 같은 점수가 나온다.
const RAW_STATS: Record<FortuneKey, { mean: number; sd: number }> = {
  wealth: { mean: 64.5, sd: 11.8 },
  love: { mean: 64.2, sd: 13.2 },
  marriage: { mean: 56.1, sd: 8.3 },
  career: { mean: 69.8, sd: 11.6 },
};

function normalize(key: FortuneKey, raw: number): number {
  const { mean, sd } = RAW_STATS[key];
  const value = 62 + ((raw - mean) / sd) * 14;
  return Math.max(10, Math.min(99, Math.round(value)));
}

export type FortuneScores = Record<FortuneKey, number>;

export function computeFortunes(chart: SajuChart, gender: Gender): FortuneScores {
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

  return {
    wealth: normalize("wealth", wealthScore),
    love: normalize("love", loveScore),
    marriage: normalize("marriage", marriageScore),
    career: normalize("career", careerScore),
  };
}

export function isValidScores(value: unknown): value is FortuneScores {
  if (!value || typeof value !== "object") return false;
  return FORTUNE_KEYS.every((key) => {
    const score = (value as Record<string, unknown>)[key];
    return typeof score === "number" && Number.isInteger(score) && score >= 0 && score <= 100;
  });
}

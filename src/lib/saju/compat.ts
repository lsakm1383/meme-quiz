import type { SajuChart } from "@/lib/saju/engine";
import { STEMS, BRANCHES, ELEMENT_ORDER } from "@/lib/saju/constants";

// 그룹 궁합. 두 사람의 원국 전체 대신, 궁합에 쓰는 최소 정보만 그룹에 저장한다:
//   ds: 일간(천간 인덱스) · db: 일지(배우자·관계 자리, 지지 인덱스) · yb: 연지(띠) · el: 오행 개수 5개
// 일주·띠·오행 개수만으로는 생년월일을 되짚을 수 없다 (같은 조합이 수십 개 날짜에 나온다).
export type CompatProfile = { ds: number; db: number; yb: number; el: number[] };

export function compatProfileOf(chart: SajuChart): CompatProfile {
  return {
    ds: chart.day.stem,
    db: chart.day.branch,
    yb: chart.year.branch,
    el: ELEMENT_ORDER.map((key) => chart.elements[key]),
  };
}

export function isValidCompatProfile(value: unknown): value is CompatProfile {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const int = (x: unknown, max: number) => Number.isInteger(x) && (x as number) >= 0 && (x as number) <= max;
  return (
    int(v.ds, 9) &&
    int(v.db, 11) &&
    int(v.yb, 11) &&
    Array.isArray(v.el) &&
    v.el.length === 5 &&
    v.el.every((count) => int(count, 8))
  );
}

const ELEMENT_NAME = ["목", "화", "토", "금", "수"];
/** 상생: 목→화→토→금→수→목 (오행 인덱스 기준) */
const generates = (a: number, b: number) => (a + 1) % 5 === b;
/** 상극: 목→토, 화→금, 토→수, 금→목, 수→화 */
const controls = (a: number, b: number) => (a + 2) % 5 === b;
const elementIndex = (stem: number) => ELEMENT_ORDER.indexOf(STEMS[stem].element);

/** 천간합: 甲己·乙庚·丙辛·丁壬·戊癸 — 인덱스 차이가 5 */
const stemCombine = (a: number, b: number) => Math.abs(a - b) === 5;
/** 지지 육합: 子丑·寅亥·卯戌·辰酉·巳申·午未 */
const branchCombine = (a: number, b: number) => a !== b && (a + b) % 12 === 1;
/** 지지 삼합: 申子辰·寅午戌·巳酉丑·亥卯未 — 인덱스를 4로 나눈 나머지가 같은 셋 */
const branchTrine = (a: number, b: number) => a !== b && a % 4 === b % 4;
/** 지지 충: 정반대 자리 */
const branchClash = (a: number, b: number) => Math.abs(a - b) === 6;

export type CompatDetail = {
  /** 10~99 */
  score: number;
  /** 사람이 읽을 수 있는 근거 (긍정 → 주의 순) */
  reasons: string[];
  /** 일간 오행끼리 상극이라 겉보기엔 안 맞아 보이는 사이 — "의외의 찰떡" 후보 */
  stemClash: boolean;
};

function rawCompat(a: CompatProfile, b: CompatProfile): { raw: number; reasons: string[]; stemClash: boolean } {
  let raw = 50;
  const reasons: string[] = [];
  const ea = elementIndex(a.ds);
  const eb = elementIndex(b.ds);
  // 천간합(甲己·乙庚…)도 오행으로는 상극이지만 명리에서는 서로 끌리는 관계라 "상극"으로 치지 않는다.
  const stemClash = (controls(ea, eb) || controls(eb, ea)) && !stemCombine(a.ds, b.ds);

  // 일간: 나 자신끼리의 관계
  if (stemCombine(a.ds, b.ds)) {
    raw += 18;
    reasons.push(`일간이 천간합(${STEMS[a.ds].hanja}${STEMS[b.ds].hanja}合)을 이뤄 자연스럽게 끌려요`);
  } else if (generates(ea, eb) || generates(eb, ea)) {
    raw += 10;
    reasons.push(`일간 오행이 상생(${ELEMENT_NAME[generates(ea, eb) ? ea : eb]}→${ELEMENT_NAME[generates(ea, eb) ? eb : ea]})이라 서로 북돋아요`);
  } else if (ea === eb) {
    raw += 5;
    reasons.push(`같은 ${ELEMENT_NAME[ea]} 기운의 일간이라 통하는 게 많아요`);
  } else if (stemClash) {
    raw -= 6;
  }

  // 일지: 생활·관계 자리
  if (branchCombine(a.db, b.db)) {
    raw += 12;
    reasons.push(`일지가 육합(${BRANCHES[a.db].hanja}${BRANCHES[b.db].hanja}合)이라 함께 있을 때 편해요`);
  } else if (branchTrine(a.db, b.db)) {
    raw += 8;
    reasons.push(`일지가 삼합 관계라 같은 방향을 바라봐요`);
  } else if (branchClash(a.db, b.db)) {
    raw -= 12;
    reasons.push(`일지가 충(${BRANCHES[a.db].hanja}${BRANCHES[b.db].hanja}沖)이라 생활 리듬이 부딪힐 수 있어요`);
  }

  // 띠(연지)
  if (branchCombine(a.yb, b.yb)) {
    raw += 6;
    reasons.push(`${BRANCHES[a.yb].animal}띠와 ${BRANCHES[b.yb].animal}띠는 육합으로 잘 맞는 띠예요`);
  } else if (branchTrine(a.yb, b.yb)) {
    raw += 5;
    reasons.push(`${BRANCHES[a.yb].animal}띠와 ${BRANCHES[b.yb].animal}띠는 삼합 띠예요`);
  } else if (branchClash(a.yb, b.yb)) {
    raw -= 6;
  }

  // 오행 보완: 한쪽에 없는 기운을 다른 쪽이 넉넉히 갖고 있으면 서로 채워준다
  const filled: number[] = [];
  for (let i = 0; i < 5; i++) {
    if ((a.el[i] === 0 && b.el[i] >= 2) || (b.el[i] === 0 && a.el[i] >= 2)) filled.push(i);
  }
  if (filled.length > 0) {
    raw += Math.min(filled.length, 3) * 4;
    reasons.push(`서로 부족한 ${filled.map((i) => ELEMENT_NAME[i]).join("·")} 기운을 채워줘요`);
  }

  return { raw, reasons, stemClash };
}

// 원점수 분포(무작위 원국 쌍 20만 개로 잰 값)를 평균 62·표준편차 14로 맞춘다. 고정 상수라 결과가 항상 같다.
const RAW_MEAN = 60.41;
const RAW_SD = 11.06;

export function compatibility(a: CompatProfile, b: CompatProfile): CompatDetail {
  const { raw, reasons, stemClash } = rawCompat(a, b);
  const score = Math.max(10, Math.min(99, Math.round(62 + ((raw - RAW_MEAN) / RAW_SD) * 14)));
  return { score, reasons, stemClash };
}

/** 분포 상수를 다시 잴 때만 쓴다 */
export function rawCompatibility(a: CompatProfile, b: CompatProfile): number {
  return rawCompat(a, b).raw;
}

export type CompatTier = { min: number; title: string; color: string };

/** 궁합 점수 구간 — 관계도 선 색과 짝 카드 별칭에 쓴다 (높은 구간부터) */
export const COMPAT_TIERS: CompatTier[] = [
  { min: 85, title: "천생연분", color: "#e11d48" },
  { min: 72, title: "찰떡 콤비", color: "#f97316" },
  { min: 58, title: "편안한 사이", color: "#10b981" },
  { min: 44, title: "밀당 케미", color: "#6366f1" },
  { min: 0, title: "티격태격 성장 메이트", color: "#94a3b8" },
];

export function compatTier(score: number): CompatTier {
  return COMPAT_TIERS.find((tier) => score >= tier.min) ?? COMPAT_TIERS[COMPAT_TIERS.length - 1];
}

export type CompatMember = { id: string; nickname: string; compat: CompatProfile };
export type CompatPair = { a: CompatMember; b: CompatMember } & CompatDetail;

export type GroupCompat = {
  pairs: CompatPair[];
  /** 점수 높은 순 상위 3쌍 */
  top: CompatPair[];
  /** 일간 오행은 상극인데 점수가 높은 쌍 중 최고점 (58점 이상일 때만). TOP 3와 겹칠 수 있다 — 상극인데 TOP 3면 그게 가장 의외라서. */
  surprise: CompatPair | null;
};

/** 그룹 안 모든 두 사람의 궁합. 동점이면 먼저 참여한 사람끼리의 쌍이 앞에 온다. */
export function groupCompat(members: CompatMember[]): GroupCompat {
  const pairs: CompatPair[] = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      pairs.push({ a: members[i], b: members[j], ...compatibility(members[i].compat, members[j].compat) });
    }
  }
  const sorted = pairs
    .map((pair, order) => ({ pair, order }))
    .sort((x, y) => y.pair.score - x.pair.score || x.order - y.order)
    .map(({ pair }) => pair);
  const top = sorted.slice(0, 3);
  const surprise = sorted.find((pair) => pair.stemClash && pair.score >= 58) ?? null;
  return { pairs, top, surprise };
}

/** 1:1 궁합 풀이용 — 네 가지 자리에서 두 사람이 어떤 관계인지 ("나" 기준 방향 포함) */
export type StemRelation = "combine" | "iGenerate" | "theyGenerate" | "same" | "iControl" | "theyControl";
export type BranchRelation = "combine" | "trine" | "clash" | "same" | "neutral";

export type PairBreakdown = {
  stem: StemRelation;
  dayBranch: BranchRelation;
  zodiac: BranchRelation;
  /** 내게 없는데 상대가 넉넉히(2개 이상) 가진 오행 */
  theyFill: number[];
  /** 상대에게 없는데 내가 넉넉히 가진 오행 */
  iFill: number[];
};

function branchRelation(a: number, b: number): BranchRelation {
  if (a === b) return "same";
  if (branchCombine(a, b)) return "combine";
  if (branchClash(a, b)) return "clash";
  if (branchTrine(a, b)) return "trine";
  return "neutral";
}

export function pairBreakdown(me: CompatProfile, them: CompatProfile): PairBreakdown {
  const em = elementIndex(me.ds);
  const et = elementIndex(them.ds);
  const stem: StemRelation = stemCombine(me.ds, them.ds)
    ? "combine"
    : generates(em, et)
      ? "iGenerate"
      : generates(et, em)
        ? "theyGenerate"
        : em === et
          ? "same"
          : controls(em, et)
            ? "iControl"
            : "theyControl";
  const theyFill: number[] = [];
  const iFill: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (me.el[i] === 0 && them.el[i] >= 2) theyFill.push(i);
    if (them.el[i] === 0 && me.el[i] >= 2) iFill.push(i);
  }
  return {
    stem,
    dayBranch: branchRelation(me.db, them.db),
    zodiac: branchRelation(me.yb, them.yb),
    theyFill,
    iFill,
  };
}

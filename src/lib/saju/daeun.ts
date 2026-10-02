import type { Pillar, SajuChart } from "@/lib/saju/engine";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import type { TenGod } from "@/data/saju/types";
import { tenGodOf, tenGodFit, isStrongChart, scarcestElement } from "@/lib/saju/daily";

// 대운(大運): 10년마다 바뀌는 큰 흐름.
// - 방향: 연간이 양(陽)인 남자·음(陰)인 여자는 순행, 반대면 역행
// - 시작 나이(대운수): 태어난 순간부터 순행이면 다음 절(節), 역행이면 이전 절까지의 시간을
//   "3일 = 1년"으로 환산한다 (가장 흔한 계산법). 반올림하고 1~10세로 둔다.
// - 대운의 간지: 월주에서 60갑자를 한 칸씩 앞(순행) 또는 뒤(역행)로 옮긴다.
// - 대운의 천간은 앞 5년, 지지는 뒤 5년의 성격을 주로 본다.

const DAY_MS = 86_400_000;
const YEAR_MS = 365.2425 * DAY_MS;
export const DAEUN_COUNT = 9;

const pillarIndex = (pillar: Pillar) => (((6 * pillar.stem - 5 * pillar.branch) % 60) + 60) % 60;
const pillarAt = (index: number): Pillar => {
  const i = ((index % 60) + 60) % 60;
  return { stem: i % 10, branch: i % 12 };
};

/** 지지의 본기 오행·음양으로 본 십성 (같은 오행·음양의 천간을 찾아 천간 십성 규칙을 쓴다) */
function branchTenGod(dayStem: number, branch: number): TenGod {
  const b = BRANCHES[branch];
  const stem = STEMS.findIndex((item) => item.element === b.element && item.yang === b.yang);
  return tenGodOf(dayStem, stem);
}

const branchCombine = (a: number, b: number) => a !== b && (a + b) % 12 === 1;
const branchClash = (a: number, b: number) => Math.abs(a - b) === 6;

export type DaeunPeriod = {
  pillar: Pillar;
  /** 이 대운이 시작하는 만 나이 */
  startAge: number;
  startYear: number;
  endYear: number;
  stemGod: TenGod;
  branchGod: TenGod;
  score: number;
  /** 일지와 육합 / 충, 월지와 충 */
  relation: "combine" | "clash" | null;
  monthClash: boolean;
  /** 원국에 가장 부족한 오행을 채워주는 대운 */
  fillsLacking: boolean;
};

export type DaeunResult = {
  forward: boolean;
  /** 대운수 */
  startAge: number;
  periods: DaeunPeriod[];
  /** 지금 지나고 있는 대운 (첫 대운 전이면 null) */
  currentIndex: number | null;
  /** 점수가 가장 높은 대운 */
  bestIndex: number;
};

const clamp = (value: number) => Math.max(20, Math.min(98, Math.round(62 + (value - 62) * 1.5)));

export function computeDaeun(chart: SajuChart, gender: "female" | "male", now = Date.now()): DaeunResult {
  const yang = STEMS[chart.year.stem].yang;
  const forward = (yang && gender === "male") || (!yang && gender === "female");
  const gap = forward ? chart.birth.nextJie - chart.birth.instant : chart.birth.instant - chart.birth.prevJie;
  const startAge = Math.max(1, Math.min(10, Math.round(gap / (3 * DAY_MS))));

  const strong = isStrongChart(chart);
  const lacking = scarcestElement(chart);
  const birthYear = new Date(chart.birth.instant + 9 * 3_600_000).getUTCFullYear();
  const base = pillarIndex(chart.month);

  const periods: DaeunPeriod[] = [];
  for (let k = 1; k <= DAEUN_COUNT; k++) {
    const pillar = pillarAt(base + (forward ? k : -k));
    const age = startAge + 10 * (k - 1);
    const stemGod = tenGodOf(chart.day.stem, pillar.stem);
    const branchGod = branchTenGod(chart.day.stem, pillar.branch);
    const relation = branchCombine(pillar.branch, chart.day.branch)
      ? "combine"
      : branchClash(pillar.branch, chart.day.branch)
        ? "clash"
        : null;
    const monthClash = branchClash(pillar.branch, chart.month.branch);
    const fillsLacking =
      STEMS[pillar.stem].element === lacking || BRANCHES[pillar.branch].element === lacking;

    let score = 62 + tenGodFit(stemGod, strong) + tenGodFit(branchGod, strong) * 0.8;
    if (relation === "combine") score += 5;
    if (relation === "clash") score -= 7;
    if (monthClash) score -= 4;
    if (fillsLacking) score += 5;

    periods.push({
      pillar,
      startAge: age,
      startYear: birthYear + age,
      endYear: birthYear + age + 9,
      stemGod,
      branchGod,
      score: clamp(score),
      relation,
      monthClash,
      fillsLacking,
    });
  }

  // 지금 대운: 태어난 순간 + 대운수(소수 포함)년이 지난 시점부터 10년씩
  const exactStart = gap / (3 * DAY_MS);
  const elapsedYears = (now - chart.birth.instant) / YEAR_MS - exactStart;
  const currentIndex =
    elapsedYears < 0 ? null : Math.min(DAEUN_COUNT - 1, Math.floor(elapsedYears / 10));
  const bestIndex = periods.reduce((best, period, i) => (period.score > periods[best].score ? i : best), 0);

  return { forward, startAge, periods, currentIndex, bestIndex };
}

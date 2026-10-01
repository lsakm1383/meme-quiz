// 사주 랭킹 개인 결과의 "전체 상위 N%"에 쓰는 점수 분포표를 만든다.
// 1930-01-01부터 오늘까지 모든 날짜 × 12시진(표준시 1·3·…·23시 = 평균태양시 기준 자시~해시)
// × 성별 2가지의 원국을 전부 계산해, 운세별로 점수마다 몇 명인지 센다.
// 점수 규칙(src/lib/saju/fortune.ts)을 바꾸면 다시 실행한다:
//   npx tsx --tsconfig tsconfig.json scripts/build-fortune-distribution.ts
import { writeFileSync } from "node:fs";
import { computeSaju, isSajuError } from "@/lib/saju/engine";
import { computeFortunes, FORTUNE_KEYS, type FortuneKey } from "@/lib/saju/fortune";

const MIN = 0;
const MAX = 100;
const counts = Object.fromEntries(
  FORTUNE_KEYS.map((key) => [key, new Array(MAX - MIN + 1).fill(0)])
) as Record<FortuneKey, number[]>;

let charts = 0;
const end = Date.now();
for (let day = Date.UTC(1930, 0, 1); day <= end; day += 86_400_000) {
  const date = new Date(day);
  for (let hour = 1; hour < 24; hour += 2) {
    const chart = computeSaju({
      calendar: "solar",
      leapMonth: false,
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      time: { hour, minute: 0 },
    });
    if (isSajuError(chart)) continue;
    for (const gender of ["female", "male"] as const) {
      const scores = computeFortunes(chart, gender);
      for (const key of FORTUNE_KEYS) counts[key][scores[key] - MIN] += 1;
    }
    charts += 1;
  }
}

const body = FORTUNE_KEYS.map((key) => `  ${key}: [${counts[key].join(", ")}],`).join("\n");
const file = `// 자동 생성 파일 — scripts/build-fortune-distribution.ts 로 다시 만든다. 직접 고치지 않는다.
// 원국 ${charts.toLocaleString("en-US")}개 × 성별 2 = ${(charts * 2).toLocaleString("en-US")}건의 점수 분포.
// 배열 인덱스 = 점수(${MIN}~${MAX}), 값 = 그 점수가 나온 건수.
import type { FortuneKey } from "@/lib/saju/fortune";

export const FORTUNE_DISTRIBUTION_TOTAL = ${charts * 2};

export const FORTUNE_DISTRIBUTION: Record<FortuneKey, number[]> = {
${body}
};
`;
writeFileSync("src/lib/saju/fortune-distribution.ts", file);
console.log(`charts ${charts}, entries ${charts * 2}`);

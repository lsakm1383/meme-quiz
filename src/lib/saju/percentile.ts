import type { FortuneKey } from "@/lib/saju/fortune";
import { FORTUNE_DISTRIBUTION, FORTUNE_DISTRIBUTION_TOTAL } from "@/lib/saju/fortune-distribution";

/**
 * 1930년~현재 모든 생년월일·시진·성별 중 이 점수 이상이 차지하는 비율 = "전체 상위 N%".
 * 실제 이용자 기록이 아니라 가능한 모든 원국 기준이라 서버로 보내는 데이터가 없다.
 */
export function topPercent(key: FortuneKey, score: number): number {
  const counts = FORTUNE_DISTRIBUTION[key];
  let atOrAbove = 0;
  for (let value = Math.max(0, score); value < counts.length; value++) atOrAbove += counts[value];
  const percent = (atOrAbove / FORTUNE_DISTRIBUTION_TOTAL) * 100;
  // 올림해서 실제보다 좋게 보이지 않게 하되, "상위 0%"·"상위 100%"는 어색하니 1~99로 둔다.
  return Math.min(99, Math.max(1, Math.ceil(percent)));
}

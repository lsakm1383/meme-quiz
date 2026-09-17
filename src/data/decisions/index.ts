import type { DecisionTestConfig } from "@/data/decision-types";
import cafeRecommend from "@/data/decisions/cafe-recommend";
import menuRecommend from "@/data/decisions/menu-recommend";

// 새 취향 추천(분기형) 테스트 추가 방법:
// 1. 이 폴더에 새 데이터 파일 하나 추가 (cafe-recommend.ts 복사해서 트리만 교체)
// 2. 아래 배열에 import + 등록
export const decisionTests: DecisionTestConfig[] = [cafeRecommend, menuRecommend];

export function getDecisionTest(id: string): DecisionTestConfig | undefined {
  return decisionTests.find((test) => test.id === id);
}

export function getDecisionResult(test: DecisionTestConfig, resultId: string) {
  return test.results.find((result) => result.id === resultId);
}

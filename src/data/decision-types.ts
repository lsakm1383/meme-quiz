// "취향 추천" 전용 분기형 템플릿.
// 유형 테스트(quiz)는 질문 N개를 다 풀고 점수를 합산해 결과를 정하지만,
// 이 템플릿은 실제 사람이 메뉴를 고르는 사고 흐름처럼 매 선택마다 다음 질문이 갈린다.
// (배부르니까 물베이스 → 더우니까 시원한 거 → 잎차 말고 스무디 → 망고! 같은 흐름)
// 그래서 질문이 트리 구조이고, 선택지 하나하나가 다음 질문으로 이어지거나 바로 결과로 끝난다.

export type DecisionResult = {
  /** URL에 노출되는 결과 슬러그 (영문 소문자, 하이픈) */
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
};

export type DecisionOption =
  | { text: string; type: "node"; node: DecisionNode }
  | { text: string; type: "result"; resultId: string };

export type DecisionNode = {
  id: string;
  text: string;
  options: DecisionOption[];
};

export type DecisionTestConfig = {
  /** URL에 노출되는 슬러그 (영문 소문자, 하이픈) */
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  /** 홈 화면에서 어느 섹션에 묶일지. 생략하면 "menu"(메뉴 추천)로 취급한다. */
  category?: "menu" | "life";
  root: DecisionNode;
  /** 트리 안 모든 결과를 한 곳에 모아둔 목록 — 라우팅/OG 이미지/통계에 쓰인다. */
  results: DecisionResult[];
};

/** 트리에서 가장 긴 경로의 질문 개수 — 진행률 바 계산에 쓴다. */
export function getMaxDepth(node: DecisionNode): number {
  const childDepths = node.options.map((option) =>
    option.type === "node" ? getMaxDepth(option.node) : 0
  );
  return 1 + Math.max(0, ...childDepths);
}

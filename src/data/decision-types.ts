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
  /** 전용 일러스트 (public 기준 경로, 기본은 정사각형 — 다른 비율이면 테스트의 imageShape). 없으면 emoji로 대체한다. */
  image?: string;
  /** 결과를 더 자세히 풀어 주는 내용. 없으면 description만 보여준다. */
  detail?: DecisionResultDetail;
};

/** 추천 결과 상세 — 결과 페이지 본문과 시작 화면의 결과 목록에 함께 쓴다 */
export type DecisionResultDetail = {
  /** description에 이어지는 문단 (2~3문장) */
  more: string;
  /** 이런 분께 잘 어울려요 — 3가지 (짧은 구) */
  goodFor: string[];
  /** 고를 때·입어볼 때 팁 — 2~3가지 (한 문장씩) */
  tips: string[];
  /** 함께 비교해 보면 좋은 결과 (results 의 id) 와 이유 한두 문장 */
  compare: { id: string; reason: string };
};

/** 정사각형이 아닌 일러스트의 비율 */
export type DecisionImageShape = {
  /**
   * Tailwind 비율 클래스, 예: "aspect-[384/162]". Tailwind는 소스에 그대로 적힌 클래스만
   * 만들기 때문에 숫자로 조립하지 말고 데이터 파일에 문자열 그대로 적는다.
   */
  aspect: string;
  /** 가로로 긴 그림이면 true — 높이 대신 너비 기준으로 크기를 잡는다 */
  wide?: boolean;
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
  /** 홈 카드·시작 화면에 쓸 대표 일러스트 (public 기준 경로, 정사각형). 없으면 emoji. */
  image?: string;
  /** 대표·결과 일러스트가 정사각형이 아닐 때의 비율 (테스트 안의 모든 그림에 공통 적용) */
  imageShape?: DecisionImageShape;
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

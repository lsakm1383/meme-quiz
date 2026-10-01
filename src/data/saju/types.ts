// 사주 시리즈 해석 문구용 타입. 명식 계산은 src/lib/saju 에서 하고,
// 여기 데이터는 계산 결과(일간·오행 분포)에 맞춰 골라 보여줄 미리 쓴 풀이다.

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

/** 오행 개수에 따른 단계 — 8글자(시간 모르면 6글자) 중 몇 글자인지로 정한다 */
export type ElementLevel = "none" | "low" | "balanced" | "strong" | "excessive";

/** 일간(태어난 날의 천간) 10유형 — 결과 페이지의 대표 유형 */
export type DayMasterProfile = {
  /** URL 슬러그: gap, eul, byeong, jeong, mu, gi, gyeong, sin, im, gye */
  slug: string;
  /** 천간 한자 (예: "甲") */
  hanja: string;
  /** 천간 한글 + 오행 (예: "갑목") */
  name: string;
  emoji: string;
  /** 유형 일러스트 (public 기준 경로, 348x216 가로형). 없으면 emoji로 대체한다. */
  image?: string;
  /** 유형 이름 (예: "곧게 뻗는 큰 나무") */
  title: string;
  /** 한 줄 요약 (카드·공유 문구) */
  subtitle: string;
  /** 3~4문장 성향 설명 */
  description: string;
  /** 강점 3개 */
  strengths: string[];
  /** 조심하면 좋은 점 2개 */
  cautions: string[];
  /** 카드 배경색 (연한 톤) */
  color: string;
};

/** 오행별 해석 */
export type ElementProfile = {
  key: ElementKey;
  /** 한글 이름 (예: "목") */
  name: string;
  /** 한자 (예: "木") */
  hanja: string;
  /** 그래프 색 */
  color: string;
  /** 이 오행이 성향에서 뜻하는 것 1~2문장 */
  meaning: string;
  /** 단계별 성향 풀이 2~3문장 */
  levels: Record<ElementLevel, string>;
};

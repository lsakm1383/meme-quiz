// 이상형 월드컵류(1:1 토너먼트) 콘텐츠용 타입.
// 새 월드컵을 추가할 때는 이 타입에 맞춰 데이터 파일만 하나 만들면 된다.

export type TournamentCandidate = {
  /** URL에 노출되는 후보 슬러그 */
  id: string;
  emoji: string;
  name: string;
  /** 대진 카드와 결과 카드 한 줄 요약 */
  tagline: string;
  /** 결과 페이지 본문 (2~4문장) */
  description: string;
  /** 결과 카드/OG 이미지 배경색 */
  color: string;
};

export type TournamentConfig = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  /** 반드시 2의 거듭제곱 (8강이면 8개) */
  candidates: TournamentCandidate[];
};

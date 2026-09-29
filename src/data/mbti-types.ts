// MBTI 스타일 성향 테스트 전용 타입.
// 실제 라이선스가 있는 MBTI® 검사(Form Q)의 "4개 선호지표 × 5개 다면척도" 구조를
// 참고해서 문항을 20개(축당 5개)로 구성했지만, 문항 문구·유형별 닉네임·해석 내용은
// 전부 새로 창작했다 (공식 한글 유형명이나 실제 검사 문항은 저작권이 있어 재사용하지 않는다).

export type MbtiOption = {
  text: string;
  /** 이 보기를 고르면 해당 축의 어느 글자에 투표하는지 (예: "E" | "I") */
  letter: string;
};

export type MbtiQuestion = {
  id: string;
  /** 몇 번째 축을 묻는 문항인지 — MbtiTestConfig.axes의 인덱스와 대응 */
  axisIndex: number;
  text: string;
  /** 정확히 2개, 각각 해당 축의 두 글자 중 하나씩 */
  options: [MbtiOption, MbtiOption];
};

export type MbtiTypeProfile = {
  /**
   * 4글자 선호지표 코드(예: "ISTJ") — 궁합 계산(compat.ts)에만 쓰는 내부 값이다.
   * URL, 공유 문구, 화면 어디에도 그대로 노출하지 않는다 (라이선스가 있는 MBTI®
   * 코드 체계를 사용자에게 직접 보여주는 걸 피하기 위함). 공개 식별자는 slug.
   */
  code: string;
  /** URL·통계에 쓰는 공개 슬러그 (예: "honeybutter") — 시리즈마다 다른 테마 이름을 붙인다 */
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  color: string;
};

export type MbtiTestConfig = {
  /** URL에 노출되는 슬러그 (영문 소문자, 하이픈) */
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  /** 4개 축의 글자쌍, 순서대로 결과 코드에 이어붙는다. 예: [["E","I"],["S","N"],["T","F"],["J","P"]] */
  axes: [string, string][];
  questions: MbtiQuestion[];
  /** 16가지 조합 전부를 담은 결과 목록 */
  profiles: MbtiTypeProfile[];
};

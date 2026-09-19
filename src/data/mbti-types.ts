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
  /** 4글자 코드, 예: "ISTJ" */
  code: string;
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

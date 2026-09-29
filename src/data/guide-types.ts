// 테스트 시작 화면 아래에 붙는 소개 섹션용 타입 (모든 콘텐츠 유형 공용).
// 결과 페이지는 검색 색인에서 빠지므로, 테스트가 무엇을 보는지·어떻게 진행되는지·
// 어떤 결과가 있는지를 시작 페이지에서 충분히 설명한다. 결과 목록 자체는 각 테스트
// 데이터에서 자동으로 그리므로 여기엔 섹션 제목만 둔다.
export type ContentGuide = {
  /** "이런 테스트예요" 문단들 */
  intro: string[];
  /** 진행 방식·판단 기준 섹션 제목, 예: "네 가지 기준으로 봐요", "이렇게 진행돼요" */
  howHeading: string;
  /** highlight는 제목 아래 강조색 한 줄 (예: "사람들과 어울리며 ↔ 혼자 집중하며") */
  how: { title: string; highlight?: string; description: string }[];
  /** 전체 결과 목록 섹션 제목, 예: "16가지 직장인 유형" */
  resultsHeading: string;
  faq: { question: string; answer: string }[];
};

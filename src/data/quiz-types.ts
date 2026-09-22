// 새 테스트를 추가할 때 이 타입에 맞춰 데이터 파일만 하나 만들면 된다.
// (질문/보기/결과 카피만 채우면 UI, 라우팅, OG 이미지, 공유 로직은 전부 재사용됨)

export type QuizOption = {
  /** 보기 문구 */
  text: string
  /** 이 보기를 고르면 어떤 결과 유형에 몇 점을 더할지 (key: ResultType.id) */
  scores: Record<string, number>
}

export type QuizQuestion = {
  id: string
  text: string
  options: QuizOption[]
}

export type ResultType = {
  /** URL에 노출되는 결과 슬러그 (영문 소문자, 하이픈) */
  id: string
  emoji: string
  /** 결과 제목, 예: "인터넷 순수 신생아" */
  title: string
  /** 카드 한 줄 요약 (공유 시 미리보기 문구로도 사용) */
  subtitle: string
  /** 결과 페이지 본문에 들어가는 상세 설명 (2~4문장) */
  description: string
  /** 결과 카드/OG 이미지 배경색 */
  color: string
}

export type QuizConfig = {
  /** URL에 노출되는 퀴즈 슬러그 (영문 소문자, 하이픈) */
  id: string
  emoji: string
  /** 목록/헤더용 제목 */
  title: string
  /** 시작 화면 및 og:description에 쓰이는 소개 문구 */
  description: string
  /** 퀴즈 전반의 테마 색 (버튼, 진행바 등) */
  accentColor: string
  /** 홈 화면에서 어느 섹션에 묶일지. 생략하면 "type"(유형 테스트)로 취급한다. */
  category?: "type" | "recommend"
  questions: QuizQuestion[]
  results: ResultType[]
}

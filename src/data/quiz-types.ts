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

/** 이모지 대신 쓰는 일러스트 */
export type QuizImage = {
  /** public 기준 경로 */
  src: string
  /**
   * 그림 비율에 맞춘 Tailwind 클래스, 예: "aspect-[2/1]". Tailwind는 소스에 그대로 적힌
   * 클래스만 만들기 때문에 숫자로 조립하지 말고 데이터 파일에 문자열 그대로 적는다.
   */
  aspect: string
  /** 가로로 긴 그림이면 true — 높이 대신 너비 기준으로 크기를 잡아 카드 폭을 넘치지 않게 한다 */
  wide?: boolean
}

export type ResultType = {
  /** URL에 노출되는 결과 슬러그 (영문 소문자, 하이픈) */
  id: string
  emoji: string
  /** 결과 일러스트. 없으면 emoji로 대체한다. */
  image?: QuizImage
  /** 결과 제목, 예: "인터넷 순수 신생아" */
  title: string
  /** 카드 한 줄 요약 (공유 시 미리보기 문구로도 사용) */
  subtitle: string
  /** 결과 페이지 본문에 들어가는 상세 설명 (2~4문장) */
  description: string
  /** 결과 카드/OG 이미지 배경색 */
  color: string
  /** 결과를 더 자세히 풀어 주는 내용. 없으면 description만 보여준다. */
  detail?: ResultDetail
}

/** 결과 상세 — 결과 페이지 본문과 시작 화면의 결과 목록에 함께 쓴다 */
export type ResultDetail = {
  /** description에 이어지는 문단 (2~3문장) */
  more: string
  /** 이 유형의 강점 3가지 (짧은 명사구) */
  strengths: string[]
  /** 조심하면 좋은 점 3가지 (한 문장씩) */
  cautions: string[]
  /** 잘 맞는 유형 (results 의 id) 과 이유 한두 문장 */
  bestMatch: { id: string; reason: string }
  /** 엇갈리기 쉬운 유형 (results 의 id) 과 이유 — 나쁘게 쓰지 않고 서로 배울 점으로 맺는다 */
  hardMatch: { id: string; reason: string }
  /** 오늘 해 보면 좋은 것 2가지 */
  tips: string[]
}

export type QuizConfig = {
  /** URL에 노출되는 퀴즈 슬러그 (영문 소문자, 하이픈) */
  id: string
  emoji: string
  /** 홈 카드·시작 화면용 대표 일러스트. 없으면 emoji로 대체한다. */
  image?: QuizImage
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

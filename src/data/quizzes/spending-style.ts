import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "spending-style",
  emoji: "💸",
  title: "짠테크 vs 플렉스 지수 테스트",
  description:
    "나는 통장 지키는 짠테크파일까, 지르고 보는 플렉스파일까? 6개 질문으로 알아보는 나의 소비 유형.",
  accentColor: "#ec4899",
  questions: [
    {
      id: "q1",
      text: "월급이 들어왔다. 가장 먼저 하는 행동은?",
      options: [
        { text: "적금·저축 계좌로 바로 이체", scores: { saver: 2 } },
        { text: "이번 달 예산 엑셀부터 정리", scores: { planner: 2 } },
        { text: "고정비 빼고 남는 돈으로 하고 싶은 거 함", scores: { balanced: 2 } },
        { text: "일단 사고 싶던 거 하나 지름", scores: { flexer: 2 } },
      ],
    },
    {
      id: "q2",
      text: "친구가 '이거 완전 핫한 신상이야'라며 보여준 제품은?",
      options: [
        { text: "가격부터 확인하고 조용히 넘어감", scores: { saver: 2 } },
        { text: "정말 필요한지 며칠 고민 후 결정", scores: { planner: 2 } },
        { text: "예산 안에서 살까 말까 고민", scores: { balanced: 2 } },
        { text: "바로 장바구니 담고 결제", scores: { flexer: 2 } },
      ],
    },
    {
      id: "q3",
      text: "카드값 명세서를 확인할 때 내 심장은?",
      options: [
        { text: "명세서 볼 필요도 없이 다 기억함", scores: { saver: 2 } },
        { text: "예상 범위 안이라 담담함", scores: { planner: 2 } },
        { text: "가끔 예상보다 많이 나와서 놀람", scores: { balanced: 2 } },
        { text: "명세서 보는 것 자체를 피함", scores: { flexer: 2 } },
      ],
    },
    {
      id: "q4",
      text: "여행 계획을 세울 때 나는?",
      options: [
        { text: "최저가 항공권·숙소부터 비교", scores: { saver: 2 } },
        { text: "예산 짜서 항목별로 배분", scores: { planner: 2 } },
        { text: "대략적인 예산만 정하고 즉흥적으로", scores: { balanced: 2 } },
        { text: "가고 싶은 곳·먹고 싶은 거 일단 다 계획", scores: { flexer: 2 } },
      ],
    },
    {
      id: "q5",
      text: "'텅장'이라는 단어를 들으면?",
      options: [
        { text: "나랑 제일 거리가 먼 단어", scores: { saver: 2 } },
        { text: "관리만 잘하면 피할 수 있는 것", scores: { planner: 2 } },
        { text: "월말엔 가끔 스치는 단어", scores: { balanced: 2 } },
        { text: "매달 만나는 절친한 사이", scores: { flexer: 2 } },
      ],
    },
    {
      id: "q6",
      text: "스트레스 받는 날, 나를 위로하는 방법은?",
      options: [
        { text: "돈 안 드는 산책이나 넷플릭스", scores: { saver: 2 } },
        { text: "미리 정해둔 소소한 취미 지출", scores: { planner: 2 } },
        { text: "적당한 가격의 맛있는 거 하나 사 먹기", scores: { balanced: 2 } },
        { text: "일단 결제 버튼부터 누르고 봄", scores: { flexer: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "saver",
      emoji: "🐷",
      title: "극한의 짠테크러",
      subtitle: "통장 잔고가 곧 자존감인 타입",
      description:
        "웬만한 지출은 다 계산이 끝난 상태로 움직이는 타입이에요. 남들이 부러워하는 통장 잔고를 가졌지만, 가끔은 스스로를 위한 소비도 죄책감 없이 해도 됩니다.",
      color: "#BBF7D0",
    },
    {
      id: "planner",
      emoji: "📊",
      title: "계획형 소비러",
      subtitle: "쓸 땐 쓰고 모을 땐 모으는 전략가",
      description:
        "예산을 세우고 그 안에서 최대한 만족스럽게 쓰는 타입이에요. 무작정 아끼지도, 무작정 지르지도 않는 가장 지속가능한 소비 습관을 가지고 있습니다.",
      color: "#FDE68A",
    },
    {
      id: "balanced",
      emoji: "🛍️",
      title: "적당히 지르는 밸런스형",
      subtitle: "쓰고 나서 살짝 후회하지만 또 씀",
      description:
        "필요와 욕망 사이에서 적당히 타협하며 사는 타입이에요. 가끔 카드값에 놀라긴 하지만, 그만큼 하고 싶은 걸 참지 않고 사는 삶의 만족도는 높은 편입니다.",
      color: "#FBCFE8",
    },
    {
      id: "flexer",
      emoji: "💳",
      title: "일단 지르고 보는 플렉스형",
      subtitle: "결제가 곧 스트레스 해소, 후회는 나중에",
      description:
        "사고 싶은 순간 이미 결제가 끝나있는 타입이에요. 순간의 행복은 확실하지만, 가계부 앱 하나 정도는 깔아두는 걸 추천드립니다.",
      color: "#FCA5A5",
    },
  ],
};

export default quiz;

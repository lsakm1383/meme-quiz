import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "moon-phase",
  emoji: "🌙",
  title: "나의 달 모양 테스트",
  description:
    "지금 내 에너지는 어떤 달의 모양에 가까울까? 6개 질문으로 알아보는 나의 달 페르소나.",
  accentColor: "#6366f1",
  questions: [
    {
      id: "q1",
      text: "요즘 나의 에너지 상태는?",
      options: [
        { text: "뭔가 새로 시작하고 싶어 근질근질함", scores: { "waxing-crescent": 2 } },
        { text: "하나에 꽂혀서 점점 몰입 중", scores: { "first-quarter": 2 } },
        { text: "에너지 최고조, 뭐든 할 수 있을 것 같음", scores: { "full-moon": 2 } },
        { text: "하나씩 정리하고 마무리하는 중", scores: { "last-quarter": 2 } },
        { text: "조용히 혼자 있고 싶은 시기", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q2",
      text: "주말에 어울리는 나는?",
      options: [
        { text: "즉흥적으로 새로운 곳 탐방", scores: { "waxing-crescent": 2 } },
        { text: "하던 취미 계속 발전시키기", scores: { "first-quarter": 2 } },
        { text: "사람들 만나서 에너지 발산", scores: { "full-moon": 2 } },
        { text: "방 정리, 미루던 일 처리", scores: { "last-quarter": 2 } },
        { text: "집에서 혼자 재충전", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q3",
      text: "친구가 갑자기 약속 없이 놀자고 하면?",
      options: [
        { text: "새로운 사람도 같이면 더 좋음", scores: { "waxing-crescent": 2 } },
        { text: "좋은데 컨디션 봐서", scores: { "first-quarter": 2 } },
        { text: "완전 좋아, 바로 나감", scores: { "full-moon": 2 } },
        { text: "오늘은 패스, 다음에", scores: { "last-quarter": 2 } },
        { text: "오늘은 혼자 있고 싶어서 거절", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q4",
      text: "목표를 대하는 태도는?",
      options: [
        { text: "일단 저지르고 본다", scores: { "waxing-crescent": 2 } },
        { text: "계획 세우고 차근차근", scores: { "first-quarter": 2 } },
        { text: "목표 달성 직전, 마지막 스퍼트", scores: { "full-moon": 2 } },
        { text: "목표를 다시 재정비하는 중", scores: { "last-quarter": 2 } },
        { text: "잠시 목표에서 거리 두는 중", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q5",
      text: "감정 표현 방식은?",
      options: [
        { text: "즉흥적이고 솔직하게 바로 표현", scores: { "waxing-crescent": 2 } },
        { text: "조금씩 쌓아뒀다가 표현", scores: { "first-quarter": 2 } },
        { text: "확실하고 크게 표현", scores: { "full-moon": 2 } },
        { text: "정리해서 차분하게 표현", scores: { "last-quarter": 2 } },
        { text: "잘 표현 안 하고 속으로 삭힘", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q6",
      text: "지금 나에게 필요한 한마디는?",
      options: [
        { text: '"시작이 반이다"', scores: { "waxing-crescent": 2 } },
        { text: '"꾸준함이 답이다"', scores: { "first-quarter": 2 } },
        { text: '"지금이 절정이다"', scores: { "full-moon": 2 } },
        { text: '"비워야 채워진다"', scores: { "last-quarter": 2 } },
        { text: '"잠시 쉬어가도 괜찮다"', scores: { "new-moon": 2 } },
      ],
    },
  ],
  results: [
    {
      id: "waxing-crescent",
      emoji: "🌒",
      title: "시작하는 초승달형",
      subtitle: "새로운 도전이 반가운 타입",
      description:
        "뭔가 새로 시작하는 에너지가 넘치는 타입이에요. 즉흥적이고 도전적이라, 일단 저지르고 보는 추진력이 있습니다.",
      color: "#E0E7FF",
    },
    {
      id: "first-quarter",
      emoji: "🌓",
      title: "성장하는 상현달형",
      subtitle: "꾸준히 쌓아가는 타입",
      description:
        "한번 꽂히면 꾸준히 몰입해서 발전시키는 타입이에요. 화려하진 않아도, 차근차근 쌓아가는 성실함이 무기입니다.",
      color: "#C7D2FE",
    },
    {
      id: "full-moon",
      emoji: "🌕",
      title: "폭발하는 보름달형",
      subtitle: "에너지 최고조인 타입",
      description:
        "지금이 에너지 절정인 타입이에요. 확실하게 표현하고 화끈하게 발산하는, 존재감 넘치는 타입입니다.",
      color: "#FDE68A",
    },
    {
      id: "last-quarter",
      emoji: "🌗",
      title: "정리하는 하현달형",
      subtitle: "비워내고 다듬는 타입",
      description:
        "하나씩 정리하고 재정비하는 시기를 보내는 타입이에요. 차분하게 마무리 짓는 걸 중요하게 여기는 사람입니다.",
      color: "#DDD6FE",
    },
    {
      id: "new-moon",
      emoji: "🌑",
      title: "재충전하는 그믐달형",
      subtitle: "조용히 내면에 집중하는 타입",
      description:
        "지금은 조용히 혼자 재충전하는 시기인 타입이에요. 겉으로 잘 드러내지 않아도, 다음 시작을 위해 에너지를 모으고 있습니다.",
      color: "#E5E7EB",
    },
  ],
};

export default quiz;

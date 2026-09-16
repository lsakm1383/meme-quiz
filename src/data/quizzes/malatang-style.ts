import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "malatang-style",
  emoji: "🍲",
  title: "나의 마라탕 취향 테스트",
  description:
    "토핑을 고르면서 완성하는 나만의 마라탕. 6개 질문으로 알아보는 나의 마라탕 페르소나.",
  accentColor: "#dc2626",
  questions: [
    {
      id: "q1",
      text: "마라탕 육수, 나의 선택은?",
      options: [
        { text: "안 매운 마라 육수 (고소하게)", scores: { mild: 2 } },
        { text: "얼큰한 마라 육수 (매운맛 최고 단계)", scores: { spicy: 2 } },
        { text: "육수는 아무거나, 토핑이 중요함", scores: { topping_max: 2 } },
        { text: "기본 마라 육수 (중간 맵기)", scores: { balance: 2 } },
      ],
    },
    {
      id: "q2",
      text: "고기 토핑을 고른다면?",
      options: [
        { text: "고기는 소량만, 야채 위주로", scores: { mild: 2 } },
        { text: "양고기, 마라 향 제일 진하게 배는 걸로", scores: { spicy: 2 } },
        {
          text: "고기란 고기는 다 담음 (소고기+양고기+어묵까지)",
          scores: { topping_max: 2 },
        },
        { text: "기본 소고기 슬라이스", scores: { balance: 2 } },
      ],
    },
    {
      id: "q3",
      text: "계산대에서 사장님이 '더 넣을 거 있으세요?' 물으신다",
      options: [
        { text: "괜찮아요, 이 정도면 충분해요", scores: { mild: 2 } },
        { text: "칠리기름 더 주세요!", scores: { spicy: 2 } },
        { text: "이것저것 더 담느라 시간이 걸림", scores: { topping_max: 2 } },
        { text: "딱 기본 구성이면 돼요", scores: { balance: 2 } },
      ],
    },
    {
      id: "q4",
      text: "마라탕과 함께 먹는 사이드는?",
      options: [
        { text: "순한 계란찜이나 만두", scores: { mild: 2 } },
        { text: "매운 꿔바로우 소스 추가", scores: { spicy: 2 } },
        {
          text: "꿔바로우 + 만두 + 공기밥까지 풀세트",
          scores: { topping_max: 2 },
        },
        { text: "기본 공기밥 하나", scores: { balance: 2 } },
      ],
    },
    {
      id: "q5",
      text: "친구가 '거기 마라탕 완전 맵다던데'라고 하면?",
      options: [
        { text: "그럼 순한맛으로 시켜야겠다", scores: { mild: 2 } },
        { text: "오히려 좋아, 더 매운 데 없나", scores: { spicy: 2 } },
        {
          text: "맵기보다 토핑이 얼마나 다양한지가 중요함",
          scores: { topping_max: 2 },
        },
        { text: "적당히 매우면 딱 좋음", scores: { balance: 2 } },
      ],
    },
    {
      id: "q6",
      text: "마라탕을 다 먹고 난 후 내 반응은?",
      options: [
        { text: "괜찮은데 살짝 아쉬움, 다음엔 더 순하게", scores: { mild: 2 } },
        { text: "땀 뻘뻘, 그래도 행복함", scores: { spicy: 2 } },
        { text: "배부르다... 그래도 만족스러움", scores: { topping_max: 2 } },
        { text: "딱 적당히 배부르고 만족", scores: { balance: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "mild",
      emoji: "🥛",
      title: "순한맛 소심러",
      subtitle: "매운맛보다 고소함이 우선인 타입",
      description:
        "마라탕은 매워야 한다는 편견을 깨는 타입이에요. 안 매운 마라 육수로도 충분히 마라탕의 매력을 즐길 줄 아는, 위장을 소중히 하는 현명한 선택이죠.",
      color: "#FEF3C7",
    },
    {
      id: "spicy",
      emoji: "🌶️",
      title: "얼큰파 마라덕후",
      subtitle: "매운맛 최고 단계가 기본값인 타입",
      description:
        "칠리기름은 선택이 아니라 필수, 매운맛 단계는 항상 최고로 가는 타입이에요. 땀을 뻘뻘 흘리면서도 '이 맛에 먹는다'는 표정을 짓는 진짜 마라 덕후입니다.",
      color: "#FCA5A5",
    },
    {
      id: "topping_max",
      emoji: "🧺",
      title: "토핑 풀강 부자형",
      subtitle: "일단 담고 보는, 계산은 나중에 생각하는 타입",
      description:
        "매운맛보다 토핑 가짓수가 더 중요한 타입이에요. 소고기, 양고기, 어묵, 두부까지 다 담아야 직성이 풀리고, 계산할 때 살짝 놀라긴 하지만 후회는 없습니다.",
      color: "#DDD6FE",
    },
    {
      id: "balance",
      emoji: "🥢",
      title: "클래식 밸런스형",
      subtitle: "기본 조합이 제일 맛있다고 믿는 타입",
      description:
        "굳이 특별하게 커스텀하지 않아도, 기본 구성만으로 충분히 만족하는 타입이에요. 무난한 선택이 결국 제일 실패 없다는 걸 아는, 마라탕계의 안정지향파입니다.",
      color: "#BBF7D0",
    },
  ],
};

export default quiz;

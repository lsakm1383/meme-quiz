import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "cafe-recommend",
  emoji: "☕",
  title: "카페 메뉴 추천 테스트",
  description:
    "카페 가면 뭐 마실지 항상 고민된다면? 6개 질문으로 나에게 맞는 음료 추천받기.",
  accentColor: "#78350f",
  category: "recommend",
  questions: [
    {
      id: "q1",
      text: "오늘 마시고 싶은 음료 스타일은?",
      options: [
        { text: "진하고 묵직한 커피", scores: { americano: 2 } },
        { text: "부드러운 밀크커피", scores: { latte: 2 } },
        { text: "달콤한 바닐라향 커피", scores: { "vanilla-latte": 2 } },
        { text: "커피 말고 상큼한 음료", scores: { "grapefruit-ade": 2 } },
      ],
    },
    {
      id: "q2",
      text: "지금 날씨는?",
      options: [
        { text: "더워도 추워도 아메리카노는 진리", scores: { americano: 2 } },
        { text: "더워서 얼음 가득 시원한 게 필요함", scores: { "cold-brew": 2 } },
        { text: "날씨 상관없이 달달한 거", scores: { "caramel-macchiato": 2 } },
        { text: "상큼한 과일 음료가 땡김", scores: { "grapefruit-ade": 2 } },
      ],
    },
    {
      id: "q3",
      text: "당 충전이 필요한 정도는?",
      options: [
        { text: "살짝 달달한 정도", scores: { latte: 2 } },
        { text: "디저트 수준으로 달아야 함", scores: { "caramel-macchiato": 2 } },
        { text: "단맛보다는 진한 크림 풍미", scores: { einspanner: 2 } },
        { text: "커피 말고 상큼달달한 과일맛", scores: { "grapefruit-ade": 2 } },
      ],
    },
    {
      id: "q4",
      text: "카페에서 사진을 찍는다면?",
      options: [
        { text: "심플한 잔, 미니멀 감성", scores: { americano: 2 } },
        { text: "크림이 올라간 비주얼", scores: { einspanner: 2 } },
        { text: "은은한 바닐라 크림 라떼아트", scores: { "vanilla-latte": 2 } },
        { text: "핑크핑크한 음료", scores: { "strawberry-latte": 2 } },
      ],
    },
    {
      id: "q5",
      text: "오늘 기분은?",
      options: [
        { text: "부드럽고 편안하게", scores: { latte: 2 } },
        { text: "진하고 묵직하게", scores: { "cold-brew": 2 } },
        { text: "특별하고 고급스럽게", scores: { einspanner: 2 } },
        { text: "상큼하고 발랄하게", scores: { "strawberry-latte": 2 } },
      ],
    },
    {
      id: "q6",
      text: "마지막 한 모금, 바라는 여운은?",
      options: [
        { text: "진하고 묵직한 여운", scores: { "cold-brew": 2 } },
        { text: "달콤한 여운", scores: { "caramel-macchiato": 2 } },
        { text: "고소한 바닐라 여운", scores: { "vanilla-latte": 2 } },
        { text: "상큼한 여운", scores: { "strawberry-latte": 2 } },
      ],
    },
  ],
  results: [
    {
      id: "americano",
      emoji: "☕",
      title: "깔끔한 아메리카노파",
      subtitle: "군더더기 없는 걸 좋아하는 타입",
      description:
        "화려한 맛보다 깔끔하고 담백한 걸 선호하는 타입이에요. 있는 그대로가 제일 좋다는 걸 아는 심플한 취향의 소유자입니다.",
      color: "#D6D3D1",
    },
    {
      id: "latte",
      emoji: "🥛",
      title: "부드러운 라떼파",
      subtitle: "고소하고 편안한 맛을 즐기는 타입",
      description:
        "부드럽고 고소한 우유맛에 마음이 편안해지는 타입이에요. 무난하지만 언제 마셔도 실패 없는 그 맛을 사랑합니다.",
      color: "#FEF3C7",
    },
    {
      id: "vanilla-latte",
      emoji: "🍦",
      title: "달콤한 바닐라라떼파",
      subtitle: "은은한 단맛이 필요한 타입",
      description:
        "은은하게 달콤한 맛이 하루의 기분을 살려주는 타입이에요. 과하지 않은 딱 적당한 단맛을 아는 사람입니다.",
      color: "#FDE68A",
    },
    {
      id: "einspanner",
      emoji: "🍯",
      title: "특별한 아인슈페너파",
      subtitle: "비주얼도 맛도 챙기는 타입",
      description:
        "묵직한 크림이 올라간 비주얼과 맛, 둘 다 놓치지 않는 타입이에요. 평범한 걸론 성에 안 차는 취향입니다.",
      color: "#FDBA74",
    },
    {
      id: "strawberry-latte",
      emoji: "🍓",
      title: "상큼달콤 딸기라떼파",
      subtitle: "핑크빛 무드를 즐기는 타입",
      description:
        "상큼달콤한 맛과 핑크빛 무드를 동시에 챙기는 타입이에요. 보기만 해도 기분이 좋아지는 음료를 고를 줄 아는 사람입니다.",
      color: "#FBCFE8",
    },
    {
      id: "grapefruit-ade",
      emoji: "🍊",
      title: "상큼한 자몽에이드파",
      subtitle: "탄산·상큼함이 필요한 타입",
      description:
        "톡 쏘는 탄산과 상큼함이 있어야 리프레시되는 타입이에요. 무거운 것보다 가볍고 발랄한 걸 선호합니다.",
      color: "#FED7AA",
    },
    {
      id: "cold-brew",
      emoji: "🧊",
      title: "묵직한 콜드브루파",
      subtitle: "진하고 시원한 걸 원하는 타입",
      description:
        "진하고 묵직한 커피 본연의 맛을 시원하게 즐기는 타입이에요. 은은히 오래가는 카페인이 필요할 때 딱입니다.",
      color: "#A8A29E",
    },
    {
      id: "caramel-macchiato",
      emoji: "🍮",
      title: "디저트 같은 카라멜마키아또파",
      subtitle: "당 충전이 시급한 타입",
      description:
        "커피보다 디저트에 가까운 달콤함이 필요한 타입이에요. 오늘 하루 고생한 나에게 확실한 당 충전을 선물합니다.",
      color: "#FCD34D",
    },
  ],
};

export default quiz;

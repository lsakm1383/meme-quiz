import type { DecisionTestConfig } from "@/data/decision-types";

// 실제로 메뉴를 고르는 사고 흐름을 그대로 트리로 옮겼다:
// 배부른가(물베이스/우유베이스) → 날씨는(시원하게/따뜻하게) → 잎차 말고 뭘 마실까
// → 스무디면 어떤 과일 ... 매 선택마다 다음 질문이 달라진다.
const test: DecisionTestConfig = {
  id: "cafe-recommend",
  emoji: "☕",
  title: "카페 메뉴 고르기",
  description:
    "지금 상태에 맞춰 선택지를 따라가면 나에게 맞는 음료가 나와요. 배부른 정도, 날씨, 당 충전 여부까지 실제 고민 순서 그대로.",
  accentColor: "#78350f",
  root: {
    id: "full",
    text: "지금 배가 좀 부른 편이에요?",
    options: [
      {
        text: "네, 배불러서 무거운 건 부담스러워요",
        type: "node",
        node: {
          id: "water-base",
          text: "물 베이스로 가려는데, 지금 날씨는 어때요?",
          options: [
            {
              text: "더워서 시원하게 마시고 싶어요",
              type: "node",
              node: {
                id: "cold-water-base",
                text: "잎차는 괜히 체할 것 같고… 시원하게 뭐가 좋을까요?",
                options: [
                  { text: "탄산 있는 상큼한 에이드요", type: "result", resultId: "grapefruit-ade" },
                  { text: "그래도 카페인은 필요해요, 시원한 커피요", type: "result", resultId: "cold-brew" },
                  {
                    text: "부드럽게 갈아만든 스무디요",
                    type: "node",
                    node: {
                      id: "smoothie",
                      text: "스무디도 여러 갈래인데, 어떤 과일이 좋아요?",
                      options: [
                        { text: "달콤한 열대과일, 망고요", type: "result", resultId: "mango-smoothie" },
                        { text: "새콤한 베리류, 블루베리요", type: "result", resultId: "blueberry-smoothie" },
                      ],
                    },
                  },
                ],
              },
            },
            {
              text: "쌀쌀해서 따뜻하게 마시고 싶어요",
              type: "node",
              node: {
                id: "warm-water-base",
                text: "따뜻하게 마시려는데, 뭐가 끌려요?",
                options: [
                  { text: "카페인이 필요해요, 깔끔한 커피요", type: "result", resultId: "americano" },
                  { text: "차분하게 홍차 한 잔이요", type: "result", resultId: "earl-grey" },
                  { text: "새콤달콤한 유자차요", type: "result", resultId: "yuja-tea" },
                ],
              },
            },
          ],
        },
      },
      {
        text: "아니요, 우유 들어간 것도 괜찮아요",
        type: "node",
        node: {
          id: "milk-base",
          text: "우유 들어간 음료 중에 고를 건데, 커피도 같이 들어가도 괜찮아요?",
          options: [
            { text: "커피 말고 우유 음료로만요", type: "result", resultId: "strawberry-latte" },
            {
              text: "네, 커피랑 우유 둘 다요",
              type: "node",
              node: {
                id: "milk-coffee",
                text: "단맛은 어느 정도가 좋아요?",
                options: [
                  { text: "단맛 없이 부드럽게만요", type: "result", resultId: "latte" },
                  { text: "은은하게 달콤한 바닐라요", type: "result", resultId: "vanilla-latte" },
                  { text: "확실하게 달콤한 카라멜이요", type: "result", resultId: "caramel-macchiato" },
                  { text: "단맛보다는 진한 크림과 에스프레소요", type: "result", resultId: "einspanner" },
                ],
              },
            },
          ],
        },
      },
    ],
  },
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
    {
      id: "earl-grey",
      emoji: "🍵",
      title: "은은한 얼그레이파",
      subtitle: "우아하고 향긋한 걸 즐기는 타입",
      description:
        "베르가못 향이 은은하게 퍼지는 홍차 한 잔이면 충분한 타입이에요. 화려하지 않아도 우아한 여유를 아는 사람입니다.",
      color: "#E0E7FF",
    },
    {
      id: "yuja-tea",
      emoji: "🍯",
      title: "따뜻한 유자차파",
      subtitle: "몸도 마음도 녹이는 온기를 좋아하는 타입",
      description:
        "새콤달콤한 유자향과 따뜻한 온기에 마음까지 편안해지는 타입이에요. 은은한 단맛과 향, 둘 다 놓치지 않는 선택입니다.",
      color: "#FDE68A",
    },
    {
      id: "mango-smoothie",
      emoji: "🥭",
      title: "상큼달콤 망고스무디파",
      subtitle: "건강하고 든든한 한 잔을 좋아하는 타입",
      description:
        "제철 과일을 갈아만든 진한 과일 맛에 진심인 타입이에요. 든든하면서도 건강까지 챙기는 똑똑한 선택을 할 줄 압니다.",
      color: "#FDBA74",
    },
    {
      id: "blueberry-smoothie",
      emoji: "🫐",
      title: "새콤달콤 블루베리스무디파",
      subtitle: "상큼함과 건강 둘 다 챙기는 타입",
      description:
        "새콤달콤한 베리 향과 시원한 얼음 식감을 동시에 즐기는 타입이에요. 예쁜 색감까지 챙기는 센스 있는 선택입니다.",
      color: "#C7D2FE",
    },
  ],
};

export default test;

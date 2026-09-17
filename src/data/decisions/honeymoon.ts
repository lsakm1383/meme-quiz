import type { DecisionTestConfig } from "@/data/decision-types";

// 신혼여행지를 고르는 실제 고민 순서: 휴양이냐 액티브냐 이색 경험이냐 → 각 스타일 안에서
// 예산/분위기 → (필요하면) 한 단계 더 세부 취향까지. 매 선택마다 다음 질문이 갈린다.
// 목적지 목록은 실제 한국인 신혼부부들 사이에서 SNS·후기에 자주 언급되는 인기 여행지를
// 조사해 반영했다 (몰디브·보라보라·하와이·이탈리아·아이슬란드·사파리 등).
const test: DecisionTestConfig = {
  id: "honeymoon",
  emoji: "🌴",
  title: "나의 신혼여행지 테스트",
  description:
    "선택지를 따라가면 나에게 맞는 신혼여행지가 나와요. 휴양이냐 액티비티냐, 혹은 색다른 경험이냐부터 예산과 분위기까지 실제 고민 순서 그대로.",
  accentColor: "#0d9488",
  category: "life",
  root: {
    id: "style",
    text: "신혼여행, 어떤 스타일을 원해요?",
    options: [
      {
        text: "가만히 쉬면서 힐링하고 싶어요",
        type: "node",
        node: {
          id: "relaxBudget",
          text: "예산은 어느 정도로 생각해요?",
          options: [
            {
              text: "가성비 좋게, 실속 있게 다녀오고 싶어요",
              type: "node",
              node: {
                id: "relaxBudgetLow",
                text: "이동 편의와 물가가 제일 중요해요, 그래도 풀빌라 감성은 살짝 챙기고 싶어요?",
                options: [
                  { text: "이동 편의랑 물가가 제일 중요해요", type: "result", resultId: "danang" },
                  { text: "가격 대비 풀빌라 감성도 챙기고 싶어요", type: "result", resultId: "phuket" },
                ],
              },
            },
            {
              text: "적당히 예산 잡고 감성 있게 다녀오고 싶어요",
              type: "result",
              resultId: "bali",
            },
            {
              text: "이번만큼은 화끈하게, 럭셔리 리조트로 가고 싶어요",
              type: "node",
              node: {
                id: "relaxLuxury",
                text: "완전히 세상과 단절된 프라이빗 아일랜드가 좋아요, 화산섬 절경이 좋아요, 아니면 자연까지 다양하게 즐기고 싶어요?",
                options: [
                  { text: "프라이빗 아일랜드에서 완벽하게 쉬고 싶어요", type: "result", resultId: "maldives" },
                  { text: "화산섬과 산호초 라군의 절경이 좋아요", type: "result", resultId: "bora-bora" },
                  { text: "휴양하면서 다양한 자연 경관과 미식도 함께 즐기고 싶어요", type: "result", resultId: "mauritius" },
                ],
              },
            },
          ],
        },
      },
      {
        text: "이곳저곳 구경하며 활동적으로 다니고 싶어요",
        type: "node",
        node: {
          id: "active",
          text: "어떤 분위기가 좋아요?",
          options: [
            {
              text: "유럽 감성, 로맨틱한 도시 여행이요",
              type: "node",
              node: {
                id: "europeStyle",
                text: "고대 유적과 미식에 빠지고 싶어요, 알프스 설경과 파리의 낭만이 좋아요?",
                options: [
                  { text: "유적과 미식, 예술 감성에 빠지고 싶어요", type: "result", resultId: "italy" },
                  { text: "알프스 설경과 파리의 낭만이 좋아요", type: "result", resultId: "switzerland-france" },
                ],
              },
            },
            {
              text: "이국적인 자연과 액티비티요",
              type: "node",
              node: {
                id: "nature",
                text: "따뜻한 곳이 좋아요, 시원한 곳이 좋아요?",
                options: [
                  { text: "따뜻한 곳에서 서핑도 하고 활동적으로 놀고 싶어요", type: "result", resultId: "hawaii" },
                  { text: "시원하고 청량한 대자연이 좋아요", type: "result", resultId: "newzealand" },
                ],
              },
            },
          ],
        },
      },
      {
        text: "이색적이고 특별한 경험을 해보고 싶어요",
        type: "node",
        node: {
          id: "unique",
          text: "어떤 이색 경험에 끌려요?",
          options: [
            { text: "화산·빙하·오로라 같은 신비로운 자연 현상이요", type: "result", resultId: "iceland" },
            { text: "사파리 지프 투어로 야생 동물을 직접 보고 싶어요", type: "result", resultId: "kenya" },
            { text: "아무도 잘 모르는 지중해 소도시에서 여유롭게 지내고 싶어요", type: "result", resultId: "mallorca" },
            { text: "마야 유적과 세노테, 활기찬 리조트를 한 번에 즐기고 싶어요", type: "result", resultId: "cancun" },
          ],
        },
      },
    ],
  },
  results: [
    {
      id: "danang",
      emoji: "🏖️",
      title: "다낭·나트랑",
      subtitle: "가성비 좋은 동남아 휴양",
      description:
        "가까운 거리에 합리적인 비용으로 확실하게 쉴 수 있는 타입이에요. 부담 없이 편안한 휴양을 즐기고 싶은 분께 잘 맞습니다.",
      color: "#BAE6FD",
    },
    {
      id: "phuket",
      emoji: "🍹",
      title: "푸켓·코사무이",
      subtitle: "가성비 좋은 풀빌라 휴양",
      description:
        "짧은 비행시간과 합리적인 물가로 프라이빗 풀빌라를 부담 없이 누리는 타입이에요. 조금 더 이국적인 리조트 감성을 원하는 분께 잘 맞습니다.",
      color: "#99F6E4",
    },
    {
      id: "bali",
      emoji: "🌺",
      title: "발리",
      subtitle: "가성비와 감성을 동시에 잡은 휴양",
      description:
        "우붓의 계단식 논에서 요가를 즐기고 울루와뚜 절벽에서 노을을 보는, 자연 속 감성 휴양을 즐기는 타입이에요. 비용 부담은 줄이면서 분위기는 놓치고 싶지 않은 분께 잘 맞습니다.",
      color: "#FDBA74",
    },
    {
      id: "maldives",
      emoji: "🏝️",
      title: "몰디브",
      subtitle: "한 번뿐인 럭셔리 리조트 휴양",
      description:
        "물 위의 오버워터 빌라에서 완전히 세상과 단절된 휴식을 즐기는 타입이에요. 신혼여행만큼은 확실하게 투자하고 싶은 분께 딱입니다.",
      color: "#7DD3FC",
    },
    {
      id: "bora-bora",
      emoji: "🌊",
      title: "보라보라",
      subtitle: "산호초 라군 위 전설의 신혼여행지",
      description:
        "화산섬 실루엣과 산호초 라군, 오버워터 방갈로가 만드는 압도적인 풍경 속에서 쉬는 타입이에요. 신혼여행에서만큼은 최고를 경험하고 싶은 분께 딱입니다.",
      color: "#22D3EE",
    },
    {
      id: "mauritius",
      emoji: "🌈",
      title: "모리셔스",
      subtitle: "휴양과 자연을 같이 담은 인도양의 보석",
      description:
        "에메랄드빛 해변에서 쉬다가 샤마렐의 일곱 빛깔 대지와 폭포까지 둘러보는 타입이에요. 프랑스·인도·아프리카가 섞인 다채로운 미식까지 챙기고 싶은 분께 잘 맞습니다.",
      color: "#DDD6FE",
    },
    {
      id: "italy",
      emoji: "🏛️",
      title: "이탈리아",
      subtitle: "예술과 미식이 있는 로맨틱 도시 여행",
      description:
        "고풍스러운 로마 유적과 베네치아의 곤돌라, 토스카나의 와이너리를 오가는 타입이에요. 사진도 남기고 미식도 챙기는 클래식한 감성 여행을 원하는 분께 잘 맞습니다.",
      color: "#FDE68A",
    },
    {
      id: "switzerland-france",
      emoji: "🗼",
      title: "스위스·프랑스",
      subtitle: "알프스와 파리, 고급스러운 유럽 감성",
      description:
        "알프스 만년설이 보이는 열차 여행과 파리의 낭만적인 거리를 오가는 타입이에요. 유럽 감성을 제대로, 고급스럽게 누리고 싶은 분께 잘 맞습니다.",
      color: "#C7D2FE",
    },
    {
      id: "hawaii",
      emoji: "🏄",
      title: "하와이",
      subtitle: "휴양과 액티비티를 동시에",
      description:
        "와이키키에서 서핑을 즐기고 다이아몬드 헤드에 올라 일출을 보는, 도시 인프라와 자연을 모두 누리는 타입이에요. 쉬면서도 몸을 움직이고 싶은 활동적인 분께 잘 맞습니다.",
      color: "#FDA4AF",
    },
    {
      id: "newzealand",
      emoji: "🏔️",
      title: "뉴질랜드·호주",
      subtitle: "청량한 대자연 액티비티",
      description:
        "탁 트인 대자연 속에서 청량하게 액티비티를 즐기는 타입이에요. 이국적이면서도 쾌적한 여행을 원하는 분께 잘 맞습니다.",
      color: "#BBF7D0",
    },
    {
      id: "iceland",
      emoji: "🌋",
      title: "아이슬란드",
      subtitle: "화산·빙하·오로라의 신비로운 대자연",
      description:
        "화산과 빙하, 폭포와 온천이 한 곳에 공존하는 지구상 가장 독특한 지형을 마주하는 타입이에요. 남들과는 확실히 다른 이색적인 여행을 원하는 분께 딱입니다.",
      color: "#E2E8F0",
    },
    {
      id: "kenya",
      emoji: "🦁",
      title: "케냐 사파리",
      subtitle: "사파리 지프 투어, 야생 그대로의 경험",
      description:
        "사파리 롯지에 머물며 지프 투어로 야생 동물을 직접 마주하는 타입이에요. 흔한 휴양보다 평생 잊지 못할 특별한 경험을 원하는 분께 딱입니다.",
      color: "#FCD34D",
    },
    {
      id: "mallorca",
      emoji: "⛵",
      title: "스페인 마요르카",
      subtitle: "한국인에게 아직 낯선 지중해 숨은 보석",
      description:
        "에메랄드빛 해변과 여유로운 소도시 골목을 걷는 지중해 감성 여행 타입이에요. 사람 많은 곳보다 아는 사람만 아는 여행지를 원하는 분께 잘 맞습니다.",
      color: "#FBCFE8",
    },
    {
      id: "cancun",
      emoji: "🌵",
      title: "칸쿤",
      subtitle: "마야 유적과 세노테, 활기찬 카리브해 리조트",
      description:
        "올인클루시브 리조트에서 쉬다가 치첸이트사 마야 유적과 신비로운 세노테 다이빙까지 즐기는 타입이에요. 휴양은 기본, 이색적인 액티비티와 활기찬 밤문화까지 다 놓치고 싶지 않은 분께 딱입니다.",
      color: "#FCA5A5",
    },
  ],
};

export default test;

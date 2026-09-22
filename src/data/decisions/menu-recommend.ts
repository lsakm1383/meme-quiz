import type { DecisionTestConfig } from "@/data/decision-types";

// 실제로 메뉴를 고르는 흐름 그대로: 배고픈 정도 → 국물 여부 → (국물이면) 맵기,
// (국물 없으면) 한식/분식류인지 배달/외식류인지 → 세부 메뉴. 카페 메뉴 고르기와
// 같은 분기형 템플릿.
const test: DecisionTestConfig = {
  id: "menu-recommend",
  emoji: "🍽️",
  title: "점메추/저메추",
  description:
    "지금 상태에 맞춰 선택지를 따라가면 나에게 맞는 메뉴가 나와요. 배고픈 정도, 국물 여부, 스타일까지 실제 고민 순서 그대로.",
  accentColor: "#f97316",
  root: {
    id: "hunger",
    text: "지금 배고픈 정도는 어때요?",
    options: [
      {
        text: "가볍게 먹고 싶어요",
        type: "node",
        node: {
          id: "light",
          text: "가볍게 먹으려는데, 어떤 스타일이 좋아요?",
          options: [
            { text: "속 편하게 채소 위주로요", type: "result", resultId: "salad" },
            { text: "신선하고 깔끔하게 회 종류로요", type: "result", resultId: "sushi" },
          ],
        },
      },
      {
        text: "든든하게 제대로 먹고 싶어요",
        type: "node",
        node: {
          id: "hearty",
          text: "국물이 있어야 든든한 느낌이 나요?",
          options: [
            {
              text: "네, 국물 필수예요",
              type: "node",
              node: {
                id: "soup",
                text: "국물이 얼큰해야 해요, 시원해야 해요?",
                options: [
                  { text: "얼큰하고 매콤하게요", type: "result", resultId: "kimchi-jjigae" },
                  { text: "시원하고 개운하게, 해장 느낌으로요", type: "result", resultId: "gukbap" },
                ],
              },
            },
            {
              text: "아니요, 국물 없어도 든든하면 돼요",
              type: "node",
              node: {
                id: "no-soup",
                text: "국물 없이 든든하게, 어떤 스타일이 끌려요?",
                options: [
                  { text: "매콤한 분식, 떡볶이요", type: "result", resultId: "tteokbokki" },
                  { text: "바삭한 치킨이요", type: "result", resultId: "chicken" },
                  { text: "골고루 건강하게, 비빔밥이요", type: "result", resultId: "bibimbap" },
                  { text: "푸짐한 고기, 족발이나 보쌈이요", type: "result", resultId: "jokbal-bossam" },
                  {
                    text: "간편하게 배달 시킬 거예요",
                    type: "node",
                    node: {
                      id: "delivery",
                      text: "어떤 배달 메뉴가 땡겨요?",
                      options: [
                        { text: "중국집 스타일이요", type: "result", resultId: "jjajangmyeon" },
                        { text: "패스트푸드 스타일이요", type: "result", resultId: "burger" },
                      ],
                    },
                  },
                  {
                    text: "제대로 차려서 먹을 거예요",
                    type: "node",
                    node: {
                      id: "dine",
                      text: "어떤 스타일로 제대로 먹고 싶어요?",
                      options: [
                        { text: "바삭한 튀김, 돈까스 스타일이요", type: "result", resultId: "donkatsu" },
                        { text: "크리미한 양식, 파스타 스타일이요", type: "result", resultId: "pasta" },
                      ],
                    },
                  },
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
      id: "kimchi-jjigae",
      emoji: "🍲",
      title: "든든한 얼큰파",
      subtitle: "국물 없인 못 사는 타입",
      description:
        "뜨끈하고 얼큰한 국물이 있어야 한 끼 먹은 것 같은 타입이에요. 땀 뻘뻘 흘리면서 먹고 나면 스트레스까지 풀리는 느낌이죠.",
      color: "#FCA5A5",
    },
    {
      id: "donkatsu",
      emoji: "🍖",
      title: "바삭한 든든파",
      subtitle: "바삭바삭 튀김류 최고 타입",
      description:
        "바삭한 튀김옷과 육즙 가득한 속살, 그 조합을 포기 못 하는 타입이에요. 무난하면서도 실패 없는 한 끼를 원할 때 딱입니다.",
      color: "#FDBA74",
    },
    {
      id: "sushi",
      emoji: "🍣",
      title: "깔끔한 신선파",
      subtitle: "가볍고 담백한 걸 즐기는 타입",
      description:
        "느끼하지 않고 깔끔한 맛을 선호하는 타입이에요. 가끔은 나를 위해 조금 특별한 한 끼를 고르는 여유도 있습니다.",
      color: "#F9A8D4",
    },
    {
      id: "pasta",
      emoji: "🍝",
      title: "고소한 느끼파",
      subtitle: "크리미한 소스에 진심인 타입",
      description:
        "크리미하고 고소한 소스라면 언제든 환영인 타입이에요. 자리 잡고 여유롭게 먹는 한 끼를 즐길 줄 아는 사람입니다.",
      color: "#FEF08A",
    },
    {
      id: "jjajangmyeon",
      emoji: "🍜",
      title: "든든한 배달파",
      subtitle: "고민 없이 한중식 콜하는 타입",
      description:
        "고민될 땐 역시 짜장면이 진리인 타입이에요. 익숙하고 실패 없는 그 맛이 언제 먹어도 편안합니다.",
      color: "#D6D3D1",
    },
    {
      id: "salad",
      emoji: "🥗",
      title: "가벼운 헬시파",
      subtitle: "속 편한 한 끼를 선호하는 타입",
      description:
        "속이 편하고 가벼운 한 끼를 중요하게 여기는 타입이에요. 건강도 챙기면서 만족스러운 식사를 할 줄 아는 사람입니다.",
      color: "#BBF7D0",
    },
    {
      id: "gukbap",
      emoji: "🍚",
      title: "해장 필수파",
      subtitle: "뜨끈한 국밥 한 그릇이면 되는 타입",
      description:
        "뜨끈한 국밥 한 그릇이면 웬만한 컨디션은 다 회복되는 타입이에요. 든든하고 구수한 그 맛에 진심입니다.",
      color: "#FDE68A",
    },
    {
      id: "burger",
      emoji: "🍔",
      title: "가성비 최고파",
      subtitle: "간편하고 든든한 한 끼파",
      description:
        "간편하면서도 든든하게 챙길 수 있는 한 끼를 선호하는 타입이에요. 손으로 집어먹는 그 자유로움을 즐길 줄 아는 사람입니다.",
      color: "#FED7AA",
    },
    {
      id: "tteokbokki",
      emoji: "🍢",
      title: "매콤한 떡볶이파",
      subtitle: "매콤함 없인 못 사는 타입",
      description:
        "떡볶이 없이는 하루가 아쉬운 타입이에요. 매콤달콤한 양념에 쫄깃한 떡, 그 조합이면 스트레스가 싹 풀립니다.",
      color: "#F87171",
    },
    {
      id: "chicken",
      emoji: "🍗",
      title: "바삭한 치킨파",
      subtitle: "겉바속촉 튀김에 진심인 타입",
      description:
        "바삭한 튀김옷 소리만 들어도 행복해지는 타입이에요. 혼자든 여럿이든, 치킨 앞에서는 늘 진심입니다.",
      color: "#FDE047",
    },
    {
      id: "bibimbap",
      emoji: "🍱",
      title: "골고루 비빔밥파",
      subtitle: "건강하고 균형 잡힌 한 끼를 좋아하는 타입",
      description:
        "이것저것 골고루 비벼 먹는 한 끼에 만족하는 타입이에요. 배부르면서도 속이 편한, 똑똑한 선택을 할 줄 압니다.",
      color: "#BBF7D0",
    },
    {
      id: "jokbal-bossam",
      emoji: "🐷",
      title: "푸짐한 족발보쌈파",
      subtitle: "여럿이 나눠먹는 푸짐함을 좋아하는 타입",
      description:
        "쫄깃한 고기와 푸짐한 양, 여럿이 둘러앉아 나눠 먹는 그 느낌을 사랑하는 타입이에요. 오늘 하루 고생한 나에게 주는 확실한 보상입니다.",
      color: "#FED7AA",
    },
  ],
};

export default test;

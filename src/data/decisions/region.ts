import type { DecisionTestConfig } from "@/data/decision-types";

// 지역을 고르는 실제 고민 순서: 도시냐 자연이냐 전통이냐 → 그 안에서 구체적으로 어떤
// 느낌이냐. 매 선택마다 다음 질문이 갈린다.
// 지역 목록은 각 지역의 실제 특징(수도권 인프라, 강원도 자연, 경상도 정서, 전라도
// 미식·예술, 제주 이국적 자연 등)을 분석해 구성했다.
const test: DecisionTestConfig = {
  id: "region",
  emoji: "🗺️",
  title: "나에게 어울리는 지역 테스트",
  description:
    "선택지를 따라가면 나랑 잘 맞는 지역이 나와요. 도시냐 자연이냐 전통이냐부터, 각 지역 특징을 분석해서 반영한 진짜 고민 순서 그대로.",
  accentColor: "#0284c7",
  root: {
    id: "vibe",
    text: "어떤 곳에서 지낼 때 제일 나답게 느껴져요?",
    options: [
      {
        text: "바쁘고 트렌디하게, 도시의 활기 속에서",
        type: "node",
        node: {
          id: "city",
          text: "어떤 도시 느낌이 끌려요?",
          options: [
            {
              text: "인프라 다 갖춰진 확실한 중심지가 좋아요",
              type: "node",
              node: {
                id: "capital",
                text: "출퇴근 편하고 실속 있는 신도시가 좋아요, 없는 게 없는 중심 그 자체가 좋아요?",
                options: [
                  { text: "실속 있게, 서울이랑 가까운 신도시가 좋아요", type: "result", resultId: "gyeonggi" },
                  { text: "없는 게 없는 확실한 중심지가 좋아요", type: "result", resultId: "seoul" },
                ],
              },
            },
            { text: "국제적이고 개방적인 항구·공항 도시가 좋아요", type: "result", resultId: "incheon" },
            { text: "바다와 도시, 축제 같은 활기가 넘치는 곳이 좋아요", type: "result", resultId: "busan" },
          ],
        },
      },
      {
        text: "여유롭게, 자연 속에서 힐링하면서",
        type: "node",
        node: {
          id: "nature",
          text: "어떤 자연이 더 끌려요?",
          options: [
            { text: "웅장한 산과 청정 바다가 있는 곳이요", type: "result", resultId: "gangwon" },
            { text: "이국적인 섬에서 자유롭게 지내고 싶어요", type: "result", resultId: "jeju" },
            { text: "부담 없이 편안하고, 어디서든 가까운 곳이요", type: "result", resultId: "chungcheong" },
          ],
        },
      },
      {
        text: "정 많고 사람 냄새 나는, 전통 있는 동네에서",
        type: "node",
        node: {
          id: "tradition",
          text: "어떤 매력에 더 끌려요?",
          options: [
            { text: "맛있는 음식과 예술적 감성, 느긋한 정서요", type: "result", resultId: "jeolla" },
            { text: "천년 역사와 전통이 살아있는 곳이요", type: "result", resultId: "gyeongbuk" },
            { text: "화끈하고 씩씩한 정, 뜨거운 여름이요", type: "result", resultId: "daegu" },
            { text: "바다와 산업이 공존하는 실속형 동네요", type: "result", resultId: "gyeongnam" },
          ],
        },
      },
    ],
  },
  results: [
    {
      id: "seoul",
      emoji: "🏙️",
      title: "서울",
      subtitle: "모든 게 다 있는 트렌드의 중심",
      description:
        "핫플레이스도, 맛집도, 일자리도 다 여기 있는 타입이에요. 바쁘더라도 최신 트렌드와 다양한 기회를 놓치고 싶지 않은 분께 잘 맞습니다.",
      color: "#E0E7FF",
    },
    {
      id: "gyeonggi",
      emoji: "🚉",
      title: "경기도",
      subtitle: "서울과 가깝고 실속 있는 신도시",
      description:
        "서울 접근성은 챙기면서 좀 더 여유로운 주거 환경을 원하는 타입이에요. 실속과 편리함을 동시에 잡고 싶은 분께 잘 맞습니다.",
      color: "#BFDBFE",
    },
    {
      id: "incheon",
      emoji: "✈️",
      title: "인천",
      subtitle: "국제공항과 항구가 있는 개방적인 도시",
      description:
        "언제든 훌쩍 떠날 수 있는 공항이 가깝고, 차이나타운처럼 다양한 문화가 섞인 개방적인 분위기를 즐기는 타입이에요. 국제적인 감각을 원하는 분께 잘 맞습니다.",
      color: "#A5F3FC",
    },
    {
      id: "busan",
      emoji: "🌊",
      title: "부산",
      subtitle: "바다와 도시, 축제가 있는 화끈한 곳",
      description:
        "해운대 바다를 끼고 있으면서도 도시의 활기를 다 갖춘 타입이에요. 국제영화제 같은 축제 분위기와 시원시원한 정서를 좋아하는 분께 잘 맞습니다.",
      color: "#7DD3FC",
    },
    {
      id: "gangwon",
      emoji: "⛰️",
      title: "강원도",
      subtitle: "산과 바다를 동시에 가진 청정 자연",
      description:
        "설악산 같은 웅장한 산과 동해 바다를 동시에 누리는 타입이에요. 복잡한 도시를 벗어나 맑은 공기 속에서 힐링하고 싶은 분께 딱입니다.",
      color: "#BBF7D0",
    },
    {
      id: "jeju",
      emoji: "🍊",
      title: "제주도",
      subtitle: "이국적인 자연 속 자유로운 섬 생활",
      description:
        "한라산과 오름, 에메랄드빛 바다까지 육지와는 완전히 다른 풍경 속에서 지내는 타입이에요. 자유롭고 이색적인 삶을 원하는 분께 딱입니다.",
      color: "#FED7AA",
    },
    {
      id: "chungcheong",
      emoji: "😌",
      title: "충청도",
      subtitle: "느긋하고 무난한, 대한민국의 중심",
      description:
        "\"그럴 수도 있지\" 하는 여유로운 속도로 사는 타입이에요. 전국 어디든 가깝고 부담 없이 편안한 삶을 원하는 분께 잘 맞습니다.",
      color: "#D9F99D",
    },
    {
      id: "jeolla",
      emoji: "🍚",
      title: "전라도",
      subtitle: "미식과 예술이 살아있는 정 넘치는 남도",
      description:
        "한정식 한 상 가득한 미식 문화와 느긋한 남도 정서를 즐기는 타입이에요. 사람 사는 정과 풍부한 먹거리를 놓치고 싶지 않은 분께 잘 맞습니다.",
      color: "#FBCFE8",
    },
    {
      id: "gyeongbuk",
      emoji: "🏯",
      title: "경상북도",
      subtitle: "천년 역사가 살아있는 전통의 고장",
      description:
        "경주의 고분과 안동의 고택처럼 오랜 역사와 전통이 그대로 남아있는 타입이에요. 뿌리 깊은 이야기와 차분한 분위기를 좋아하는 분께 잘 맞습니다.",
      color: "#E7E5E4",
    },
    {
      id: "daegu",
      emoji: "🔥",
      title: "대구",
      subtitle: "뜨거운 여름만큼 씩씩하고 정 많은 도시",
      description:
        "대프리카라 불릴 만큼 뜨거운 여름을 씩씩하게 나는 타입이에요. 억척스럽지만 정 많고 화끈한 분위기를 좋아하는 분께 딱입니다.",
      color: "#FCA5A5",
    },
    {
      id: "gyeongnam",
      emoji: "⚓",
      title: "경상남도",
      subtitle: "바다와 산업이 공존하는 실속형 동네",
      description:
        "남해의 아름다운 바다와 튼튼한 산업 기반이 함께 있는 타입이에요. 화려하진 않아도 실속 있고 단단한 삶을 원하는 분께 잘 맞습니다.",
      color: "#99F6E4",
    },
  ],
};

export default test;

import type { DecisionTestConfig } from "@/data/decision-types";

// 신혼여행지를 고르는 실제 고민 순서: 휴양이냐 활동적인 여행이냐 → 예산/분위기
// → (자연·액티비티라면) 따뜻한 곳이냐 시원한 곳이냐. 매 선택마다 다음 질문이 갈린다.
const test: DecisionTestConfig = {
  id: "honeymoon",
  emoji: "🌴",
  title: "나의 신혼여행지 테스트",
  description:
    "선택지를 따라가면 나에게 맞는 신혼여행지가 나와요. 휴양이냐 액티비티냐부터 예산, 분위기까지 실제 고민 순서 그대로.",
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
          id: "relax",
          text: "예산은 어느 정도로 생각해요?",
          options: [
            { text: "가성비 좋게, 가까운 곳으로요", type: "result", resultId: "danang" },
            { text: "이번만큼은 화끈하게, 럭셔리 리조트로요", type: "result", resultId: "maldives" },
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
            { text: "유럽 감성, 로맨틱한 도시 여행이요", type: "result", resultId: "europe" },
            {
              text: "이국적인 자연과 액티비티요",
              type: "node",
              node: {
                id: "nature",
                text: "따뜻한 곳이 좋아요, 시원한 곳이 좋아요?",
                options: [
                  { text: "따뜻하고 이국적인 곳이요", type: "result", resultId: "bali" },
                  { text: "시원하고 청량한 자연이요", type: "result", resultId: "newzealand" },
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
      id: "danang",
      emoji: "🏖️",
      title: "다낭·나트랑",
      subtitle: "가성비 좋은 동남아 휴양",
      description:
        "가까운 거리에 합리적인 비용으로 확실하게 쉴 수 있는 타입이에요. 부담 없이 편안한 휴양을 즐기고 싶은 분께 잘 맞습니다.",
      color: "#BAE6FD",
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
      id: "europe",
      emoji: "🗼",
      title: "유럽",
      subtitle: "로맨틱한 도시 감성 여행",
      description:
        "고풍스러운 거리와 낭만적인 풍경 속을 걸어 다니는 타입이에요. 사진도 남기고 분위기도 챙기는, 감성 여행을 원하는 분께 잘 맞습니다.",
      color: "#FDE68A",
    },
    {
      id: "bali",
      emoji: "🌺",
      title: "발리",
      subtitle: "이국적인 자연 속 액티비티",
      description:
        "따뜻한 날씨 속에서 자연과 액티비티를 동시에 즐기는 타입이에요. 휴양과 모험을 둘 다 놓치고 싶지 않은 분께 딱입니다.",
      color: "#FDBA74",
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
  ],
};

export default test;

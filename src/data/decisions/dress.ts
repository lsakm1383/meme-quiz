import type { DecisionTestConfig } from "@/data/decision-types";

// 실제 드레스 투어에서 하는 고민 순서 그대로: 웨딩홀 분위기 → 체형 커버/노출 정도
// → (모던인데 심플하면) 소매 여부까지. 매 선택마다 다음 질문이 갈린다.
// 라인 목록은 한국 웨딩업계에서 통용되는 5대 드레스 라인(A라인·벨라인·머메이드·시스라인·
// 엠파이어라인)을 기준으로 구성했다.
const test: DecisionTestConfig = {
  id: "dress",
  emoji: "👰",
  title: "나의 드레스 테스트",
  description:
    "선택지를 따라가면 나에게 어울리는 웨딩드레스 라인이 나와요. 웨딩홀 분위기부터 체형 커버, 소매 여부까지 실제 드레스 투어 고민 순서 그대로.",
  accentColor: "#db2777",
  category: "life",
  root: {
    id: "mood",
    text: "웨딩홀 분위기가 어떤 느낌이에요?",
    options: [
      {
        text: "클래식하고 우아하게",
        type: "node",
        node: {
          id: "classic",
          text: "체형 커버가 필요한 부분이 있어요?",
          options: [
            { text: "네, 허리·골반 라인을 자연스럽게 가리고 싶어요", type: "result", resultId: "a-line" },
            { text: "아니요, 볼륨감 있게 화려하게 입고 싶어요", type: "result", resultId: "ball-gown" },
          ],
        },
      },
      {
        text: "모던하고 심플하게",
        type: "node",
        node: {
          id: "modern",
          text: "노출은 어느 정도가 좋아요?",
          options: [
            { text: "과감하게, 몸매를 강조하고 싶어요", type: "result", resultId: "mermaid" },
            {
              text: "적당히, 심플하지만 세련되게",
              type: "node",
              node: {
                id: "simple",
                text: "소매가 있는 게 좋아요?",
                options: [
                  { text: "네, 은근히 가려지는 롱슬리브가 좋아요", type: "result", resultId: "long-sleeve" },
                  { text: "아니요, 어깨·팔은 시원하게 드러내고 싶어요", type: "result", resultId: "slip-dress" },
                ],
              },
            },
          ],
        },
      },
      {
        text: "편안하고 로맨틱하게",
        type: "result",
        resultId: "empire",
      },
    ],
  },
  results: [
    {
      id: "a-line",
      emoji: "👗",
      title: "A라인 드레스",
      subtitle: "누구에게나 무난하게 어울리는 클래식",
      description:
        "허리부터 자연스럽게 퍼지는 라인이 체형을 부드럽게 커버해주는 타입이에요. 실패 없는 선택을 원한다면 가장 먼저 입어볼 만한 스타일입니다.",
      color: "#FBCFE8",
    },
    {
      id: "ball-gown",
      emoji: "👸",
      title: "벨라인·프린세스 드레스",
      subtitle: "화려하고 볼륨감 있는 공주풍",
      description:
        "풍성하게 퍼지는 스커트가 존재감을 확실히 살려주는 타입이에요. 예식장을 가득 채우는 화려한 실루엣을 원하는 분께 잘 맞습니다.",
      color: "#F9A8D4",
    },
    {
      id: "mermaid",
      emoji: "🧜",
      title: "머메이드 라인 드레스",
      subtitle: "몸매를 과감하게 강조하는 스타일",
      description:
        "허리부터 무릎까지 몸에 붙다가 아래로 퍼지는 라인이 몸매를 자신 있게 드러내는 타입이에요. 자기 관리에 자신 있는 분들이 즐겨 찾습니다.",
      color: "#E9D5FF",
    },
    {
      id: "long-sleeve",
      emoji: "🤍",
      title: "롱슬리브 미니멀 드레스",
      subtitle: "은은하게 세련된 모던 스타일",
      description:
        "레이스 소매로 은근하게 팔을 가리면서도 모던한 느낌을 살리는 타입이에요. 과하지 않으면서 세련된 인상을 남기고 싶은 분께 잘 맞습니다.",
      color: "#E0E7FF",
    },
    {
      id: "slip-dress",
      emoji: "✨",
      title: "슬립 드레스",
      subtitle: "심플하고 시크한 미니멀 스타일",
      description:
        "군더더기 없는 슬림한 라인으로 어깨와 팔을 시원하게 드러내는 타입이에요. 트렌디하고 시크한 분위기를 원하는 분께 딱입니다.",
      color: "#D6D3D1",
    },
    {
      id: "empire",
      emoji: "🎀",
      title: "엠파이어 라인 드레스",
      subtitle: "다리가 길어 보이는 편안한 로맨틱 라인",
      description:
        "가슴 바로 아래에서 허리선을 묶고 그 아래로 자연스럽게 흘러내리는 타입이에요. 하체 라인은 가리면서 다리는 길어 보이게, 편안하면서도 로맨틱한 무드를 원하는 분께 잘 맞습니다.",
      color: "#FDE68A",
    },
  ],
};

export default test;

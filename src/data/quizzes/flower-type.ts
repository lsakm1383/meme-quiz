import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "flower-type",
  emoji: "🌷",
  title: "나의 꽃 유형 테스트",
  description: "나는 어떤 꽃에 가까울까? 6개 질문으로 알아보는 나의 꽃 페르소나.",
  accentColor: "#ec4899",
  questions: [
    {
      id: "q1",
      text: "친구들 사이에서 나는?",
      options: [
        { text: "분위기 메이커, 눈에 띄는 존재감", scores: { rose: 2 } },
        { text: "항상 밝은 에너지 담당", scores: { sunflower: 2 } },
        { text: "있는 듯 없는 듯한데 다들 은근히 좋아함", scores: { "cherry-blossom": 2 } },
        { text: "조용히 다 챙겨주는 편안한 존재", scores: { lavender: 2 } },
        { text: "편하고 부담 없는 친구", scores: { daisy: 2 } },
      ],
    },
    {
      id: "q2",
      text: "연애 스타일은?",
      options: [
        { text: "화끈하고 감정 표현 확실", scores: { rose: 2 } },
        { text: "밝고 적극적으로 다가감", scores: { sunflower: 2 } },
        { text: "짧고 굵게, 여운이 오래 남음", scores: { "cherry-blossom": 2 } },
        { text: "잔잔하지만 오래가는 스타일", scores: { lavender: 2 } },
        { text: "친구 같은 편안한 연애", scores: { daisy: 2 } },
      ],
    },
    {
      id: "q3",
      text: "스트레스 받을 때 나는?",
      options: [
        { text: "확실히 티 내고 바로 풀어버림", scores: { rose: 2 } },
        { text: "운동이나 활동으로 확 발산", scores: { sunflower: 2 } },
        { text: "잠깐 시무룩했다가 금방 회복", scores: { "cherry-blossom": 2 } },
        { text: "혼자 조용히 진정하는 시간을 가짐", scores: { lavender: 2 } },
        { text: "그냥 그러려니 하고 넘김", scores: { daisy: 2 } },
      ],
    },
    {
      id: "q4",
      text: "좋아하는 여행 스타일은?",
      options: [
        { text: "화려한 도시, 볼거리 많은 곳", scores: { rose: 2 } },
        { text: "액티비티 가득한 여행", scores: { sunflower: 2 } },
        { text: "짧고 강렬한 벚꽃 명소 투어", scores: { "cherry-blossom": 2 } },
        { text: "한적한 자연 속 힐링 여행", scores: { lavender: 2 } },
        { text: "계획 없이 발길 닿는 대로", scores: { daisy: 2 } },
      ],
    },
    {
      id: "q5",
      text: "SNS에 자주 올리는 사진은?",
      options: [
        { text: "존재감 확실한 셀카", scores: { rose: 2 } },
        { text: "밝고 활기찬 단체 사진", scores: { sunflower: 2 } },
        { text: "감성 가득한 순간 포착샷", scores: { "cherry-blossom": 2 } },
        { text: "잔잔한 하늘·자연 사진", scores: { lavender: 2 } },
        { text: "꾸안꾸 소소한 일상", scores: { daisy: 2 } },
      ],
    },
    {
      id: "q6",
      text: "남들이 보는 나는?",
      options: [
        { text: "화려하고 카리스마 있는 사람", scores: { rose: 2 } },
        { text: "에너지 넘치는 긍정적인 사람", scores: { sunflower: 2 } },
        { text: "트렌디하고 감성적인 사람", scores: { "cherry-blossom": 2 } },
        { text: "차분하고 안정적인 사람", scores: { lavender: 2 } },
        { text: "편하고 친근한 사람", scores: { daisy: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "rose",
      emoji: "🌹",
      title: "열정적인 장미형",
      subtitle: "존재감 확실한, 화려함의 대명사",
      description:
        "어디서든 눈에 띄는 존재감을 가진 타입이에요. 감정 표현도 확실하고, 화려하면서도 카리스마 있는 매력으로 주변을 사로잡습니다.",
      color: "#FCA5A5",
    },
    {
      id: "sunflower",
      emoji: "🌻",
      title: "밝은 해바라기형",
      subtitle: "긍정 에너지 뿜뿜, 분위기 메이커",
      description:
        "언제나 밝고 긍정적인 에너지로 주변을 환하게 만드는 타입이에요. 적극적이고 활기차서 같이 있으면 저절로 기분이 좋아지는 사람입니다.",
      color: "#FDE68A",
    },
    {
      id: "cherry-blossom",
      emoji: "🌸",
      title: "몽글몽글 벚꽃형",
      subtitle: "짧고 강렬한 임팩트, 트렌디한 감성",
      description:
        "화려하게 오래 피어있진 않아도, 잠깐 스쳐도 강렬한 인상을 남기는 타입이에요. 트렌드에 밝고 감성적인 매력이 있어 다들 은근히 좋아합니다.",
      color: "#FBCFE8",
    },
    {
      id: "lavender",
      emoji: "🪻",
      title: "차분한 라벤더형",
      subtitle: "잔잔하지만 오래가는 편안함",
      description:
        "화려하진 않아도 은은하게 오래 곁에 두고 싶은 타입이에요. 차분하고 안정적인 매력으로, 함께 있으면 마음이 편안해지는 사람입니다.",
      color: "#DDD6FE",
    },
    {
      id: "daisy",
      emoji: "🌼",
      title: "소탈한 데이지형",
      subtitle: "편안하고 부담 없는 존재",
      description:
        "꾸미지 않아도 매력 있는, 편안하고 친근한 타입이에요. 부담 없이 다가갈 수 있는 존재감으로, 은근히 없으면 허전한 사람입니다.",
      color: "#FEF9C3",
    },
  ],
};

export default quiz;

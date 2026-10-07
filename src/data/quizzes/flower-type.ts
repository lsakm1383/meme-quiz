import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "flower-type",
  emoji: "🌷",
  image: { src: "/quiz/flower-type/cover.webp", aspect: "aspect-[508/295]", wide: true },
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
      image: { src: "/quiz/flower-type/rose.webp", aspect: "aspect-[508/279]", wide: true },
      title: "열정적인 장미형",
      subtitle: "존재감 확실한, 화려함의 대명사",
      description:
        "어디서든 눈에 띄는 존재감을 가진 타입이에요. 감정 표현도 확실하고, 화려하면서도 카리스마 있는 매력으로 주변을 사로잡아요.",
      color: "#FCA5A5",
      detail: {
        more: "단톡방에서 '그래서 언제 볼 건데?' 하고 약속을 확정 짓는 건 대개 장미형이에요. 좋으면 좋다, 싫으면 싫다 분명하게 말해 주니 함께 있는 사람들이 오히려 편하게 느끼기도 해요. 사진 한 장, 옷차림 하나에도 나만의 색이 묻어나서 '역시 너답다'는 말을 자주 듣는 사람이에요.",
        strengths: ["한눈에 각인되는 존재감", "솔직하고 분명한 감정 표현", "사람들을 이끄는 카리스마"],
        cautions: [
          "강한 표현이 의도보다 세게 전달될 때가 있어요.",
          "주목받지 못하는 날엔 괜히 서운함이 커지기 쉬워요.",
          "모든 걸 멋지게 해내려다 혼자 지칠 수 있어요.",
        ],
        bestMatch: {
          id: "lavender",
          reason:
            "화려하게 빛나는 장미 곁에서 라벤더는 조용히 숨 고를 자리를 만들어 줘요. 서로의 온도를 맞춰 주는 든든한 조합이에요.",
        },
        hardMatch: {
          id: "sunflower",
          reason:
            "둘 다 에너지가 커서 같은 자리에서는 주인공 자리를 두고 은근히 신경이 쓰일 수 있어요. 해바라기의 넉넉한 긍정을 배우면 함께 빛나는 법을 알게 돼요.",
        },
        tips: ["오늘 고마웠던 사람에게 칭찬 한마디 건네기", "하고 싶은 말을 꺼내기 전에 한 박자 쉬어 보기"],
      },
    },
    {
      id: "sunflower",
      emoji: "🌻",
      image: { src: "/quiz/flower-type/sunflower.webp", aspect: "aspect-[508/279]", wide: true },
      title: "밝은 해바라기형",
      subtitle: "긍정 에너지 뿜뿜, 분위기 메이커",
      description:
        "언제나 밝고 긍정적인 에너지로 주변을 환하게 만드는 타입이에요. 적극적이고 활기차서 같이 있으면 저절로 기분이 좋아지는 사람이에요.",
      color: "#FDE68A",
      detail: {
        more: "모임에서 어색한 침묵이 흐르면 가장 먼저 말을 꺼내고, 친구가 시무룩해 보이면 '밥 먹으러 갈래?' 하고 먼저 손을 내미는 사람이에요. 해를 바라보는 해바라기처럼 늘 좋은 쪽을 먼저 찾아내서, 같이 있으면 별일 없던 하루도 즐거운 추억으로 남아요.",
        strengths: ["주변을 밝히는 긍정 에너지", "먼저 다가가는 적극성", "몸으로 부딪혀 보는 활동력"],
        cautions: [
          "힘든 티를 못 내고 혼자 꾹 참을 때가 있어요.",
          "모두를 챙기다 정작 내 시간이 줄어들기 쉬워요.",
          "조용히 있고 싶은 사람에게는 에너지가 조금 벅찰 수 있어요.",
        ],
        bestMatch: {
          id: "daisy",
          reason:
            "해바라기가 활기를 불어넣으면 데이지는 부담 없이 그 흐름에 함께해 줘요. 같이 있으면 웃음이 끊이지 않는 편안한 짝꿍이에요.",
        },
        hardMatch: {
          id: "lavender",
          reason:
            "밖에서 발산하며 충전하는 해바라기와 혼자 조용히 충전하는 라벤더는 쉬는 방식이 달라 엇갈리기 쉬워요. 라벤더에게서 차분히 쉬어 가는 법을 배우면 에너지가 더 오래가요.",
        },
        tips: ["오늘 하루 나만을 위한 30분 비워 두기", "힘들었던 일 하나를 믿는 사람에게 털어놓기"],
      },
    },
    {
      id: "cherry-blossom",
      emoji: "🌸",
      image: { src: "/quiz/flower-type/cherry-blossom.webp", aspect: "aspect-[508/280]", wide: true },
      title: "몽글몽글 벚꽃형",
      subtitle: "짧고 강렬한 임팩트, 트렌디한 감성",
      description:
        "화려하게 오래 피어있진 않아도, 잠깐 스쳐도 강렬한 인상을 남기는 타입이에요. 트렌드에 밝고 감성적인 매력이 있어 다들 은근히 좋아해요.",
      color: "#FBCFE8",
      detail: {
        more: "길을 걷다 예쁜 빛이 들면 멈춰서 사진부터 찍고, 새로 생긴 카페나 유행을 남들보다 한발 먼저 알아채는 사람이에요. 늘 앞에 나서진 않아도 무심하게 건넨 한마디나 센스 있는 선물이 오래 기억에 남아서, 친구들에게 '그때 너 덕분에'라는 말을 자주 들어요.",
        strengths: ["순간을 포착하는 감성", "한발 빠른 트렌드 감각", "오래 기억에 남는 센스"],
        cautions: [
          "기분이 금방 바뀌어 스스로도 헷갈릴 때가 있어요.",
          "관심이 빠르게 옮겨 가서 꾸준히 이어 가기가 어려울 수 있어요.",
          "속마음을 잘 말하지 않아 은근히 서운함이 쌓이기도 해요.",
        ],
        bestMatch: {
          id: "sunflower",
          reason:
            "벚꽃이 찾아낸 예쁜 순간을 해바라기가 신나게 함께 즐겨 줘요. 감성과 에너지가 만나 추억이 두 배로 늘어나는 조합이에요.",
        },
        hardMatch: {
          id: "lavender",
          reason:
            "짧고 강렬한 순간을 좋아하는 벚꽃과 잔잔하게 오래가는 걸 좋아하는 라벤더는 속도가 달라 답답할 수 있어요. 라벤더의 꾸준함을 빌리면 반짝이던 순간이 오래가는 인연으로 이어져요.",
        },
        tips: ["오늘 찍은 사진 한 장에 짧은 글 남겨 보기", "요즘 빠진 것 하나를 일주일만 꾸준히 해 보기"],
      },
    },
    {
      id: "lavender",
      emoji: "🪻",
      image: { src: "/quiz/flower-type/lavender.webp", aspect: "aspect-[508/280]", wide: true },
      title: "차분한 라벤더형",
      subtitle: "잔잔하지만 오래가는 편안함",
      description:
        "화려하진 않아도 은은하게 오래 곁에 두고 싶은 타입이에요. 차분하고 안정적인 매력으로, 함께 있으면 마음이 편안해지는 사람이에요.",
      color: "#DDD6FE",
      detail: {
        more: "약속 장소에 먼저 도착해 자리를 잡아 두고, 친구가 말하지 않아도 지친 얼굴을 먼저 알아채는 사람이에요. 큰 소리로 나서진 않지만 은은한 향처럼 곁에 오래 머물러서, 시간이 지날수록 '너랑 있으면 마음이 놓여'라는 이야기를 듣게 돼요.",
        strengths: ["흔들리지 않는 안정감", "말없이 챙기는 세심함", "오래 이어지는 한결같음"],
        cautions: [
          "내 마음보다 남의 마음을 먼저 챙기다 지칠 수 있어요.",
          "불편한 일도 괜찮다며 넘기다 속으로 쌓이기 쉬워요.",
          "새로운 변화 앞에서는 첫발이 조금 느려질 때가 있어요.",
        ],
        bestMatch: {
          id: "daisy",
          reason:
            "편안함을 아는 라벤더와 데이지는 함께 있으면 말이 없어도 어색하지 않아요. 오래 두고 볼수록 더 좋아지는 사이예요.",
        },
        hardMatch: {
          id: "cherry-blossom",
          reason:
            "늘 새로운 걸 찾는 벚꽃의 빠른 속도가 천천히 가는 라벤더에게는 조금 정신없게 느껴질 수 있어요. 벚꽃 덕분에 익숙한 일상에 새로운 설렘을 더할 수 있어요.",
        },
        tips: ["오늘 느낀 감정을 한 줄로 적어 보기", "미뤄 둔 말 하나를 솔직하게 꺼내 보기"],
      },
    },
    {
      id: "daisy",
      emoji: "🌼",
      image: { src: "/quiz/flower-type/daisy.webp", aspect: "aspect-[508/280]", wide: true },
      title: "소탈한 데이지형",
      subtitle: "편안하고 부담 없는 존재",
      description:
        "꾸미지 않아도 매력 있는, 편안하고 친근한 타입이에요. 부담 없이 다가갈 수 있는 존재감으로, 은근히 없으면 허전한 사람이에요.",
      color: "#FEF9C3",
      detail: {
        more: "갑자기 '지금 나올래?' 해도 편한 차림으로 나와 주고, 어떤 메뉴를 골라도 '좋아' 하며 웃어 주는 사람이에요. 들판 어디서나 피어나는 데이지처럼 어느 자리에서도 자연스럽게 어울려서, 하루만 안 보여도 '오늘 걔는 왜 없어?' 하고 다들 찾게 돼요.",
        strengths: ["누구와도 편하게 어울리는 친화력", "꾸밈없는 솔직함", "웬만한 일엔 흔들리지 않는 여유"],
        cautions: [
          "'아무거나 좋아'가 많아 내 취향이 묻힐 때가 있어요.",
          "그러려니 넘긴 일이 나중에 한꺼번에 몰려올 수 있어요.",
          "편하다는 이유로 내 수고가 당연하게 여겨지기도 해요.",
        ],
        bestMatch: {
          id: "sunflower",
          reason:
            "데이지의 편안함과 해바라기의 밝음이 만나면 별것 없는 하루도 즐거워져요. 부담 없이 오래 함께할 수 있는 조합이에요.",
        },
        hardMatch: {
          id: "rose",
          reason:
            "취향과 표현이 확실한 장미 앞에서 데이지는 가끔 맞춰 주기만 하는 것 같아 지칠 수 있어요. 장미에게서 내 마음을 분명하게 말하는 법을 배우면 관계가 더 단단해져요.",
        },
        tips: ["오늘 메뉴나 장소를 내가 먼저 골라 보기", "요즘 좋았던 것 하나를 친구에게 자랑해 보기"],
      },
    },
  ],
};

export default quiz;

import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "menu-recommend",
  emoji: "🍽️",
  title: "점메추/저메추",
  description:
    "점심 메뉴부터 저녁 메뉴까지, 오늘 뭐 먹을지 고민될 때 6개 질문으로 추천받기.",
  accentColor: "#f97316",
  category: "recommend",
  questions: [
    {
      id: "q1",
      text: "오늘 갑자기 확 땡기는 맛은?",
      options: [
        { text: "얼큰하고 뜨끈한 국물", scores: { "kimchi-jjigae": 2 } },
        { text: "바삭하고 육즙 가득", scores: { donkatsu: 2 } },
        { text: "신선하고 깔끔한 회", scores: { sushi: 2 } },
        { text: "크리미하고 고소한 소스", scores: { pasta: 2 } },
      ],
    },
    {
      id: "q2",
      text: "배달앱을 켰다. 첫 화면에서 고르라면?",
      options: [
        { text: "중국집 대표 메뉴", scores: { jjajangmyeon: 2 } },
        { text: "샐러드 전문점", scores: { salad: 2 } },
        { text: "국밥집", scores: { gukbap: 2 } },
        { text: "수제버거 맛집", scores: { burger: 2 } },
      ],
    },
    {
      id: "q3",
      text: "지금 내 컨디션은?",
      options: [
        { text: "어제 과음해서 해장이 시급함", scores: { gukbap: 2 } },
        { text: "다이어트 중이라 가볍게", scores: { salad: 2 } },
        { text: "기다릴 힘도 없음, 그냥 익숙한 배달", scores: { jjajangmyeon: 2 } },
        { text: "손으로 집어먹으면서 영상 보고 싶음", scores: { burger: 2 } },
      ],
    },
    {
      id: "q4",
      text: "같이 먹고 싶은 사이드 메뉴는?",
      options: [
        { text: "계란말이 & 공기밥", scores: { "kimchi-jjigae": 2 } },
        { text: "마늘빵 & 피클", scores: { pasta: 2 } },
        { text: "미소국 & 초생강", scores: { sushi: 2 } },
        { text: "양배추 샐러드 & 돈까스소스", scores: { donkatsu: 2 } },
      ],
    },
    {
      id: "q5",
      text: "오늘의 예산은?",
      options: [
        { text: "가성비가 진리", scores: { burger: 2 } },
        { text: "특별한 날, 조금 써도 됨", scores: { sushi: 2 } },
        { text: "무난한 한 끼 값", scores: { donkatsu: 2 } },
        { text: "배달비 방어가 중요함", scores: { jjajangmyeon: 2 } },
      ],
    },
    {
      id: "q6",
      text: "다 먹고 난 후 바라는 기분은?",
      options: [
        { text: "든든하게 배부르고 만족", scores: { gukbap: 2 } },
        { text: "속이 편하고 가벼움", scores: { salad: 2 } },
        { text: "입 안 가득 풍미가 남음", scores: { pasta: 2 } },
        { text: "얼큰함에 땀 흘리고 개운함", scores: { "kimchi-jjigae": 2 } },
      ],
    },
  ],
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
  ],
};

export default quiz;

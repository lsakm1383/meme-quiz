import type { TournamentConfig } from "@/data/tournament-types";

const tournament: TournamentConfig = {
  id: "ramen-worldcup",
  emoji: "🍜",
  title: "라면 취향 월드컵",
  description:
    "8개 라면 중 단 하나, 나의 최종 우승 라면은? 1:1 대결로 끝까지 골라보세요.",
  accentColor: "#0ea5e9",
  candidates: [
    {
      id: "shin",
      emoji: "🍜",
      name: "신라면",
      tagline: "국민 라면, 얼큰함의 정석",
      description:
        "매운맛과 얼큰함의 균형이 완벽한, 한국인이라면 누구나 한 번쯤 최애로 꼽아본 국민 라면이에요. 어디서든 실패 없는 선택, 그게 바로 신라면의 힘입니다.",
      color: "#FCA5A5",
    },
    {
      id: "jin",
      emoji: "🌶️",
      name: "진라면 매운맛",
      tagline: "매콤하면서도 깔끔한 국물",
      description:
        "얼큰하면서도 깔끔한 국물맛이 특징인 타입이에요. 자극적이지 않으면서 매콤한 맛을 원할 때 가장 먼저 떠오르는 선택이죠.",
      color: "#FDBA74",
    },
    {
      id: "buldak",
      emoji: "🔥",
      name: "불닭볶음면",
      tagline: "매운맛 챌린지의 시작점",
      description:
        "매운맛 그 자체를 즐기는 타입이에요. 눈물 콧물 다 빼면서도 계속 손이 가는, 매운맛 챌린지의 대명사입니다.",
      color: "#FEE2E2",
    },
    {
      id: "chapagetti",
      emoji: "🍫",
      name: "짜파게티",
      tagline: "일요일엔 내가 짜파게티 요리사",
      description:
        "일요일 점심은 무조건 짜파게티인 타입이에요. 짭짤달콤한 짜장 소스에 계란 후라이 하나면 완벽한 한 끼가 완성됩니다.",
      color: "#D6D3D1",
    },
    {
      id: "neoguri",
      emoji: "🦝",
      name: "너구리",
      tagline: "쫄깃한 면발과 시원한 국물",
      description:
        "쫄깃한 면발과 시원한 국물의 조화를 사랑하는 타입이에요. 매운맛보다는 진한 해물 국물의 깊은 맛을 아는 미식가입니다.",
      color: "#BAE6FD",
    },
    {
      id: "samyang",
      emoji: "🐑",
      name: "삼양라면",
      tagline: "옛날 감성 그 자체, 깊은 국물맛",
      description:
        "옛날 감성 그대로의 깊은 국물맛을 최고로 치는 타입이에요. 화려하지 않아도 꾸준히 사랑받는 이유가 있는, 라면의 원조 클래식입니다.",
      color: "#FDE68A",
    },
    {
      id: "yukgaejang",
      emoji: "🥣",
      name: "육개장 사발면",
      tagline: "출출할 때 진리, 편의점 필수템",
      description:
        "출출한 순간엔 역시 이것만한 게 없는 타입이에요. 편의점에서 뜨거운 물만 부으면 완성되는, 가장 빠르고 확실한 행복입니다.",
      color: "#FED7AA",
    },
    {
      id: "bibim",
      emoji: "🥗",
      name: "비빔면",
      tagline: "여름엔 역시 비빔면이지",
      description:
        "더운 날엔 뜨거운 국물보다 새콤달콤한 비빔면이 진리인 타입이에요. 시원하게 쓱쓱 비벼 먹는 그 맛을 잊을 수 없습니다.",
      color: "#FBCFE8",
    },
  ],
};

export default tournament;

import type { TournamentConfig } from "@/data/tournament-types";

const tournament: TournamentConfig = {
  id: "ramen-worldcup",
  emoji: "🍜",
  title: "라면 취향 월드컵",
  description:
    "32개 라면 중 단 하나, 나의 최종 우승 라면은? 1:1 대결로 끝까지 골라보세요.",
  accentColor: "#0ea5e9",
  image: "/tournament/ramen-worldcup/cover.webp",
  // 첫 판은 목록 순서대로 이웃한 둘이 맞붙는다 — 비슷한 계열끼리 짝지어 둔다.
  candidates: [
    {
      id: "shin",
      emoji: "🍜",
      name: "신라면",
      tagline: "얼큰한 소고기 국물의 기본",
      description:
        "농심의 매콤한 소고기 장국 맛 라면으로, 1991년부터 국내 라면 판매 1위를 지켜왔어요. 뭘 끓일지 고민될 때 손이 먼저 가는 익숙한 그 맛이에요.",
      color: "#FCA5A5",
    },
    {
      id: "jin",
      emoji: "🌶️",
      name: "진라면 매운맛",
      tagline: "빨간 봉지의 칼칼한 국물",
      description:
        "오뚜기 진라면의 빨간 봉지 버전으로, 사골과 양지 육수 베이스에 칼칼한 매운맛을 더했어요. 신라면과 늘 비교되면서 '진라면파'를 자처하는 팬도 꾸준해요.",
      color: "#FDBA74",
    },
    {
      id: "yeol",
      emoji: "🔥",
      name: "열라면",
      tagline: "이름부터 뜨거운 매운 라면",
      description:
        "오뚜기의 매운 라면으로, 진라면 매운맛보다 한층 화끈하고 칼칼한 국물이 특징이에요. 기본 맛이 담백한 편이라 치즈나 순두부를 넣어 응용하기도 좋아요.",
      color: "#FCA5A5",
    },
    {
      id: "maeptaeng",
      emoji: "🌋",
      name: "맵탱",
      tagline: "재료 향 살린 삼양 매운맛",
      description:
        "삼양식품의 매운 라면 브랜드로, 청양고추대파·마늘조개·흑후추소고기 세 가지 맛이 있어요. 맵기만 한 게 아니라 재료 향과 감칠맛을 살린 매운맛을 내세워요.",
      color: "#FCA5A5",
    },
    {
      id: "samyang",
      emoji: "🕰️",
      name: "삼양라면",
      tagline: "국내 첫 인스턴트 라면",
      description:
        "1963년 삼양식품이 내놓은 국내 최초의 인스턴트 라면으로, 햄 풍미가 살짝 도는 순한 국물이 특징이에요. 맵지 않은 옛날 라면 맛이 그리울 때 생각나는 이름이에요.",
      color: "#FDE68A",
    },
    {
      id: "anseong-tangmyun",
      emoji: "🍲",
      name: "안성탕면",
      tagline: "구수한 된장 베이스 국물",
      description:
        "농심의 된장 베이스 라면으로, 우거지와 사골 육수가 어우러진 구수하고 순한 국물이 특징이에요. 매운맛보다 구수함이 당기는 날 찾게 되는 '안성맞춤' 라면이에요.",
      color: "#FDE68A",
    },
    {
      id: "neoguri",
      emoji: "🦝",
      name: "너구리",
      tagline: "통통한 면발에 다시마 한 장",
      description:
        "농심의 굵고 통통한 면발에 해물 육수, 그리고 다시마가 들어가는 라면이에요. 얼큰한맛과 순한맛 중 고르는 재미에, 다시마를 누가 먹을지 다투는 재미까지 있어요.",
      color: "#BAE6FD",
    },
    {
      id: "omori-kimchi-jjigae",
      emoji: "🥘",
      name: "오모리김치찌개라면",
      tagline: "편의점에서 만나는 김치찌개",
      description:
        "GS25가 김치찌개 전문점 '오모리찌개'를 참고해 만든 편의점 PB 컵라면으로, 시큼하고 얼큰한 김치찌개 국물이 특징이에요. 편의점에서 밥 한 공기와 같이 집게 되는 조합이에요.",
      color: "#F87171",
    },
    {
      id: "jin-mild",
      emoji: "😊",
      name: "진라면 순한맛",
      tagline: "파란 봉지의 순한 국물",
      description:
        "오뚜기 진라면의 파란 봉지 버전으로, 사골 육수 베이스에 매운맛을 확 줄인 순한 국물이에요. 매운 걸 잘 못 먹는 사람이나 아이와 함께 먹을 때 자주 골라요.",
      color: "#FEF3C7",
    },
    {
      id: "snack-myun",
      emoji: "⏱️",
      name: "스낵면",
      tagline: "가는 면이 금방 익는 라면",
      description:
        "오뚜기의 가는 면 라면으로, 일반 라면보다 빨리 익고 맵지 않은 국물이 특징이에요. 면을 부숴 과자처럼 먹기도 하고, 출출할 때 후다닥 끓여 먹기 좋아요.",
      color: "#FEF9C3",
    },
    {
      id: "shin-black",
      emoji: "⚫",
      name: "신라면 블랙",
      tagline: "사골 육수를 더한 신라면",
      description:
        "농심이 신라면에 우골 육수 스프를 더해 내놓은 프리미엄 라인으로, 더 진하고 묵직한 국물이 특징이에요. 평소보다 한 끼를 든든하게 챙기고 싶은 날 꺼내게 돼요.",
      color: "#A8A29E",
    },
    {
      id: "sari-gomtang",
      emoji: "🥛",
      name: "사리곰탕면",
      tagline: "맵지 않은 뽀얀 사골 국물",
      description:
        "농심의 사골곰탕 맛 라면으로, 매운맛 없이 구수하고 진한 뽀얀 국물이 특징이에요. 김치 한 조각을 곁들이거나 밥을 말아 먹으면 곰탕집에 온 기분이 나요.",
      color: "#FEF3C7",
    },
    {
      id: "kkokkomyeon",
      emoji: "🐔",
      name: "꼬꼬면",
      tagline: "청양고추 넣은 하얀 닭 국물",
      description:
        "방송에서 이경규가 선보인 레시피를 팔도가 상품화한 라면으로, 닭 육수에 청양고추를 더한 하얀 국물이 특징이에요. 출시 당시 하얀 국물 라면 붐을 이끈 주인공 중 하나예요.",
      color: "#FEF9C3",
    },
    {
      id: "nagasaki-jjamppong",
      emoji: "🍥",
      name: "나가사끼짬뽕",
      tagline: "하얀 국물에 칼칼한 끝맛",
      description:
        "삼양식품의 하얀 짬뽕 라면으로, 돼지뼈 육수에 해물 맛을 더하고 청양고추로 칼칼함을 냈어요. 빨간 짬뽕과는 다른 뽀얀 국물이 당길 때 생각나는 맛이에요.",
      color: "#E0E7FF",
    },
    {
      id: "jin-jjamppong",
      emoji: "🦐",
      name: "진짬뽕",
      tagline: "굵은 면에 불맛 기름 한 스푼",
      description:
        "오뚜기의 짬뽕라면으로, 굵은 면에 해물 육수 액상스프와 불맛을 낸 유성스프가 함께 들어 있어요. 국물은 빨갛지만 맵기는 순한 편이라 국물까지 즐기기 좋아요.",
      color: "#FDBA74",
    },
    {
      id: "mat-jjamppong",
      emoji: "🦑",
      name: "맛짬뽕",
      tagline: "굵은 굴곡면에 강한 불맛",
      description:
        "농심의 짬뽕라면으로, 3mm 굵기의 굴곡면과 해물 육수에 센 불맛을 살린 게 특징이에요. 굵은 면발과 불맛 때문에 진짬뽕과 늘 나란히 비교되던 라이벌이에요.",
      color: "#FDBA74",
    },
    {
      id: "chamkke",
      emoji: "🥚",
      name: "참깨라면",
      tagline: "계란 블록에 고소한 참깨",
      description:
        "오뚜기의 매콤한 라면으로, 계란 블록과 참깨 기름 유성스프가 들어가 칼칼하면서도 고소한 맛이 나요. 유성스프는 다 끓인 뒤 마지막에 넣어야 참깨 향이 살아나요.",
      color: "#FEF3C7",
    },
    {
      id: "dosirak",
      emoji: "🍱",
      name: "도시락",
      tagline: "러시아에서도 유명한 컵라면",
      description:
        "팔도의 네모난 용기 컵라면으로, 맵지 않고 구수하고 깔끔한 국물이 특징이에요. 러시아에서는 컵라면을 '도시락'이라 부를 만큼 이름이 널리 알려져 있어요.",
      color: "#FED7AA",
    },
    {
      id: "yukgaejang",
      emoji: "🥣",
      name: "육개장 사발면",
      tagline: "가는 면이 금방 익는 사발면",
      description:
        "농심의 국사발 모양 컵라면으로, 가는 면과 얼큰하면서 달큰한 쇠고기 맛 국물이 특징이에요. 편의점에서 물만 붓고 잠깐 기다리면 되는 간편함 덕에 자주 손이 가요.",
      color: "#FED7AA",
    },
    {
      id: "wangdukgeong",
      emoji: "🍽️",
      name: "왕뚜껑",
      tagline: "넓은 뚜껑이 앞접시로 변신",
      description:
        "팔도의 큼직한 컵라면으로, 가는 면에 얼큰한 소고기 맛 국물이 특징이에요. 넓은 뚜껑에 면을 덜어 식혀 먹거나 김치를 올려 먹는 게 이 라면만의 재미예요.",
      color: "#FED7AA",
    },
    {
      id: "saeutang",
      emoji: "🦐",
      name: "새우탕 큰사발면",
      tagline: "새우 향 가득한 큰사발",
      description:
        "농심의 큰사발 컵라면으로, 새우 향이 진하게 나는 감칠맛 있는 해물 국물이 특징이에요. 새우 맛 건더기를 건져 먹는 재미 덕에 출출한 밤마다 생각나는 맛이에요.",
      color: "#FED7AA",
    },
    {
      id: "tuigim-udon",
      emoji: "🍤",
      name: "튀김우동 큰사발면",
      tagline: "바삭한 튀김 얹은 컵 우동",
      description:
        "농심의 큰사발 컵라면으로, 약간 굵은 면에 깔끔한 우동 국물과 바삭한 튀김 건더기가 들어 있어요. 튀김을 바로 먹을지 국물에 푹 적셔 먹을지로 취향이 갈려요.",
      color: "#FEF3C7",
    },
    {
      id: "odongtong",
      emoji: "🌊",
      name: "오동통면",
      tagline: "다시마 넣은 통통한 해물 라면",
      description:
        "오뚜기의 통통한 면발 라면으로, 다시마가 들어간 얼큰한 해물 국물이 특징이에요. 너구리와 자주 비교되는데, 단맛이 조금 더 돈다는 평이 있어 둘 중 고민하게 돼요.",
      color: "#FDBA74",
    },
    {
      id: "saengsaeng-udon",
      emoji: "🍜",
      name: "생생우동",
      tagline: "튀기지 않은 생면 우동",
      description:
        "농심의 우동으로, 기름에 튀기지 않은 생면에 달큰한 간장 국물이 어우러져요. 쫄깃한 면발 덕에 라면보다는 분식집 우동을 먹는 기분이 나요.",
      color: "#FEF9C3",
    },
    {
      id: "chapagetti",
      emoji: "🍳",
      name: "짜파게티",
      tagline: "일요일엔 짜파게티 요리사",
      description:
        "농심의 짜장라면으로, 물을 조금 남기고 분말스프와 올리브 조미유를 넣어 비벼 먹어요. '일요일은 내가 짜파게티 요리사'라는 광고 문구처럼 주말에 직접 끓여 먹는 재미가 있어요.",
      color: "#D6D3D1",
    },
    {
      id: "jjapaguri",
      emoji: "🤝",
      name: "짜파구리",
      tagline: "짜파게티+너구리 조합",
      description:
        "짜파게티와 너구리를 함께 끓여 짜장 소스에 얼큰한 해물 맛을 더한 조합이에요. 영화 '기생충'으로 세계에 알려졌고, 농심이 '앵그리 짜파구리 큰사발' 컵라면으로도 내놓았어요.",
      color: "#FBBF24",
    },
    {
      id: "jjawang",
      emoji: "👑",
      name: "짜왕",
      tagline: "굵은 면에 간짜장 풍미",
      description:
        "농심의 짜장라면으로, 일반 라면보다 굵은 3mm 면과 고기 맛을 살린 짜장 소스가 특징이에요. 함께 든 풍미유까지 넣으면 중국집 간짜장이 떠오른다는 평이 많아요.",
      color: "#E7E5E4",
    },
    {
      id: "jinjjajang",
      emoji: "🥢",
      name: "진짜장",
      tagline: "걸쭉한 액상 짜장 소스",
      description:
        "오뚜기의 짜장라면으로, 가루 스프 대신 걸쭉한 액상 짜장 소스를 넣어 비벼 먹어요. 짜왕과 같은 해에 나와 지금까지도 짜장라면 라이벌로 자주 비교돼요.",
      color: "#D6D3D1",
    },
    {
      id: "bibim",
      emoji: "🥒",
      name: "팔도비빔면",
      tagline: "찬물에 헹궈 비비는 새콤달콤",
      description:
        "팔도의 비빔라면으로, 삶은 면을 찬물에 헹군 뒤 매콤하고 새콤달콤한 비빔장에 비벼 먹어요. 더운 날 불 앞에 오래 서 있기 싫을 때 딱 떠오르는 메뉴예요.",
      color: "#FBCFE8",
    },
    {
      id: "baehongdong",
      emoji: "🍐",
      name: "배홍동비빔면",
      tagline: "배·홍고추·동치미 비빔장",
      description:
        "농심의 비빔면으로, 이름처럼 배와 홍고추, 동치미를 갈아 숙성한 비빔장이 특징이에요. 동치미의 시원한 새콤함 덕에 매콤해도 끝맛이 깔끔하게 남아요.",
      color: "#FBCFE8",
    },
    {
      id: "buldak",
      emoji: "🥵",
      name: "불닭볶음면",
      tagline: "해외까지 번진 매운맛 도전",
      description:
        "삼양식품의 국물 없는 매운 볶음면으로, 닭 맛을 살린 강렬한 매운 소스에 면을 비벼 먹어요. 해외 유튜버들의 '파이어 누들 챌린지'로 세계에 이름을 알렸어요.",
      color: "#FEE2E2",
    },
    {
      id: "buldak-carbo",
      emoji: "🧀",
      name: "까르보불닭볶음면",
      tagline: "크림 맛으로 순해진 불닭",
      description:
        "삼양식품 불닭볶음면에 치즈와 크림 맛 분말을 더해 까르보나라처럼 부드럽게 만든 제품이에요. 원조 불닭이 부담스러운 사람도 도전해볼 만큼 매운맛이 한결 덜해요.",
      color: "#FBCFE8",
    },
  ],
};

export default tournament;

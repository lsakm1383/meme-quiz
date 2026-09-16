import type { TournamentConfig } from "@/data/tournament-types";

const tournament: TournamentConfig = {
  id: "ramen-worldcup",
  emoji: "🍜",
  title: "라면 취향 월드컵",
  description:
    "64개 라면 중 단 하나, 나의 최종 우승 라면은? 1:1 대결로 끝까지 골라보세요.",
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
    {
      id: "yeol",
      emoji: "🔥",
      name: "열라면",
      tagline: "오뚜기의 매운맛 자존심",
      description:
        "오뚜기 라면 중 매운맛으로는 최고봉, 화끈한 국물을 찾는 사람들의 선택이에요.",
      color: "#FCA5A5",
    },
    {
      id: "gat-jjamppong",
      emoji: "🦞",
      name: "갓짬뽕",
      tagline: "얼큰함의 끝판왕 짬뽕",
      description:
        "진한 불맛과 매콤함이 살아있는 짬뽕라면으로, 국물까지 완전히 비우게 만드는 중독성이 있어요.",
      color: "#FDA4AF",
    },
    {
      id: "shin-bokkeum",
      emoji: "🍳",
      name: "신라면 볶음면",
      tagline: "신라면의 매운맛을 볶음으로",
      description:
        "국물 없이도 신라면 특유의 얼큰한 맛을 즐길 수 있는 볶음면 버전이에요.",
      color: "#FCA5A5",
    },
    {
      id: "maeptaeng",
      emoji: "🌋",
      name: "맵탱",
      tagline: "매운맛 마니아를 위한 선택",
      description:
        "이름부터 매운맛을 예고하는, 화끈한 불맛 라면을 찾는 사람들의 선택지예요.",
      color: "#FCA5A5",
    },
    {
      id: "buldak-carbo",
      emoji: "🧀",
      name: "불닭볶음면 까르보",
      tagline: "매콤함과 크리미함의 만남",
      description:
        "불닭의 매운맛에 까르보나라 소스의 부드러움을 더한, 호불호 없이 사랑받는 조합이에요.",
      color: "#FBCFE8",
    },
    {
      id: "buldak-cheese",
      emoji: "🧀",
      name: "불닭볶음면 치즈",
      tagline: "매운맛을 순화시키는 치즈의 힘",
      description:
        "매운맛이 부담스러운 사람도 치즈 덕분에 한결 편하게 즐길 수 있는 버전이에요.",
      color: "#FDE68A",
    },
    {
      id: "buldak-mala",
      emoji: "🌶️",
      name: "불닭볶음면 마라",
      tagline: "매운맛에 마라 향까지 더한 버전",
      description:
        "얼얼한 마라 향이 매운맛 위에 겹겹이 쌓이는, 매운맛 중독자를 위한 조합이에요.",
      color: "#FCA5A5",
    },
    {
      id: "buldak-curry",
      emoji: "🍛",
      name: "불닭볶음면 커리",
      tagline: "매운맛과 커리 향의 이색 조합",
      description:
        "매콤함 속에 은은한 커리 향이 감도는, 불닭 시리즈 중에서도 독특한 포지션의 맛이에요.",
      color: "#FDBA74",
    },
    {
      id: "buldak-jjajang",
      emoji: "🍫",
      name: "불닭볶음면 짜장",
      tagline: "짜장과 매운맛의 낯선 듯 익숙한 조합",
      description:
        "짜장 특유의 달콤짭짤함과 불닭의 매운맛이 의외로 잘 어울리는 조합이에요.",
      color: "#D6D3D1",
    },
    {
      id: "jin-jjamppong",
      emoji: "🦐",
      name: "진짬뽕",
      tagline: "얼큰한 국물의 정석 짬뽕라면",
      description:
        "진한 불맛과 해물 육수가 어우러진 국물이 특징으로, 한 끼 제대로 챙겨 먹은 기분을 주는 라면이에요.",
      color: "#FDBA74",
    },
    {
      id: "ojingeo-jjamppong",
      emoji: "🦑",
      name: "오징어짬뽕",
      tagline: "오징어 향 가득한 매콤한 짬뽕",
      description:
        "오징어와 해물의 감칠맛이 진하게 배어난 국물이 특징인, 짬뽕 마니아들의 스테디셀러예요.",
      color: "#FDA4AF",
    },
    {
      id: "mat-jjamppong",
      emoji: "🍤",
      name: "맛짬뽕",
      tagline: "깊고 진한 짬뽕 국물의 정수",
      description:
        "불맛과 해물 육수가 조화롭게 어우러져 깊은 국물맛을 자랑하는 라면이에요.",
      color: "#FDBA74",
    },
    {
      id: "nagasaki-jjamppong",
      emoji: "🥛",
      name: "나가사끼짬뽕",
      tagline: "일본식 하얀 짬뽕의 부드러움",
      description:
        "빨간 국물이 아닌 하얗고 진한 크림 베이스 국물로, 짬뽕에 대한 고정관념을 깨는 맛이에요.",
      color: "#E0E7FF",
    },
    {
      id: "saeutang",
      emoji: "🦐",
      name: "새우탕면",
      tagline: "새우 향이 진하게 우러난 국물",
      description:
        "새우 특유의 감칠맛과 시원한 국물이 특징인, 자극적이지 않은 해물 라면이에요.",
      color: "#FED7AA",
    },
    {
      id: "tuigim-udon",
      emoji: "🍤",
      name: "튀김우동",
      tagline: "쫄깃한 우동면과 바삭한 튀김",
      description:
        "굵은 면발과 개운한 국물에 바삭한 튀김까지 더해진, 우동 애호가들의 선택이에요.",
      color: "#FEF3C7",
    },
    {
      id: "saengsaeng-udon",
      emoji: "🍜",
      name: "생생우동",
      tagline: "생면 그대로의 쫄깃한 식감",
      description:
        "건면이 아닌 생면 타입이라 쫄깃한 면발 식감을 제대로 느낄 수 있는 우동이에요.",
      color: "#FEF9C3",
    },
    {
      id: "tuigim-deumbuk-udon",
      emoji: "🍤",
      name: "튀김듬뿍우동",
      tagline: "튀김이 듬뿍 들어간 든든한 한 그릇",
      description:
        "우동 국물에 튀김 건더기가 듬뿍 들어있어 한 끼 식사로도 든든한 라면이에요.",
      color: "#FDE68A",
    },
    {
      id: "odongtong",
      emoji: "🍜",
      name: "오동통면",
      tagline: "굵고 탱글한 면발이 매력",
      description:
        "일반 라면보다 훨씬 굵은 면발이 특징으로, 쫄깃한 식감을 좋아하는 사람들의 선택이에요.",
      color: "#FEF3C7",
    },
    {
      id: "jinjjajang",
      emoji: "🍫",
      name: "진짜장",
      tagline: "진한 짜장 소스의 깊은 맛",
      description:
        "달콤짭짤한 짜장 소스가 면에 진하게 배어드는, 짜장라면의 대표 주자예요.",
      color: "#D6D3D1",
    },
    {
      id: "jjawang",
      emoji: "👑",
      name: "짜왕",
      tagline: "굵은 면발의 프리미엄 짜장라면",
      description:
        "일반 짜장라면보다 두꺼운 면발과 진한 소스로 '짜장라면의 왕'을 자처하는 제품이에요.",
      color: "#E7E5E4",
    },
    {
      id: "sacheon-jjajang",
      emoji: "🌶️",
      name: "사천짜장",
      tagline: "매콤함이 더해진 짜장라면",
      description:
        "일반 짜장과 달리 매콤한 맛이 가미되어 있어, 짜장과 매운맛을 동시에 원하는 사람에게 잘 맞아요.",
      color: "#FDBA74",
    },
    {
      id: "jjajaroni",
      emoji: "🍫",
      name: "짜짜로니",
      tagline: "국민 짜장라면계의 스테디셀러",
      description:
        "부드럽고 달콤한 짜장 소스로 오랫동안 사랑받아온 짜장라면이에요.",
      color: "#D6D3D1",
    },
    {
      id: "jjapaguri",
      emoji: "🍫",
      name: "짜파구리",
      tagline: "짜파게티와 너구리의 전설적 조합",
      description:
        "짜파게티의 짜장 소스에 너구리의 쫄깃한 면발을 더한, 영화로도 유명해진 조합 레시피예요.",
      color: "#FBBF24",
    },
    {
      id: "baehongdong",
      emoji: "🍐",
      name: "배홍동",
      tagline: "배와 홍초가 만든 새콤달콤함",
      description:
        "배와 홍초의 새콤달콤한 맛이 특징인 비빔면으로, 더운 날 입맛을 확 돋궈주는 맛이에요.",
      color: "#FBCFE8",
    },
    {
      id: "paldo-jjolmyeon",
      emoji: "🌶️",
      name: "팔도쫄면",
      tagline: "쫄깃한 면발의 매콤 비빔면",
      description:
        "일반 비빔면보다 훨씬 쫄깃한 면발이 특징으로, 씹는 맛을 중요하게 생각하는 사람의 선택이에요.",
      color: "#FBCFE8",
    },
    {
      id: "jinjja-jjolmyeon",
      emoji: "🌶️",
      name: "진짜쫄면",
      tagline: "매콤함이 강한 정통 쫄면 스타일",
      description:
        "매콤한 양념과 쫄깃한 면발의 조합이 정통 분식집 쫄면을 떠올리게 하는 맛이에요.",
      color: "#F9A8D4",
    },
    {
      id: "jin-bibimmyeon",
      emoji: "🥗",
      name: "진비빔면",
      tagline: "새콤달콤 산뜻한 비빔면",
      description:
        "자극적이지 않으면서 산뜻한 새콤달콤함이 특징인, 비빔면 입문자에게도 좋은 선택이에요.",
      color: "#FBCFE8",
    },
    {
      id: "hamheung-bibimmyeon",
      emoji: "🍠",
      name: "함흥비빔면",
      tagline: "냉면 스타일의 쫄깃한 비빔면",
      description:
        "함흥냉면 특유의 쫄깃한 면발과 매콤달콤한 양념을 라면으로 재현한 제품이에요.",
      color: "#F9A8D4",
    },
    {
      id: "yeolmu-bibimmyeon",
      emoji: "🥬",
      name: "열무비빔면",
      tagline: "열무김치 향이 더해진 색다른 비빔면",
      description:
        "일반 비빔면에 열무김치의 알싸하고 시원한 맛을 더해 색다른 매력을 주는 제품이에요.",
      color: "#BBF7D0",
    },
    {
      id: "budae-jjigae",
      emoji: "🍖",
      name: "부대찌개면",
      tagline: "부대찌개를 그대로 라면으로",
      description:
        "햄과 소시지, 매콤한 국물까지 부대찌개의 맛을 그대로 재현한 라면이에요.",
      color: "#FDA4AF",
    },
    {
      id: "omori-kimchi-jjigae",
      emoji: "🥘",
      name: "오모리김치찌개면",
      tagline: "진한 김치찌개 국물의 얼큰함",
      description:
        "잘 익은 김치찌개를 끓인 듯한 진하고 얼큰한 국물이 특징인 라면이에요.",
      color: "#F87171",
    },
    {
      id: "kimchi-sabalmyeon",
      emoji: "🍲",
      name: "김치사발면",
      tagline: "간편하게 즐기는 김치찌개 국물",
      description:
        "컵라면으로 간편하게 즐길 수 있는 김치찌개 스타일 국물이 매력이에요.",
      color: "#F87171",
    },
    {
      id: "chamkke",
      emoji: "🥜",
      name: "참깨라면",
      tagline: "고소한 참깨 향이 매력",
      description:
        "매운맛 대신 참깨의 고소함을 앞세운, 자극적이지 않은 국물을 원할 때 좋은 선택이에요.",
      color: "#FEF3C7",
    },
    {
      id: "snack-myun",
      emoji: "🍜",
      name: "스낵면",
      tagline: "가볍게 즐기는 국민 스낵라면",
      description:
        "자극적이지 않고 깔끔한 국물맛으로 남녀노소 부담 없이 즐길 수 있는 라면이에요.",
      color: "#FEF9C3",
    },
    {
      id: "sari-gomtang",
      emoji: "🥛",
      name: "사리곰탕면",
      tagline: "뽀얀 곰탕 국물의 깊은 맛",
      description:
        "진하고 뽀얀 곰탕 국물이 특징으로, 자극적이지 않으면서도 든든한 한 끼가 되는 라면이에요.",
      color: "#FEF3C7",
    },
    {
      id: "anseong-tangmyun",
      emoji: "🍲",
      name: "안성탕면",
      tagline: "구수한 국물의 원조 강자",
      description:
        "오랜 시간 꾸준히 사랑받아온 구수하고 진한 국물맛의 클래식 라면이에요.",
      color: "#FDE68A",
    },
    {
      id: "gamja-myun",
      emoji: "🥔",
      name: "감자면",
      tagline: "쫄깃한 감자면발이 특징",
      description:
        "일반 밀가루면이 아닌 감자로 만든 면발의 독특한 식감이 매력인 라면이에요.",
      color: "#FEF3C7",
    },
    {
      id: "ottogi-ramyeon",
      emoji: "🍜",
      name: "오뚜기라면",
      tagline: "가장 기본에 충실한 클래식",
      description: "화려하지 않아도 꾸준히 사랑받는, 오뚜기의 오리지널 라면이에요.",
      color: "#FEF3C7",
    },
    {
      id: "jin-mild",
      emoji: "😊",
      name: "진라면 순한맛",
      tagline: "맵지 않아도 맛있는 국물",
      description:
        "진라면 매운맛의 순한 버전으로, 매운 음식이 부담스러운 사람들에게 인기가 많아요.",
      color: "#FEF3C7",
    },
    {
      id: "baekyang",
      emoji: "🐑",
      name: "백양라면",
      tagline: "옛날 감성 그대로의 오리지널",
      description:
        "오랜 역사를 가진 삼양의 클래식 라면으로, 깊고 구수한 국물맛이 특징이에요.",
      color: "#FDE68A",
    },
    {
      id: "wangdukgeong",
      emoji: "🥣",
      name: "왕뚜껑",
      tagline: "큼직한 컵라면의 대표주자",
      description:
        "넉넉한 양과 구수한 국물로 출출할 때 확실하게 배를 채워주는 컵라면이에요.",
      color: "#FED7AA",
    },
    {
      id: "king-dukgeong",
      emoji: "👑",
      name: "킹뚜껑",
      tagline: "왕뚜껑보다 더 큰 존재감",
      description:
        "더 큰 사이즈와 진한 국물로 한 끼 식사로도 손색없는 컵라면이에요.",
      color: "#FED7AA",
    },
    {
      id: "dosirak",
      emoji: "🍱",
      name: "도시락",
      tagline: "해외에서도 유명한 국민 컵라면",
      description:
        "작고 네모난 용기가 특징으로, 한국을 넘어 해외에서도 사랑받는 컵라면이에요.",
      color: "#FED7AA",
    },
    {
      id: "kokkokkok",
      emoji: "🥢",
      name: "콕콕콕",
      tagline: "톡톡 씹는 재미가 있는 소형 컵라면",
      description:
        "작은 사이즈지만 알찬 맛으로, 간식처럼 부담 없이 즐길 수 있는 컵라면이에요.",
      color: "#FED7AA",
    },
    {
      id: "kkokkomyeon",
      emoji: "🐔",
      name: "꼬꼬면",
      tagline: "하얀 국물 열풍을 일으킨 주인공",
      description:
        "빨간 국물이 당연했던 시절, 닭육수 기반의 하얀 국물로 라면 시장에 새 바람을 일으킨 제품이에요.",
      color: "#FEF9C3",
    },
    {
      id: "jalgalchi",
      emoji: "🐟",
      name: "자갈치",
      tagline: "해물 맛이 진하게 느껴지는 라면",
      description: "자갈치시장을 떠올리게 하는 진한 해물 육수가 특징인 라면이에요.",
      color: "#FDA4AF",
    },
    {
      id: "cham-ramyeon",
      emoji: "🍜",
      name: "참라면",
      tagline: "깔끔한 국물의 숨은 강자",
      description: "화려하진 않지만 꾸준한 팬층을 가진, 깔끔한 국물맛의 라면이에요.",
      color: "#FEF3C7",
    },
    {
      id: "mupama",
      emoji: "🧄",
      name: "무파마",
      tagline: "이름부터 궁금해지는 개성파",
      description: "독특한 이름만큼이나 자기만의 확실한 맛으로 승부하는 라면이에요.",
      color: "#FDE68A",
    },
    {
      id: "cream-carbo",
      emoji: "🧀",
      name: "크림카르보",
      tagline: "이색 크림 파스타 스타일 라면",
      description:
        "일반 라면과는 다른 크리미한 카르보나라 스타일 국물로 색다른 맛을 원하는 사람에게 인기예요.",
      color: "#FEF08A",
    },
    {
      id: "baekjongwon",
      emoji: "👨‍🍳",
      name: "백종원 라면",
      tagline: "스타 셰프가 만든 라면",
      description:
        "유명 셰프의 레시피를 담아 화제가 됐던 라면으로, 깊고 자극적이지 않은 국물이 특징이에요.",
      color: "#FDBA74",
    },
    {
      id: "ppushu-corncheese",
      emoji: "🌽",
      name: "콘치즈 뿌셔뿌셔",
      tagline: "부숴먹는 재미의 스낵라면",
      description:
        "국물 없이 부숴서 스낵처럼 먹는 재미가 있는, 콘치즈 맛의 간식 라면이에요.",
      color: "#FDE68A",
    },
    {
      id: "ppushu-spaghetti",
      emoji: "🍝",
      name: "스파게티 뿌셔뿌셔",
      tagline: "부숴먹는 스파게티맛 라면",
      description:
        "토마토 베이스의 스파게티 맛을 스낵처럼 부숴 먹는 독특한 즐거움을 주는 라면이에요.",
      color: "#FCA5A5",
    },
    {
      id: "rabokki",
      emoji: "🍢",
      name: "라볶이",
      tagline: "떡볶이 감성을 라면으로",
      description:
        "떡볶이의 매콤달콤한 양념을 라면으로 옮겨온, 분식 감성이 물씬 나는 제품이에요.",
      color: "#FCA5A5",
    },
    {
      id: "shin-black",
      emoji: "⚫",
      name: "신라면블랙",
      tagline: "진한 사골 육수의 프리미엄 버전",
      description:
        "일반 신라면보다 진한 사골 육수를 더해 한층 깊고 진한 맛을 낸 프리미엄 라인이에요.",
      color: "#A8A29E",
    },
    {
      id: "shin-guonmyeon",
      emoji: "🌿",
      name: "신라면 건면",
      tagline: "기름에 튀기지 않은 건강한 선택",
      description:
        "일반 신라면과 같은 맛이지만 튀기지 않은 면으로, 조금 더 가볍게 즐기고 싶은 사람들의 선택이에요.",
      color: "#BBF7D0",
    },
    {
      id: "sogogi-muguk",
      emoji: "🐄",
      name: "소고기무국라면",
      tagline: "시원한 소고기무국 한 그릇",
      description:
        "소고기와 무를 넣고 끓인 듯한 시원하고 깔끔한 국물이 특징인 라면이에요.",
      color: "#E7E5E4",
    },
  ],
};

export default tournament;

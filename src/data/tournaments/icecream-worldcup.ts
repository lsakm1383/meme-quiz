import type { TournamentConfig } from "@/data/tournament-types";

const tournament: TournamentConfig = {
  id: "icecream-worldcup",
  emoji: "🍦",
  title: "아이스크림 취향 월드컵",
  description: "32개 아이스크림 중 단 하나, 나의 최종 우승 아이스크림은? 1:1 대결로 끝까지 골라보세요.",
  accentColor: "#f472b6",
  image: "/tournament/icecream-worldcup/cover.webp",
  // 첫 판은 목록 순서대로 이웃한 둘이 맞붙는다 — 같은 종류(바·튜브·콘·컵·샌드·한입·통)끼리 짝지어 둔다.
  candidates: [
    {
      id: "melona",
      emoji: "🍈",
      name: "메로나",
      tagline: "쫀득하고 부드러운 멜론바",
      description:
        "은은한 멜론 맛에 쫀득하고 부드러운 식감을 살린 빙그레의 연두색 막대 아이스크림이에요. 냉동고 앞에서 한참 고민하다가도 결국 손이 가는, 익숙해서 더 반가운 맛이죠.",
      color: "#D9F99D",
    },
    {
      id: "watermelon-bar",
      emoji: "🍉",
      name: "수박바",
      tagline: "초록 껍질까지 수박 그대로",
      description:
        "빨간 과육 부분에 초코 씨앗이 박히고 끝은 초록 껍질로 마무리된, 수박 조각을 쏙 빼닮은 롯데웰푸드의 바예요. 빨간 부분과 초록 부분 맛이 달라서 어디를 마지막에 먹을지 고르는 재미가 있어요.",
      color: "#FECACA",
    },
    {
      id: "screwbar",
      emoji: "🌀",
      name: "스크류바",
      tagline: "배배 꼬인 딸기·사과 하드",
      description:
        "빨간 딸기맛과 하얀 사과맛이 나선형으로 꼬여 있는 롯데웰푸드의 셔벗 바예요. 홈을 따라 빙글빙글 돌려 먹다 보면 어릴 때 듣던 CM송이 저절로 흥얼거려져요.",
      color: "#FBCFE8",
    },
    {
      id: "jawsbar",
      emoji: "🦈",
      name: "죠스바",
      tagline: "상어 모양 오렌지·딸기바",
      description:
        "청회색 겉은 오렌지맛, 빨간 속은 딸기맛인 상어 모양의 롯데웰푸드 셔벗 바예요. 한 입 베어 물 때마다 드러나는 빨간 속살 덕분에 먹는 모습까지 은근히 재미있어요.",
      color: "#BFDBFE",
    },
    {
      id: "candybar",
      emoji: "🧊",
      name: "캔디바",
      tagline: "하늘색 소다 속 우유 아이스",
      description:
        "하늘색 소다맛 셔벗 안에 부드러운 우유 아이스크림이 들어 있는 빙그레의 원통형 하드예요. 겉의 상큼한 소다맛과 속의 우유맛이 한 입에 섞이는 순간이 이 바의 하이라이트예요.",
      color: "#BAE6FD",
    },
    {
      id: "ssangssangbar",
      emoji: "👫",
      name: "쌍쌍바",
      tagline: "반으로 쪼개 나눠 먹는 초코바",
      description:
        "막대 두 개가 나란히 붙어 있어 가운데를 쪼개 둘이 나눠 먹는 해태아이스의 초코맛 바예요. 반듯하게 갈라질지 한쪽이 크게 떨어질지, 쪼개는 순간마다 작은 승부가 펼쳐져요.",
      color: "#E7D3C1",
    },
    {
      id: "nugabar",
      emoji: "🍫",
      name: "누가바",
      tagline: "바닐라에 누가 초코 코팅",
      description:
        "부드러운 바닐라 아이스크림을 얇은 누가 초콜릿으로 감싼 해태아이스의 오래된 막대 아이스크림이에요. 고소한 초코 코팅과 담백한 속이 잘 어울려서 언제 먹어도 편안한 맛이에요.",
      color: "#F5E1C8",
    },
    {
      id: "dwaejibar",
      emoji: "🐷",
      name: "돼지바",
      tagline: "딸기 시럽 숨은 초코 크런치",
      description:
        "바닐라 아이스크림 겉에 바삭한 초코 크런치를 입히고 가운데에 딸기 시럽을 넣은 롯데웰푸드의 바예요. 옷에 떨어지는 크런치 부스러기를 털어내며 먹는 것까지가 돼지바의 맛이죠.",
      color: "#FCE7F3",
    },
    {
      id: "bibibig",
      emoji: "🫘",
      name: "비비빅",
      tagline: "팥 알갱이 씹히는 팥 하드",
      description:
        "달콤한 팥맛 아이스크림에 팥 알갱이가 콕콕 박힌 빙그레의 막대 아이스크림이에요. 할머니 댁 냉동고에서 꺼내 먹던 기억이 있다면 한 입에 그 시절이 떠오를 거예요.",
      color: "#E8D5C4",
    },
    {
      id: "bavamba",
      emoji: "🌰",
      name: "바밤바",
      tagline: "밤 조각 씹히는 고소한 밤맛",
      description:
        "고소한 밤맛 아이스크림에 잘게 부순 밤 조각이 섞여 있는 해태아이스의 막대 아이스크림이에요. 은은하게 달아서 팥보다 밤이 좋다는 사람들이 꾸준히 찾는 맛이에요.",
      color: "#F3E3C3",
    },
    {
      id: "hodu-maru",
      emoji: "🐿️",
      name: "호두마루",
      tagline: "호두 조각 오도독 씹히는 바",
      description:
        "달콤한 아이스크림에 잘게 부순 호두 조각이 섞여 있는 해태아이스 '마루' 시리즈의 막대 아이스크림이에요. 씹을 때마다 오도독 고소함이 올라와서 자꾸 다시 찾게 되는 맛이에요.",
      color: "#F1E4D3",
    },
    {
      id: "okdongja",
      emoji: "👶",
      name: "옥동자",
      tagline: "우유 아이스크림 속 초코 한 겹",
      description:
        "우유맛 아이스크림 안에 두툼한 초콜릿 층이 숨어 있는 롯데웰푸드의 막대 아이스크림이에요. 바깥 우유 부분을 먼저 먹을지 초콜릿까지 한 번에 베어 물지, 먹는 순서를 고르는 재미가 있어요.",
      color: "#EDE0D4",
    },
    {
      id: "papico",
      emoji: "🤎",
      name: "빠삐코",
      tagline: "쭉쭉 짜 먹는 초코 튜브",
      description:
        "진한 초코맛 아이스크림을 튜브에 담아 쭉쭉 짜 먹는 롯데웰푸드의 쮸쮸바예요. 손으로 살살 녹여 가며 마지막 한 방울까지 짜내는 게 빠삐코를 먹는 정석이죠.",
      color: "#E7D5C9",
    },
    {
      id: "deowisanyang",
      emoji: "☕",
      name: "더위사냥",
      tagline: "반으로 똑 쪼개는 커피맛",
      description:
        "포장째 가운데를 반으로 갈라 밀어 올려 먹는 빙그레의 커피맛 아이스크림이에요. 한쪽은 내가, 한쪽은 친구가 들고 나눠 먹던 기억이 있는 사람이 많은 추억의 간식이에요.",
      color: "#E9D8C4",
    },
    {
      id: "bbongtta",
      emoji: "🥤",
      name: "뽕따",
      tagline: "고리 당겨 뽕! 소다맛 튜브",
      description:
        "끝에 달린 고리를 툭 당겨 따 먹는 빙그레의 새파란 소다맛 쮸쮸바예요. 청량한 소다맛 덕분에 파란 간식만 보면 뽕따를 떠올리는 사람도 많아요.",
      color: "#BFE6FF",
    },
    {
      id: "tankboy",
      emoji: "🍐",
      name: "탱크보이",
      tagline: "배 과즙 담은 시원한 배맛",
      description:
        "배 과즙을 넣어 시원하고 달콤한 배맛을 살린 해태아이스의 쮸쮸바예요. 꽁꽁 언 배 주스를 짜 먹는 느낌이라 목이 마를 때 특히 생각나는 맛이에요.",
      color: "#FEF9C3",
    },
    {
      id: "polarpop",
      emoji: "🍇",
      name: "폴라포",
      tagline: "얼음 알갱이 씹히는 포도맛",
      description:
        "포도 주스에 얼음 알갱이가 섞인 해태아이스의 펜슬형 빙과로, 아래에서 밀어 올려 먹어요. 살짝 녹아도 슬러시처럼 맛있어서 천천히 아껴 먹어도 괜찮은 게 매력이에요.",
      color: "#E9D5FF",
    },
    {
      id: "sulreim",
      emoji: "🥛",
      name: "설레임",
      tagline: "조물조물 녹여 먹는 밀크쉐이크",
      description:
        "밀크쉐이크맛 아이스크림을 뚜껑 달린 파우치에 담은 롯데웰푸드의 빙과예요. 손으로 조물조물 주물러 살짝 녹인 뒤 쭉 빨아 먹으면 진짜 쉐이크처럼 부드러워져요.",
      color: "#E0F2FE",
    },
    {
      id: "worldcone",
      emoji: "🌍",
      name: "월드콘",
      tagline: "콘 끝 초콜릿까지 알찬 콘",
      description:
        "바닐라 아이스크림 위에 초코 토핑을 올리고 콘 끝에도 초콜릿을 숨겨 둔 롯데웰푸드의 콘이에요. 마지막 한 입에 남은 초콜릿 덕분에 끝까지 기대하며 먹게 되죠.",
      color: "#DBEAFE",
    },
    {
      id: "bravocone",
      emoji: "🍦",
      name: "부라보콘",
      tagline: "CM송까지 익숙한 장수 콘",
      description:
        "바닐라 아이스크림에 초콜릿과 땅콩을 더한 해태아이스의 콘으로, 오랫동안 꾸준히 사랑받아 온 제품이에요. 오래된 CM송 한 소절만 들어도 따라 부르게 되는 친근한 콘이죠.",
      color: "#FEE2E2",
    },
    {
      id: "gugucone",
      emoji: "🥜",
      name: "구구콘",
      tagline: "땅콩·캐러멜 듬뿍 달콤 콘",
      description:
        "아이스크림 위에 땅콩과 캐러멜 시럽을 듬뿍 올린 롯데웰푸드의 콘이에요. 단맛이 진한 편이라 달달한 게 확 당기는 날 유독 생각나는 콘이죠.",
      color: "#FDE68A",
    },
    {
      id: "ppangbbare",
      emoji: "🎺",
      name: "빵빠레",
      tagline: "소프트콘처럼 돌돌 말린 바닐라",
      description:
        "소프트아이스크림처럼 돌돌 말아 올린 바닐라 아이스크림을 플라스틱 케이스에 담은 롯데웰푸드의 콘이에요. 뚜껑을 열자마자 보이는 소용돌이 모양에 기분까지 좋아져요.",
      color: "#FFF7D6",
    },
    {
      id: "yomamttae",
      emoji: "🥄",
      name: "요맘때",
      tagline: "새콤달콤 떠먹는 요거트",
      description:
        "얼린 요거트를 떠먹는 빙그레의 프로즌 요거트로, 컵 말고도 여러 모양과 맛으로 나와요. 새콤한 뒷맛이 깔끔해서 기름진 음식을 먹은 뒤에 특히 생각나요.",
      color: "#FDE2EC",
    },
    {
      id: "double-bianco",
      emoji: "🍧",
      name: "더블비얀코",
      tagline: "아이스크림과 셔벗을 한 컵에",
      description:
        "부드러운 아이스크림과 상큼한 셔벗을 한 컵에 함께 담은 롯데웰푸드의 컵 아이스크림이에요. 두 가지 맛을 번갈아 떠먹다 보면 어느새 바닥까지 숟가락이 내려가 있어요.",
      color: "#FFE4E6",
    },
    {
      id: "boongeo-ssamanco",
      emoji: "🐟",
      name: "붕어싸만코",
      tagline: "붕어 과자 속 팥과 바닐라",
      description:
        "붕어빵 모양 바삭한 과자 안에 바닐라 아이스크림과 팥을 채운 빙그레의 모나카 아이스크림이에요. 머리부터 먹을지 꼬리부터 먹을지 고민하게 되는 것까지 붕어빵과 똑 닮았어요.",
      color: "#FDE8C8",
    },
    {
      id: "ppangttoa",
      emoji: "🍞",
      name: "빵또아",
      tagline: "부드러운 빵 사이 아이스크림",
      description:
        "부드러운 빵 두 장 사이에 아이스크림을 두툼하게 끼운 빙그레의 샌드 아이스크림이에요. 빵과 아이스크림을 한 번에 먹는 느낌이라 간식으로도 든든해요.",
      color: "#FEF0C7",
    },
    {
      id: "tico",
      emoji: "🎁",
      name: "티코",
      tagline: "한입에 쏙, 초코 입은 바닐라",
      description:
        "작은 바닐라 아이스크림에 초콜릿을 입혀 하나씩 낱개 포장한 롯데웰푸드의 한입 아이스크림이에요. 한 상자 열어 두고 여럿이 하나씩 집어 먹기 좋아서 모임 간식으로 제격이에요.",
      color: "#EADBC8",
    },
    {
      id: "excellent",
      emoji: "✨",
      name: "엑설런트",
      tagline: "진한 우유맛 네모 한입",
      description:
        "우유 맛이 진한 아이스크림을 네모나게 만들어 낱개로 포장한 빙그레의 한입 아이스크림이에요. 한 개씩 꺼내 먹기 좋아서 냉동실에 두고 조금씩 아껴 먹는 사람이 많아요.",
      color: "#FFF3B0",
    },
    {
      id: "haagen-dazs",
      emoji: "🍨",
      name: "하겐다즈",
      tagline: "진하고 꾸덕한 프리미엄 파인트",
      description:
        "바닐라를 비롯해 딸기·녹차 등 진한 맛으로 이름난 프리미엄 아이스크림으로, 편의점에서 파인트와 미니컵으로 만날 수 있어요. 숟가락으로 천천히 떠먹다 보면 작은 사치를 누리는 기분이 들어요.",
      color: "#F3E8FF",
    },
    {
      id: "naturu",
      emoji: "🍵",
      name: "나뚜루",
      tagline: "녹차맛으로 이름난 프리미엄",
      description:
        "쌉싸름하고 진한 녹차맛이 대표 메뉴인 롯데웰푸드의 프리미엄 아이스크림 브랜드예요. 편의점과 마트에서 파인트로 만날 수 있어 녹차 아이스크림이 당길 때 반가운 선택이에요.",
      color: "#D1FAE5",
    },
    {
      id: "together",
      emoji: "🤝",
      name: "투게더",
      tagline: "온 가족이 함께 퍼먹는 바닐라",
      description:
        "부드러운 바닐라 아이스크림을 큰 통에 담은 빙그레의 홈 아이스크림이에요. 이름처럼 식구들이 둘러앉아 숟가락으로 함께 퍼먹던 장면이 저절로 떠오르는 맛이죠.",
      color: "#FDF2D8",
    },
    {
      id: "baskin-pint",
      emoji: "🌈",
      name: "배스킨라빈스 파인트",
      tagline: "매달 새 맛, 골라 담는 파인트",
      description:
        "배스킨라빈스 매장에서 원하는 맛을 골라 담는 파인트로, 매달 '이달의 맛' 신제품이 나와요. 어떤 조합으로 담을지 고민하는 시간까지 즐거운 통 아이스크림이에요.",
      color: "#FBD5E5",
    },
  ],
};

export default tournament;

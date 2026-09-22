import type { MbtiTypeProfile } from "@/data/mbti-types";

// 16가지 유형 프로필 — "맛 시리즈". code(내부 선호지표 코드)는 궁합 계산에만 쓰고
// 화면에는 절대 노출하지 않는다. 사용자에게 보이는 건 전부 새로 창작한 맛 테마
// 이름·설명이다 (실제 MBTI® 검사의 공식 유형명·코드 체계를 그대로 노출하지 않기 위함).
const profiles: MbtiTypeProfile[] = [
  {
    code: "ISTJ",
    slug: "original",
    emoji: "🍘",
    title: "오리지널맛",
    subtitle: "한번 정하면 끝까지 가는 기본기 최강 맛",
    description:
      "화려하진 않아도 언제 먹어도 실패 없는 그 맛이에요. 맡은 일은 끝까지 책임지고, 세부적인 것 하나까지 놓치지 않는 편이에요.",
    strengths: ["책임감이 강하다", "꼼꼼하고 신뢰할 수 있다", "한번 시작한 일은 끝까지 해낸다"],
    growthAreas: ["가끔은 계획에 없던 변화도 열어두기", "다른 사람의 감정을 조금 더 살피기"],
    color: "#F5F0E8",
  },
  {
    code: "ISTP",
    slug: "neutral",
    emoji: "💧",
    title: "무맛",
    subtitle: "쿨하게, 있는 듯 없는 듯한 존재감",
    description:
      "튀지 않아도 묘하게 자꾸 손이 가는 맛이에요. 감정 소모 없이 담담하게 상황을 판단하고, 필요할 때 순간적인 임기응변을 잘 발휘해요.",
    strengths: ["침착하고 논리적이다", "손재주와 실전 감각이 좋다", "위기 상황에서 빛을 발한다"],
    growthAreas: ["감정 표현을 조금 더 자주 해보기", "장기적인 계획도 세워보기"],
    color: "#E0F2FE",
  },
  {
    code: "ISFJ",
    slug: "milk",
    emoji: "🥛",
    title: "우유맛",
    subtitle: "부드럽고 편안하게 감싸주는 맛",
    description:
      "자극적이지 않아도 계속 생각나는 편안한 맛이에요. 주변 사람들을 조용히 살뜰하게 챙기고, 누구보다 성실하게 자기 역할을 해내요.",
    strengths: ["배려심이 깊다", "성실하고 헌신적이다", "안정적인 분위기를 만든다"],
    growthAreas: ["가끔은 내 욕구도 먼저 말해보기", "필요할 땐 거절도 해보기"],
    color: "#FEFCE8",
  },
  {
    code: "ISFP",
    slug: "peach",
    emoji: "🍑",
    title: "복숭아맛",
    subtitle: "말랑말랑 부드럽고 은은하게 끌리는 맛",
    description:
      "은은한 향으로 조용히 취향을 저격하는 맛이에요. 남들 눈치보다 내 감성과 취향을 따라가면서도, 가까운 사람에게는 따뜻하게 곁을 내줘요.",
    strengths: ["온화하고 겸손하다", "감성이 풍부하다", "타인을 있는 그대로 받아들인다"],
    growthAreas: ["의견을 조금 더 적극적으로 표현하기", "갈등을 피하지만 말고 마주하기"],
    color: "#FFD9CC",
  },
  {
    code: "INTJ",
    slug: "earlgrey",
    emoji: "🫖",
    title: "얼그레이맛",
    subtitle: "은은하지만 취향 확실한, 깊이 있는 맛",
    description:
      "누구나 좋아하는 맛은 아니지만 한번 빠지면 계속 찾게 되는 맛이에요. 장기적인 비전을 세우고 그걸 실현할 전략을 짜는 걸 좋아해요.",
    strengths: ["비전 제시를 잘한다", "논리적이고 독립적이다", "효율을 추구한다"],
    growthAreas: ["과정에서 다른 사람 의견도 들어보기", "완벽하지 않아도 일단 시작해보기"],
    color: "#E0D9F5",
  },
  {
    code: "INTP",
    slug: "mint",
    emoji: "🌿",
    title: "민트맛",
    subtitle: "톡 쏘고 시원하게, 머릿속을 맑게 하는 맛",
    description:
      "호불호는 갈려도 한번 맛보면 계속 궁금해지는 맛이에요. 새로운 개념이나 원리를 파고드는 걸 즐기고, 지적 호기심이 생기면 시간 가는 줄 몰라요.",
    strengths: ["분석력이 뛰어나다", "독창적인 아이디어를 낸다", "객관적으로 판단한다"],
    growthAreas: ["생각을 행동으로 옮기는 연습하기", "감정적인 교류도 신경 써보기"],
    color: "#D1FAE5",
  },
  {
    code: "INFJ",
    slug: "darkchoco",
    emoji: "🍫",
    title: "다크초콜릿맛",
    subtitle: "깊고 진한, 알면 알수록 빠져드는 맛",
    description:
      "겉은 씁쓸해 보여도 속은 누구보다 진심인 맛이에요. 사람과 상황의 이면을 잘 읽고, 조용하지만 확고한 가치관을 가지고 있어요.",
    strengths: ["통찰력이 뛰어나다", "공감 능력이 좋다", "신념이 확고하다"],
    growthAreas: ["완벽주의를 조금 내려놓기", "혼자 짊어지지 말고 도움 요청하기"],
    color: "#E8D5C4",
  },
  {
    code: "INFP",
    slug: "lavender",
    emoji: "💜",
    title: "라벤더맛",
    subtitle: "은은하고 몽환적인, 세상에 하나뿐인 맛",
    description:
      "흔하지 않아서 더 특별하게 느껴지는 맛이에요. 자기만의 가치관과 이상을 소중히 여기고, 진심이 담긴 관계를 추구해요.",
    strengths: ["따뜻하고 진솔하다", "가치관이 확고하다", "창의적인 상상력이 있다"],
    growthAreas: ["현실적인 계획도 함께 세우기", "비판을 너무 개인적으로 받아들이지 않기"],
    color: "#E9D5FF",
  },
  {
    code: "ESTJ",
    slug: "mayo",
    emoji: "🌶️",
    title: "청양마요맛",
    subtitle: "화끈하고 직진하는, 확실한 존재감의 맛",
    description:
      "한입 먹으면 바로 존재감이 느껴지는 맛이에요. 체계적으로 계획을 세우고 강한 추진력으로 밀고 나가요.",
    strengths: ["추진력이 강하다", "체계적이고 현실적이다", "책임감이 강하다"],
    growthAreas: ["다른 사람 의견도 유연하게 받아들이기", "결과만큼 과정의 감정도 살피기"],
    color: "#FEF3C7",
  },
  {
    code: "ESTP",
    slug: "fire",
    emoji: "🔥",
    title: "불맛",
    subtitle: "일단 지르고 보는, 화끈하고 짜릿한 맛",
    description:
      "고민할 시간에 이미 한입 베어 문 사람들의 맛이에요. 지금 이 순간을 즐기고, 위기 상황에서도 당황하지 않고 순발력 있게 대처해요.",
    strengths: ["순발력이 뛰어나다", "현실 감각이 좋다", "적응력이 빠르다"],
    growthAreas: ["장기적인 결과도 한번 생각해보기", "계획을 세우는 습관 들여보기"],
    color: "#FCA5A5",
  },
  {
    code: "ESFJ",
    slug: "honeybutter",
    emoji: "🍯",
    title: "허니버터맛",
    subtitle: "누구나 좋아하는 부드럽고 다정한 맛",
    description:
      "모두의 최애가 될 수밖에 없는 맛이에요. 사람들과 어울리는 걸 좋아하고, 주변 분위기를 살뜰히 챙기는 다정한 성격이에요.",
    strengths: ["사교성이 좋다", "배려심이 많다", "협조적이다"],
    growthAreas: ["남 눈치보다 내 의견 먼저 챙기기", "거절해도 괜찮다는 걸 기억하기"],
    color: "#FDE68A",
  },
  {
    code: "ESFP",
    slug: "strawberry",
    emoji: "🍓",
    title: "딸기맛",
    subtitle: "상큼하고 발랄하게 분위기를 살리는 맛",
    description:
      "존재만으로 분위기가 화사해지는 맛이에요. 지금 이 순간을 즐기고, 사람들과 함께 있을 때 에너지가 솟아요.",
    strengths: ["긍정적이고 활발하다", "친화력이 좋다", "현재를 즐길 줄 안다"],
    growthAreas: ["계획을 세우는 연습해보기", "가끔은 진지한 대화도 나눠보기"],
    color: "#FDA4AF",
  },
  {
    code: "ENTJ",
    slug: "blackcoffee",
    emoji: "☕",
    title: "블랙커피맛",
    subtitle: "쓰지만 강렬한, 카리스마 넘치는 맛",
    description:
      "부드럽게 타협하지 않는 확고한 맛이에요. 명확한 목표를 세우고 사람들을 이끌어 그걸 이뤄내는 타입이에요.",
    strengths: ["리더십이 강하다", "결단력이 있다", "장기적인 비전이 있다"],
    growthAreas: ["팀원들의 속도도 함께 고려하기", "때로는 감정적인 배려도 필요하다는 것 기억하기"],
    color: "#D6D3D1",
  },
  {
    code: "ENTP",
    slug: "cider",
    emoji: "🥤",
    title: "사이다맛",
    subtitle: "톡 쏘고 예측불가한, 짜릿한 반전의 맛",
    description:
      "언제 어떻게 톡 쏠지 모르는 매력적인 맛이에요. 새로운 아이디어와 가능성에 늘 눈이 반짝이고, 토론을 즐기는 편이에요.",
    strengths: ["창의력이 뛰어나다", "언변이 뛰어나다", "새로운 도전을 즐긴다"],
    growthAreas: ["시작한 일을 끝까지 마무리하기", "세부 사항도 놓치지 않기"],
    color: "#BAE6FD",
  },
  {
    code: "ENFJ",
    slug: "caramel",
    emoji: "🍮",
    title: "카라멜맛",
    subtitle: "따뜻하고 달콤하게 이끌어주는 맛",
    description:
      "곁에 있으면 은근히 든든해지는 맛이에요. 사람들의 잠재력을 알아보고 이끌어주는 걸 좋아하고, 자연스럽게 사람들을 모아요.",
    strengths: ["공감 능력과 리더십을 동시에 가졌다", "사람들의 성장을 잘 돕는다", "설득력이 좋다"],
    growthAreas: ["내 감정도 먼저 챙기기", "모두를 만족시키려 하지 않기"],
    color: "#FDBA74",
  },
  {
    code: "ENFP",
    slug: "lemon",
    emoji: "🍋",
    title: "레몬맛",
    subtitle: "톡톡 튀고 상큼하게 텐션 올리는 맛",
    description:
      "한입 베어물면 주변 텐션까지 확 올라가는 맛이에요. 새로운 사람, 새로운 아이디어에 늘 열정적으로 반응하고 상상력이 풍부해요.",
    strengths: ["열정적이고 사교적이다", "상상력이 풍부하다", "공감 능력이 좋다"],
    growthAreas: ["시작한 일 끝까지 마무리하기", "세부적인 계획도 함께 세우기"],
    color: "#FEF9C3",
  },
];

export default profiles;

import type { MbtiTypeProfile } from "@/data/mbti-types";

// 16가지 유형 프로필 — "공주 시리즈". 특정 동화 속 캐릭터 이름은 쓰지 않고, 성향을
// 드러내는 수식어 + "공주" 형태로만 이름을 짓는다 (저작권 문제가 될 수 있는 고유
// 캐릭터명을 아예 노출하지 않기 위함). slug는 내부 식별자일 뿐 화면에 노출되지 않는다.
const profiles: MbtiTypeProfile[] = [
  {
    code: "ISTJ",
    slug: "chronic-fatigue",
    emoji: "😮‍💨",
    title: "야근러 만성피로 공주",
    subtitle: "몸은 피곤해도 맡은 일은 끝까지 하는 타입",
    description:
      "야근이 일상이 될 정도로 몸은 늘 피곤하지만, 맡은 일은 절대 대충 넘기지 않는 타입이에요. 티는 안 내도 은근히 책임감이 강해요.",
    strengths: ["책임감이 강하다", "맡은 일은 끝까지 해낸다", "묵묵히 버틴다"],
    growthAreas: ["일 좀 나눠서 하기", "쉬는 것도 잘 챙기기"],
    color: "#FDA4AF",
  },
  {
    code: "ISTP",
    slug: "nabdwo",
    emoji: "😑",
    title: "수면부족 냅둬 공주",
    subtitle: "피곤하니까 일단 그냥 두라는 타입",
    description:
      "만성 피곤함에 절어서 웬만한 일엔 '그냥 냅둬'가 먼저 나오는 타입이에요. 무심해 보여도 진짜 필요할 땐 조용히 움직여서 다 해결해놔요.",
    strengths: ["쓸데없는 데 에너지 안 쓴다", "위기 상황엔 의외로 침착하다", "실속 있게 움직인다"],
    growthAreas: ["잠 좀 더 자기", "귀찮아도 리액션은 해주기"],
    color: "#C7D2FE",
  },
  {
    code: "ISFJ",
    slug: "routine-keep",
    emoji: "🕊️",
    title: "평화주의 루틴 킵 공주",
    subtitle: "정해진 루틴을 지키며 평화를 사랑하는 타입",
    description:
      "갈등보다는 평화가 좋고, 매일 하던 대로 꾸준히 루틴을 지키는 타입이에요. 튀지 않아도 묵묵히 자기 할 일을 해내는 은은한 안정감이 있어요.",
    strengths: ["꾸준하고 성실하다", "주변과 잘 화합한다", "믿음직스럽다"],
    growthAreas: ["가끔은 루틴 깨고 새로운 것도 시도하기", "불편한 것도 말해보기"],
    color: "#BBF7D0",
  },
  {
    code: "ISFP",
    slug: "chimhollina",
    emoji: "😴",
    title: "만사귀찮 침흘리나 공주",
    subtitle: "귀찮으면 침 흘리면서도 그냥 자버리는 타입",
    description:
      "웬만한 일엔 힘을 안 씁니다. 재밌어 보이는 것도 '귀찮으면 안 해'가 먼저 나오는 극강의 에너지 절약형이에요. 대신 정말 좋아하는 일 앞에서는 눈빛이 달라져요.",
    strengths: ["스트레스를 잘 안 받는다", "귀찮은 일에 휘둘리지 않는다", "좋아하는 것엔 진심이다"],
    growthAreas: ["가끔은 몸을 좀 움직여보기", "미루던 일 하나씩 처리해보기"],
    color: "#FDE68A",
  },
  {
    code: "INTJ",
    slug: "jjaryeojasmin",
    emoji: "🧐",
    title: "의심암귀 째려보자스민 공주",
    subtitle: "일단 의심하고 보는 타입",
    description:
      "누가 뭘 제안하든 먼저 '진짜야?' 하고 째려보는 타입이에요. 쉽게 안 믿고 스스로 확인해야 직성이 풀리지만, 그래서 잘 안 속고 손해도 안 봐요.",
    strengths: ["분석적이고 신중하다", "쉽게 휘둘리지 않는다", "판단력이 정확하다"],
    growthAreas: ["가끔은 믿어보는 연습도 하기", "의심을 티 안 내는 연습하기"],
    color: "#E0E7FF",
  },
  {
    code: "INTP",
    slug: "kopanella",
    emoji: "🕶️",
    title: "마이웨이 코파넬라 공주",
    subtitle: "남 신경 안 쓰고 내 갈 길 가는 타입",
    description:
      "남들이 뭐라 하든 신경 안 쓰고 자기 세계에 빠져있는 타입이에요. 예의보다 솔직함이 앞서고, 관심 없는 얘기엔 티 나게 지루해합니다.",
    strengths: ["눈치 안 보고 소신 있게 행동한다", "자기만의 논리가 확고하다", "가식이 없다"],
    growthAreas: ["가끔은 분위기 파악도 해보기", "표현 방식 조금 다듬기"],
    color: "#FED7AA",
  },
  {
    code: "INFJ",
    slug: "birdnest",
    emoji: "🪺",
    title: "물아일체 새둥지 공주",
    subtitle: "자연과 하나 된 듯 조용히 스며드는 타입",
    description:
      "머리 위에 새가 둥지를 틀어도 모를 만큼 자기만의 세계와 깊이 하나 되는 타입이에요. 조용하지만 그 안엔 단단한 신념과 통찰이 있어요.",
    strengths: ["통찰력이 깊다", "자기 세계가 확고하다", "차분하게 관찰한다"],
    growthAreas: ["가끔은 현실로 돌아오기", "생각을 말로 꺼내보기"],
    color: "#D1FAE5",
  },
  {
    code: "INFP",
    slug: "elsayeon",
    emoji: "😭",
    title: "유리멘탈 엘사(연) 공주",
    subtitle: "한마디에도 마음이 와장창 깨지는 타입",
    description:
      "작은 말 한마디에도 마음이 얼었다 녹았다 눈물이 왈칵 나는 타입이에요. 감수성이 풍부해서 상처도 잘 받지만, 그만큼 다른 사람 마음도 잘 헤아려줘요.",
    strengths: ["공감 능력이 뛰어나다", "감정이 섬세하다", "진심이 잘 전해진다"],
    growthAreas: ["너무 상처받지 않는 연습하기", "속상한 걸 표현해보기"],
    color: "#BAE6FD",
  },
  {
    code: "ESTJ",
    slug: "flyswatter-fairy",
    emoji: "🪰",
    title: "분노조절실패 파리채 요정 공주",
    subtitle: "거슬리는 건 그 자리에서 바로 처리하는 타입",
    description:
      "눈에 거슬리는 게 보이면 참지 않고 바로 처리해버리는 타입이에요. 화끈하고 직설적이라 일 처리는 빠른데, 가끔은 그 기세에 주변이 움찔합니다.",
    strengths: ["추진력이 강하다", "문제를 빠르게 해결한다", "솔직하고 화끈하다"],
    growthAreas: ["화내기 전에 한 번 숨 고르기", "부드럽게 말하는 연습하기"],
    color: "#A7F3D0",
  },
  {
    code: "ESTP",
    slug: "missing-tooth",
    emoji: "😁",
    title: "노빠꾸 앞니실종 공주",
    subtitle: "한다면 하는, 뒤도 안 돌아보는 타입",
    description:
      "일단 결정하면 절대 뒤돌아보지 않고 밀어붙이는 타입이에요. 화끈하고 거침없어서 앞니가 나가도 웃으면서 밀고 나갑니다.",
    strengths: ["실행력이 확실하다", "후회 없이 밀어붙인다", "에너지가 넘친다"],
    growthAreas: ["가끔은 브레이크도 밟아보기", "결과도 한 번쯤 생각해보기"],
    color: "#FDE68A",
  },
  {
    code: "ESFJ",
    slug: "jjingjjingi",
    emoji: "🥺",
    title: "폭풍공감 찡찡이 공주",
    subtitle: "남 얘기만 들어도 같이 눈물 나는 타입",
    description:
      "친구가 속상한 얘기를 하면 내 일처럼 같이 찡찡거리며 공감하는 타입이에요. 감정이입이 심해서 눈물도 많지만, 그만큼 곁에서 진심으로 위로해줘요.",
    strengths: ["공감 능력이 최고다", "따뜻하고 다정하다", "곁에 있으면 든든하다"],
    growthAreas: ["남 감정에 너무 휘둘리지 않기", "내 감정도 먼저 챙기기"],
    color: "#FBCFE8",
  },
  {
    code: "ESFP",
    slug: "tragic-heroine",
    emoji: "🎭",
    title: "관종 비련의 여주인공(주)",
    subtitle: "모든 상황을 드라마 주인공처럼 사는 타입",
    description:
      "사소한 일도 인생 최대 시련처럼 느끼고, 그걸 티 나게 표현하는 타입이에요. 관심받는 걸 좋아하고, 분위기를 순식간에 자기 무대로 만들어버려요.",
    strengths: ["표현력이 풍부하다", "분위기를 화려하게 만든다", "감정에 솔직하다"],
    growthAreas: ["매번 드라마 찍지 않기", "작은 일은 작게 넘기는 연습"],
    color: "#F9A8D4",
  },
  {
    code: "ENTJ",
    slug: "joker-smile",
    emoji: "😬",
    title: "공포정치 조커스마일 공주",
    subtitle: "웃고 있지만 이미 다 정리된 타입",
    description:
      "미소 짓고 있는데 이미 머릿속엔 누가 뭘 잘못했는지 다 정리가 끝난 타입이에요. 카리스마 있게 상황을 장악하지만, 그 미소가 은근히 무섭습니다.",
    strengths: ["카리스마와 장악력이 강하다", "일 처리가 확실하다", "리더십이 있다"],
    growthAreas: ["미소 뒤 압박감 좀 줄이기", "부드러운 피드백 연습하기"],
    color: "#FBCFE8",
  },
  {
    code: "ENTP",
    slug: "clear-eyed",
    emoji: "👁️",
    title: "광기어린 맑은눈의공주",
    subtitle: "해맑은 얼굴로 예상 못 한 말을 던지는 타입",
    description:
      "표정은 순수한데 나오는 말은 어딘가 심상치 않은 타입이에요. 아무렇지 않게 정곡을 찌르는 말을 던져서 주변을 당황시키곤 합니다.",
    strengths: ["창의적이고 엉뚱하다", "솔직함이 무기다", "대화가 지루할 틈이 없다"],
    growthAreas: ["할 말과 안 할 말 구분하기", "타이밍 좀 봐가면서 말하기"],
    color: "#E9D5FF",
  },
  {
    code: "ENFJ",
    slug: "maple-kingdom",
    emoji: "🍁",
    title: "과몰입 단풍국 공주",
    subtitle: "한번 빠지면 끝까지 진심인 타입",
    description:
      "계절 하나, 취미 하나에도 온 마음을 다해 몰입하는 타입이에요. 남의 일에도 자기 일처럼 진심으로 뛰어들어서 주변 사람까지 끌어들여요.",
    strengths: ["열정이 넘친다", "몰입도가 높다", "주변에 좋은 에너지를 전한다"],
    growthAreas: ["적당히 힘 빼는 것도 연습하기", "다른 사람 페이스도 존중하기"],
    color: "#FDBA74",
  },
  {
    code: "ENFP",
    slug: "udangtang-mermaid",
    emoji: "🧜‍♀️",
    title: "얼레벌레 우당탕탕 인어공주",
    subtitle: "정신없이 좌충우돌하지만 결국 해내는 타입",
    description:
      "계획 없이 일단 저지르고 나서 우당탕탕 수습하는 타입이에요. 실수도 잦고 정신없어 보이지만, 특유의 에너지로 어떻게든 분위기를 살려냅니다.",
    strengths: ["에너지가 넘친다", "즉흥적으로 잘 헤쳐나간다", "분위기 메이커다"],
    growthAreas: ["시작 전에 한 번 더 확인하기", "차분히 마무리하는 연습"],
    color: "#7DD3FC",
  },
];

export default profiles;

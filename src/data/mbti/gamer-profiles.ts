import type { MbtiTypeProfile } from "@/data/mbti-types";

// 16가지 유형 프로필 — "게임 포지션 시리즈". 특정 게임의 챔피언/영웅 이름(상표가 있는
// 캐릭터)은 쓰지 않고, 여러 MOBA 장르에서 공통으로 쓰는 일반 명사(탱커·정글러·
// 미드라이너·원딜·서포터·암살자 등 포지션/역할군)만 이용해서 성격을 표현했다.
const profiles: MbtiTypeProfile[] = [
  {
    code: "ISTJ",
    slug: "tank",
    emoji: "🛡️",
    title: "정석 탱커 타입",
    subtitle: "기본기에 충실한 믿음직한 벽",
    description:
      "화려한 플레이보다 자리를 지키고 팀을 보호하는 데 집중하는 타입이에요. 정해진 역할을 꾸준히 수행하고, 위기 상황에서도 흔들리지 않아요.",
    strengths: ["책임감이 강하다", "꾸준하고 안정적이다", "위기 상황에서 침착하다"],
    growthAreas: ["가끔은 과감한 플레이도 시도해보기", "팀원 의견도 유연하게 받아들이기"],
    color: "#E0E7FF",
  },
  {
    code: "ISTP",
    slug: "mechanic",
    emoji: "🎮",
    title: "메커닉 장인 타입",
    subtitle: "손이 먼저 반응하는 실전형 플레이어",
    description:
      "화려한 말보다 정교한 컨트롤로 실력을 증명하는 타입이에요. 순간적인 판단력이 뛰어나고, 위기 상황에서 침착하게 최적의 선택을 해요.",
    strengths: ["컨트롤이 정교하다", "순발력이 뛰어나다", "침착하게 판단한다"],
    growthAreas: ["팀과의 소통도 늘려보기", "장기적인 전략도 함께 고민하기"],
    color: "#D1FAE5",
  },
  {
    code: "ISFJ",
    slug: "healer",
    emoji: "💚",
    title: "든든한 힐서폿 타입",
    subtitle: "말없이 팀을 챙기는 뒤편의 수호자",
    description:
      "화려하게 나서기보다 팀원을 살리고 지키는 데서 보람을 느끼는 타입이에요. 성실하게 자기 역할을 해내고, 곁에 있으면 든든해요.",
    strengths: ["팀을 살뜰히 챙긴다", "성실하고 헌신적이다", "위기 감지가 빠르다"],
    growthAreas: ["내 공도 가끔은 티내보기", "무리한 부탁은 거절해보기"],
    color: "#DCFCE7",
  },
  {
    code: "ISFP",
    slug: "sniper",
    emoji: "🎯",
    title: "감성 스나이퍼 타입",
    subtitle: "조용히 한 방을 노리는 예술가",
    description:
      "말없이 타이밍을 재다가 결정적인 순간에 정확한 한 방을 날리는 타입이에요. 자기만의 스타일을 중시하고, 감각적으로 상황을 읽어요.",
    strengths: ["집중력이 뛰어나다", "감각이 섬세하다", "자기 스타일이 확고하다"],
    growthAreas: ["의견을 조금 더 적극적으로 표현하기", "팀 전체 판도도 함께 살피기"],
    color: "#FDE68A",
  },
  {
    code: "INTJ",
    slug: "strategist",
    emoji: "🧠",
    title: "전략가 미드라이너 타입",
    subtitle: "게임 전체를 그려놓고 움직이는 설계자",
    description:
      "라인전부터 후반 한타까지 큰 그림을 미리 그려두고 움직이는 타입이에요. 효율적인 판단을 좋아하고, 계획대로 흘러갈 때 가장 강해요.",
    strengths: ["큰 그림을 잘 그린다", "판단이 효율적이다", "독립적으로 사고한다"],
    growthAreas: ["계획이 틀어져도 유연하게 대응하기", "팀원 컨디션도 함께 고려하기"],
    color: "#E9D5FF",
  },
  {
    code: "INTP",
    slug: "experimenter",
    emoji: "🧪",
    title: "실험적 빌드 장인 타입",
    subtitle: "남들 안 하는 조합을 파고드는 탐구자",
    description:
      "정석보다 새로운 조합과 전략을 탐구하는 데서 재미를 느끼는 타입이에요. 호기심이 생기면 끝까지 파고들고, 논리적으로 상황을 분석해요.",
    strengths: ["창의적인 전략을 짠다", "분석력이 뛰어나다", "새로운 시도를 두려워하지 않는다"],
    growthAreas: ["실험을 실전에 옮기는 타이밍 잡기", "팀에 설명하고 설득하는 연습하기"],
    color: "#CFFAFE",
  },
  {
    code: "INFJ",
    slug: "seer",
    emoji: "🔮",
    title: "예언자 정글러 타입",
    subtitle: "맵 전체의 흐름을 미리 읽는 타입",
    description:
      "상대의 다음 수를 미리 예측하고 조용히 움직이는 타입이에요. 팀 전체의 흐름을 살피고, 결정적인 순간에 확신을 가지고 개입해요.",
    strengths: ["통찰력이 뛰어나다", "판단이 신중하다", "팀 전체를 살핀다"],
    growthAreas: ["예측이 틀렸을 때도 유연하게 대처하기", "혼자 다 짊어지지 않기"],
    color: "#DDD6FE",
  },
  {
    code: "INFP",
    slug: "dreamer",
    emoji: "🌙",
    title: "몽상가 원딜 타입",
    subtitle: "완벽한 한타를 꿈꾸는 로맨티스트",
    description:
      "화려한 한 방보다 팀과 함께 완성하는 완벽한 순간을 꿈꾸는 타입이에요. 겉으로는 조용해도 마음속엔 확고한 이상이 있어요.",
    strengths: ["가치관이 확고하다", "팀워크를 소중히 여긴다", "상상력이 풍부하다"],
    growthAreas: ["현실적인 판단도 함께 하기", "너무 이상적인 기대는 조정하기"],
    color: "#FBCFE8",
  },
  {
    code: "ESTJ",
    slug: "commander",
    emoji: "📢",
    title: "지휘관 탑라이너 타입",
    subtitle: "라인을 장악하고 판을 짜는 타입",
    description:
      "정해진 원칙대로 라인을 관리하고 팀 전체에 확실한 방향을 제시하는 타입이에요. 강한 추진력으로 밀어붙이고, 책임감 있게 판을 이끌어요.",
    strengths: ["추진력이 강하다", "체계적으로 상황을 관리한다", "책임감이 강하다"],
    growthAreas: ["팀원 의견도 유연하게 받아들이기", "감정적인 부분도 함께 살피기"],
    color: "#FED7AA",
  },
  {
    code: "ESTP",
    slug: "assassin",
    emoji: "🗡️",
    title: "저돌적 암살자 타입",
    subtitle: "일단 뛰어들고 보는 화끈한 타입",
    description:
      "고민할 시간에 이미 뛰어들어 승부를 보는 타입이에요. 위기 상황에서도 당황하지 않고 순발력 있게 상황을 반전시켜요.",
    strengths: ["순발력이 뛰어나다", "과감하게 행동한다", "적응력이 빠르다"],
    growthAreas: ["뛰어들기 전에 한 번 더 상황을 보기", "팀과의 타이밍도 맞춰보기"],
    color: "#FCA5A5",
  },
  {
    code: "ESFJ",
    slug: "hypeman",
    emoji: "🎉",
    title: "분위기 메이커 서포터 타입",
    subtitle: "팀 텐션을 책임지는 다정한 조력자",
    description:
      "팀원 하나하나를 세심하게 챙기고, 분위기가 가라앉지 않게 이끄는 타입이에요. 다정하고 협조적이라 함께하면 든든해요.",
    strengths: ["팀워크를 잘 챙긴다", "사교성이 좋다", "협조적이다"],
    growthAreas: ["내 플레이에도 집중해보기", "모두를 만족시키려 하지 않기"],
    color: "#FEF3C7",
  },
  {
    code: "ESFP",
    slug: "showman",
    emoji: "✨",
    title: "쇼맨 원딜 타입",
    subtitle: "하이라이트 각을 만드는 흥부자",
    description:
      "화려한 플레이로 관객을 열광시키는 걸 즐기는 타입이에요. 긍정적인 에너지로 팀 분위기를 띄우고, 승부처를 즐길 줄 알아요.",
    strengths: ["긍정적이고 에너지가 넘친다", "승부처에서 빛난다", "친화력이 좋다"],
    growthAreas: ["신중한 판단도 함께 연습하기", "무리한 플레이는 자제하기"],
    color: "#FDA4AF",
  },
  {
    code: "ENTJ",
    slug: "decisive",
    emoji: "👑",
    title: "결단력 있는 정글러 타입",
    subtitle: "맵을 지배하는 타고난 지휘관",
    description:
      "목표를 정하면 맵 전체를 장악할 때까지 밀어붙이는 타입이에요. 결단력 있게 오브젝트를 챙기고, 팀을 확실하게 이끌어요.",
    strengths: ["결단력이 있다", "리더십이 강하다", "목표 의식이 뚜렷하다"],
    growthAreas: ["팀원 속도도 함께 고려하기", "실패했을 때 여유를 갖기"],
    color: "#FDBA74",
  },
  {
    code: "ENTP",
    slug: "wildcard",
    emoji: "💡",
    title: "변수 제조기 미드라이너 타입",
    subtitle: "예측 불가능한 변수를 만드는 타입",
    description:
      "정석보다 허를 찌르는 플레이로 판을 뒤집는 걸 즐기는 타입이에요. 재치 있는 아이디어로 예상치 못한 변수를 만들어내요.",
    strengths: ["창의적이고 재치있다", "순발력이 좋다", "새로운 시도를 즐긴다"],
    growthAreas: ["기본기도 탄탄히 다지기", "무리한 도박은 줄이기"],
    color: "#FEF08A",
  },
  {
    code: "ENFJ",
    slug: "initiator",
    emoji: "🌟",
    title: "팀을 이끄는 이니시에이터 타입",
    subtitle: "한타의 시작을 여는 타고난 리더",
    description:
      "팀원들의 호흡을 맞추고 결정적인 순간에 먼저 나서서 판을 여는 타입이에요. 따뜻하면서도 확신에 찬 리더십으로 팀을 이끌어요.",
    strengths: ["리더십과 공감 능력을 동시에 가졌다", "팀을 하나로 모은다", "설득력이 좋다"],
    growthAreas: ["내 컨디션도 먼저 챙기기", "모든 걸 떠안으려 하지 않기"],
    color: "#BAE6FD",
  },
  {
    code: "ENFP",
    slug: "highlight",
    emoji: "🎆",
    title: "하이라이트 메이커 타입",
    subtitle: "예상 못한 순간에 터지는 스파크형",
    description:
      "새로운 상황, 새로운 조합에 늘 열정적으로 반응하는 타입이에요. 즉흥적이지만 그만큼 예상 못한 하이라이트를 자주 만들어내요.",
    strengths: ["열정적이고 에너지가 넘친다", "상상력이 풍부하다", "적응력이 좋다"],
    growthAreas: ["일관성 있게 플레이하는 연습하기", "세부적인 계획도 함께 세우기"],
    color: "#FFE4E6",
  },
];

export default profiles;

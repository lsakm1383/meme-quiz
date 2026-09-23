import type { MbtiTypeProfile } from "@/data/mbti-types";

// 16가지 유형 프로필 — "게임 포지션 시리즈". 특정 게임의 직업/캐릭터 이름(상표가 있는
// 고유명)은 쓰지 않고, 여러 MMORPG에서 공통으로 쓰는 일반 명사(탱커·힐러·공대장·
// 길드장·음유시인·연금술사·생활 장인 등 역할군)만 이용해서 성격을 표현했다.
// slug는 이미지 파일명(public/mbti/gamer/<slug>.webp)과 연결돼 있어 바꾸지 않는다.
const profiles: MbtiTypeProfile[] = [
  {
    code: "ISTJ",
    slug: "tank",
    emoji: "🛡️",
    title: "정석 탱커 타입",
    subtitle: "보스 어그로는 내가 끝까지 잡는다",
    description:
      "화려한 딜보다 보스 앞에서 자리를 지키며 공대를 보호하는 데 집중하는 타입이에요. 정해진 역할을 매주 꾸준히 해내고, 전멸 위기에서도 흔들리지 않아요.",
    strengths: ["책임감이 강하다", "꾸준하고 안정적이다", "위기 상황에서 침착하다"],
    growthAreas: ["가끔은 과감한 플레이도 시도해보기", "공대원 의견도 유연하게 받아들이기"],
    color: "#E0E7FF",
  },
  {
    code: "ISTP",
    slug: "mechanic",
    emoji: "🔧",
    title: "손재주 제작 장인 타입",
    subtitle: "장비는 사지 않고 직접 만드는 생활 콘텐츠 고수",
    description:
      "말보다 손이 먼저 움직이는 타입이에요. 제작·강화 시스템을 누구보다 잘 알고, 필요한 장비는 경매장 대신 직접 뚝딱 만들어내요.",
    strengths: ["손재주가 좋다", "시스템을 빠르게 파악한다", "혼자서도 알아서 해낸다"],
    growthAreas: ["길드원과의 소통도 늘려보기", "만든 장비 자랑도 가끔 해보기"],
    color: "#D1FAE5",
  },
  {
    code: "ISFJ",
    slug: "healer",
    emoji: "💚",
    title: "든든한 힐러 타입",
    subtitle: "피통은 내가 지킨다, 공대의 생명줄",
    description:
      "앞에 나서기보다 공대원 피통을 지키는 데서 보람을 느끼는 타입이에요. 누가 위험한지 제일 먼저 알아채고, 말없이 살려놓고 넘어가요.",
    strengths: ["팀을 살뜰히 챙긴다", "성실하고 헌신적이다", "위기 감지가 빠르다"],
    growthAreas: ["내 공도 가끔은 티내보기", "무리한 부탁은 거절해보기"],
    color: "#DCFCE7",
  },
  {
    code: "ISFP",
    slug: "sniper",
    emoji: "🎯",
    title: "감성 저격수 타입",
    subtitle: "멀리서 조용히 치명타를 노리는 원거리 딜러",
    description:
      "무리에서 한 발 떨어져 타이밍을 재다가 결정적인 순간에 치명타를 꽂는 타입이에요. 딜 순위보다 나만의 플레이 스타일을 더 중요하게 여겨요.",
    strengths: ["집중력이 뛰어나다", "감각이 섬세하다", "자기 스타일이 확고하다"],
    growthAreas: ["의견을 조금 더 적극적으로 표현하기", "공대 전체 상황도 함께 살피기"],
    color: "#FDE68A",
  },
  {
    code: "INTJ",
    slug: "strategist",
    emoji: "🗺️",
    title: "공략 연구가 마법사 타입",
    subtitle: "보스 패턴을 전부 분석해두는 설계자",
    description:
      "신규 레이드가 나오면 패턴과 딜 사이클부터 분석하는 타입이에요. 효율적인 공략을 짜는 걸 좋아하고, 계획대로 트라이가 굴러갈 때 가장 강해요.",
    strengths: ["큰 그림을 잘 그린다", "판단이 효율적이다", "독립적으로 사고한다"],
    growthAreas: ["공략이 틀어져도 유연하게 대응하기", "공대원 컨디션도 함께 고려하기"],
    color: "#E9D5FF",
  },
  {
    code: "INTP",
    slug: "experimenter",
    emoji: "🧪",
    title: "실험광 연금술사 타입",
    subtitle: "아무도 안 쓰는 세팅을 파고드는 탐구자",
    description:
      "국민 세팅보다 새로운 조합과 빌드를 실험하는 데서 재미를 느끼는 타입이에요. 궁금한 게 생기면 물약을 몇 개 날리든 끝까지 파고들어요.",
    strengths: ["창의적인 세팅을 짠다", "분석력이 뛰어나다", "새로운 시도를 두려워하지 않는다"],
    growthAreas: ["실험을 실전에 옮기는 타이밍 잡기", "공대에 설명하고 설득하는 연습하기"],
    color: "#CFFAFE",
  },
  {
    code: "INFJ",
    slug: "seer",
    emoji: "🔮",
    title: "촉 좋은 점술사 타입",
    subtitle: "다음 패턴을 먼저 읽는 공대의 눈",
    description:
      "보스의 다음 패턴이나 필드의 위험을 누구보다 먼저 감지하는 타입이에요. 조용히 흐름을 살피다가 결정적인 순간에 확신을 가지고 콜을 넣어요.",
    strengths: ["통찰력이 뛰어나다", "판단이 신중하다", "공대 전체를 살핀다"],
    growthAreas: ["예측이 틀렸을 때도 유연하게 대처하기", "혼자 다 짊어지지 않기"],
    color: "#DDD6FE",
  },
  {
    code: "INFP",
    slug: "dreamer",
    emoji: "🏹",
    title: "낭만 궁수 타입",
    subtitle: "효율보다 감성, 모험 자체를 즐기는 로맨티스트",
    description:
      "딜 효율보다 풍경 좋은 사냥터와 스토리 퀘스트를 더 사랑하는 타입이에요. 겉으로는 조용해도 이 세계에 대한 애정만큼은 누구보다 깊어요.",
    strengths: ["가치관이 확고하다", "팀워크를 소중히 여긴다", "상상력이 풍부하다"],
    growthAreas: ["현실적인 스펙업도 함께 챙기기", "너무 이상적인 기대는 조정하기"],
    color: "#FBCFE8",
  },
  {
    code: "ESTJ",
    slug: "commander",
    emoji: "📢",
    title: "호령하는 공대장 타입",
    subtitle: "\"드가자!!\" 한마디로 공대를 움직인다",
    description:
      "공대 구성부터 자리 배치, 콜까지 직접 챙겨야 마음이 편한 타입이에요. 확실한 원칙과 추진력으로 트라이를 이끌고, 클리어까지 책임지고 끌고 가요.",
    strengths: ["추진력이 강하다", "체계적으로 상황을 관리한다", "책임감이 강하다"],
    growthAreas: ["공대원 의견도 유연하게 받아들이기", "전멸했을 때 분위기도 함께 살피기"],
    color: "#FED7AA",
  },
  {
    code: "ESTP",
    slug: "assassin",
    emoji: "🗡️",
    title: "돌진형 암살자 타입",
    subtitle: "일단 뛰어들고 보는 근접 딜러",
    description:
      "고민할 시간에 이미 보스 뒤로 파고들어 딜을 넣는 타입이에요. 위기 상황에서도 당황하지 않고 순발력 있게 판을 뒤집어요.",
    strengths: ["순발력이 뛰어나다", "과감하게 행동한다", "적응력이 빠르다"],
    growthAreas: ["뛰어들기 전에 패턴 한 번 더 보기", "공대와 타이밍도 맞춰보기"],
    color: "#FCA5A5",
  },
  {
    code: "ESFJ",
    slug: "hypeman",
    emoji: "🎉",
    title: "흥 돋우는 음유시인 타입",
    subtitle: "버프도 텐션도 책임지는 공대 분위기 메이커",
    description:
      "공대원 하나하나를 챙기고, 연속 전멸에도 분위기가 가라앉지 않게 띄우는 타입이에요. 버프 타이밍만큼 사람 마음도 잘 챙겨서 함께하면 든든해요.",
    strengths: ["팀워크를 잘 챙긴다", "사교성이 좋다", "협조적이다"],
    growthAreas: ["내 플레이에도 집중해보기", "모두를 만족시키려 하지 않기"],
    color: "#FEF3C7",
  },
  {
    code: "ESFP",
    slug: "showman",
    emoji: "🔫",
    title: "쇼맨십 건슬링어 타입",
    subtitle: "딜 미터기보다 스킬 이펙트가 중요한 흥부자",
    description:
      "화려한 스킬 연출로 모두의 시선을 끄는 걸 즐기는 타입이에요. 긍정적인 에너지로 공대 분위기를 띄우고, 보스 막타 순간을 누구보다 즐겨요.",
    strengths: ["긍정적이고 에너지가 넘친다", "승부처에서 빛난다", "친화력이 좋다"],
    growthAreas: ["신중한 판단도 함께 연습하기", "무리한 딜욕심은 자제하기"],
    color: "#FDA4AF",
  },
  {
    code: "ENTJ",
    slug: "decisive",
    emoji: "🐗",
    title: "필드 보스 사냥꾼 타입",
    subtitle: "젠 타이밍엔 무조건 먼저 가 있는 추진력 갑",
    description:
      "목표가 정해지면 누구보다 먼저 움직여서 결과를 가져오는 타입이에요. 필드 보스 젠 시간, 한정 보상, 서버 선점까지 결단력 있게 챙겨요.",
    strengths: ["결단력이 있다", "리더십이 강하다", "목표 의식이 뚜렷하다"],
    growthAreas: ["파티원 속도도 함께 고려하기", "실패했을 때 여유를 갖기"],
    color: "#FDBA74",
  },
  {
    code: "ENTP",
    slug: "wildcard",
    emoji: "🎲",
    title: "한탕 노리는 흑마법사 타입",
    subtitle: "강화 도박도 공략 변수도 즐기는 승부사",
    description:
      "정석보다 허를 찌르는 플레이로 판을 뒤집는 걸 즐기는 타입이에요. 강화 확률에 과감하게 걸기도 하고, 아무도 생각 못 한 파훼법을 들고 오기도 해요.",
    strengths: ["창의적이고 재치있다", "순발력이 좋다", "새로운 시도를 즐긴다"],
    growthAreas: ["기본기도 탄탄히 다지기", "무리한 강화 도박은 줄이기"],
    color: "#FEF08A",
  },
  {
    code: "ENFJ",
    slug: "initiator",
    emoji: "🚩",
    title: "깃발 든 길드장 타입",
    subtitle: "길드원을 이끌고 가장 먼저 뛰어드는 리더",
    description:
      "길드원들의 호흡을 맞추고 쟁이나 레이드에서 가장 먼저 깃발을 드는 타입이에요. 따뜻하면서도 확신에 찬 리더십으로 길드를 하나로 모아요.",
    strengths: ["리더십과 공감 능력을 동시에 가졌다", "길드를 하나로 모은다", "설득력이 좋다"],
    growthAreas: ["내 컨디션도 먼저 챙기기", "길드 일을 전부 떠안으려 하지 않기"],
    color: "#BAE6FD",
  },
  {
    code: "ENFP",
    slug: "highlight",
    emoji: "✨",
    title: "반짝반짝 코스튬 장인 타입",
    subtitle: "스펙보다 외형이 먼저인 패션 유저",
    description:
      "새 코스튬과 탈것이 나오면 제일 먼저 입어보고 자랑하는 타입이에요. 즉흥적이고 열정적이라 가는 곳마다 눈에 띄고, 마을 광장의 인싸로 통해요.",
    strengths: ["열정적이고 에너지가 넘친다", "센스가 좋다", "적응력이 좋다"],
    growthAreas: ["스펙업도 조금은 신경 쓰기", "세부적인 계획도 함께 세우기"],
    color: "#FFE4E6",
  },
];

export default profiles;

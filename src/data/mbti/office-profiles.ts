import type { MbtiTypeProfile } from "@/data/mbti-types";

// 16가지 유형 프로필 — "직장인 시리즈". 회사에서 한 번쯤 본 듯한 사람 유형으로 성향을
// 표현했다. slug는 이미지 파일명(public/mbti/office/<slug>.webp)과 연결돼 있다.
const profiles: MbtiTypeProfile[] = [
  {
    code: "ISTJ",
    slug: "overtime",
    emoji: "🌙",
    title: "야근에 찌든 만년 대리",
    subtitle: "시키면 끝까지 하는 책임감의 화신",
    description:
      "맡은 일은 무슨 일이 있어도 끝을 보는 타입이에요. 불 꺼진 사무실에 마지막까지 남아 있는 건 늘 나지만, 그 덕에 팀 일정이 무너지지 않아요.",
    strengths: ["책임감이 강하다", "꼼꼼하고 정확하다", "한번 맡으면 끝까지 한다"],
    growthAreas: ["안 되는 건 안 된다고 말하기", "일 좀 나눠서 하기"],
    color: "#C7D2FE",
  },
  {
    code: "ISTP",
    slug: "smoke-break",
    emoji: "☕",
    title: "커피·담배 타임 즐기는 대리",
    subtitle: "일은 빨리 끝내고 옥상 가는 효율파",
    description:
      "쓸데없는 회의와 잡담 대신 할 일만 딱 끝내고 쉬러 가는 타입이에요. 옥상에서 커피 한 잔 하는 사이에도 머릿속으론 다음 일을 벌써 정리해둬요.",
    strengths: ["일 처리가 빠르다", "군더더기가 없다", "위기에 침착하다"],
    growthAreas: ["팀원들과 진행 상황 공유하기", "가끔은 회식도 가주기"],
    color: "#E5E7EB",
  },
  {
    code: "ISFJ",
    slug: "pantry",
    emoji: "🍪",
    title: "탕비실 지킴이 주임",
    subtitle: "간식 채우고 생일 챙기는 사무실 엄마",
    description:
      "탕비실 간식이 떨어지기 전에 채워두고, 팀원 생일도 빠짐없이 챙기는 타입이에요. 티 안 나게 사무실을 굴러가게 만드는 숨은 공신이에요.",
    strengths: ["세심하고 배려심이 깊다", "성실하다", "팀 분위기를 따뜻하게 만든다"],
    growthAreas: ["내 공도 가끔은 티내기", "궂은일을 혼자 도맡지 않기"],
    color: "#FDE68A",
  },
  {
    code: "ISFP",
    slug: "earphones",
    emoji: "🎧",
    title: "이어폰 끼고 사는 은둔 사원",
    subtitle: "조용히 자기 일만 잘하는 사람",
    description:
      "칸막이 안에서 헤드폰 끼고 조용히 내 일에 집중하는 타입이에요. 말은 적어도 결과물은 은근히 센스 있고, 가까운 동료에게는 다정해요.",
    strengths: ["집중력이 좋다", "감각이 섬세하다", "남에게 피해를 주지 않는다"],
    growthAreas: ["회의에서 의견 한마디씩 해보기", "도움 필요할 땐 먼저 말하기"],
    color: "#BBF7D0",
  },
  {
    code: "INTJ",
    slug: "clock-out",
    emoji: "⌚",
    title: "칼퇴 설계자 과장",
    subtitle: "동선까지 최적화해 6시 정각 퇴근",
    description:
      "하루 업무를 분 단위로 설계해서 6시 정각이면 가방을 드는 타입이에요. 비효율을 싫어해서, 일이 늘어지는 걸 보면 구조부터 뜯어고치고 싶어져요.",
    strengths: ["계획적이고 효율적이다", "큰 그림을 잘 본다", "판단이 빠르다"],
    growthAreas: ["팀원 속도도 함께 맞춰주기", "가끔은 계획 밖의 일도 받아주기"],
    color: "#DDD6FE",
  },
  {
    code: "INTP",
    slug: "excel-macro",
    emoji: "📊",
    title: "엑셀 매크로 장인",
    subtitle: "반복 업무는 전부 자동화하는 사람",
    description:
      "똑같은 일을 두 번 하는 걸 못 참아서 결국 매크로를 짜버리는 타입이에요. 가끔 #VALUE! 오류와 밤새 씨름하지만, 한번 완성하면 팀 전체가 편해져요.",
    strengths: ["문제 해결력이 좋다", "분석적이다", "새로운 방법을 잘 찾는다"],
    growthAreas: ["자동화보다 마감이 먼저일 때 알기", "만든 걸 쉽게 설명해주기"],
    color: "#CFFAFE",
  },
  {
    code: "INFJ",
    slug: "nunchi",
    emoji: "👀",
    title: "눈치 백단 대리",
    subtitle: "회의실 공기만 봐도 다 아는 사람",
    description:
      "누가 말하지 않아도 회의실 분위기와 사람들 속마음을 먼저 읽어내는 타입이에요. 조용히 있다가도 결정적인 순간에 딱 필요한 한마디를 해요.",
    strengths: ["통찰력이 뛰어나다", "사람 마음을 잘 읽는다", "신중하다"],
    growthAreas: ["혼자 짐작하지 말고 물어보기", "남 기분까지 다 짊어지지 않기"],
    color: "#E9D5FF",
  },
  {
    code: "INFP",
    slug: "resignation",
    emoji: "✉️",
    title: "사직서 품고 다니는 사원",
    subtitle: "가슴속엔 늘 사직서 한 장",
    description:
      "\"이 일이 정말 나한테 의미가 있을까?\"를 매일 고민하는 타입이에요. 가슴속 사직서는 오늘도 못 냈지만, 마음이 가는 일에는 누구보다 진심을 다해요.",
    strengths: ["가치관이 뚜렷하다", "진심을 다한다", "상상력이 풍부하다"],
    growthAreas: ["지금 할 수 있는 작은 변화부터 찾기", "속마음을 믿을 만한 사람에게 털어놓기"],
    color: "#FBCFE8",
  },
  {
    code: "ESTJ",
    slug: "meeting",
    emoji: "📋",
    title: "\"잠깐 회의 좀 할까?\" 팀장님",
    subtitle: "회의로 시작해 회의로 끝나는 하루",
    description:
      "모든 일은 모여서 정리하고 넘어가야 마음이 놓이는 타입이에요. 진행 상황을 확실하게 챙기고 팀 방향을 분명하게 잡아주지만, 회의가 조금… 많아요.",
    strengths: ["추진력이 강하다", "체계적이다", "책임감 있게 팀을 이끈다"],
    growthAreas: ["메신저로 끝날 일은 메신저로", "팀원 의견도 끝까지 들어보기"],
    color: "#FED7AA",
  },
  {
    code: "ESTP",
    slug: "sales-king",
    emoji: "📱",
    title: "전화 두 대 영업왕 과장",
    subtitle: "사무실보다 거래처가 편한 사람",
    description:
      "양손에 전화를 들고 동시에 두 건을 성사시키는 타입이에요. 책상에 가만히 앉아 있으면 오히려 좀이 쑤시고, 현장에서 부딪힐 때 가장 빛나요.",
    strengths: ["순발력이 뛰어나다", "사람을 잘 설득한다", "실행력이 좋다"],
    growthAreas: ["서류 정리도 미루지 않기", "약속 전에 한 번 더 확인하기"],
    color: "#FCA5A5",
  },
  {
    code: "ESFJ",
    slug: "dinner-host",
    emoji: "🥩",
    title: "회식 총무 대리",
    subtitle: "장소 예약부터 단톡 공지까지",
    description:
      "회식이 잡히면 장소 예약, 단톡방 공지, 고기 굽기까지 자연스럽게 맡게 되는 타입이에요. 모두가 즐거워야 마음이 편하고, 챙김받은 사람들은 다 기억해요.",
    strengths: ["사교성이 좋다", "사람을 잘 챙긴다", "행사 진행력이 뛰어나다"],
    growthAreas: ["고기만 굽지 말고 나도 먹기", "모두를 만족시키려 하지 않기"],
    color: "#FEF3C7",
  },
  {
    code: "ESFP",
    slug: "stage-ace",
    emoji: "🎤",
    title: "워크숍 장기자랑 에이스 막내",
    subtitle: "사내 행사 무대는 내 거",
    description:
      "워크숍, 송년회, 체육대회까지 사내 행사만 열리면 무대 위에 서 있는 타입이에요. 있는 것만으로 분위기가 살아나서 어느 팀에서나 환영받아요.",
    strengths: ["에너지가 넘친다", "분위기를 띄운다", "친화력이 좋다"],
    growthAreas: ["행사 없는 평일에도 집중력 유지하기", "하기 싫은 일도 미루지 않기"],
    color: "#FDA4AF",
  },
  {
    code: "ENTJ",
    slug: "red-pen",
    emoji: "🖊️",
    title: "빨간펜 부장님",
    subtitle: "\"그래서 결론이 뭐야?\"",
    description:
      "보고서를 받으면 핵심이 없는 문장부터 빨간 펜으로 지워내는 타입이에요. 목표를 향해 거침없이 팀을 몰고 가고, 결과로 증명하는 걸 좋아해요.",
    strengths: ["결단력이 있다", "목표 의식이 뚜렷하다", "리더십이 강하다"],
    growthAreas: ["칭찬 한마디도 같이 해주기", "과정의 노력도 알아봐주기"],
    color: "#FDBA74",
  },
  {
    code: "ENTP",
    slug: "post-it",
    emoji: "💡",
    title: "포스트잇 폭주 기획자",
    subtitle: "아이디어는 많고 마무리는 남이",
    description:
      "모니터와 벽이 아이디어 포스트잇으로 뒤덮여 있는 타입이에요. 브레인스토밍에선 누구도 못 따라오지만, 마무리 단계만 되면 다음 아이디어로 넘어가 있어요.",
    strengths: ["창의적이다", "말솜씨가 좋다", "새로운 시도를 즐긴다"],
    growthAreas: ["하나라도 끝까지 마무리하기", "실현 가능성도 같이 따져보기"],
    color: "#FEF08A",
  },
  {
    code: "ENFJ",
    slug: "mentor",
    emoji: "🤝",
    title: "커피 사주는 멘토 선배",
    subtitle: "신입만 보면 챙겨주고 싶은 사람",
    description:
      "잔뜩 긴장한 신입을 보면 그냥 지나치지 못하고 커피부터 건네는 타입이에요. 사람을 키우는 데서 보람을 느끼고, 팀을 하나로 묶는 힘이 있어요.",
    strengths: ["공감 능력과 리더십을 함께 가졌다", "사람을 잘 이끈다", "설득력이 좋다"],
    growthAreas: ["내 일도 먼저 챙기기", "모두의 고민을 다 떠안지 않기"],
    color: "#BAE6FD",
  },
  {
    code: "ENFP",
    slug: "project-starter",
    emoji: "🎉",
    title: "일 벌이기 장인 사원",
    subtitle: "새 프로젝트는 신나게, 수습은 나중에",
    description:
      "\"이것도 해보면 재밌지 않을까요?\"로 새 일을 벌이는 게 특기인 타입이에요. 서류가 산더미처럼 쌓여도 해맑게 웃고 있고, 그 열정에 팀도 덩달아 움직여요.",
    strengths: ["열정적이다", "아이디어가 풍부하다", "사람들에게 에너지를 준다"],
    growthAreas: ["벌인 일 목록부터 정리하기", "마감 일정도 함께 세우기"],
    color: "#FFE4E6",
  },
];

export default profiles;

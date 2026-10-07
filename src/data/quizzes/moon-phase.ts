import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "moon-phase",
  emoji: "🌙",
  image: { src: "/quiz/moon-phase/cover.webp", aspect: "aspect-[1040/341]", wide: true },
  title: "나의 달 모양 테스트",
  description: "지금 내 에너지는 어떤 달의 모양에 가까울까? 6개 질문으로 알아보는 나의 달 페르소나.",
  accentColor: "#6366f1",
  questions: [
    {
      id: "q1",
      text: "요즘 나의 에너지 상태는?",
      options: [
        { text: "뭔가 새로 시작하고 싶어 근질근질함", scores: { "waxing-crescent": 2 } },
        { text: "하나에 꽂혀서 점점 몰입 중", scores: { "first-quarter": 2 } },
        { text: "에너지 최고조, 뭐든 할 수 있을 것 같음", scores: { "full-moon": 2 } },
        { text: "하나씩 정리하고 마무리하는 중", scores: { "last-quarter": 2 } },
        { text: "조용히 혼자 있고 싶은 시기", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q2",
      text: "주말에 어울리는 나는?",
      options: [
        { text: "즉흥적으로 새로운 곳 탐방", scores: { "waxing-crescent": 2 } },
        { text: "하던 취미 계속 발전시키기", scores: { "first-quarter": 2 } },
        { text: "사람들 만나서 에너지 발산", scores: { "full-moon": 2 } },
        { text: "방 정리, 미루던 일 처리", scores: { "last-quarter": 2 } },
        { text: "집에서 혼자 재충전", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q3",
      text: "친구가 갑자기 약속 없이 놀자고 하면?",
      options: [
        { text: "새로운 사람도 같이면 더 좋음", scores: { "waxing-crescent": 2 } },
        { text: "좋은데 컨디션 봐서", scores: { "first-quarter": 2 } },
        { text: "완전 좋아, 바로 나감", scores: { "full-moon": 2 } },
        { text: "오늘은 패스, 다음에", scores: { "last-quarter": 2 } },
        { text: "오늘은 혼자 있고 싶어서 거절", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q4",
      text: "목표를 대하는 태도는?",
      options: [
        { text: "일단 저지르고 본다", scores: { "waxing-crescent": 2 } },
        { text: "계획 세우고 차근차근", scores: { "first-quarter": 2 } },
        { text: "목표 달성 직전, 마지막 스퍼트", scores: { "full-moon": 2 } },
        { text: "목표를 다시 재정비하는 중", scores: { "last-quarter": 2 } },
        { text: "잠시 목표에서 거리 두는 중", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q5",
      text: "감정 표현 방식은?",
      options: [
        { text: "즉흥적이고 솔직하게 바로 표현", scores: { "waxing-crescent": 2 } },
        { text: "조금씩 쌓아뒀다가 표현", scores: { "first-quarter": 2 } },
        { text: "확실하고 크게 표현", scores: { "full-moon": 2 } },
        { text: "정리해서 차분하게 표현", scores: { "last-quarter": 2 } },
        { text: "잘 표현 안 하고 속으로 삭힘", scores: { "new-moon": 2 } },
      ],
    },
    {
      id: "q6",
      text: "지금 나에게 필요한 한마디는?",
      options: [
        { text: '"시작이 반이다"', scores: { "waxing-crescent": 2 } },
        { text: '"꾸준함이 답이다"', scores: { "first-quarter": 2 } },
        { text: '"지금이 절정이다"', scores: { "full-moon": 2 } },
        { text: '"비워야 채워진다"', scores: { "last-quarter": 2 } },
        { text: '"잠시 쉬어가도 괜찮다"', scores: { "new-moon": 2 } },
      ],
    },
  ],
  results: [
    {
      id: "waxing-crescent",
      emoji: "🌒",
      image: { src: "/quiz/moon-phase/waxing-crescent.webp", aspect: "aspect-[292/257]" },
      title: "시작하는 초승달형",
      subtitle: "새로운 도전이 반가운 타입",
      description:
        "뭔가 새로 시작하는 에너지가 넘치는 타입이에요. 즉흥적이고 도전적이라, 일단 저지르고 보는 추진력이 있어요.",
      color: "#E0E7FF",
      detail: {
        more: "머릿속에 떠오른 아이디어를 오래 묵혀 두지 않고 바로 첫걸음을 떼는 편이라, 주변에서 '벌써 시작했어?'라는 말을 자주 들어요. 새로운 장소와 사람, 처음 해 보는 취미 앞에서 걱정보다 설렘이 먼저 앞서고, 완벽하게 준비되지 않아도 해 보면서 배우는 걸 더 즐기는 사람이에요.",
        strengths: ["망설임 없는 실행력", "새로운 것을 반기는 호기심", "분위기를 띄우는 밝은 에너지"],
        cautions: [
          "시작한 일이 많아 마무리가 뒤로 밀리기 쉬워요.",
          "흥미가 식으면 금방 다른 곳으로 눈이 가요.",
          "계획 없이 달리다 체력이 먼저 바닥날 수 있어요.",
        ],
        bestMatch: {
          id: "first-quarter",
          reason: "초승달이 새 판을 열면 상현달이 그 판을 끝까지 키워 줘요. 시작과 지속이 딱 맞물리는 조합이에요.",
        },
        hardMatch: {
          id: "last-quarter",
          reason:
            "한창 벌이고 싶은 초승달과 하나씩 줄이고 싶은 하현달은 속도가 달라 답답함을 느끼기 쉬워요. 하현달의 정리 감각을 빌리면 시작한 일이 끝까지 가요.",
        },
        tips: ["오늘 시작한 일 하나에 '언제까지'를 정해 두기", "새로 알게 된 것을 짧게 메모로 남겨 두기"],
      },
    },
    {
      id: "first-quarter",
      emoji: "🌓",
      image: { src: "/quiz/moon-phase/first-quarter.webp", aspect: "aspect-[292/257]" },
      title: "성장하는 상현달형",
      subtitle: "꾸준히 쌓아가는 타입",
      description:
        "한번 꽂히면 꾸준히 몰입해서 발전시키는 타입이에요. 화려하진 않아도, 차근차근 쌓아가는 성실함이 무기예요.",
      color: "#C7D2FE",
      detail: {
        more: "눈에 띄는 한 방보다 매일 조금씩 쌓이는 변화를 믿는 사람이에요. 한번 정한 목표는 쉽게 내려놓지 않고, 어제보다 나아진 오늘에서 뿌듯함을 느껴요. 묵묵히 하다 보면 어느새 주변에서 '그거 언제 그렇게 늘었어?' 하는 이야기를 듣는 타입이에요.",
        strengths: ["꾸준함과 끈기", "계획을 세우고 지키는 성실함", "작은 성장도 알아보는 눈"],
        cautions: [
          "완벽하게 준비하려다 시작이 늦어질 수 있어요.",
          "결과가 더디게 보일 때 혼자 조급해지기 쉬워요.",
          "쉬는 시간에도 괜히 죄책감을 느낄 때가 있어요.",
        ],
        bestMatch: {
          id: "waxing-crescent",
          reason: "초승달의 번뜩이는 시작에 상현달의 꾸준함이 더해지면 아이디어가 결과물로 남아요.",
        },
        hardMatch: {
          id: "full-moon",
          reason:
            "한 번에 화끈하게 쏟아붓는 보름달과 차곡차곡 쌓는 상현달은 속도 차이로 엇갈리기 쉬워요. 보름달의 추진력을 빌리면 쌓아 온 것이 한 번에 도약할 수 있어요.",
        },
        tips: ["이번 주에 쌓은 것 세 가지를 적어 보기", "계획표에 '쉬는 칸'을 하나 넣어 두기"],
      },
    },
    {
      id: "full-moon",
      emoji: "🌕",
      image: { src: "/quiz/moon-phase/full-moon.webp", aspect: "aspect-[293/257]" },
      title: "폭발하는 보름달형",
      subtitle: "에너지 최고조인 타입",
      description: "지금이 에너지 절정인 타입이에요. 확실하게 표현하고 화끈하게 발산하는, 존재감 넘치는 타입이에요.",
      color: "#FDE68A",
      detail: {
        more: "기분도 생각도 숨기지 않고 크게 드러내는 편이라, 있는 자리마다 분위기가 환해져요. 하고 싶은 일이 생기면 지금 바로 해야 직성이 풀리고, 사람들과 어울리며 에너지를 얻어요. 무언가를 마무리 짓기 직전의 마지막 스퍼트에서 특히 강한 사람이에요.",
        strengths: ["숨김없는 솔직함과 표현력", "사람을 끌어당기는 존재감", "결정적인 순간의 폭발적인 추진력"],
        cautions: [
          "에너지를 한꺼번에 쓰고 금방 방전되기 쉬워요.",
          "감정이 큰 만큼 말이 생각보다 앞설 때가 있어요.",
          "혼자 쉬는 시간이 부족해지기 쉬워요.",
        ],
        bestMatch: {
          id: "new-moon",
          reason:
            "환하게 발산하는 보름달과 조용히 품어 주는 그믐달은 서로에게 없는 것을 채워 줘요. 보름달이 지쳤을 때 가장 편안한 쉼터가 되어 주는 사이예요.",
        },
        hardMatch: {
          id: "last-quarter",
          reason:
            "더 벌이고 싶은 보름달과 줄이고 싶은 하현달은 우선순위가 달라 부딪히기 쉬워요. 하현달의 차분함을 빌리면 에너지가 덜 새요.",
        },
        tips: ["오늘 에너지를 쓸 곳 하나만 골라 집중하기", "잠들기 전 10분은 혼자만의 시간으로 비워 두기"],
      },
    },
    {
      id: "last-quarter",
      emoji: "🌗",
      image: { src: "/quiz/moon-phase/last-quarter.webp", aspect: "aspect-[292/257]" },
      title: "정리하는 하현달형",
      subtitle: "비워내고 다듬는 타입",
      description:
        "하나씩 정리하고 재정비하는 시기를 보내는 타입이에요. 차분하게 마무리 짓는 걸 중요하게 여기는 사람이에요.",
      color: "#DDD6FE",
      detail: {
        more: "쌓아 둔 것을 하나씩 돌아보며 꼭 필요한 것과 내려놓을 것을 가려내는 데 능한 사람이에요. 방 정리든 관계든 일이든, 비워 낸 자리가 생겨야 다음이 보인다고 믿어요. 겉으로는 조용해 보여도 머릿속에서는 다음 단계를 위한 정리가 착착 진행되고 있어요.",
        strengths: ["핵심만 남기는 정리력", "감정에 휩쓸리지 않는 차분함", "끝까지 마무리하는 책임감"],
        cautions: [
          "새로운 제안에 처음엔 조심스럽게만 반응하기 쉬워요.",
          "혼자 결론을 내리고 말을 아낄 때가 있어요.",
          "정리가 길어져 다음 시작 타이밍을 놓칠 수 있어요.",
        ],
        bestMatch: {
          id: "new-moon",
          reason:
            "정리를 마친 하현달과 재충전 중인 그믐달은 속도가 비슷해 함께 있으면 편안해요. 다음 시작을 같이 준비하기 좋은 짝이에요.",
        },
        hardMatch: {
          id: "full-moon",
          reason:
            "한창 쏟아내고 싶은 보름달과 덜어내고 싶은 하현달은 우선순위가 엇갈리기 쉬워요. 보름달의 에너지 덕분에 미뤄 둔 시작을 하게 될 수도 있어요.",
        },
        tips: ["안 쓰는 물건 하나를 정리하거나 필요한 사람에게 나누기", "이번 달에 끝낸 일을 스스로 칭찬해 주기"],
      },
    },
    {
      id: "new-moon",
      emoji: "🌑",
      image: { src: "/quiz/moon-phase/new-moon.webp", aspect: "aspect-[292/257]" },
      title: "재충전하는 그믐달형",
      subtitle: "조용히 내면에 집중하는 타입",
      description:
        "지금은 조용히 혼자 재충전하는 시기인 타입이에요. 겉으로 잘 드러내지 않아도, 다음 시작을 위해 에너지를 모으고 있어요.",
      color: "#E5E7EB",
      detail: {
        more: "겉으로 잘 드러나지 않을 뿐, 마음속에서는 생각과 감정이 천천히 정리되고 있는 시기예요. 많은 사람보다 믿을 수 있는 몇 사람, 북적이는 자리보다 조용한 공간에서 회복하는 사람이에요. 달이 다시 차오르기 직전의 가장 어두운 밤처럼, 지금의 쉼이 다음 시작의 힘이 돼요.",
        strengths: ["깊이 생각하는 힘", "혼자서도 단단한 회복력", "사람의 마음을 섬세하게 읽는 공감력"],
        cautions: [
          "속마음을 잘 표현하지 않아 오해를 사기 쉬워요.",
          "혼자만의 동굴에 오래 머물면 연락이 뜸해질 수 있어요.",
          "지친 걸 스스로 늦게 알아챌 때가 있어요.",
        ],
        bestMatch: {
          id: "full-moon",
          reason: "조용히 들어 주는 그믐달과 환하게 이야기하는 보름달은 서로에게 없는 빛을 나눠 줘요.",
        },
        hardMatch: {
          id: "waxing-crescent",
          reason:
            "당장 새로 시작하고 싶은 초승달의 속도가 쉬고 싶은 그믐달에게는 버겁게 느껴질 수 있어요. 마음이 준비되면 초승달이 가장 든든한 시동이 되어 줘요.",
        },
        tips: ["오늘 30분은 알림을 끄고 온전히 쉬기", "고마운 사람 한 명에게 짧은 안부 보내기"],
      },
    },
  ],
};

export default quiz;

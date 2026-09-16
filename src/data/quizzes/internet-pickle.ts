import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "internet-pickle",
  emoji: "🥒",
  title: "인터넷 절임 지수 테스트",
  description:
    "나는 인터넷에 얼마나 절여졌을까? 6개 질문으로 알아보는 나의 인터넷 중독 유형.",
  accentColor: "#22c55e",
  questions: [
    {
      id: "q1",
      text: "새벽 3시, 나도 모르게 하고 있는 행동은?",
      options: [
        { text: "그 시간엔 자고 있음", scores: { newborn: 2 } },
        { text: "인스타 릴스 무한 스크롤", scores: { casual: 2 } },
        { text: "커뮤니티 새 글 새로고침 중", scores: { deep: 2 } },
        { text: "밈 짤 3개 만들어서 단톡방에 투척", scores: { terminal: 2 } },
      ],
    },
    {
      id: "q2",
      text: "친구가 '이거 알아?' 하면서 밈을 보여줬다. 내 반응은?",
      options: [
        { text: "그게 뭔데? 처음 봐", scores: { newborn: 2 } },
        { text: "아 그거? 봤어", scores: { casual: 2 } },
        { text: "원본은 이거고 파생짤만 20개임", scores: { deep: 2 } },
        { text: "그 밈 내가 어제 만든 거임", scores: { terminal: 2 } },
      ],
    },
    {
      id: "q3",
      text: "단체 카톡방에서 내 포지션은?",
      options: [
        { text: "읽씹 전문, 알림도 꺼둠", scores: { newborn: 2 } },
        { text: "가끔 이모티콘으로 리액션", scores: { casual: 2 } },
        { text: "드립 받아치는 전담반", scores: { deep: 2 } },
        { text: "대화 흐름을 내가 다 짜고 있음", scores: { terminal: 2 } },
      ],
    },
    {
      id: "q4",
      text: "'뇌절'이라는 단어를 들으면?",
      options: [
        { text: "무슨 외계어인지 모르겠음", scores: { newborn: 2 } },
        { text: "어감으로 대충 뜻은 앎", scores: { casual: 2 } },
        { text: "정확한 어원이랑 용례까지 설명 가능", scores: { deep: 2 } },
        { text: "이미 내가 뇌절의 최종 보스임", scores: { terminal: 2 } },
      ],
    },
    {
      id: "q5",
      text: "새로운 SNS 앱이 떴다. 나는?",
      options: [
        { text: "굳이 안 깔아도 되지 않나", scores: { newborn: 2 } },
        { text: "친구들 다 하면 그때 깔아봄", scores: { casual: 2 } },
        { text: "베타 열리자마자 가입해서 정착", scores: { deep: 2 } },
        { text: "이미 그 앱 트렌드를 내가 주도하는 중", scores: { terminal: 2 } },
      ],
    },
    {
      id: "q6",
      text: "폰 스크린타임을 봤을 때 내 감정은?",
      options: [
        { text: "숫자가 생각보다 적어서 뿌듯함", scores: { newborn: 2 } },
        { text: "이 정도면 평범하지 뭐", scores: { casual: 2 } },
        { text: "습관적으로 창을 닫고 안 봄", scores: { deep: 2 } },
        { text: "스크린타임 앱을 지웠음. 알 필요 없음", scores: { terminal: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "newborn",
      emoji: "🐣",
      title: "인터넷 순수 신생아",
      subtitle: "밈이 뭔지도 모르는 청정 지역 주민",
      description:
        "SNS보다 현생이 훨씬 바쁜 타입이에요. 유행어를 반 박자 늦게 알아도 전혀 안 쪽팔려 해도 됩니다 — 오히려 그게 매력이에요. 가끔 친구가 보여주는 밈에 '그게 뭔데 ㅋㅋ' 하면서 웃어주면 그걸로 충분합니다.",
      color: "#FDE68A",
    },
    {
      id: "casual",
      emoji: "📱",
      title: "알잘딱 캐주얼러",
      subtitle: "필요한 만큼만 절여진 밸런스형 인터넷 유저",
      description:
        "유행은 놓치지 않되 거기에 잠식되진 않는 타입이에요. 친구들 대화에 낄 정도의 밈 지식은 갖췄지만, 밤새 커뮤니티를 파고들진 않습니다. 인터넷과 현생 사이 균형을 가장 잘 잡는 유형이에요.",
      color: "#93C5FD",
    },
    {
      id: "deep",
      emoji: "🧠",
      title: "밈 마스터",
      subtitle: "밈의 원본과 계보를 줄줄 꿰고 있는 인터넷 원주민",
      description:
        "웬만한 유행어의 어원과 원본 출처까지 설명할 수 있는 수준이에요. 친구들이 모르는 밈을 보여주면 오히려 당신이 해설을 해주는 쪽이죠. 이미 절반은 인터넷에 살고 있습니다.",
      color: "#C4B5FD",
    },
    {
      id: "terminal",
      emoji: "💀",
      title: "인터넷 그 자체",
      subtitle: "유행을 따라가는 게 아니라 만들어내는 수준",
      description:
        "밈을 소비하는 게 아니라 생산하는 단계에 도달했어요. 당신이 무심코 던진 드립이 다음 주 유행어가 될 수도 있습니다. 스크린타임 숫자는 이제 당신에게 아무 의미가 없어요.",
      color: "#FCA5A5",
    },
  ],
};

export default quiz;

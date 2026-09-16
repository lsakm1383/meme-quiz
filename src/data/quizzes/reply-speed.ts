import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "reply-speed",
  emoji: "💬",
  title: "카톡 답장 유형 테스트",
  description:
    "나는 카톡 답장이 얼마나 빠를까? 6개 질문으로 알아보는 나의 답장 스타일.",
  accentColor: "#3b82f6",
  questions: [
    {
      id: "q1",
      text: "친구한테 카톡이 왔다. 알림이 뜬 순간 나는?",
      options: [
        { text: "바로 확인하고 답장까지 완료", scores: { instant: 2 } },
        { text: "일단 확인은 하고, 여유될 때 답장", scores: { normal: 2 } },
        { text: "확인했다는 것도 나중에 깨달음", scores: { delayed: 2 } },
        { text: "무슨 알림이 왔었는지도 모름", scores: { ghost: 2 } },
      ],
    },
    {
      id: "q2",
      text: "안 읽은 카톡 숫자가 쌓여있는 걸 봤을 때 내 반응은?",
      options: [
        { text: "숫자 쌓이는 걸 못 참아서 바로 다 확인", scores: { instant: 2 } },
        { text: "시간 날 때 몰아서 정리", scores: { normal: 2 } },
        { text: "숫자 보고도 그냥 넘어감", scores: { delayed: 2 } },
        { text: "숫자 999+가 하나의 인테리어가 됨", scores: { ghost: 2 } },
      ],
    },
    {
      id: "q3",
      text: "'답장 언제 해줄 거야 ㅠㅠ'라는 연락을 받았다",
      options: [
        { text: "어? 방금 답장했는데 또 보냈네", scores: { instant: 2 } },
        { text: "아차 싶어서 바로 답장", scores: { normal: 2 } },
        { text: "그러고 보니 안 했네... 하고 뒤늦게 답장", scores: { delayed: 2 } },
        { text: "그 카톡마저 안 읽음", scores: { ghost: 2 } },
      ],
    },
    {
      id: "q4",
      text: "단체 채팅방에서 내 역할은?",
      options: [
        { text: "질문 올라오면 제일 먼저 답하는 사람", scores: { instant: 2 } },
        { text: "필요한 얘기 나오면 그때 참여", scores: { normal: 2 } },
        { text: "스크롤 내리다가 나중에 몰아서 읽음", scores: { delayed: 2 } },
        { text: "대화가 끝나갈 때쯤 등장하는 유령", scores: { ghost: 2 } },
      ],
    },
    {
      id: "q5",
      text: "'읽씹'이라는 단어를 들으면 내 마음은?",
      options: [
        { text: "나랑은 거리가 먼 얘기", scores: { instant: 2 } },
        { text: "가끔은 그런 적도 있지...", scores: { normal: 2 } },
        { text: "내 얘기인 것 같아서 뜨끔", scores: { delayed: 2 } },
        { text: "그게 바로 나다", scores: { ghost: 2 } },
      ],
    },
    {
      id: "q6",
      text: "누군가 나에게 '연락 좀 잘 받아줘'라고 말한다면?",
      options: [
        { text: "나한테 왜 그런 말을 하지?", scores: { instant: 2 } },
        { text: "가끔 그런 말 듣긴 함", scores: { normal: 2 } },
        { text: "종종 듣는 잔소리다", scores: { delayed: 2 } },
        { text: "매번 듣는 레퍼토리다", scores: { ghost: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "instant",
      emoji: "⚡",
      title: "초스피드 반사신경형",
      subtitle: "메시지 오자마자 답장 완료, 읽씹이 뭔가요",
      description:
        "카톡 알림이 뜨는 순간 이미 답장을 치고 있는 타입이에요. 친구들 사이에서 '연락 제일 잘 되는 애'로 통하지만, 가끔은 본인 시간도 좀 챙기셔도 됩니다.",
      color: "#BFDBFE",
    },
    {
      id: "normal",
      emoji: "🙂",
      title: "적당한 텀 유지형",
      subtitle: "바쁘지 않으면 금방, 바쁘면 나중에",
      description:
        "답장 속도가 그날 컨디션과 스케줄에 따라 달라지는 타입이에요. 무리해서 즉답하지 않아도 관계엔 문제없는, 제일 현실적이고 건강한 답장 습관을 가진 편입니다.",
      color: "#FDE68A",
    },
    {
      id: "delayed",
      emoji: "🐢",
      title: "정신 차리면 하루 지남형",
      subtitle: "읽었는데 깜빡하는 타입, 미워하지 말아주세요",
      description:
        "악의는 없는데 결과적으로 늦는 타입이에요. '읽씹'이 아니라 '읽었는데 깜빡'이라는 걸 친구들이 알아줬으면 하는 마음, 다들 알고 있을 거예요.",
      color: "#FDBA74",
    },
    {
      id: "ghost",
      emoji: "👻",
      title: "전설의 읽씹러",
      subtitle: "1은 사라졌는데 답장은 실종 상태",
      description:
        "1이 사라지는 순간 그 메시지는 기억 저편으로 사라져요. 친구들 사이에서 '연락하면 반은 포기해야 하는 애'로 유명하지만, 그마저도 매력이라고 우겨봅니다.",
      color: "#DDD6FE",
    },
  ],
};

export default quiz;

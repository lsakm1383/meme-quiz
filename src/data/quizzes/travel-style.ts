import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "travel-style",
  emoji: "✈️",
  title: "여행 스타일 유형 테스트",
  description:
    "나는 여행 갈 때 어떤 사람일까? 6개 질문으로 알아보는 나의 여행 유형.",
  accentColor: "#14b8a6",
  questions: [
    {
      id: "q1",
      text: "여행 가기 한 달 전, 나는?",
      options: [
        { text: "일정표를 시간 단위로 짜고 있음", scores: { planner: 2 } },
        { text: "가고 싶은 곳 몇 군데만 정리해둠", scores: { balanced: 2 } },
        { text: "아직 어디 갈지도 안 정함", scores: { spontaneous: 2 } },
        { text: "숙소 예약하고 그냥 쉴 생각만 함", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q2",
      text: "여행지에 도착한 첫날, 나의 행동은?",
      options: [
        { text: "미리 짜둔 코스대로 바로 움직임", scores: { planner: 2 } },
        { text: "대략적인 동선만 보고 걷기 시작", scores: { balanced: 2 } },
        { text: "발길 닿는 대로 걸으며 즉흥적으로 정함", scores: { spontaneous: 2 } },
        { text: "숙소에서 짐 풀고 늘어짐", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q3",
      text: "맛집을 찾을 때 나는?",
      options: [
        { text: "블로그·리뷰 다 비교해서 미리 리스트업", scores: { planner: 2 } },
        { text: "대충 평점 좋은 곳 한두 군데만 체크", scores: { balanced: 2 } },
        { text: "걷다가 눈에 띄는 곳 아무데나 들어감", scores: { spontaneous: 2 } },
        { text: "숙소 근처 배달 앱부터 켬", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q4",
      text: "여행 중 예상치 못한 변수(우천, 일정 취소 등)가 생기면?",
      options: [
        { text: "미리 짜둔 플랜 B로 바로 전환", scores: { planner: 2 } },
        { text: "당황하지만 금방 다른 걸 찾아봄", scores: { balanced: 2 } },
        { text: "오히려 더 재밌는 걸 발견하는 기회로 삼음", scores: { spontaneous: 2 } },
        { text: "잘됐다 싶어서 숙소에 더 머무름", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q5",
      text: "여행 사진첩을 보면 주로 뭐가 많이 찍혀있나?",
      options: [
        { text: "일정표대로 다녀온 관광지 인증샷", scores: { planner: 2 } },
        { text: "그날그날 마음에 든 순간들", scores: { balanced: 2 } },
        { text: "우연히 만난 사람들, 즉흥적인 장면들", scores: { spontaneous: 2 } },
        { text: "숙소 침대, 창밖 풍경, 룸서비스", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q6",
      text: "여행에서 돌아온 후 가장 뿌듯한 순간은?",
      options: [
        { text: "계획한 걸 하나도 빠짐없이 다 해냈을 때", scores: { planner: 2 } },
        { text: "예상 못한 좋은 경험을 하나쯤 건졌을 때", scores: { balanced: 2 } },
        { text: "완전히 새로운 걸 발견했을 때", scores: { spontaneous: 2 } },
        { text: "푹 쉬고 왔다는 사실 자체", scores: { homebody: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "planner",
      emoji: "🗺️",
      title: "분 단위 계획형",
      subtitle: "일정표 없이는 여행이 불안한 타입",
      description:
        "동선, 맛집, 시간까지 미리 다 짜둬야 마음이 편한 타입이에요. 변수 없이 알찬 여행을 만들어내는 능력자지만, 가끔은 일정표를 잠깐 접어두는 것도 여행의 묘미입니다.",
      color: "#99F6E4",
    },
    {
      id: "balanced",
      emoji: "🧭",
      title: "적당히 계획하고 즉흥도 즐기는형",
      subtitle: "큰 틀만 잡고 나머지는 흘러가는 대로",
      description:
        "필수 코스만 정해두고 나머지는 그때그때 결정하는 타입이에요. 계획의 안정감과 즉흥의 재미를 둘 다 챙기는, 제일 지치지 않는 여행 스타일입니다.",
      color: "#FDE68A",
    },
    {
      id: "spontaneous",
      emoji: "🎒",
      title: "몸이 먼저 움직이는 즉흥형",
      subtitle: "계획은 도착해서 생각하는 타입",
      description:
        "일정표 없이 발길 닿는 대로 다니는 타입이에요. 가끔 헤매기도 하지만, 그만큼 예상 못한 순간들을 가장 많이 만나는 여행자이기도 합니다.",
      color: "#FDBA74",
    },
    {
      id: "homebody",
      emoji: "🛋️",
      title: "숙소가 제일 좋은 집순이형",
      subtitle: "여행지보다 침대가 더 그리운 타입",
      description:
        "관광보다 좋은 숙소에서 쉬는 게 목적인 타입이에요. '여행 가서 뭐 했어?'라는 질문에 '그냥 쉬었어'라고 당당히 답할 수 있는, 진짜 휴식을 아는 사람입니다.",
      color: "#C7D2FE",
    },
  ],
};

export default quiz;

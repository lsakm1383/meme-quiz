import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "corporate-cattle",
  emoji: "🐮",
  title: "사축 지수 테스트",
  description:
    "나는 몇 년차 사축(회사+가축)일까? 6개 질문으로 알아보는 나의 직장인 절임 정도.",
  accentColor: "#f97316",
  questions: [
    {
      id: "q1",
      text: "퇴근 5분 전, 팀장이 나를 부른다. 내 심장은?",
      options: [
        { text: "무슨 일이지? 두근두근", scores: { newbie: 2 } },
        { text: "또야... 하지만 일단 감", scores: { balanced: 2 } },
        { text: "심장이 이제 안 뛴다. 무표정으로 감", scores: { burned: 2 } },
        { text: "이미 오늘 야근각 계산 끝냄", scores: { ultimate: 2 } },
      ],
    },
    {
      id: "q2",
      text: "상사가 '이거 급한 거 아니야~' 하며 던진 업무는?",
      options: [
        { text: "오 안 급하구나! 안심", scores: { newbie: 2 } },
        {
          text: "'안 급함 = 오늘까지'인 거 알지만 일단 믿어봄",
          scores: { balanced: 2 },
        },
        { text: "바로 오늘 마감으로 스케줄 잡음", scores: { burned: 2 } },
        { text: "이미 예상하고 어제 밤에 초안 만들어둠", scores: { ultimate: 2 } },
      ],
    },
    {
      id: "q3",
      text: "금요일 저녁, 단톡방에 '월요일 오전 급한 회의' 알림이 왔다",
      options: [
        { text: "무슨 급한 일이지? 걱정됨", scores: { newbie: 2 } },
        { text: "한숨 한 번 쉬고 주말은 주말대로 즐김", scores: { balanced: 2 } },
        { text: "이미 마음은 퇴사임", scores: { burned: 2 } },
        {
          text: "월요일 회의 자료 초안을 금요일 밤에 미리 씀",
          scores: { ultimate: 2 },
        },
      ],
    },
    {
      id: "q4",
      text: "휴가 중에 업무 메시지가 왔다. 나는?",
      options: [
        { text: "휴가 중인데 왜? 하고 당황", scores: { newbie: 2 } },
        { text: "확인만 하고 답은 복귀 후에", scores: { balanced: 2 } },
        { text: "바로 답장하고 처리함, 이미 습관임", scores: { burned: 2 } },
        { text: "애초에 휴가 갈 때 노트북부터 챙김", scores: { ultimate: 2 } },
      ],
    },
    {
      id: "q5",
      text: "회식 자리, 부장님이 '한 잔 더!'를 외친다",
      options: [
        { text: "네! 하고 신나게 마심", scores: { newbie: 2 } },
        { text: "적당히 페이스 조절하며 버팀", scores: { balanced: 2 } },
        { text: "물컵으로 몰래 바꿔치기해서 버팀", scores: { burned: 2 } },
        { text: "이미 대리운전 불러놓고 술은 안 마심", scores: { ultimate: 2 } },
      ],
    },
    {
      id: "q6",
      text: "연차를 쓰겠다고 말할 때 내 마음은?",
      options: [
        { text: "당연한 권리인데 왜 떨리지", scores: { newbie: 2 } },
        { text: "눈치가 좀 보이지만 씀", scores: { balanced: 2 } },
        { text: "묻지도 않은 사유를 미리 준비해둠", scores: { burned: 2 } },
        {
          text: "말 안 하고 그냥 팀 캘린더에 박아둠",
          scores: { ultimate: 2 },
        },
      ],
    },
  ],
  results: [
    {
      id: "newbie",
      emoji: "🐥",
      title: "아직 순수한 신입",
      subtitle: "사회생활에 아직 안 절여진 청정 구역",
      description:
        "회사가 아직 무섭지 않고 상사의 말을 곧이곧대로 믿는 타입이에요. 지금 이 순수함은 오래 가져가도 됩니다 — 대신 '안 급한 일 = 오늘까지'라는 사실 정도는 슬쩍 알아두세요.",
      color: "#BBF7D0",
    },
    {
      id: "balanced",
      emoji: "😐",
      title: "적당히 굴러가는 사원",
      subtitle: "일과 마음의 셔터를 적당히 내릴 줄 아는 타입",
      description:
        "눈치껏 일하고 눈치껏 쉴 줄 아는 균형파예요. 완전히 갈아 넣지도, 완전히 손 놓지도 않는 생존형 직장인이죠. 이 밸런스, 최대한 오래 지키세요.",
      color: "#FDE68A",
    },
    {
      id: "burned",
      emoji: "🥵",
      title: "번아웃 직전 사축",
      subtitle: "몸은 자리에, 마음은 이미 퇴사 절차 진행 중",
      description:
        "무표정으로 야근을 받아들이고 있다면 지금이 재충전 타이밍이에요. 사직서 초안은 마음속에만 넣어두고, 이번 주말엔 진짜로 아무것도 하지 마세요.",
      color: "#FDBA74",
    },
    {
      id: "ultimate",
      emoji: "🐮",
      title: "이미 완전체 사축",
      subtitle: "회사보다 회사 생각을 더 많이 하는 경지",
      description:
        "휴가에도 노트북을 챙기고, 말 안 해도 다음 업무를 미리 예측하는 수준이에요. 이쯤되면 존경스럽지만, 가끔은 노트북을 집에 두고 나오는 연습도 필요합니다.",
      color: "#CBD5E1",
    },
  ],
};

export default quiz;

import type { MbtiQuestion } from "@/data/mbti-types";

// 직장인 시리즈 전용 문항 — questions.ts와 같은 축(E/I,S/N,T/F,J/P)·같은 채점
// 구조를 쓰지만, 회사 생활 상황(회식·보고서·회의·연차 등)으로 시나리오를 입혔다.
const questions: MbtiQuestion[] = [
  // E / I — 에너지 방향
  {
    id: "o-ei-1",
    axisIndex: 0,
    text: "회식 공지가 떴다. 나는?",
    options: [
      { text: "오 좋아, 누구누구 와?", letter: "E" },
      { text: "빠질 핑계부터 찾는다", letter: "I" },
    ],
  },
  {
    id: "o-ei-2",
    axisIndex: 0,
    text: "점심시간엔 보통?",
    options: [
      { text: "여럿이 맛집 탐방", letter: "E" },
      { text: "이어폰 끼고 혼밥", letter: "I" },
    ],
  },
  {
    id: "o-ei-3",
    axisIndex: 0,
    text: "새 팀 발령 첫날, 나는?",
    options: [
      { text: "자리 돌면서 먼저 인사한다", letter: "E" },
      { text: "메신저로 조용히 인사한다", letter: "I" },
    ],
  },
  {
    id: "o-ei-4",
    axisIndex: 0,
    text: "업무 아이디어가 떠오르면?",
    options: [
      { text: "옆자리에 바로 말한다", letter: "E" },
      { text: "정리해서 메일로 보낸다", letter: "I" },
    ],
  },
  {
    id: "o-ei-5",
    axisIndex: 0,
    text: "퇴근 후 스트레스 해소는?",
    options: [
      { text: "동기들이랑 한잔", letter: "E" },
      { text: "집에서 혼자 뒹굴기", letter: "I" },
    ],
  },

  // S / N — 정보를 받아들이는 방식
  {
    id: "o-sn-1",
    axisIndex: 1,
    text: "업무 지시를 받을 때 나는?",
    options: [
      { text: "양식이랑 예시부터 주세요", letter: "S" },
      { text: "목적이랑 방향부터 알려주세요", letter: "N" },
    ],
  },
  {
    id: "o-sn-2",
    axisIndex: 1,
    text: "새 프로젝트를 시작하면?",
    options: [
      { text: "작년 자료부터 찾는다", letter: "S" },
      { text: "새 방식부터 구상한다", letter: "N" },
    ],
  },
  {
    id: "o-sn-3",
    axisIndex: 1,
    text: "회의에서 더 끌리는 얘기는?",
    options: [
      { text: "이번 달 실적 숫자", letter: "S" },
      { text: "3년 뒤 사업 비전", letter: "N" },
    ],
  },
  {
    id: "o-sn-4",
    axisIndex: 1,
    text: "보고서를 쓸 때 나는?",
    options: [
      { text: "데이터랑 근거를 꼼꼼히 채운다", letter: "S" },
      { text: "스토리랑 인사이트 위주로 쓴다", letter: "N" },
    ],
  },
  {
    id: "o-sn-5",
    axisIndex: 1,
    text: "사내 교육은 이게 좋다",
    options: [
      { text: "바로 써먹는 실무 스킬", letter: "S" },
      { text: "업계 트렌드 강연", letter: "N" },
    ],
  },

  // T / F — 판단 기준
  {
    id: "o-tf-1",
    axisIndex: 2,
    text: "동료 실수로 일이 꼬였다. 나는?",
    options: [
      { text: "원인이랑 재발 방지책부터", letter: "T" },
      { text: "\"괜찮아요?\"가 먼저", letter: "F" },
    ],
  },
  {
    id: "o-tf-2",
    axisIndex: 2,
    text: "좋은 평가의 기준은?",
    options: [
      { text: "성과랑 수치", letter: "T" },
      { text: "태도랑 노력", letter: "F" },
    ],
  },
  {
    id: "o-tf-3",
    axisIndex: 2,
    text: "후배가 보고서를 들고 왔다",
    options: [
      { text: "고칠 점부터 눈에 들어온다", letter: "T" },
      { text: "잘한 점부터 말해준다", letter: "F" },
    ],
  },
  {
    id: "o-tf-4",
    axisIndex: 2,
    text: "회의에서 의견이 부딪히면?",
    options: [
      { text: "논리로 끝까지 설득한다", letter: "T" },
      { text: "분위기 봐서 한발 양보한다", letter: "F" },
    ],
  },
  {
    id: "o-tf-5",
    axisIndex: 2,
    text: "팀원이 퇴사 고민을 털어놓으면?",
    options: [
      { text: "현실적인 조언을 해준다", letter: "T" },
      { text: "일단 끝까지 들어준다", letter: "F" },
    ],
  },

  // J / P — 생활 양식
  {
    id: "o-jp-1",
    axisIndex: 3,
    text: "월요일 아침 출근하면?",
    options: [
      { text: "이번 주 할 일 목록부터 쓴다", letter: "J" },
      { text: "일단 메일부터 열어본다", letter: "P" },
    ],
  },
  {
    id: "o-jp-2",
    axisIndex: 3,
    text: "마감이 있는 업무는?",
    options: [
      { text: "미리미리 끝낸다", letter: "J" },
      { text: "전날 몰아서 한다", letter: "P" },
    ],
  },
  {
    id: "o-jp-3",
    axisIndex: 3,
    text: "내 책상은?",
    options: [
      { text: "늘 깔끔하게 정리돼 있다", letter: "J" },
      { text: "쌓여 있어도 어디 뭐 있는지 안다", letter: "P" },
    ],
  },
  {
    id: "o-jp-4",
    axisIndex: 3,
    text: "휴가는?",
    options: [
      { text: "몇 달 전에 연차 계획을 세운다", letter: "J" },
      { text: "\"저 내일 쉬어도 돼요?\"", letter: "P" },
    ],
  },
  {
    id: "o-jp-5",
    axisIndex: 3,
    text: "갑자기 일정이 바뀌면?",
    options: [
      { text: "스트레스 받는다", letter: "J" },
      { text: "오히려 좋아", letter: "P" },
    ],
  },
];

export default questions;

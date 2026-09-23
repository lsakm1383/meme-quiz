import type { MbtiQuestion } from "@/data/mbti-types";

// 게임 포지션 시리즈 전용 문항 — questions.ts와 같은 축(E/I,S/N,T/F,J/P)·같은 채점
// 구조를 쓰지만, MMORPG 플레이 상황(길드·레이드·파티 던전·숙제·거래 등)으로
// 시나리오를 입혀서 다른 두 시리즈와 문항이 겹치지 않게 했다.
const questions: MbtiQuestion[] = [
  // E / I — 에너지 방향
  {
    id: "g-ei-1",
    axisIndex: 0,
    text: "새 길드에 가입한 첫날, 나는?",
    options: [
      { text: "길드 채팅에 먼저 인사하고 바로 말을 섞는다", letter: "E" },
      { text: "조용히 분위기를 보다가 천천히 적응한다", letter: "I" },
    ],
  },
  {
    id: "g-ei-2",
    axisIndex: 0,
    text: "레이드 도중 공략이 떠오르면 나는?",
    options: [
      { text: "바로 디코/보이스로 공대에 말한다", letter: "E" },
      { text: "속으로 정리했다가 트라이 끝나고 말한다", letter: "I" },
    ],
  },
  {
    id: "g-ei-3",
    axisIndex: 0,
    text: "파티 던전 갈 때 나는?",
    options: [
      { text: "자동 매칭으로 모르는 사람이랑 가도 즐겁다", letter: "E" },
      { text: "친한 길드원이나 고정팟이랑만 가고 싶다", letter: "I" },
    ],
  },
  {
    id: "g-ei-4",
    axisIndex: 0,
    text: "접속했는데 딱히 할 게 없을 때 나는?",
    options: [
      { text: "마을 광장이나 길드 하우스에서 수다 떤다", letter: "E" },
      { text: "혼자 생활 콘텐츠나 채집을 한다", letter: "I" },
    ],
  },
  {
    id: "g-ei-5",
    axisIndex: 0,
    text: "길드 정기 모임이나 오프 모임 공지가 뜨면 나는?",
    options: [
      { text: "무조건 참석, 분위기 띄우는 건 내 몫", letter: "E" },
      { text: "게임 안에서만 보는 게 편하다", letter: "I" },
    ],
  },

  // S / N — 정보를 받아들이는 방식
  {
    id: "g-sn-1",
    axisIndex: 1,
    text: "신규 레이드 공략을 볼 때 나는?",
    options: [
      { text: "패턴별 타이밍과 딜 컷 수치부터 확인한다", letter: "S" },
      { text: "보스 기믹의 전체 흐름부터 이해하고 싶다", letter: "N" },
    ],
  },
  {
    id: "g-sn-2",
    axisIndex: 1,
    text: "공대가 같은 페이즈에서 계속 전멸하면 나는?",
    options: [
      { text: "다들 쓰는 정석 공략대로 다시 맞춰본다", letter: "S" },
      { text: "아예 새로운 파훼법을 떠올려보고 싶어진다", letter: "N" },
    ],
  },
  {
    id: "g-sn-3",
    axisIndex: 1,
    text: "대규모 업데이트 소식이 뜨면 먼저 보는 건?",
    options: [
      { text: "보상, 확률, 아이템 수치 변경점", letter: "S" },
      { text: "새 지역 스토리와 세계관 떡밥", letter: "N" },
    ],
  },
  {
    id: "g-sn-4",
    axisIndex: 1,
    text: "새 직업을 키울 때 나는?",
    options: [
      { text: "일단 사냥터에서 직접 굴려보며 손에 익힌다", letter: "S" },
      { text: "스킬 트리와 시너지 구조부터 이해하고 싶다", letter: "N" },
    ],
  },
  {
    id: "g-sn-5",
    axisIndex: 1,
    text: "장비 세팅과 스킬 빌드는?",
    options: [
      { text: "랭커들이 쓰는 검증된 국민 세팅이 편하다", letter: "S" },
      { text: "아무도 안 쓰는 나만의 세팅을 연구하고 싶다", letter: "N" },
    ],
  },

  // T / F — 판단 기준
  {
    id: "g-tf-1",
    axisIndex: 2,
    text: "공대원을 뽑을 때 나는?",
    options: [
      { text: "전투력과 클리어 기록부터 본다", letter: "T" },
      { text: "같이 하면 즐거운 사람인지부터 본다", letter: "F" },
    ],
  },
  {
    id: "g-tf-2",
    axisIndex: 2,
    text: "길드원이 강화 실패로 멘탈이 나갔다면 나는?",
    options: [
      { text: "다음엔 보호 주문서 쓰라고 방법을 알려준다", letter: "T" },
      { text: "\"아 진짜 아깝다ㅠㅠ\" 먼저 같이 슬퍼해준다", letter: "F" },
    ],
  },
  {
    id: "g-tf-3",
    axisIndex: 2,
    text: "레이드 보상 분배로 의견이 갈리면 나는?",
    options: [
      { text: "기여도대로 나누는 게 맞다고 생각한다", letter: "T" },
      { text: "분위기 안 깨지게 서로 양보하는 쪽이 낫다", letter: "F" },
    ],
  },
  {
    id: "g-tf-4",
    axisIndex: 2,
    text: "트라이 끝나고 딜 미터기를 보면 나는?",
    options: [
      { text: "누가 딜 누수가 났는지부터 눈에 들어온다", letter: "T" },
      { text: "다들 고생했다고 먼저 말해주고 싶다", letter: "F" },
    ],
  },
  {
    id: "g-tf-5",
    axisIndex: 2,
    text: "실수가 잦은 길드원이 있을 때 나는?",
    options: [
      { text: "공대 클리어가 우선, 냉정하게 교체를 건의한다", letter: "T" },
      { text: "조금 느려도 같이 데려가서 키워주고 싶다", letter: "F" },
    ],
  },

  // J / P — 생활 양식
  {
    id: "g-jp-1",
    axisIndex: 3,
    text: "일일/주간 숙제는 나는?",
    options: [
      { text: "리셋되자마자 체크리스트대로 다 끝낸다", letter: "J" },
      { text: "하고 싶은 날 몰아서 하거나 가끔 빼먹는다", letter: "P" },
    ],
  },
  {
    id: "g-jp-2",
    axisIndex: 3,
    text: "레이드 공대를 꾸릴 때 나는?",
    options: [
      { text: "요일·시간 정해두고 고정 공대로 간다", letter: "J" },
      { text: "그날 접속한 사람끼리 즉석으로 모인다", letter: "P" },
    ],
  },
  {
    id: "g-jp-3",
    axisIndex: 3,
    text: "기간 한정 이벤트 보상은 나는?",
    options: [
      { text: "첫 주에 미리 다 챙겨둬야 마음이 편하다", letter: "J" },
      { text: "종료 전날 벼락치기로 챙긴다", letter: "P" },
    ],
  },
  {
    id: "g-jp-4",
    axisIndex: 3,
    text: "인벤토리와 창고 정리는 나는?",
    options: [
      { text: "칸마다 종류별로 딱딱 정리해둔다", letter: "J" },
      { text: "꽉 차서 못 줍게 될 때쯤 한 번 정리한다", letter: "P" },
    ],
  },
  {
    id: "g-jp-5",
    axisIndex: 3,
    text: "새 서버 오픈 날 나는?",
    options: [
      { text: "육성 루트와 효율 동선을 미리 짜두고 시작한다", letter: "J" },
      { text: "일단 접속해서 발길 닿는 대로 모험한다", letter: "P" },
    ],
  },
];

export default questions;

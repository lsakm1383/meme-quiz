import type { MbtiQuestion } from "@/data/mbti-types";

// 게임 포지션 시리즈 전용 문항 — questions.ts와 같은 축(E/I,S/N,T/F,J/P)·같은 채점
// 구조를 쓰지만, 게임 플레이 상황으로 시나리오만 새로 입혀서 다른 두 시리즈와
// 문항이 겹치지 않게 했다.
const questions: MbtiQuestion[] = [
  // E / I — 에너지 방향
  {
    id: "g-ei-1",
    axisIndex: 0,
    text: "새로운 파티에 합류했을 때 나는?",
    options: [
      { text: "내가 먼저 말 걸고 분위기를 이끈다", letter: "E" },
      { text: "누군가 말 걸어주길 기다리는 편이다", letter: "I" },
    ],
  },
  {
    id: "g-ei-2",
    axisIndex: 0,
    text: "플레이 중 생각이 떠오르면 나는?",
    options: [
      { text: "바로 채팅이나 보이스로 얘기한다", letter: "E" },
      { text: "속으로 정리한 다음에 얘기한다", letter: "I" },
    ],
  },
  {
    id: "g-ei-3",
    axisIndex: 0,
    text: "함께 플레이할 사람은 나는?",
    options: [
      { text: "다양한 사람들과 넓게 어울리는 게 좋다", letter: "E" },
      { text: "친한 소수와만 깊게 하는 게 좋다", letter: "I" },
    ],
  },
  {
    id: "g-ei-4",
    axisIndex: 0,
    text: "긴 플레이 시간이 끝나면 나는?",
    options: [
      { text: "사람들과 어울려야 스트레스가 풀린다", letter: "E" },
      { text: "혼자 조용히 해야 스트레스가 풀린다", letter: "I" },
    ],
  },
  {
    id: "g-ei-5",
    axisIndex: 0,
    text: "작전 타임에서 나는?",
    options: [
      { text: "적극적으로 의견을 내며 분위기를 띄운다", letter: "E" },
      { text: "조용히 듣다가 필요할 때만 말한다", letter: "I" },
    ],
  },

  // S / N — 정보를 받아들이는 방식
  {
    id: "g-sn-1",
    axisIndex: 1,
    text: "공략법을 설명 들을 때 나는?",
    options: [
      { text: "구체적인 수치와 예시가 있어야 이해된다", letter: "S" },
      { text: "전체적인 컨셉과 흐름부터 파악하고 싶다", letter: "N" },
    ],
  },
  {
    id: "g-sn-2",
    axisIndex: 1,
    text: "막힌 구간을 뚫어야 할 때 나는?",
    options: [
      { text: "예전에 통했던 검증된 방법을 먼저 쓴다", letter: "S" },
      { text: "새로운 공략법을 떠올려 보고 싶어진다", letter: "N" },
    ],
  },
  {
    id: "g-sn-3",
    axisIndex: 1,
    text: "더 끌리는 콘텐츠는?",
    options: [
      { text: "지금 바로 보상이 나오는 실용적인 콘텐츠", letter: "S" },
      { text: "세계관이나 스토리에 대한 떡밥", letter: "N" },
    ],
  },
  {
    id: "g-sn-4",
    axisIndex: 1,
    text: "새 캐릭터를 익힐 때 나는?",
    options: [
      { text: "직접 플레이하면서 익히는 게 빠르다", letter: "S" },
      { text: "먼저 스킬 원리부터 이해하고 싶다", letter: "N" },
    ],
  },
  {
    id: "g-sn-5",
    axisIndex: 1,
    text: "익숙한 조합과 새로운 조합 중",
    options: [
      { text: "이미 검증된 조합이 마음 편하다", letter: "S" },
      { text: "남들 안 쓰는 독창적인 조합에 끌린다", letter: "N" },
    ],
  },

  // T / F — 판단 기준
  {
    id: "g-tf-1",
    axisIndex: 2,
    text: "팀 전략을 정할 때 나는?",
    options: [
      { text: "감정을 배제하고 데이터로 판단한다", letter: "T" },
      { text: "팀원들 컨디션을 먼저 헤아린다", letter: "F" },
    ],
  },
  {
    id: "g-tf-2",
    axisIndex: 2,
    text: "팀원이 힘들다고 털어놓으면 나는?",
    options: [
      { text: "원인을 분석하고 해결책을 제시한다", letter: "T" },
      { text: "일단 공감하고 위로부터 해준다", letter: "F" },
    ],
  },
  {
    id: "g-tf-3",
    axisIndex: 2,
    text: "전략 의견이 갈릴 때 나는?",
    options: [
      { text: "논리적으로 따져서 맞는 쪽을 가리고 싶다", letter: "T" },
      { text: "굳이 부딪히지 않고 맞춰주는 편이다", letter: "F" },
    ],
  },
  {
    id: "g-tf-4",
    axisIndex: 2,
    text: "팀원의 플레이를 볼 때 나는?",
    options: [
      { text: "부족한 점부터 눈에 들어온다", letter: "T" },
      { text: "잘한 점을 먼저 칭찬해주고 싶다", letter: "F" },
    ],
  },
  {
    id: "g-tf-5",
    axisIndex: 2,
    text: "한번 정한 전략은 나는?",
    options: [
      { text: "타당하면 반대가 있어도 밀고 나간다", letter: "T" },
      { text: "팀원들이 힘들어하면 다시 고려한다", letter: "F" },
    ],
  },

  // J / P — 생활 양식
  {
    id: "g-jp-1",
    axisIndex: 3,
    text: "플레이 일정은 나는?",
    options: [
      { text: "미리 계획하고 그대로 지켜야 마음이 편하다", letter: "J" },
      { text: "상황에 맞춰 유동적으로 움직이는 게 편하다", letter: "P" },
    ],
  },
  {
    id: "g-jp-2",
    axisIndex: 3,
    text: "긴 원정을 떠날 때 나는?",
    options: [
      { text: "동선과 타임라인을 촘촘하게 짜고 움직인다", letter: "J" },
      { text: "큰 틀만 정하고 즉흥적으로 움직인다", letter: "P" },
    ],
  },
  {
    id: "g-jp-3",
    axisIndex: 3,
    text: "마감이 있는 이벤트는 나는?",
    options: [
      { text: "여유 있게 미리 끝내놔야 안심된다", letter: "J" },
      { text: "마감이 다가와야 오히려 집중이 잘 된다", letter: "P" },
    ],
  },
  {
    id: "g-jp-4",
    axisIndex: 3,
    text: "매 판 루틴은 나는?",
    options: [
      { text: "정해진 순서대로 움직이는 게 편하다", letter: "J" },
      { text: "그때그때 하고 싶은 걸 하는 게 편하다", letter: "P" },
    ],
  },
  {
    id: "g-jp-5",
    axisIndex: 3,
    text: "새로운 게임을 시작할 때 나는?",
    options: [
      { text: "공략과 방법을 먼저 정리하고 시작한다", letter: "J" },
      { text: "일단 부딪혀보면서 방법을 찾아간다", letter: "P" },
    ],
  },
];

export default questions;

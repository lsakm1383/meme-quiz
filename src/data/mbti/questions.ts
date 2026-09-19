import type { MbtiQuestion } from "@/data/mbti-types";

// 축(E/I, S/N, T/F, J/P)당 5문항씩 20문항. 실제 MBTI Form Q가 각 선호지표를
// 5가지 다면척도로 세분화해 측정하는 구조를 참고했지만, 문항 문구 자체는 새로 썼다.
const questions: MbtiQuestion[] = [
  // E / I — 에너지 방향
  {
    id: "ei-1",
    axisIndex: 0,
    text: "낯선 모임에 가면 나는?",
    options: [
      { text: "내가 먼저 말 걸고 분위기를 이끈다", letter: "E" },
      { text: "누가 먼저 말 걸어주길 기다린다", letter: "I" },
    ],
  },
  {
    id: "ei-2",
    axisIndex: 0,
    text: "생각이나 감정을 표현할 때 나는?",
    options: [
      { text: "떠오르는 대로 바로 말하는 편이다", letter: "E" },
      { text: "속으로 정리한 다음에 말하는 편이다", letter: "I" },
    ],
  },
  {
    id: "ei-3",
    axisIndex: 0,
    text: "인간관계에서 나는?",
    options: [
      { text: "다양한 사람들과 넓게 어울리는 게 좋다", letter: "E" },
      { text: "소수와 깊게 지내는 게 좋다", letter: "I" },
    ],
  },
  {
    id: "ei-4",
    axisIndex: 0,
    text: "주말에 방전된 에너지를 채우려면?",
    options: [
      { text: "사람들 만나서 놀아야 충전된다", letter: "E" },
      { text: "혼자 조용히 쉬어야 충전된다", letter: "I" },
    ],
  },
  {
    id: "ei-5",
    axisIndex: 0,
    text: "회의나 모임에서 나는?",
    options: [
      { text: "적극적으로 리액션하며 분위기를 띄운다", letter: "E" },
      { text: "조용히 듣다가 필요할 때만 말한다", letter: "I" },
    ],
  },

  // S / N — 정보를 받아들이는 방식
  {
    id: "sn-1",
    axisIndex: 1,
    text: "설명을 들을 때 나는?",
    options: [
      { text: "구체적인 예시와 사실이 있어야 이해된다", letter: "S" },
      { text: "전체적인 개념과 의미부터 파악하고 싶다", letter: "N" },
    ],
  },
  {
    id: "sn-2",
    axisIndex: 1,
    text: "문제를 해결할 때 나는?",
    options: [
      { text: "예전에 통했던 검증된 방법을 먼저 쓴다", letter: "S" },
      { text: "새로운 방법을 떠올려 보고 싶어진다", letter: "N" },
    ],
  },
  {
    id: "sn-3",
    axisIndex: 1,
    text: "더 관심 가는 이야기는?",
    options: [
      { text: "지금 당장 써먹을 수 있는 실용적인 정보", letter: "S" },
      { text: "미래나 가능성에 대한 아이디어", letter: "N" },
    ],
  },
  {
    id: "sn-4",
    axisIndex: 1,
    text: "새로운 걸 배울 때 나는?",
    options: [
      { text: "직접 해보면서 배우는 게 빠르다", letter: "S" },
      { text: "먼저 원리나 흐름을 이해하고 싶다", letter: "N" },
    ],
  },
  {
    id: "sn-5",
    axisIndex: 1,
    text: "익숙한 방식과 새로운 방식 중",
    options: [
      { text: "이미 검증된 방식이 편하다", letter: "S" },
      { text: "남들과 다른 독창적인 방식에 끌린다", letter: "N" },
    ],
  },

  // T / F — 판단 기준
  {
    id: "tf-1",
    axisIndex: 2,
    text: "결정을 내릴 때 나는?",
    options: [
      { text: "감정을 배제하고 논리적으로 판단한다", letter: "T" },
      { text: "관련된 사람들의 마음을 먼저 헤아린다", letter: "F" },
    ],
  },
  {
    id: "tf-2",
    axisIndex: 2,
    text: "친구가 고민을 털어놓으면 나는?",
    options: [
      { text: "원인을 분석하고 해결책을 제시한다", letter: "T" },
      { text: "일단 공감하고 위로부터 해준다", letter: "F" },
    ],
  },
  {
    id: "tf-3",
    axisIndex: 2,
    text: "의견이 다를 때 나는?",
    options: [
      { text: "논리적으로 따져서 맞는 쪽을 가리고 싶다", letter: "T" },
      { text: "굳이 부딪히지 않고 맞춰주는 편이다", letter: "F" },
    ],
  },
  {
    id: "tf-4",
    axisIndex: 2,
    text: "다른 사람의 결과물을 볼 때 나는?",
    options: [
      { text: "부족한 점부터 눈에 들어온다", letter: "T" },
      { text: "잘한 점을 먼저 칭찬해주고 싶다", letter: "F" },
    ],
  },
  {
    id: "tf-5",
    axisIndex: 2,
    text: "한번 정한 결정은?",
    options: [
      { text: "타당하면 반대가 있어도 밀고 나간다", letter: "T" },
      { text: "사람들이 힘들어하면 다시 고려한다", letter: "F" },
    ],
  },

  // J / P — 생활 양식
  {
    id: "jp-1",
    axisIndex: 3,
    text: "일정 관리는 나는?",
    options: [
      { text: "미리 계획하고 그대로 지켜야 마음이 편하다", letter: "J" },
      { text: "상황에 맞춰 유동적으로 움직이는 게 편하다", letter: "P" },
    ],
  },
  {
    id: "jp-2",
    axisIndex: 3,
    text: "여행을 갈 때 나는?",
    options: [
      { text: "일정표를 촘촘하게 짜고 움직인다", letter: "J" },
      { text: "큰 틀만 정하고 즉흥적으로 다닌다", letter: "P" },
    ],
  },
  {
    id: "jp-3",
    axisIndex: 3,
    text: "마감이 있는 일은 나는?",
    options: [
      { text: "여유 있게 미리 끝내놔야 안심된다", letter: "J" },
      { text: "마감이 다가와야 오히려 집중이 잘 된다", letter: "P" },
    ],
  },
  {
    id: "jp-4",
    axisIndex: 3,
    text: "하루 일과는 나는?",
    options: [
      { text: "정해진 루틴대로 움직이는 게 편하다", letter: "J" },
      { text: "그때그때 하고 싶은 걸 하는 게 편하다", letter: "P" },
    ],
  },
  {
    id: "jp-5",
    axisIndex: 3,
    text: "새로운 일을 시작할 때 나는?",
    options: [
      { text: "순서와 방법을 먼저 정리하고 시작한다", letter: "J" },
      { text: "일단 부딪혀보면서 방법을 찾아간다", letter: "P" },
    ],
  },
];

export default questions;

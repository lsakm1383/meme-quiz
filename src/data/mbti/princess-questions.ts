import type { MbtiQuestion } from "@/data/mbti-types";

// 공주 시리즈 전용 문항 — questions.ts와 같은 축(E/I,S/N,T/F,J/P)·같은 채점 구조를
// 쓰지만, 동화 속 상황으로 시나리오만 새로 입혀서 다른 두 시리즈와 문항이 겹치지 않게 했다.
const questions: MbtiQuestion[] = [
  // E / I — 에너지 방향
  {
    id: "p-ei-1",
    axisIndex: 0,
    text: "성에서 무도회가 열렸다면 나는?",
    options: [
      { text: "먼저 다가가 말을 걸며 분위기를 이끈다", letter: "E" },
      { text: "구석에서 조용히 분위기를 지켜본다", letter: "I" },
    ],
  },
  {
    id: "p-ei-2",
    axisIndex: 0,
    text: "마음이 요동칠 때 나는?",
    options: [
      { text: "떠오르는 대로 바로 마음을 표현한다", letter: "E" },
      { text: "혼자 마음을 정리한 뒤에 표현한다", letter: "I" },
    ],
  },
  {
    id: "p-ei-3",
    axisIndex: 0,
    text: "성안 사람들과 지내는 나는?",
    options: [
      { text: "여러 사람과 두루두루 어울리는 게 좋다", letter: "E" },
      { text: "믿을 수 있는 소수와 깊게 지내는 게 좋다", letter: "I" },
    ],
  },
  {
    id: "p-ei-4",
    axisIndex: 0,
    text: "고된 하루를 보낸 밤, 나는?",
    options: [
      { text: "누군가와 함께 있어야 마음이 채워진다", letter: "E" },
      { text: "혼자만의 시간이 있어야 마음이 채워진다", letter: "I" },
    ],
  },
  {
    id: "p-ei-5",
    axisIndex: 0,
    text: "궁정의 모임 자리에서 나는?",
    options: [
      { text: "적극적으로 나서서 분위기를 띄운다", letter: "E" },
      { text: "조용히 듣다가 필요할 때만 말한다", letter: "I" },
    ],
  },

  // S / N — 정보를 받아들이는 방식
  {
    id: "p-sn-1",
    axisIndex: 1,
    text: "낯선 소식을 전해 들을 때 나는?",
    options: [
      { text: "구체적인 사실과 예시가 있어야 이해된다", letter: "S" },
      { text: "전체적인 의미부터 파악하고 싶다", letter: "N" },
    ],
  },
  {
    id: "p-sn-2",
    axisIndex: 1,
    text: "숲을 헤쳐나가야 할 때 나는?",
    options: [
      { text: "예전에 통했던 검증된 길을 먼저 택한다", letter: "S" },
      { text: "가보지 않은 새로운 길이 궁금해진다", letter: "N" },
    ],
  },
  {
    id: "p-sn-3",
    axisIndex: 1,
    text: "더 마음이 가는 이야기는?",
    options: [
      { text: "지금 당장 쓸모 있는 실용적인 이야기", letter: "S" },
      { text: "먼 훗날이나 가능성에 대한 이야기", letter: "N" },
    ],
  },
  {
    id: "p-sn-4",
    axisIndex: 1,
    text: "새로운 재주를 익힐 때 나는?",
    options: [
      { text: "직접 해보면서 배우는 게 빠르다", letter: "S" },
      { text: "먼저 원리나 흐름을 이해하고 싶다", letter: "N" },
    ],
  },
  {
    id: "p-sn-5",
    axisIndex: 1,
    text: "익숙한 방식과 낯선 방식 중",
    options: [
      { text: "이미 검증된 방식이 마음 편하다", letter: "S" },
      { text: "남들과 다른 독창적인 방식에 끌린다", letter: "N" },
    ],
  },

  // T / F — 판단 기준
  {
    id: "p-tf-1",
    axisIndex: 2,
    text: "중요한 결정을 내려야 할 때 나는?",
    options: [
      { text: "감정을 배제하고 이치를 따져 판단한다", letter: "T" },
      { text: "곁에 있는 이들의 마음을 먼저 헤아린다", letter: "F" },
    ],
  },
  {
    id: "p-tf-2",
    axisIndex: 2,
    text: "누군가 힘든 사정을 털어놓으면 나는?",
    options: [
      { text: "원인을 짚어보고 해결책을 제안한다", letter: "T" },
      { text: "일단 마음부터 다독여준다", letter: "F" },
    ],
  },
  {
    id: "p-tf-3",
    axisIndex: 2,
    text: "생각이 엇갈릴 때 나는?",
    options: [
      { text: "이치를 따져서 옳은 쪽을 가리고 싶다", letter: "T" },
      { text: "굳이 부딪히지 않고 맞춰주는 편이다", letter: "F" },
    ],
  },
  {
    id: "p-tf-4",
    axisIndex: 2,
    text: "누군가의 정성을 볼 때 나는?",
    options: [
      { text: "부족한 부분이 먼저 눈에 들어온다", letter: "T" },
      { text: "애쓴 부분을 먼저 알아봐주고 싶다", letter: "F" },
    ],
  },
  {
    id: "p-tf-5",
    axisIndex: 2,
    text: "한번 마음먹은 일은 나는?",
    options: [
      { text: "옳다고 믿으면 반대가 있어도 밀고 나간다", letter: "T" },
      { text: "주변이 힘들어하면 다시 헤아려본다", letter: "F" },
    ],
  },

  // J / P — 생활 양식
  {
    id: "p-jp-1",
    axisIndex: 3,
    text: "하루를 보낼 때 나는?",
    options: [
      { text: "미리 정해둔 대로 움직여야 마음이 편하다", letter: "J" },
      { text: "상황에 맞춰 유동적으로 움직이는 게 편하다", letter: "P" },
    ],
  },
  {
    id: "p-jp-2",
    axisIndex: 3,
    text: "먼 길을 떠날 때 나는?",
    options: [
      { text: "가는 길과 일정을 촘촘하게 정해둔다", letter: "J" },
      { text: "큰 방향만 정하고 즉흥적으로 움직인다", letter: "P" },
    ],
  },
  {
    id: "p-jp-3",
    axisIndex: 3,
    text: "정해진 기한이 있는 일은 나는?",
    options: [
      { text: "여유 있게 미리 끝내둬야 안심이 된다", letter: "J" },
      { text: "기한이 다가와야 오히려 집중이 잘 된다", letter: "P" },
    ],
  },
  {
    id: "p-jp-4",
    axisIndex: 3,
    text: "매일의 일과는 나는?",
    options: [
      { text: "정해진 순서대로 움직이는 게 편하다", letter: "J" },
      { text: "그날그날 하고 싶은 대로 움직이는 게 편하다", letter: "P" },
    ],
  },
  {
    id: "p-jp-5",
    axisIndex: 3,
    text: "낯선 일을 시작할 때 나는?",
    options: [
      { text: "순서와 방법을 먼저 정리하고 시작한다", letter: "J" },
      { text: "일단 부딪혀 보면서 방법을 찾아간다", letter: "P" },
    ],
  },
];

export default questions;

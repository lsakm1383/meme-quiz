import { quizzes } from "@/data/quizzes";
import { mbtiTests } from "@/data/mbti";
import { sajuTests } from "@/data/saju";
import { decisionTests } from "@/data/decisions";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { checklists } from "@/data/checklists";

// 이용 통계에서 쓰는 전체 테스트 목록 — 키는 주소 앞부분(parseTestPath 와 같은 규칙)이다.
export type RegisteredTest = { key: string; title: string; group: string };

export const registeredTests: RegisteredTest[] = [
  ...quizzes.map((quiz) => ({ key: quiz.id, title: quiz.title, group: "1분 테스트" })),
  ...mbtiTests.map((test) => ({ key: `m/${test.id}`, title: test.title, group: "성격 유형" })),
  ...sajuTests.map((test) => ({
    key: `s/${test.id}`,
    title: test.title,
    group: test.series === "traditional" ? "전통 운세" : "사주 시리즈",
  })),
  ...decisionTests.map((test) => ({ key: `d/${test.id}`, title: test.title, group: "추천" })),
  ...tournaments.map((test) => ({ key: `w/${test.id}`, title: test.title, group: "월드컵" })),
  ...toppingTests.map((test) => ({ key: `c/${test.id}`, title: test.title, group: "조합 만들기" })),
  ...checklists.map((test) => ({ key: `l/${test.id}`, title: test.title, group: "체크리스트" })),
];

const keys = new Set(registeredTests.map((test) => test.key));
export const isRegisteredTestKey = (key: unknown): key is string => typeof key === "string" && keys.has(key);

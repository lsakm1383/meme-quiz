import { quizzes } from "@/data/quizzes";
import { mbtiTests } from "@/data/mbti";
import { getMbtiPhoto } from "@/data/mbti/photos";
import { sajuTests } from "@/data/saju";
import { decisionTests } from "@/data/decisions";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { checklists } from "@/data/checklists";
import { countChecklistItems } from "@/data/checklist-types";

// 전체 테스트 목록 — 이용 통계와 결과 화면의 "이 테스트도 해보세요" 추천이 함께 쓴다.
// 키는 주소 앞부분(parseTestPath 와 같은 규칙)이고, 서버에서만 불러온다 (데이터 전체를 가져오므로 브라우저 번들에 넣지 않는다).
export type RegisteredTest = {
  key: string;
  title: string;
  group: string;
  href: string;
  description: string;
  emoji: string;
  /** 대표 그림 (public 기준 경로). 없으면 emoji */
  image?: string;
  /** 분야 모아보기 카드에 붙는 짧은 안내 (예: "질문 6개 · 결과 4가지") */
  meta: string;
};

/** 사주·전통 운세는 무엇을 넣거나 고르는지로 안내한다 */
const SAJU_META: Record<string, string> = {
  chart: "생년월일 입력",
  fortune: "생년월일 입력 · 그룹 랭킹",
  daily: "생년월일 입력 · 매일 바뀜",
  daeun: "생년월일 입력 · 10년 단위",
  compat: "두 사람 생년월일 입력",
  yearly: "생년월일 입력 · 한 해 운세",
  zodiac: "띠만 고르면 끝",
  tojeong: "생년월일 입력 · 달마다 풀이",
  dream: "꿈 검색",
  palm: "그림에서 손금 고르기",
  tarot: "카드 1장 또는 3장 뽑기",
};

export const registeredTests: RegisteredTest[] = [
  ...quizzes.map((quiz) => ({
    key: quiz.id,
    title: quiz.title,
    group: "1분 테스트",
    href: `/${quiz.id}`,
    description: quiz.description,
    emoji: quiz.emoji,
    image: quiz.image?.src,
    meta: `질문 ${quiz.questions.length}개 · 결과 ${quiz.results.length}가지`,
  })),
  ...mbtiTests.map((test) => ({
    key: `m/${test.id}`,
    title: test.title,
    group: "성격 유형",
    href: `/m/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    // 대표 그림이 따로 없어서 홈 카드처럼 첫 결과 유형 그림을 쓴다
    image: getMbtiPhoto(test.profiles[0].slug)?.src,
    meta: `질문 ${test.questions.length}개 · ${test.profiles.length}가지 유형`,
  })),
  ...sajuTests.map((test) => ({
    key: `s/${test.id}`,
    title: test.title,
    group: test.series === "traditional" ? "전통 운세" : "사주 시리즈",
    href: `/s/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
    meta: SAJU_META[test.kind] ?? "",
  })),
  ...decisionTests.map((test) => ({
    key: `d/${test.id}`,
    title: test.title,
    group: "추천",
    href: `/d/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
    meta: `질문 따라가기 · 결과 ${test.results.length}가지`,
  })),
  ...tournaments.map((test) => ({
    key: `w/${test.id}`,
    title: test.title,
    group: "월드컵",
    href: `/w/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
    meta: `${test.candidates.length}강 · ${test.candidates.length - 1}번 고르기`,
  })),
  ...toppingTests.map((test) => ({
    key: `c/${test.id}`,
    title: test.title,
    group: "조합 만들기",
    href: `/c/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
    meta: `${test.categories.length}단계 재료 고르기`,
  })),
  ...checklists.map((test) => ({
    key: `l/${test.id}`,
    title: test.title,
    group: "체크리스트",
    href: `/l/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
    meta: `항목 ${countChecklistItems(test)}개 · 내 브라우저에 저장`,
  })),
];

const byKey = new Map(registeredTests.map((test) => [test.key, test]));
export const getRegisteredTest = (key: string) => byKey.get(key);
export const isRegisteredTestKey = (key: unknown): key is string => typeof key === "string" && byKey.has(key);

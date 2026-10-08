import { quizzes } from "@/data/quizzes";
import { mbtiTests } from "@/data/mbti";
import { getMbtiPhoto } from "@/data/mbti/photos";
import { sajuTests } from "@/data/saju";
import { decisionTests } from "@/data/decisions";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { checklists } from "@/data/checklists";

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
  })),
  ...sajuTests.map((test) => ({
    key: `s/${test.id}`,
    title: test.title,
    group: test.series === "traditional" ? "전통 운세" : "사주 시리즈",
    href: `/s/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
  })),
  ...decisionTests.map((test) => ({
    key: `d/${test.id}`,
    title: test.title,
    group: "추천",
    href: `/d/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
  })),
  ...tournaments.map((test) => ({
    key: `w/${test.id}`,
    title: test.title,
    group: "월드컵",
    href: `/w/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
  })),
  ...toppingTests.map((test) => ({
    key: `c/${test.id}`,
    title: test.title,
    group: "조합 만들기",
    href: `/c/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
  })),
  ...checklists.map((test) => ({
    key: `l/${test.id}`,
    title: test.title,
    group: "체크리스트",
    href: `/l/${test.id}`,
    description: test.description,
    emoji: test.emoji,
    image: test.image,
  })),
];

const byKey = new Map(registeredTests.map((test) => [test.key, test]));
export const getRegisteredTest = (key: string) => byKey.get(key);
export const isRegisteredTestKey = (key: unknown): key is string => typeof key === "string" && byKey.has(key);

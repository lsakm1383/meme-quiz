import type { MbtiTestConfig, MbtiTypeProfile } from "@/data/mbti-types";
import questions from "@/data/mbti/questions";
import profiles from "@/data/mbti/profiles";
import princessProfiles from "@/data/mbti/princess-profiles";

// 같은 20문항·같은 축 채점 엔진을 재사용하고, 결과 프로필(이름·설명·이모지·색)만
// 시리즈마다 다르게 입힌다. 새 시리즈를 추가할 땐 profiles 파일 하나만 새로 쓰고
// 여기 배열에 등록하면 된다.
const AXES: [string, string][] = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
];

const mbtiLite: MbtiTestConfig = {
  id: "mbti-lite",
  emoji: "🧭",
  title: `"나는 무슨 맛?" 성격 테스트`,
  description:
    "20개 질문으로 알아보는 나의 성향 유형. 나랑 잘 통하는 사이, 서로 조심해야 할 사이까지 함께 알려줘요.",
  accentColor: "#7c3aed",
  axes: AXES,
  questions,
  profiles,
};

const mbtiPrincess: MbtiTestConfig = {
  id: "mbti-princess",
  emoji: "👸",
  title: `"나는 어떤 공주?" 성격 테스트`,
  description:
    "20개 질문으로 알아보는 나와 닮은 동화 속 공주. 나랑 잘 통하는 사이, 서로 조심해야 할 사이까지 함께 알려줘요.",
  accentColor: "#a21caf",
  axes: AXES,
  questions,
  profiles: princessProfiles,
};

export const mbtiTests: MbtiTestConfig[] = [mbtiLite, mbtiPrincess];

export function getMbtiTest(id: string): MbtiTestConfig | undefined {
  return mbtiTests.find((test) => test.id === id);
}

/** 공개 URL/통계에 쓰는 슬러그로 결과를 찾는다 (라우팅용). */
export function getMbtiProfileBySlug(
  test: MbtiTestConfig,
  slug: string
): MbtiTypeProfile | undefined {
  return test.profiles.find((profile) => profile.slug === slug);
}

/** 궁합 계산이 돌려준 내부 코드로 결과를 찾는다 (화면에 code 자체를 노출하지 않는다). */
export function getMbtiProfileByCode(
  test: MbtiTestConfig,
  code: string
): MbtiTypeProfile | undefined {
  return test.profiles.find((profile) => profile.code === code);
}

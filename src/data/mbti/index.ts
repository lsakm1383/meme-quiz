import type { MbtiTestConfig, MbtiTypeProfile } from "@/data/mbti-types";
import questions from "@/data/mbti/questions";
import profiles from "@/data/mbti/profiles";

const mbtiLite: MbtiTestConfig = {
  id: "mbti-lite",
  emoji: "🧭",
  title: "나의 MBTI 유형 테스트",
  description:
    "20개 질문으로 알아보는 나의 성향 유형. 나랑 잘 통하는 사이, 서로 조심해야 할 사이까지 함께 알려줘요.",
  accentColor: "#7c3aed",
  axes: [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ],
  questions,
  profiles,
};

export const mbtiTests: MbtiTestConfig[] = [mbtiLite];

export function getMbtiTest(id: string): MbtiTestConfig | undefined {
  return mbtiTests.find((test) => test.id === id);
}

export function getMbtiProfile(
  test: MbtiTestConfig,
  code: string
): MbtiTypeProfile | undefined {
  return test.profiles.find((profile) => profile.code === code);
}

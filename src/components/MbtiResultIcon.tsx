import type { MbtiTypeProfile } from "@/data/mbti-types";
import { PhotoIcon } from "@/components/PhotoIcon";

type IconSize = "xl" | "lg" | "sm" | "xs";

const TEXT: Record<IconSize, string> = {
  xl: "text-9xl",
  lg: "text-6xl",
  sm: "text-3xl",
  xs: "text-lg",
};

// 크롭한 참고 이미지를 그대로 쓰는 공주 시리즈 slug — public/mbti/princess/<slug>.webp
const PRINCESS_PHOTO_SLUGS = new Set([
  "pyeonggang",
  "jacheongbi",
  "kongjwi",
  "rapunzel",
  "bari",
  "mermaid",
  "aurora",
  "seonhwa",
  "thumbelina",
  "cinderella",
  "nakrang",
  "pea",
  "belle",
  "snowwhite",
  "odette",
  "frogprince",
]);

// 크롭한 참고 이미지를 그대로 쓰는 게임 포지션 시리즈 slug — public/mbti/gamer/<slug>.webp
const GAMER_PHOTO_SLUGS = new Set([
  "healer",
  "strategist",
  "decisive",
  "tank",
  "mechanic",
  "sniper",
  "experimenter",
  "seer",
  "dreamer",
  "commander",
  "assassin",
  "hypeman",
  "showman",
  "wildcard",
  "initiator",
  "highlight",
]);

// 공주/게임 포지션 시리즈는 전용 일러스트로, 그 외(맛 시리즈)는 기존 이모지 그대로 보여준다.
export function MbtiResultIcon({
  profile,
  size = "lg",
}: {
  profile: MbtiTypeProfile;
  size?: IconSize;
}) {
  if (PRINCESS_PHOTO_SLUGS.has(profile.slug)) {
    return <PhotoIcon src={`/mbti/princess/${profile.slug}.webp`} size={size} />;
  }
  if (GAMER_PHOTO_SLUGS.has(profile.slug)) {
    return <PhotoIcon src={`/mbti/gamer/${profile.slug}.webp`} size={size} />;
  }
  return <span className={TEXT[size]}>{profile.emoji}</span>;
}

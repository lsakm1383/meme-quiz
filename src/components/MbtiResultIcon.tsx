import type { MbtiTypeProfile } from "@/data/mbti-types";
import { PhotoIcon } from "@/components/PhotoIcon";

type IconSize = "xl" | "lg" | "sm" | "xs";

const TEXT: Record<IconSize, string> = {
  xl: "text-9xl",
  lg: "text-6xl",
  sm: "text-3xl",
  xs: "text-lg",
};

// 크롭한 참고 이미지를 그대로 쓰는 맛 시리즈 slug — public/mbti/flavor/<slug>.webp
const FLAVOR_PHOTO_SLUGS = new Set([
  "mayo",
  "original",
  "cider",
  "neutral",
  "milk",
  "peach",
  "earlgrey",
  "mint",
  "darkchoco",
  "lavender",
  "fire",
  "honeybutter",
  "strawberry",
  "blackcoffee",
  "caramel",
  "lemon",
]);

// 크롭한 참고 이미지를 그대로 쓰는 공주 시리즈 slug — public/mbti/princess/<slug>.webp
const PRINCESS_PHOTO_SLUGS = new Set([
  "chimhollina",
  "kopanella",
  "elsayeon",
  "jjaryeojasmin",
  "udangtang-mermaid",
  "routine-keep",
  "flyswatter-fairy",
  "nabdwo",
  "jjingjjingi",
  "chronic-fatigue",
  "clear-eyed",
  "missing-tooth",
  "birdnest",
  "maple-kingdom",
  "joker-smile",
  "tragic-heroine",
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

// 세 시리즈 모두 전용 참고 이미지를 쓰고, 매핑되지 않은 slug만 이모지로 대체한다.
export function MbtiResultIcon({
  profile,
  size = "lg",
}: {
  profile: MbtiTypeProfile;
  size?: IconSize;
}) {
  if (FLAVOR_PHOTO_SLUGS.has(profile.slug)) {
    return (
      <PhotoIcon
        src={`/mbti/flavor/${profile.slug}.webp`}
        size={size}
        aspect="aspect-[7/5]"
      />
    );
  }
  if (PRINCESS_PHOTO_SLUGS.has(profile.slug)) {
    return <PhotoIcon src={`/mbti/princess/${profile.slug}.webp`} size={size} />;
  }
  if (GAMER_PHOTO_SLUGS.has(profile.slug)) {
    return (
      <PhotoIcon
        src={`/mbti/gamer/${profile.slug}.webp`}
        size={size}
        aspect="aspect-[14/9]"
      />
    );
  }
  return <span className={TEXT[size]}>{profile.emoji}</span>;
}

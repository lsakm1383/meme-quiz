import type { MbtiTypeProfile } from "@/data/mbti-types";
import { getPrincessStyle } from "@/data/mbti/princess-illustration-styles";
import { PrincessIcon } from "@/components/PrincessIcon";

type IconSize = "lg" | "sm" | "xs";

const TEXT: Record<IconSize, string> = {
  lg: "text-6xl",
  sm: "text-3xl",
  xs: "text-lg",
};

// 공주 시리즈는 손그림 일러스트로, 그 외 시리즈(맛/게임 포지션)는 기존 이모지 그대로 보여준다.
export function MbtiResultIcon({
  profile,
  size = "lg",
}: {
  profile: MbtiTypeProfile;
  size?: IconSize;
}) {
  if (getPrincessStyle(profile.slug)) {
    return <PrincessIcon profile={profile} size={size} />;
  }
  return <span className={TEXT[size]}>{profile.emoji}</span>;
}

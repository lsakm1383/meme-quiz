import type { MbtiTypeProfile } from "@/data/mbti-types";
import { getMbtiPhoto } from "@/data/mbti/photos";
import { PhotoIcon } from "@/components/PhotoIcon";

type IconSize = "xl" | "lg" | "sm" | "xs";

const TEXT: Record<IconSize, string> = {
  xl: "text-9xl",
  lg: "text-6xl",
  sm: "text-3xl",
  xs: "text-lg",
};

// 모든 시리즈가 전용 참고 이미지를 쓰고, 매핑되지 않은 slug만 이모지로 대체한다.
export function MbtiResultIcon({
  profile,
  size = "lg",
}: {
  profile: MbtiTypeProfile;
  size?: IconSize;
}) {
  const photo = getMbtiPhoto(profile.slug);
  if (!photo) {
    return <span className={TEXT[size]}>{profile.emoji}</span>;
  }
  return (
    <PhotoIcon
      src={photo.src}
      size={size}
      aspect={photo.aspectClass}
      sizeBy={photo.sizeByWidth ? "width" : "height"}
    />
  );
}

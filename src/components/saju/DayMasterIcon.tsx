import type { DayMasterProfile } from "@/data/saju/types";
import { PhotoIcon } from "@/components/PhotoIcon";

const TEXT = { xl: "text-6xl", lg: "text-4xl" } as const;

// 일간 유형 일러스트 (348x216 가로형). 그림이 없으면 이모지로 대체한다.
export function DayMasterIcon({
  profile,
  size = "xl",
  alt,
}: {
  profile: DayMasterProfile;
  size?: "xl" | "lg";
  alt?: string;
}) {
  if (!profile.image) return <span className={`shrink-0 ${TEXT[size]}`}>{profile.emoji}</span>;
  return <PhotoIcon src={profile.image} size={size} aspect="aspect-[348/216]" sizeBy="width" alt={alt} />;
}

import type { QuizImage } from "@/data/quiz-types";
import { PhotoIcon } from "@/components/PhotoIcon";

type IconSize = "xl" | "lg" | "sm" | "xs";

// 일러스트가 없을 때 쓰는 이모지 크기 — 기존 화면별 이모지 크기와 맞춘다.
const TEXT: Record<IconSize, string> = {
  xl: "text-7xl",
  lg: "text-4xl",
  sm: "text-3xl",
  xs: "text-lg",
};

// 퀴즈 대표 그림·결과 그림 공용. 일러스트가 있으면 그 비율대로, 없으면 이모지로 보여준다.
export function QuizIcon({
  image,
  emoji,
  size = "lg",
}: {
  image?: QuizImage;
  emoji: string;
  size?: IconSize;
}) {
  if (!image) return <span className={`shrink-0 ${TEXT[size]}`}>{emoji}</span>;
  return (
    <PhotoIcon
      src={image.src}
      size={size}
      aspect={image.aspect}
      sizeBy={image.wide ? "width" : "height"}
    />
  );
}

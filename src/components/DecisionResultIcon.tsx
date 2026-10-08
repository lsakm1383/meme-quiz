import type { DecisionImageShape, DecisionResult } from "@/data/decision-types";
import { PhotoIcon } from "@/components/PhotoIcon";

type IconSize = "xl" | "lg" | "sm" | "xs";
// 이모지만 있는 결과는 xl이어도 기존 크기(text-5xl) 그대로 보여준다.
const TEXT: Record<IconSize, string> = {
  xl: "text-5xl",
  lg: "text-5xl",
  sm: "text-3xl",
  xs: "text-lg",
};

export function DecisionResultIcon({
  result,
  shape,
  size = "lg",
  alt,
}: {
  result: DecisionResult;
  /** 테스트의 imageShape — 없으면 정사각형 */
  shape?: DecisionImageShape;
  size?: IconSize;
  alt?: string;
}) {
  if (result.image) {
    return (
      <PhotoIcon
        src={result.image}
        size={size}
        aspect={shape?.aspect}
        sizeBy={shape?.wide ? "width" : "height"}
        alt={alt}
      />
    );
  }
  return <span className={TEXT[size]}>{result.emoji}</span>;
}

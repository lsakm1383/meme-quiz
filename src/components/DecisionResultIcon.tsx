import type { DecisionResult } from "@/data/decision-types";
import { getDressStyle } from "@/data/dress-styles";
import { DressIcon } from "@/components/DressIcon";

type IconSize = "lg" | "sm" | "xs";
const TEXT: Record<IconSize, string> = { lg: "text-5xl", sm: "text-3xl", xs: "text-lg" };

export function DecisionResultIcon({
  result,
  size = "lg",
}: {
  result: DecisionResult;
  size?: IconSize;
}) {
  if (getDressStyle(result.id)) return <DressIcon result={result} size={size} />;
  return <span className={TEXT[size]}>{result.emoji}</span>;
}

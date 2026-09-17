import type { DecisionResult } from "@/data/decision-types";
import { getDressStyle, type DressStyle } from "@/data/dress-styles";

function ALine({ color, secondary }: DressStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M13 6 L19 6 L20 9 Q20 12 18 14 L24 29 Q16 31 8 29 L14 14 Q12 12 12 9 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      <path d="M13 6 Q16 4.5 19 6" fill="none" stroke="#e7d9c8" strokeWidth="0.6" />
      {secondary && <rect x="12" y="13.2" width="8" height="1.8" rx="0.9" fill={secondary} />}
    </svg>
  );
}

function BallGown({ color, secondary }: DressStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M13 6 L19 6 L20 9 Q20 12 18 14 L18.5 15 Q27 18 29 27 Q30 29 27 29.5 Q16 32 5 29.5 Q2 29 3 27 Q5 18 13.5 15 L14 14 Q12 12 12 9 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      <path d="M13 6 Q16 4.5 19 6" fill="none" stroke="#e7d9c8" strokeWidth="0.6" />
      {secondary && (
        <path
          d="M6 26 Q9 24 12 26 T18 26 T24 26 T29 26"
          stroke={secondary}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      )}
      <rect x="12.5" y="13.4" width="7" height="1.6" rx="0.8" fill={secondary ?? color} opacity="0.9" />
    </svg>
  );
}

function Mermaid({ color, secondary }: DressStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M13 6 L19 6 L19.5 9 Q19.5 12 18.5 14 L19 22 Q26 24 25 29 Q16 31 7 29 Q6 24 13 22 L13.5 14 Q12.5 12 12.5 9 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      <path d="M13 6 Q16 4.5 19 6" fill="none" stroke="#e7d9c8" strokeWidth="0.6" />
      {secondary && (
        <path d="M13 21.5 Q16 20.5 19 21.5" stroke={secondary} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

function LongSleeve({ color, secondary }: DressStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M11 7 Q7 9 7 14 Q7 17 9 19 L11 18 Q10 15 10.5 12 Q10.8 9 12.5 7.5 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      <path
        d="M21 7 Q25 9 25 14 Q25 17 23 19 L21 18 Q22 15 21.5 12 Q21.2 9 19.5 7.5 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      <path
        d="M13 6 L19 6 L20 9 L21 14 L22 29 Q16 31 10 29 L11 14 L12 9 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      {secondary && (
        <>
          <circle cx="9.5" cy="13" r="0.6" fill={secondary} />
          <circle cx="8.5" cy="16" r="0.6" fill={secondary} />
          <circle cx="22.5" cy="13" r="0.6" fill={secondary} />
          <circle cx="23.5" cy="16" r="0.6" fill={secondary} />
        </>
      )}
    </svg>
  );
}

function SlipDress({ color, secondary }: DressStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M13 5 L12.5 8 M19 5 L19.5 8"
        stroke={secondary ?? "#a8a29e"}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M12.5 8 L19.5 8 L21 14 L22 28 Q16 30.5 10 28 L11 14 Z"
        fill={color}
        stroke="#e7d9c8"
        strokeWidth="0.5"
      />
      {secondary && <path d="M11 14 L21 14" stroke={secondary} strokeWidth="0.6" opacity="0.7" />}
    </svg>
  );
}

const SHAPES = {
  aLine: ALine,
  ballGown: BallGown,
  mermaid: Mermaid,
  longSleeve: LongSleeve,
  slipDress: SlipDress,
};

const BOX = { lg: "h-16 w-16", sm: "h-9 w-9", xs: "h-5 w-5" };
const TEXT = { lg: "text-5xl", sm: "text-3xl", xs: "text-lg" };

export function DressIcon({
  result,
  size = "lg",
}: {
  result: DecisionResult;
  size?: "lg" | "sm" | "xs";
}) {
  const style = getDressStyle(result.id);
  const box = BOX[size];

  if (!style) {
    return <span className={TEXT[size]}>{result.emoji}</span>;
  }

  const Shape = SHAPES[style.shape];
  return (
    <span className={`inline-block ${box}`}>
      <Shape {...style} />
    </span>
  );
}

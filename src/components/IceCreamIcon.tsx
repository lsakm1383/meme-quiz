import type { TournamentCandidate } from "@/data/tournament-types";
import { getIceCreamStyle, type IceCreamStyle } from "@/data/icecream-styles";

function Bar({ color, secondary }: IceCreamStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect x="13" y="24" width="6" height="7" rx="1.5" fill="#e7d9b8" />
      <path
        d="M9 8 Q9 4 16 4 Q23 4 23 8 L23 22 Q23 25 16 25 Q9 25 9 22 Z"
        fill={color}
      />
      {secondary && (
        <path
          d="M9 8 Q9 4 16 4 Q23 4 23 8 L23 13 Q16 15 9 13 Z"
          fill={secondary}
          opacity="0.9"
        />
      )}
    </svg>
  );
}

function Cone({ color }: IceCreamStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path d="M11 15 L21 15 L17 29 Q16 31 15 29 Z" fill="#c99a5f" />
      <path
        d="M12 15 L14 20 M16 15 L16 22 M20 15 L18 20"
        stroke="#93765a"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M8 15 Q8 6 16 5 Q24 6 24 15 Q16 18 8 15 Z"
        fill={color}
      />
    </svg>
  );
}

function Tube({ color }: IceCreamStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M11 9 L21 9 L20 27 Q20 29 16 29 Q12 29 12 27 Z"
        fill={color}
      />
      <path d="M12 9 L11 5 L14 6 L16 4 L18 6 L21 5 L20 9 Z" fill={color} opacity="0.85" />
    </svg>
  );
}

function Cup({ color }: IceCreamStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path d="M8 12 L24 12 L22 28 Q22 30 20 30 L12 30 Q10 30 10 28 Z" fill="#fef6e4" stroke="#e7d9b8" strokeWidth="0.6" />
      <ellipse cx="16" cy="12.5" rx="8" ry="2.6" fill={color} />
      <path
        d="M11 12 Q14 10 16 12 T21 12"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function Sandwich({ color, secondary }: IceCreamStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <ellipse cx="16" cy="9" rx="11" ry="4" fill="#e6b45c" />
      <rect x="6" y="9" width="20" height="12" fill={secondary ?? color} />
      <ellipse cx="16" cy="23" rx="11" ry="4" fill="#e6b45c" />
      <rect x="6" y="9" width="20" height="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function Tub({ color, secondary }: IceCreamStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path d="M6 12 L26 12 L24 27 Q24 29 22 29 L10 29 Q8 29 8 27 Z" fill="#fefaf2" stroke="#e7d9b8" strokeWidth="0.6" />
      <rect x="5" y="9" width="22" height="4" rx="1.4" fill="#f5ebd1" stroke="#e0d2ab" strokeWidth="0.6" />
      <ellipse cx="16" cy="11" rx="9.5" ry="2.6" fill={color} />
      {secondary && (
        <path
          d="M9 11 Q13 9.5 16 11 T23 11"
          stroke={secondary}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

const SHAPES = { bar: Bar, cone: Cone, tube: Tube, cup: Cup, sandwich: Sandwich, tub: Tub };

const BOX = { lg: "h-16 w-16", sm: "h-9 w-9", xs: "h-5 w-5" };
const TEXT = { lg: "text-5xl", sm: "text-3xl", xs: "text-lg" };

export function IceCreamIcon({
  candidate,
  size = "lg",
}: {
  candidate: TournamentCandidate;
  size?: "lg" | "sm" | "xs";
}) {
  const style = getIceCreamStyle(candidate.id);
  const box = BOX[size];

  if (!style) {
    return <span className={TEXT[size]}>{candidate.emoji}</span>;
  }

  const Shape = SHAPES[style.shape];
  return (
    <span className={`inline-block ${box}`}>
      <Shape {...style} />
    </span>
  );
}

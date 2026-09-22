import type { TournamentCandidate } from "@/data/tournament-types";
import { getRamenStyle, type RamenGarnish, type RamenStyle } from "@/data/ramen-styles";

// 실제 제품 패키지 사진은 저작권이 있어 쓸 수 없어서, 국물 색/면발/고명을 흉내낸
// 일러스트로 대신한다. 매핑이 없는 후보(다른 토너먼트 등)는 그냥 emoji로 폴백한다.

function Garnish({ type }: { type: RamenGarnish }) {
  switch (type) {
    case "chili":
      return <path d="M20 8.5 L22.5 6.5 L23.3 9.5 Z" fill="#dc2626" />;
    case "chiliDouble":
      return (
        <>
          <path d="M19 8.5 L21.2 6.8 L21.9 9.4 Z" fill="#dc2626" />
          <path d="M11 8.8 L9 7.2 L8.4 9.6 Z" fill="#dc2626" />
        </>
      );
    case "greenOnion":
      return (
        <>
          <ellipse cx="12" cy="8" rx="1.4" ry="0.7" fill="#4ade80" transform="rotate(20 12 8)" />
          <ellipse cx="18" cy="7.3" rx="1.4" ry="0.7" fill="#4ade80" transform="rotate(-15 18 7.3)" />
          <ellipse cx="21" cy="9" rx="1.2" ry="0.6" fill="#86efac" transform="rotate(10 21 9)" />
        </>
      );
    case "cheese":
      return (
        <path
          d="M9 9 Q11 7 13 9 T17 9 T21 9 T25 9"
          stroke="#fde047"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      );
    case "pepper":
      return (
        <>
          <circle cx="12" cy="8" r="0.7" fill="#1c1917" />
          <circle cx="16" cy="7" r="0.7" fill="#1c1917" />
          <circle cx="20" cy="8.5" r="0.7" fill="#1c1917" />
        </>
      );
    case "veg":
      return (
        <>
          <circle cx="12" cy="8.2" r="1" fill="#4ade80" />
          <circle cx="19" cy="7.6" r="1" fill="#fb923c" />
        </>
      );
    case "cucumber":
      return (
        <>
          <ellipse cx="12" cy="8" rx="1.6" ry="0.9" fill="#bbf7d0" stroke="#4ade80" strokeWidth="0.4" />
          <ellipse cx="20" cy="7.6" rx="1.6" ry="0.9" fill="#bbf7d0" stroke="#4ade80" strokeWidth="0.4" />
        </>
      );
    case "shrimp":
      return (
        <path
          d="M18 10 Q22 6 25 9 Q23 10.5 20.5 10 Q19.5 11 18 10 Z"
          fill="#fb7185"
          stroke="#e11d48"
          strokeWidth="0.4"
        />
      );
    case "sesame":
      return (
        <>
          <circle cx="11" cy="8.5" r="0.5" fill="#fffbeb" />
          <circle cx="14" cy="7.2" r="0.5" fill="#fffbeb" />
          <circle cx="18" cy="7.8" r="0.5" fill="#fffbeb" />
          <circle cx="21" cy="9" r="0.5" fill="#fffbeb" />
        </>
      );
    case "kimchi":
      return (
        <>
          <ellipse cx="13" cy="8" rx="1.5" ry="0.9" fill="#dc2626" transform="rotate(-10 13 8)" />
          <ellipse cx="19" cy="7.6" rx="1.3" ry="0.8" fill="#f87171" transform="rotate(15 19 7.6)" />
        </>
      );
    case "tempura":
      return (
        <>
          <rect x="9" y="6.5" width="3.4" height="2.6" rx="1" fill="#f4c869" stroke="#c9974a" strokeWidth="0.4" />
          <rect x="19" y="7" width="3.2" height="2.4" rx="1" fill="#f4c869" stroke="#c9974a" strokeWidth="0.4" />
        </>
      );
    default:
      return null;
  }
}

function Bowl({ broth, noodle, garnish }: RamenStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M3 14 Q3 26 16 27 Q29 26 29 14 Z"
        fill="#fdfaf5"
        stroke="#e7dfcf"
        strokeWidth="0.6"
      />
      <ellipse cx="16" cy="14" rx="13" ry="5" fill={broth} />
      <path
        d="M7 13 Q10 10 13 13 T19 13 T25 13"
        stroke={noodle}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M8 15.5 Q11 13 14 15.5 T20 15.5 T24 15.5"
        stroke={noodle}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <Garnish type={garnish} />
    </svg>
  );
}

function Cup({ broth, noodle, garnish }: RamenStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path d="M6 10 L26 10 L23 29 L9 29 Z" fill="#fef6e4" stroke="#e7d9b8" strokeWidth="0.6" />
      <rect x="5" y="7.5" width="22" height="3" rx="1.4" fill="#f5ebd1" stroke="#e0d2ab" strokeWidth="0.6" />
      <ellipse cx="16" cy="12.5" rx="9.5" ry="3" fill={broth} />
      <path
        d="M9.5 12 Q12.5 10 15.5 12 T21.5 12"
        stroke={noodle}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      <Garnish type={garnish} />
    </svg>
  );
}

function Bag({ broth }: RamenStyle) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M8 6 L11 4 L14 6 L18 4 L21 6 L24 4 L24 27 Q24 29 22 29 L10 29 Q8 29 8 27 Z"
        fill={broth}
        stroke="#00000022"
        strokeWidth="0.5"
      />
      <circle cx="13" cy="16" r="1.1" fill="#ffffffaa" />
      <circle cx="18" cy="20" r="1" fill="#ffffffaa" />
      <circle cx="15" cy="23" r="0.9" fill="#ffffffaa" />
      <circle cx="20" cy="14" r="0.8" fill="#ffffffaa" />
    </svg>
  );
}

const BOX = { lg: "h-16 w-16", sm: "h-9 w-9", xs: "h-5 w-5" };
const TEXT = { lg: "text-5xl", sm: "text-3xl", xs: "text-lg" };

export function RamenIcon({
  candidate,
  size = "lg",
}: {
  candidate: TournamentCandidate;
  size?: "lg" | "sm" | "xs";
}) {
  const style = getRamenStyle(candidate.id);
  const box = BOX[size];

  if (!style) {
    return <span className={TEXT[size]}>{candidate.emoji}</span>;
  }

  return (
    <span className={`inline-block ${box}`}>
      {style.shape === "cup" ? (
        <Cup {...style} />
      ) : style.shape === "bag" ? (
        <Bag {...style} />
      ) : (
        <Bowl {...style} />
      )}
    </span>
  );
}

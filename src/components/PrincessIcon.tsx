import type { MbtiTypeProfile } from "@/data/mbti-types";
import {
  getPrincessStyle,
  type PrincessAccessory,
  type PrincessHairStyle,
} from "@/data/mbti/princess-illustration-styles";
import { SnowWhiteIllustration } from "@/components/illustrations/SnowWhiteIllustration";
import { OdetteIllustration } from "@/components/illustrations/OdetteIllustration";
import { FrogPrincePrincessIllustration } from "@/components/illustrations/FrogPrincePrincessIllustration";
import { PhotoIcon } from "@/components/PhotoIcon";

// slug별로 기존 파라미터 조합 대신 공들여 그린 전용 일러스트를 쓰고 싶을 때 등록한다.
const CUSTOM_ILLUSTRATIONS: Partial<Record<string, () => React.JSX.Element>> = {
  snowwhite: SnowWhiteIllustration,
  odette: OdetteIllustration,
  frogprince: FrogPrincePrincessIllustration,
};

// 크롭한 참고 이미지를 그대로 쓰는 slug 목록 — public/mbti/princess/<slug>.webp
const PHOTO_SLUGS = new Set([
  "pyeonggang",
  "jacheongbi",
  "kongjwi",
  "rapunzel",
  "bari",
  "mermaid",
  "aurora",
  "seonhwa",
  "thumbelina",
  "cinderella",
  "nakrang",
  "pea",
  "belle",
]);

// 동화 삽화풍 손그림 공주 초상 아이콘. 헤어스타일/액세서리/드레스를 조합해서 그린다.
type IconSize = "lg" | "sm" | "xs";

const BOX: Record<IconSize, string> = {
  lg: "h-16 w-16",
  sm: "h-9 w-9",
  xs: "h-5 w-5",
};

const TEXT: Record<IconSize, string> = {
  lg: "text-6xl",
  sm: "text-3xl",
  xs: "text-lg",
};

function Face({ skin }: { skin: string }) {
  return (
    <>
      <ellipse cx="16" cy="15.5" rx="6.2" ry="6.8" fill={skin} />
      <ellipse cx="12.3" cy="17.6" rx="1.1" ry="0.7" fill="#fca5a5" opacity="0.55" />
      <ellipse cx="19.7" cy="17.6" rx="1.1" ry="0.7" fill="#fca5a5" opacity="0.55" />
      <ellipse cx="13.4" cy="15" rx="0.7" ry="0.9" fill="#292524" />
      <ellipse cx="18.6" cy="15" rx="0.7" ry="0.9" fill="#292524" />
      <path
        d="M13.6 18.8 Q16 20.2 18.4 18.8"
        stroke="#292524"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function DressCollar({ color }: { color: string }) {
  return <path d="M9 27 Q16 24 23 27 L24 31.5 L8 31.5 Z" fill={color} />;
}

function MermaidCollar({ top, tail }: { top: string; tail: string }) {
  return (
    <>
      <path
        d="M8 27.5 Q16 25 24 27.5 Q24 30.2 20 31.5 Q16 29.8 12 31.5 Q8 30.2 8 27.5 Z"
        fill={tail}
      />
      <path d="M11 25.3 Q16 23.4 21 25.3 L21 27.3 Q16 25.8 11 27.3 Z" fill={top} />
    </>
  );
}

function HairBack({ style, color }: { style: PrincessHairStyle; color: string }) {
  switch (style) {
    case "long":
      return (
        <path
          d="M9.5 11 Q8 16 8.5 24 Q8.7 27.5 10.5 28.5 L12.2 27.8 Q10.6 20.5 11.1 13.2 Q11.2 8 16 7.2 Q20.8 8 20.9 13.2 Q21.4 20.5 19.8 27.8 L21.5 28.5 Q23.3 27.5 23.5 24 Q24 16 22.5 11 Q22 6 16 5.5 Q10 6 9.5 11 Z"
          fill={color}
        />
      );
    case "wavy":
      return (
        <path
          d="M9.5 11.5 Q8.5 15.5 9.7 20 Q10.2 22.5 12.7 23.2 L13.2 21 Q11.6 18 12.1 13.3 Q12.2 8.6 16 7.6 Q19.8 8.6 19.9 13.3 Q20.4 18 18.8 21 L19.3 23.2 Q21.8 22.5 22.3 20 Q23.5 15.5 22.5 11.5 Q22 6.7 16 6.2 Q10 6.7 9.5 11.5 Z"
          fill={color}
        />
      );
    case "updo":
      return (
        <>
          <circle cx="16" cy="8.2" r="3.3" fill={color} />
          <path
            d="M10.2 12.2 Q9.7 15.3 11.1 18.2 L12.6 17.2 Q11.6 14.3 12 11.8 Q12.1 8.2 16 7.7 Q19.9 8.2 20 11.8 Q20.4 14.3 19.4 17.2 L20.9 18.2 Q22.3 15.3 21.8 12.2 Q21.3 6.6 16 6.4 Q10.7 6.6 10.2 12.2 Z"
            fill={color}
          />
        </>
      );
    case "twin":
      return (
        <>
          <circle cx="8.3" cy="16.5" r="2.5" fill={color} />
          <circle cx="23.7" cy="16.5" r="2.5" fill={color} />
          <path
            d="M10.5 12.3 Q10 15.2 11 17.3 L12.5 16.5 Q11.7 13.7 12 11.7 Q12.2 8.1 16 7.6 Q19.8 8.1 20 11.7 Q20.3 13.7 19.5 16.5 L21 17.3 Q22 15.2 21.5 12.3 Q21 6.5 16 6.3 Q11 6.5 10.5 12.3 Z"
            fill={color}
          />
        </>
      );
    case "short":
    default:
      return (
        <path
          d="M10.2 12 Q9.7 16 11.1 19 L12.8 18 Q11.8 15 12.1 11.8 Q12.3 8 16 7.5 Q19.7 8 19.9 11.8 Q20.2 15 19.2 18 L20.9 19 Q22.3 16 21.8 12 Q21.3 6.4 16 6.2 Q10.7 6.4 10.2 12 Z"
          fill={color}
        />
      );
  }
}

function HairFront({ color }: { color: string }) {
  return (
    <path
      d="M11 11.7 Q11.3 9.2 13 8.4 Q13 10.6 12.6 12.6 Z M21 11.7 Q20.7 9.2 19 8.4 Q19 10.6 19.4 12.6 Z M13 8.7 Q16 7.3 19 8.7 Q17.7 9.7 16 9.7 Q14.3 9.7 13 8.7 Z"
      fill={color}
      opacity="0.95"
    />
  );
}

function Accessory({ type, color }: { type: PrincessAccessory; color: string }) {
  switch (type) {
    case "crown":
      return (
        <path
          d="M12 6.5 L13 3.5 L14.7 6 L16 3 L17.3 6 L19 3.5 L20 6.5 Z"
          fill={color}
          stroke="#a16207"
          strokeWidth="0.3"
        />
      );
    case "flower":
      return (
        <g>
          <circle cx="20.6" cy="7" r="1.3" fill={color} />
          <circle cx="21.9" cy="6.2" r="1" fill={color} opacity="0.85" />
          <circle cx="21.9" cy="7.8" r="1" fill={color} opacity="0.85" />
          <circle cx="20.6" cy="7" r="0.5" fill="#fef08a" />
        </g>
      );
    case "band":
      return (
        <path
          d="M11 9.3 Q16 7.8 21 9.3"
          stroke={color}
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
      );
    case "bow":
      return (
        <g>
          <path d="M17.5 6.5 L20.5 5 L20 7.5 Z" fill={color} />
          <path d="M17.5 6.5 L20 8.5 L18 8.7 Z" fill={color} />
          <circle cx="17.6" cy="6.7" r="0.6" fill={color} />
        </g>
      );
    case "none":
    default:
      return null;
  }
}

export function PrincessIcon({
  profile,
  size = "lg",
}: {
  profile: MbtiTypeProfile;
  size?: IconSize;
}) {
  if (PHOTO_SLUGS.has(profile.slug)) {
    return <PhotoIcon src={`/mbti/princess/${profile.slug}.webp`} size={size} />;
  }

  const Custom = CUSTOM_ILLUSTRATIONS[profile.slug];
  if (Custom) {
    return (
      <span className={`inline-block ${BOX[size]}`}>
        <Custom />
      </span>
    );
  }

  const style = getPrincessStyle(profile.slug);

  if (!style) {
    return <span className={TEXT[size]}>{profile.emoji}</span>;
  }

  return (
    <span className={`inline-block ${BOX[size]}`}>
      <svg viewBox="0 0 32 32" className="h-full w-full">
        {style.dressStyle === "mermaid" ? (
          <MermaidCollar top={style.dressColor} tail={style.tailColor ?? style.dressColor} />
        ) : (
          <DressCollar color={style.dressColor} />
        )}
        <HairBack style={style.hairStyle} color={style.hairColor} />
        <Face skin={style.skin} />
        <HairFront color={style.hairColor} />
        {style.accessory !== "none" && (
          <Accessory type={style.accessory} color={style.accessoryColor ?? "#fbbf24"} />
        )}
      </svg>
    </span>
  );
}

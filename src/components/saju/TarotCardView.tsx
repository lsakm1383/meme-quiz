import type { TarotCard } from "@/data/saju/types";
import { romanOf } from "@/lib/saju/tarot";

// 타로 카드 앞면·뒷면. 일러스트(card.image)가 생기면 앞면을 그 그림으로 바꾸고, 없으면 상징 이모지로 그린다.

const SIZE = {
  sm: "w-12 rounded-md",
  md: "w-24 rounded-xl",
  lg: "w-44 rounded-2xl",
} as const;

export function TarotCardBack({ size = "md" }: { size?: keyof typeof SIZE }) {
  return (
    <span
      className={`relative flex aspect-[2/3] items-center justify-center overflow-hidden border-2 border-amber-300/80 bg-indigo-950 shadow-md ${SIZE[size]}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 25%, rgba(253,230,138,.55) 0 1.5px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(253,230,138,.45) 0 1px, transparent 1.5px), radial-gradient(circle at 45% 85%, rgba(253,230,138,.4) 0 1px, transparent 1.5px)",
        backgroundSize: "26px 26px, 32px 32px, 22px 22px",
      }}
      aria-hidden="true"
    >
      <span className="absolute inset-1 rounded-[inherit] border border-amber-300/50" />
      <span className={`text-amber-200 ${size === "sm" ? "text-base" : "text-3xl"}`}>✦</span>
    </span>
  );
}

export function TarotCardFace({
  card,
  reversed = false,
  size = "md",
}: {
  card: TarotCard;
  reversed?: boolean;
  size?: keyof typeof SIZE;
}) {
  return (
    <span
      className={`relative flex aspect-[2/3] flex-col items-center justify-between overflow-hidden border-2 border-amber-400 bg-gradient-to-b from-violet-950 via-indigo-900 to-violet-950 px-1 py-2 text-amber-100 shadow-md transition-transform ${SIZE[size]} ${reversed ? "rotate-180" : ""}`}
      aria-label={`${card.nameKo}${reversed ? " 역방향" : ""}`}
    >
      {card.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <span className="absolute inset-1 rounded-[inherit] border border-amber-300/40" />
          <span className={`font-serif font-bold tracking-widest ${size === "lg" ? "text-sm" : "text-[10px]"}`}>
            {romanOf(card.number)}
          </span>
          <span className={size === "lg" ? "text-5xl" : size === "md" ? "text-4xl" : "text-xl"}>{card.emoji}</span>
          <span className={`text-center font-bold leading-tight ${size === "lg" ? "text-sm" : "text-[10px]"}`}>
            {card.nameKo}
          </span>
        </>
      )}
    </span>
  );
}

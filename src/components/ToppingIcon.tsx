import type { ToppingItem } from "@/data/topping-types";

// 재료 일러스트는 카드 모양(약 128×111)이라 정사각형 칸 안에 원래 비율 그대로 맞춰 넣는다.
// 전용 일러스트가 없는 재료는 emoji로 대체한다.
const BOX = { lg: "h-12 w-12", sm: "h-6 w-6" };
const TEXT = { lg: "text-3xl", sm: "text-base" };

export function ToppingIcon({
  topping,
  size = "lg",
}: {
  topping: ToppingItem;
  size?: "lg" | "sm";
}) {
  if (!topping.image) {
    return <span className={TEXT[size]}>{topping.emoji}</span>;
  }
  return (
    <span className={`inline-block shrink-0 ${BOX[size]}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={topping.image} alt="" className="h-full w-full object-contain" />
    </span>
  );
}

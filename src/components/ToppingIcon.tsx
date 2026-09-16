import type { ReactNode } from "react";
import type { ToppingItem } from "@/data/topping-types";

// 이모지로는 팽이/새송이/목이/표고버섯이나 건두부/두부피, 당면류를 서로 구분해서
// 그릴 수가 없어서, 실제 생김새를 흉내낸 작은 아이콘을 직접 그려서 대체한다.
// 여기 없는 토핑은 그냥 topping.emoji로 폴백한다.
const ICONS: Record<string, ReactNode> = {
  enoki: (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect x="7" y="16" width="2.6" height="12" rx="1.3" fill="#f4e8c1" />
      <rect x="12" y="11" width="2.6" height="17" rx="1.3" fill="#f4e8c1" />
      <rect x="17" y="14" width="2.6" height="14" rx="1.3" fill="#f4e8c1" />
      <rect x="22" y="17" width="2.6" height="11" rx="1.3" fill="#f4e8c1" />
      <circle cx="8.3" cy="15" r="2.6" fill="#fffaf0" stroke="#e3d19c" strokeWidth="0.6" />
      <circle cx="13.3" cy="10" r="2.6" fill="#fffaf0" stroke="#e3d19c" strokeWidth="0.6" />
      <circle cx="18.3" cy="13" r="2.6" fill="#fffaf0" stroke="#e3d19c" strokeWidth="0.6" />
      <circle cx="23.3" cy="16" r="2.6" fill="#fffaf0" stroke="#e3d19c" strokeWidth="0.6" />
    </svg>
  ),
  "king-oyster": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect x="12" y="14" width="8" height="14" rx="4" fill="#faf6ec" />
      <ellipse cx="16" cy="12" rx="7" ry="4" fill="#b79a7a" />
      <ellipse cx="16" cy="12" rx="7" ry="4" fill="none" stroke="#93765a" strokeWidth="0.8" />
    </svg>
  ),
  "wood-ear": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M8 18 C6 12 12 6 18 7 C24 8 27 14 24 20 C22 24 16 27 12 25 C9 23 8 21 8 18 Z"
        fill="#3d2a1e"
      />
      <path
        d="M11 19 C10 15 14 10 18 11 C21 12 23 15 21 18"
        fill="none"
        stroke="#5a4030"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  shiitake: (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect x="14" y="20" width="4" height="7" rx="2" fill="#f3e8d2" />
      <path
        d="M4 18 C4 10 11 5 16 5 C21 5 28 10 28 18 C28 21 22 22 16 22 C10 22 4 21 4 18 Z"
        fill="#8a5a35"
      />
      <path
        d="M9 15 L13 12 M16 13 L16 17 M20 12 L23 16"
        stroke="#c99a5f"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  ),
  "dried-tofu": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect x="6" y="10" width="20" height="4.5" rx="1.5" fill="#dcc190" />
      <rect x="6" y="15.5" width="20" height="4.5" rx="1.5" fill="#d1b17e" />
      <rect x="6" y="21" width="20" height="4.5" rx="1.5" fill="#dcc190" />
      <path
        d="M7 12 Q9 11 11 12 T16 12 T21 12 T25 12"
        stroke="#b6935f"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  ),
  "tofu-skin": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M5 10 Q9 7 13 10 T21 10 T27 10 L27 14 Q23 17 19 14 T11 14 T5 14 Z"
        fill="#f7ecc9"
        opacity="0.9"
      />
      <path
        d="M5 17 Q9 14 13 17 T21 17 T27 17 L27 21 Q23 24 19 21 T11 21 T5 21 Z"
        fill="#f2e0ad"
        opacity="0.85"
      />
      <path
        d="M5 24 Q9 21 13 24 T21 24 T27 24 L27 28 Q23 31 19 28 T11 28 T5 28 Z"
        fill="#f7ecc9"
        opacity="0.8"
      />
    </svg>
  ),
  "glass-noodle": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M16 6 C22 6 26 10 26 16 C26 22 22 26 16 26 C11 26 7 22 7 17"
        fill="none"
        stroke="#c9d2d6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 10 C19 10 22 12 22 16 C22 20 19 22 16 22 C13 22 11 20 11 17"
        fill="none"
        stroke="#c9d2d6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  "wide-glass-noodle": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M16 6 C22 6 26 10 26 16 C26 22 22 26 16 26 C11 26 7 22 7 17"
        fill="none"
        stroke="#cbb99a"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  bunmoja: (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M16 6 C22 6 26 10 26 16 C26 22 22 26 16 26 C11 26 7 22 7 17"
        fill="none"
        stroke="#e7e3da"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      <path
        d="M16 6 C22 6 26 10 26 16 C26 22 22 26 16 26 C11 26 7 22 7 17"
        fill="none"
        stroke="#cfc9ba"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  ),
  "ramen-noodle": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path d="M5 9 Q8 5 11 9 T17 9 T23 9 T29 9" stroke="#f3c344" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M5 14 Q8 10 11 14 T17 14 T23 14 T29 14" stroke="#f3c344" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M5 19 Q8 15 11 19 T17 19 T23 19 T29 19" stroke="#f3c344" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M5 24 Q8 20 11 24 T17 24 T23 24 T29 24" stroke="#f3c344" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "jjolmyeon-noodle": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <path
        d="M16 6 C22 6 26 10 26 16 C26 22 22 26 16 26 C11 26 7 22 7 17"
        fill="none"
        stroke="#e8a68c"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  "udon-noodle": (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect x="5" y="7" width="22" height="3.4" rx="1.7" fill="#fbf8f2" />
      <rect x="5" y="12.5" width="22" height="3.4" rx="1.7" fill="#f3ede2" />
      <rect x="5" y="18" width="22" height="3.4" rx="1.7" fill="#fbf8f2" />
      <rect x="5" y="23.5" width="22" height="3.4" rx="1.7" fill="#f3ede2" />
    </svg>
  ),
};

export function ToppingIcon({
  topping,
  size = "lg",
}: {
  topping: ToppingItem;
  size?: "lg" | "sm";
}) {
  const icon = ICONS[topping.id];
  if (!icon) {
    return <span className={size === "lg" ? "text-3xl" : "text-base"}>{topping.emoji}</span>;
  }
  return <span className={`inline-block ${size === "lg" ? "h-9 w-9" : "h-5 w-5"}`}>{icon}</span>;
}

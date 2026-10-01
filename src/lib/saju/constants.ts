import type { ElementKey } from "@/data/saju/types";

export type Stem = {
  hanja: string;
  hangul: string;
  element: ElementKey;
  yang: boolean;
  /** URL 슬러그 (일간 유형 페이지) */
  slug: string;
};

export type Branch = {
  hanja: string;
  hangul: string;
  element: ElementKey;
  yang: boolean;
  animal: string;
};

/** 천간 10 — 인덱스 0 = 甲 */
export const STEMS: Stem[] = [
  { hanja: "甲", hangul: "갑", element: "wood", yang: true, slug: "gap" },
  { hanja: "乙", hangul: "을", element: "wood", yang: false, slug: "eul" },
  { hanja: "丙", hangul: "병", element: "fire", yang: true, slug: "byeong" },
  { hanja: "丁", hangul: "정", element: "fire", yang: false, slug: "jeong" },
  { hanja: "戊", hangul: "무", element: "earth", yang: true, slug: "mu" },
  { hanja: "己", hangul: "기", element: "earth", yang: false, slug: "gi" },
  { hanja: "庚", hangul: "경", element: "metal", yang: true, slug: "gyeong" },
  { hanja: "辛", hangul: "신", element: "metal", yang: false, slug: "sin" },
  { hanja: "壬", hangul: "임", element: "water", yang: true, slug: "im" },
  { hanja: "癸", hangul: "계", element: "water", yang: false, slug: "gye" },
];

/** 지지 12 — 인덱스 0 = 子. 오행은 지지의 본기(本氣) 기준. */
export const BRANCHES: Branch[] = [
  { hanja: "子", hangul: "자", element: "water", yang: true, animal: "쥐" },
  { hanja: "丑", hangul: "축", element: "earth", yang: false, animal: "소" },
  { hanja: "寅", hangul: "인", element: "wood", yang: true, animal: "호랑이" },
  { hanja: "卯", hangul: "묘", element: "wood", yang: false, animal: "토끼" },
  { hanja: "辰", hangul: "진", element: "earth", yang: true, animal: "용" },
  { hanja: "巳", hangul: "사", element: "fire", yang: false, animal: "뱀" },
  { hanja: "午", hangul: "오", element: "fire", yang: true, animal: "말" },
  { hanja: "未", hangul: "미", element: "earth", yang: false, animal: "양" },
  { hanja: "申", hangul: "신", element: "metal", yang: true, animal: "원숭이" },
  { hanja: "酉", hangul: "유", element: "metal", yang: false, animal: "닭" },
  { hanja: "戌", hangul: "술", element: "earth", yang: true, animal: "개" },
  { hanja: "亥", hangul: "해", element: "water", yang: false, animal: "돼지" },
];

export const ELEMENT_ORDER: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

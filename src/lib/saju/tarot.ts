// 타로 카드. 메이저 아르카나 22장을 브라우저에서 무작위로 섞고, 이용자가 뒷면 카드 중에서 직접 고른다.
// 사주와 달리 정해진 계산이 아니라 매번 새로 섞는 것이 타로의 방식이라, 같은 질문도 다른 카드가 나올 수 있다.
import type { TarotTopic } from "@/data/saju/types";

export type TarotSpread = "one" | "three";
export type DrawnCard = { number: number; reversed: boolean };
export type TarotDraw = { topic: TarotTopic; spread: TarotSpread; cards: DrawnCard[] };

export const SPREAD_POSITIONS: Record<TarotSpread, string[]> = {
  one: ["오늘의 메시지"],
  three: ["과거", "현재", "미래"],
};

/** 역방향이 나올 확률 — 너무 자주 나오지 않게 조금 낮춘다 */
const REVERSED_RATE = 0.3;

function randomInt(max: number): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] % max;
}

/** 22장을 섞어 뒷면으로 깔 순서와, 각 장이 뒤집혀 놓였는지를 정한다 */
export function shuffleDeck(): DrawnCard[] {
  const deck = Array.from({ length: 22 }, (_, number) => number);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.map((number) => ({ number, reversed: randomInt(1000) < REVERSED_RATE * 1000 }));
}

const STORAGE_KEY = "meme-quiz:tarot:draw";

export function saveTarotDraw(draw: TarotDraw): boolean {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draw));
    return true;
  } catch {
    return false;
  }
}

export function loadTarotDraw(): TarotDraw | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TarotDraw) : null;
  } catch {
    return null;
  }
}

const ROMAN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
export const romanOf = (number: number) => ROMAN[number] ?? String(number);

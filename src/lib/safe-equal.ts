import { timingSafeEqual } from "node:crypto";

/** 시크릿 비교에 쓰는 타이밍 공격에 안전한 문자열 비교. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

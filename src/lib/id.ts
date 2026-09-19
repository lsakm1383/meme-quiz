import { randomBytes } from "node:crypto";

/** URL에 쓰기 좋은 짧고 무작위한 id를 만든다 (그룹 공유 링크, 멤버 id 등). */
export function generateShortId(bytes: number = 5): string {
  return randomBytes(bytes).toString("base64url");
}

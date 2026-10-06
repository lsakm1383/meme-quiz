import type { TojeongGua } from "@/data/saju/types";

// 144괘 풀이는 분량이 커서 상괘(1~8)별 파일로 나누고, 결과 화면에서 필요한 파일만 불러온다.
const loaders: Record<number, () => Promise<{ default: Record<string, TojeongGua> }>> = {
  1: () => import("@/data/saju/tojeong/1"),
  2: () => import("@/data/saju/tojeong/2"),
  3: () => import("@/data/saju/tojeong/3"),
  4: () => import("@/data/saju/tojeong/4"),
  5: () => import("@/data/saju/tojeong/5"),
  6: () => import("@/data/saju/tojeong/6"),
  7: () => import("@/data/saju/tojeong/7"),
  8: () => import("@/data/saju/tojeong/8"),
};

export async function loadGua(code: string): Promise<TojeongGua | null> {
  const load = loaders[Number(code[0])];
  if (!load) return null;
  return (await load()).default[code] ?? null;
}

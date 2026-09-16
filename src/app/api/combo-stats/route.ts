import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { getToppingTest, isValidCombo, comboKeyToToppingIds } from "@/data/toppings";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const testId = body?.testId;
  const comboKey = body?.comboKey;
  const shouldIncrement = body?.increment !== false;

  if (typeof testId !== "string" || typeof comboKey !== "string") {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const test = getToppingTest(testId);
  if (!test || !isValidCombo(test, comboKeyToToppingIds(comboKey))) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    // 아직 Redis 연동 전 — 통계 없이 빈 결과를 돌려준다.
    return NextResponse.json({ count: 0, total: 0, rank: 0, totalCombos: 0, top: [] });
  }

  const key = `combo:${testId}:counts`;
  if (shouldIncrement) {
    await redis.hincrby(key, comboKey, 1);
  }

  const raw = (await redis.hgetall<Record<string, unknown>>(key)) ?? {};
  const counts = Object.entries(raw)
    .map(([key, value]) => ({ comboKey: key, count: Number(value) || 0 }))
    .sort((a, b) => b.count - a.count);

  const total = counts.reduce((sum, entry) => sum + entry.count, 0);
  const rank = counts.findIndex((entry) => entry.comboKey === comboKey) + 1;
  const count = counts.find((entry) => entry.comboKey === comboKey)?.count ?? 0;

  const top = counts.slice(0, 5).map((entry) => ({
    comboKey: entry.comboKey,
    count: entry.count,
    toppingIds: comboKeyToToppingIds(entry.comboKey),
  }));

  return NextResponse.json({
    count,
    total,
    rank,
    totalCombos: counts.length,
    top,
  });
}

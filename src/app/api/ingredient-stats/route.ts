import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import {
  getToppingTest,
  isValidCombo,
  comboKeyToToppingIds,
  noneOptionId,
} from "@/data/toppings";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (await isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const testId = body?.testId;
  const comboKey = body?.comboKey;
  const shouldIncrement = body?.increment !== false;

  if (typeof testId !== "string" || typeof comboKey !== "string") {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const test = getToppingTest(testId);
  const toppingIds = comboKeyToToppingIds(comboKey);
  if (!test || !isValidCombo(test, toppingIds)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    // 아직 Redis 연동 전 — 통계 없이 빈 결과를 돌려준다.
    return NextResponse.json({ counts: {}, totalParticipants: 0 });
  }

  const countsKey = `ingredient-stats:${testId}:counts`;
  const participantsKey = `ingredient-stats:${testId}:participants`;

  if (shouldIncrement) {
    const idSet = new Set(toppingIds);
    const noneFields = test.categories
      .filter((category) => category.minSelect === 0)
      .filter((category) => !category.toppings.some((t) => idSet.has(t.id)))
      .map((category) => noneOptionId(category.id));

    await Promise.all([
      ...toppingIds.map((id) => redis.hincrby(countsKey, id, 1)),
      ...noneFields.map((id) => redis.hincrby(countsKey, id, 1)),
      redis.incr(participantsKey),
    ]);
  }

  const [raw, totalParticipants] = await Promise.all([
    redis.hgetall<Record<string, unknown>>(countsKey),
    redis.get<number>(participantsKey),
  ]);

  const counts: Record<string, number> = {};
  for (const [field, value] of Object.entries(raw ?? {})) {
    counts[field] = Number(value) || 0;
  }

  return NextResponse.json({
    counts,
    totalParticipants: Number(totalParticipants) || 0,
  });
}

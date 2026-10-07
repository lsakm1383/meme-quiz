import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { safeEqual } from "@/lib/safe-equal";
import { EVENT_TYPES, koreaDate, type EventType } from "@/lib/events";
import { registeredTests } from "@/lib/test-registry";

// 이용 통계 조회 (관리자 전용). x-admin-secret 헤더가 ADMIN_SEED_SECRET 과 같아야 한다.
// ?days=1|7|30 — 오늘을 포함한 최근 며칠을 합산하고, 날짜별 전체 합계도 함께 돌려준다.
export async function GET(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SEED_SECRET;
  if (!secret || !expected || !safeEqual(secret, expected)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "redis not configured" }, { status: 503 });

  const daysParam = Number(new URL(request.url).searchParams.get("days"));
  const days = [1, 7, 30].includes(daysParam) ? daysParam : 7;
  const dates = Array.from({ length: days }, (_, i) => koreaDate(new Date(Date.now() - i * 864e5)));

  const totals = new Map<string, Record<EventType, number>>();
  const daily: { date: string; counts: Record<EventType, number> }[] = [];
  const empty = () => Object.fromEntries(EVENT_TYPES.map((event) => [event, 0])) as Record<EventType, number>;

  for (const date of dates) {
    const raw = (await redis.hgetall<Record<string, unknown>>(`ev:${date}`)) ?? {};
    const dayCounts = empty();
    for (const [field, value] of Object.entries(raw)) {
      const [key, event] = field.split("|") as [string, EventType];
      if (!(EVENT_TYPES as readonly string[]).includes(event)) continue;
      const count = Number(value) || 0;
      if (!totals.has(key)) totals.set(key, empty());
      totals.get(key)![event] += count;
      dayCounts[event] += count;
    }
    daily.push({ date, counts: dayCounts });
  }

  const tests = registeredTests
    .map((test) => ({ ...test, counts: totals.get(test.key) ?? empty() }))
    .sort((a, b) => b.counts.view + b.counts.result - (a.counts.view + a.counts.result));

  return NextResponse.json({ days, tests, daily: daily.reverse() });
}

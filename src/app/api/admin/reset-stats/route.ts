import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { safeEqual } from "@/lib/safe-equal";

// 결과 통계(stats:*)와 마라탕 재료 통계(ingredient-stats:*)를 전부 지우는 관리자 전용 엔드포인트.
// x-admin-secret 헤더가 ADMIN_SEED_SECRET과 일치해야 동작한다.
// 그룹(group:*)과 요청 제한(ratelimit:*) 키는 건드리지 않는다. 슬러그가 바뀌기 전의 옛 키까지
// 지우려고 테스트 목록 대신 접두사로 SCAN한다.
const PREFIXES = ["stats:*", "ingredient-stats:*"];

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SEED_SECRET;
  if (!secret || !expected || !safeEqual(secret, expected)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "redis not configured" }, { status: 503 });
  }

  const deleted: string[] = [];
  for (const match of PREFIXES) {
    let cursor = "0";
    do {
      const [next, keys] = await redis.scan(cursor, { match, count: 200 });
      cursor = String(next);
      if (keys.length > 0) {
        await redis.del(...keys);
        deleted.push(...keys);
      }
    } while (cursor !== "0");
  }

  return NextResponse.json({ deleted: deleted.length, keys: deleted.sort() });
}

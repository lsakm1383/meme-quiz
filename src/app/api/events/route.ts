import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";
import { getClientIp } from "@/lib/rate-limit";
import { isEventType, koreaDate } from "@/lib/events";
import { isRegisteredTestKey } from "@/lib/test-registry";

// 이용 통계 기록. 날짜별 해시(ev:YYYY-MM-DD)에 "테스트키|이벤트" 칸의 숫자만 1씩 올린다.
// 누가 보냈는지는 저장하지 않고, IP 는 짧은 요청 제한 확인에만 쓴다.
// 결과 통계 초기화(stats:*)와 섞이지 않도록 접두사를 따로 쓴다.
const RETENTION_SECONDS = 60 * 60 * 24 * 400;

let limiter: Ratelimit | null | undefined;
function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;
  const redis = getRedis();
  // 한 화면에서 조회·시작·공유 등 여러 번 보낼 수 있어 결과 통계보다 넉넉하게 둔다.
  limiter = redis
    ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(30, "10 s"), prefix: "ratelimit:events" })
    : null;
  return limiter;
}

export async function POST(request: Request) {
  const rateLimiter = getLimiter();
  if (rateLimiter && !(await rateLimiter.limit(getClientIp(request))).success) {
    return new NextResponse(null, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const key = body?.key;
  const event = body?.event;
  if (!isRegisteredTestKey(key) || !isEventType(event)) {
    return new NextResponse(null, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) return new NextResponse(null, { status: 204 });

  const hashKey = `ev:${koreaDate()}`;
  await redis.hincrby(hashKey, `${key}|${event}`, 1);
  await redis.expire(hashKey, RETENTION_SECONDS);
  return new NextResponse(null, { status: 204 });
}

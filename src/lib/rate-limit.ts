import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";

let limiter: Ratelimit | null | undefined;

// Redis가 아직 연동 전이면 통계 API 자체가 이미 no-op이니 제한도 걸 필요가 없다.
function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;

  const redis = getRedis();
  limiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "10 s"),
        prefix: "ratelimit:stats",
      })
    : null;
  return limiter;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

/** IP당 10초에 10회로 제한한다 — 정상적인 결과 조회 한 번이면 충분하고, 봇의 반복 호출만 막는다. */
export async function isRateLimited(identifier: string): Promise<boolean> {
  const rateLimiter = getLimiter();
  if (!rateLimiter) return false;

  const { success } = await rateLimiter.limit(identifier);
  return !success;
}

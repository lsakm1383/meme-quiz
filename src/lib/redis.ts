import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

// Vercel의 Upstash Redis 마켓플레이스 연동을 붙이기 전까지는 두 값이 없으므로
// null을 반환한다 — 통계 기능은 조용히 꺼진 채로 나머지 사이트는 정상 동작해야 한다.
export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { getClientIp, isGroupRateLimited } from "@/lib/rate-limit";
import { generateShortId } from "@/lib/id";
import { groupKey, isValidTitle, type GroupMeta } from "@/lib/groups";
import { getMbtiTest } from "@/data/mbti";

export async function POST(request: Request) {
  if (await isGroupRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const title = body?.title;
  const testId = body?.testId;

  if (!isValidTitle(title) || typeof testId !== "string" || !getMbtiTest(testId)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "redis not configured" }, { status: 503 });
  }

  const groupId = generateShortId();
  const meta: GroupMeta = { title: title.trim(), testId, createdAt: Date.now() };
  await redis.hset(groupKey(groupId), { __meta: meta });

  return NextResponse.json({ groupId });
}

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { groupKey, parseGroupHash } from "@/lib/groups";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "redis not configured" }, { status: 503 });
  }

  const raw = await redis.hgetall<Record<string, unknown>>(groupKey(groupId));
  const parsed = parseGroupHash(raw);
  if (!parsed) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: parsed.meta.title,
    testId: parsed.meta.testId,
    members: parsed.members,
  });
}

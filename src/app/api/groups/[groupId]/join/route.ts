import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { getClientIp, isGroupRateLimited } from "@/lib/rate-limit";
import { generateShortId } from "@/lib/id";
import {
  groupKey,
  memberField,
  isValidNickname,
  parseGroupHash,
  MAX_MEMBERS,
  type GroupMember,
} from "@/lib/groups";
import { getMbtiTest, getMbtiProfile } from "@/data/mbti";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  if (await isGroupRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const { groupId } = await params;
  const body = await request.json().catch(() => null);
  const nickname = body?.nickname;
  const code = body?.code;

  if (!isValidNickname(nickname) || typeof code !== "string") {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "redis not configured" }, { status: 503 });
  }

  const key = groupKey(groupId);
  const raw = await redis.hgetall<Record<string, string>>(key);
  const parsed = parseGroupHash(raw);
  if (!parsed) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const test = getMbtiTest(parsed.meta.testId);
  if (!test || !getMbtiProfile(test, code)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  if (parsed.members.length >= MAX_MEMBERS) {
    return NextResponse.json({ error: "group full" }, { status: 400 });
  }

  const memberId = generateShortId(4);
  const member: GroupMember = {
    id: memberId,
    nickname: nickname.trim(),
    code,
    joinedAt: Date.now(),
  };
  await redis.hset(key, { [memberField(memberId)]: JSON.stringify(member) });

  return NextResponse.json({ memberId });
}

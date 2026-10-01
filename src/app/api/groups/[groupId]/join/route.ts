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
import { getMbtiTest, getMbtiProfileByCode } from "@/data/mbti";
import { getSajuTest, getDayMaster } from "@/data/saju";
import { isValidScores, type FortuneScores } from "@/lib/saju/fortune";

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
  const raw = await redis.hgetall<Record<string, unknown>>(key);
  const parsed = parseGroupHash(raw);
  if (!parsed) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // 성격 유형 그룹은 유형 코드를, 사주 운세 그룹은 일간 슬러그와 운세 점수를 받는다.
  // 사주 점수는 생년월일을 서버로 보내지 않으려고 기기에서 계산해 보내므로 범위만 검사한다.
  let scores: FortuneScores | undefined;
  const mbtiTest = getMbtiTest(parsed.meta.testId);
  if (mbtiTest) {
    if (!getMbtiProfileByCode(mbtiTest, code)) {
      return NextResponse.json({ error: "invalid request" }, { status: 400 });
    }
  } else if (getSajuTest(parsed.meta.testId)?.kind === "fortune") {
    if (!getDayMaster(code) || !isValidScores(body?.scores)) {
      return NextResponse.json({ error: "invalid request" }, { status: 400 });
    }
    const raw = body.scores as FortuneScores;
    scores = { wealth: raw.wealth, love: raw.love, marriage: raw.marriage, career: raw.career };
  } else {
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
    ...(scores ? { scores } : {}),
    joinedAt: Date.now(),
  };
  await redis.hset(key, { [memberField(memberId)]: member });

  return NextResponse.json({ memberId });
}

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { getQuiz, getResult } from "@/data/quizzes";
import { getTournament, getCandidate } from "@/data/tournaments";
import { getDecisionTest, getDecisionResult } from "@/data/decisions";
import { getMbtiTest, getMbtiProfileBySlug } from "@/data/mbti";
import { getSajuTest, getDayMaster } from "@/data/saju";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

type Kind = "quiz" | "tournament" | "decision" | "mbti" | "saju";

function isValidTarget(kind: string, groupId: string, resultId: string) {
  if (kind === "quiz") {
    const quiz = getQuiz(groupId);
    return !!quiz && !!getResult(quiz, resultId);
  }
  if (kind === "tournament") {
    const tournament = getTournament(groupId);
    return !!tournament && !!getCandidate(tournament, resultId);
  }
  if (kind === "decision") {
    const test = getDecisionTest(groupId);
    return !!test && !!getDecisionResult(test, resultId);
  }
  if (kind === "saju") {
    // 사주는 생년월일 대신 일간 유형(천간 슬러그)만 집계한다.
    return !!getSajuTest(groupId) && !!getDayMaster(resultId);
  }
  if (kind === "mbti") {
    const test = getMbtiTest(groupId);
    return !!test && !!getMbtiProfileBySlug(test, resultId);
  }
  return false;
}

export async function POST(request: Request) {
  if (await isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const kind = body?.kind as Kind | undefined;
  const groupId = body?.groupId;
  const resultId = body?.resultId;
  const shouldIncrement = body?.increment !== false;

  if (
    typeof kind !== "string" ||
    typeof groupId !== "string" ||
    typeof resultId !== "string" ||
    !isValidTarget(kind, groupId, resultId)
  ) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const redis = getRedis();
  if (!redis) {
    // 아직 Redis 연동 전 — 통계 없이 빈 결과를 돌려준다.
    return NextResponse.json({ counts: {} });
  }

  const key = `stats:${kind}:${groupId}`;
  if (shouldIncrement) {
    await redis.hincrby(key, resultId, 1);
  }

  const raw = (await redis.hgetall<Record<string, unknown>>(key)) ?? {};
  const counts: Record<string, number> = {};
  for (const [field, value] of Object.entries(raw)) {
    counts[field] = Number(value) || 0;
  }

  return NextResponse.json({ counts });
}

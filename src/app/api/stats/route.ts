import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { getQuiz, getResult } from "@/data/quizzes";
import { getTournament, getCandidate } from "@/data/tournaments";

type Kind = "quiz" | "tournament";

function isValidTarget(kind: string, groupId: string, resultId: string) {
  if (kind === "quiz") {
    const quiz = getQuiz(groupId);
    return !!quiz && !!getResult(quiz, resultId);
  }
  if (kind === "tournament") {
    const tournament = getTournament(groupId);
    return !!tournament && !!getCandidate(tournament, resultId);
  }
  return false;
}

export async function POST(request: Request) {
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

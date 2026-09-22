import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests, noneOptionId } from "@/data/toppings";
import { decisionTests } from "@/data/decisions";
import { mbtiTests } from "@/data/mbti";
import { safeEqual } from "@/lib/safe-equal";

// 초기 방문자에게 '아무도 안 하는 테스트'로 안 보이게 하기 위한 관리자 전용 시드 엔드포인트.
// x-admin-secret 헤더가 ADMIN_SEED_SECRET과 일치해야 동작한다.
// HSET으로 값을 덮어쓰므로 여러 번 실행해도 숫자가 계속 불어나지 않는다 (재실행하면 새로운 무작위값으로 재설정됨).
//
// 바디 없이 호출하면 기존처럼 등록된 모든 퀴즈/월드컵/분기형/조합형/MBTI 테스트를 전부 다시 시드한다.
// 특정 테스트만 골라 시드하고 싶으면, 바디에 아래 필드 중 하나라도 넣어서 호출한다
// (그 경우 명시하지 않은 종류는 아예 건드리지 않는다):
// { "quizIds": ["flower-type"], "tournamentIds": [...], "decisionIds": ["dress", "honeymoon"], "toppingIds": [...], "mbtiIds": ["mbti-lite"] }

type SeedRequestBody = {
  quizIds?: string[];
  tournamentIds?: string[];
  decisionIds?: string[];
  toppingIds?: string[];
  mbtiIds?: string[];
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distribute(total: number, count: number) {
  const weights = Array.from({ length: count }, () => Math.random() + 0.35);
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const shares = weights.map((w) => Math.round((w / weightSum) * total));
  const diff = total - shares.reduce((a, b) => a + b, 0);
  shares[shares.length - 1] = Math.max(0, shares[shares.length - 1] + diff);
  return shares;
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SEED_SECRET;
  if (!secret || !expected || !safeEqual(secret, expected)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { error: "redis not configured" },
      { status: 503 }
    );
  }

  const body: SeedRequestBody = await request.json().catch(() => ({}));
  const hasFilter =
    body.quizIds !== undefined ||
    body.tournamentIds !== undefined ||
    body.decisionIds !== undefined ||
    body.toppingIds !== undefined ||
    body.mbtiIds !== undefined;

  const targetQuizzes = hasFilter
    ? quizzes.filter((quiz) => body.quizIds?.includes(quiz.id))
    : quizzes;
  const targetTournaments = hasFilter
    ? tournaments.filter((tournament) => body.tournamentIds?.includes(tournament.id))
    : tournaments;
  const targetDecisions = hasFilter
    ? decisionTests.filter((decision) => body.decisionIds?.includes(decision.id))
    : decisionTests;
  const targetToppings = hasFilter
    ? toppingTests.filter((test) => body.toppingIds?.includes(test.id))
    : toppingTests;
  const targetMbtiTests = hasFilter
    ? mbtiTests.filter((test) => body.mbtiIds?.includes(test.id))
    : mbtiTests;

  const summary: Record<string, Record<string, number>> = {};

  for (const quiz of targetQuizzes) {
    const total = randomInt(300, 2600);
    const shares = distribute(total, quiz.results.length);
    const fields: Record<string, number> = {};
    quiz.results.forEach((result, i) => {
      fields[result.id] = shares[i];
    });
    await redis.hset(`stats:quiz:${quiz.id}`, fields);
    summary[`quiz:${quiz.id}`] = fields;
  }

  for (const tournament of targetTournaments) {
    const total = randomInt(300, 2600);
    const shares = distribute(total, tournament.candidates.length);
    const fields: Record<string, number> = {};
    tournament.candidates.forEach((candidate, i) => {
      fields[candidate.id] = shares[i];
    });
    await redis.hset(`stats:tournament:${tournament.id}`, fields);
    summary[`tournament:${tournament.id}`] = fields;
  }

  for (const decision of targetDecisions) {
    const total = randomInt(300, 2600);
    const shares = distribute(total, decision.results.length);
    const fields: Record<string, number> = {};
    decision.results.forEach((result, i) => {
      fields[result.id] = shares[i];
    });
    await redis.hset(`stats:decision:${decision.id}`, fields);
    summary[`decision:${decision.id}`] = fields;
  }

  for (const test of targetToppings) {
    const participants = randomInt(300, 2600);
    const fields: Record<string, number> = {};
    for (const category of test.categories) {
      if (category.minSelect === 0) {
        // 선택이 필수가 아닌 카테고리는 일부 참여자가 아예 안 고르는 것부터 흉내낸다.
        const noneCount = Math.round(participants * (randomInt(15, 50) / 100));
        const pickers = participants - noneCount;
        const avgPicksAmongPickers = (1 + category.maxSelect) / 2;
        const total = Math.round(pickers * avgPicksAmongPickers);
        const shares = distribute(total, category.toppings.length);
        category.toppings.forEach((topping, i) => {
          fields[topping.id] = shares[i];
        });
        fields[noneOptionId(category.id)] = noneCount;
        continue;
      }

      // 카테고리별 평균 선택 개수만큼 참여자 수에 비례한 총량을 나눠 갖도록 한다
      // (예: 최소1~최대1인 카테고리는 참여자 수만큼, 2~4개인 카테고리는 그 3배 안팎).
      const avgPicks = (category.minSelect + category.maxSelect) / 2;
      const total = Math.round(participants * avgPicks);
      const shares = distribute(total, category.toppings.length);
      category.toppings.forEach((topping, i) => {
        fields[topping.id] = shares[i];
      });
    }
    await redis.hset(`ingredient-stats:${test.id}:counts`, fields);
    await redis.set(`ingredient-stats:${test.id}:participants`, participants);
    summary[`topping:${test.id}`] = { ...fields, __participants: participants };
  }

  for (const test of targetMbtiTests) {
    const total = randomInt(300, 2600);
    const shares = distribute(total, test.profiles.length);
    const fields: Record<string, number> = {};
    test.profiles.forEach((profile, i) => {
      fields[profile.slug] = shares[i];
    });
    await redis.hset(`stats:mbti:${test.id}`, fields);
    summary[`mbti:${test.id}`] = fields;
  }

  return NextResponse.json({ ok: true, summary });
}

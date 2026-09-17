import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests, noneOptionId } from "@/data/toppings";
import { safeEqual } from "@/lib/safe-equal";

// 초기 방문자에게 '아무도 안 하는 테스트'로 안 보이게 하기 위한 관리자 전용 시드 엔드포인트.
// x-admin-secret 헤더가 ADMIN_SEED_SECRET과 일치해야 동작한다.
// HSET으로 값을 덮어쓰므로 여러 번 실행해도 숫자가 계속 불어나지 않는다 (재실행하면 새로운 무작위값으로 재설정됨).

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

  const summary: Record<string, Record<string, number>> = {};

  for (const quiz of quizzes) {
    const total = randomInt(300, 2600);
    const shares = distribute(total, quiz.results.length);
    const fields: Record<string, number> = {};
    quiz.results.forEach((result, i) => {
      fields[result.id] = shares[i];
    });
    await redis.hset(`stats:quiz:${quiz.id}`, fields);
    summary[`quiz:${quiz.id}`] = fields;
  }

  for (const tournament of tournaments) {
    const total = randomInt(300, 2600);
    const shares = distribute(total, tournament.candidates.length);
    const fields: Record<string, number> = {};
    tournament.candidates.forEach((candidate, i) => {
      fields[candidate.id] = shares[i];
    });
    await redis.hset(`stats:tournament:${tournament.id}`, fields);
    summary[`tournament:${tournament.id}`] = fields;
  }

  for (const test of toppingTests) {
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

  return NextResponse.json({ ok: true, summary });
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getToppingTest, isValidCombo, comboKeyToToppingIds, describeCombo } from "@/data/toppings";
import type { ToppingTestConfig } from "@/data/topping-types";
import { computeRarity } from "@/lib/topping-rarity";
import { getRedis } from "@/lib/redis";

export const alt = "조합 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = true;

// 사토리(next/og)는 시스템 폰트가 없어 한글은 직접 폰트를 넘겨줘야 깨지지 않는다.
const notoBold = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf")
);
const notoRegular = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf")
);

// 사토리는 색깔 이모지 글리프가 있는 폰트가 없으면 이모지를 못 그리므로,
// Twemoji SVG를 코드포인트로 가져와 <img>로 그린다.
function emojiImageUrl(emoji: string) {
  const codepoints = [...emoji]
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

// 결과 화면과 같은 희귀도 등급을 보여주려고, 조회만(증가 없이) 재료 통계를 읽는다.
// Redis 미설정이거나 읽기에 실패하면 null — 그땐 등급 없이 조합 설명으로 대신한다.
async function loadRarity(test: ToppingTestConfig, toppingIds: string[]) {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const raw = await redis.hgetall<Record<string, unknown>>(
      `ingredient-stats:${test.id}:counts`
    );
    const counts: Record<string, number> = {};
    for (const [field, value] of Object.entries(raw ?? {})) counts[field] = Number(value) || 0;
    return computeRarity(test, toppingIds, counts);
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ testId: string; comboKey: string }>;
}) {
  const { testId, comboKey } = await params;
  const test = getToppingTest(testId);
  const toppingIds = comboKeyToToppingIds(comboKey);
  const valid = test && isValidCombo(test, toppingIds);
  const rarity = valid ? await loadRarity(test, toppingIds) : null;
  const { title, subtitle } = rarity
    ? { title: rarity.title, subtitle: `희귀도 ${rarity.percent}% · ${rarity.subtitle}` }
    : valid
      ? describeCombo(test, toppingIds)
      : { title: "결과", subtitle: "" };
  const art = rarity
    ? `data:image/png;base64,${(
        await sharp(join(process.cwd(), "public", rarity.image)).png().toBuffer()
      ).toString("base64")}`
    : null;

  const [bold, regular] = await Promise.all([notoBold, notoRegular]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#71717a" }}>
          {test?.title}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 960,
            marginTop: 24,
            padding: "40px 64px",
            borderRadius: 48,
            background: rarity?.color ?? "#fee2e2",
          }}
        >
          {art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={art} width={183} height={220} style={{ borderRadius: 24 }} alt="" />
          ) : test?.emoji ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={emojiImageUrl(test.emoji)} width={140} height={140} alt="" />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 400,
              color: "#27272a",
              marginTop: 12,
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 20 }}>
          오늘의 밈 테스트 · 너도 조합 만들러 가기 👉
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: regular, weight: 400, style: "normal" },
        { name: "Noto Sans KR", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}

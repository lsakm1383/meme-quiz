import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getToppingTest, isValidCombo, comboKeyToToppingIds, describeCombo } from "@/data/toppings";

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

export default async function Image({
  params,
}: {
  params: Promise<{ testId: string; comboKey: string }>;
}) {
  const { testId, comboKey } = await params;
  const test = getToppingTest(testId);
  const toppingIds = comboKeyToToppingIds(comboKey);
  const valid = test && isValidCombo(test, toppingIds);
  const { title, subtitle } = valid
    ? describeCombo(test, toppingIds)
    : { title: "결과", subtitle: "" };

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
            width: 760,
            marginTop: 32,
            padding: "56px 64px",
            borderRadius: 48,
            background: "#fee2e2",
          }}
        >
          {test?.emoji ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={emojiImageUrl(test.emoji)} width={176} height={176} />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 400,
              color: "#27272a",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
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

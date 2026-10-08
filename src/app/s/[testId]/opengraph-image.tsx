import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { sajuTests, getSajuTest, seriesNameOf } from "@/data/saju";

export const alt = "사주·전통 운세 테스트";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 사토리(next/og)는 시스템 폰트가 없어 한글은 직접 폰트를 넘겨줘야 깨지지 않는다.
const notoBold = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf"));
const notoRegular = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf"));

export function generateStaticParams() {
  return sajuTests.map((test) => ({ testId: test.id }));
}

// 시작 화면 공유 이미지 — 결과를 시작 화면 주소로 공유하는 테스트(손금·타로·토정비결 등)도 이 그림이 미리보기로 뜬다.
export default async function Image({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getSajuTest(testId);
  const [bold, regular] = await Promise.all([notoBold, notoRegular]);
  // 미리보기 렌더러(satori)가 webp를 못 읽어서 png로 변환한다.
  const cover = test?.image
    ? `data:image/png;base64,${(await sharp(join(process.cwd(), "public", test.image)).resize(400, 400).png().toBuffer()).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          padding: "0 80px",
          background: test ? `${test.accentColor}14` : "#fafafa",
        }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} width={400} height={400} style={{ borderRadius: 48 }} alt="" />
        )}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
          <div style={{ display: "flex", fontSize: 34, color: test?.accentColor ?? "#71717a", fontWeight: 700 }}>
            {test ? seriesNameOf(test) : "오늘의 밈 테스트"}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#18181b", marginTop: 12, lineHeight: 1.15 }}>
            {test?.title ?? "사주·운세"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              padding: "16px 36px",
              borderRadius: 999,
              background: test?.accentColor ?? "#18181b",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 700,
              alignSelf: "flex-start",
            }}
          >
            나도 해보기
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 28 }}>오늘의 밈 테스트</div>
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

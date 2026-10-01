import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { sajuTests, getSajuTest, dayMasters, getDayMaster, getElement } from "@/data/saju";
import { STEMS } from "@/lib/saju/constants";

export const alt = "일간 유형";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 사토리(next/og)는 시스템 폰트가 없어 한글·한자는 직접 폰트를 넘겨줘야 깨지지 않는다.
const notoBold = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf"));
const notoRegular = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf"));

export function generateStaticParams() {
  return sajuTests
    .filter((test) => test.kind === "chart")
    .flatMap((test) => dayMasters.map((profile) => ({ testId: test.id, slug: profile.slug })));
}

// 사토리는 색깔 이모지를 못 그리므로 Twemoji SVG를 코드포인트로 가져와 <img>로 그린다.
function emojiImageUrl(emoji: string) {
  const codepoints = [...emoji]
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

export default async function Image({ params }: { params: Promise<{ testId: string; slug: string }> }) {
  const { testId, slug } = await params;
  const test = getSajuTest(testId);
  const profile = getDayMaster(slug);
  const stem = profile && STEMS.find((item) => item.slug === profile.slug);
  const element = stem && getElement(stem.element);

  const [bold, regular] = await Promise.all([notoBold, notoRegular]);
  // 유형 일러스트가 있으면 이모지 대신 쓴다. 미리보기 렌더러(satori)가 webp를 못 읽어서 png로 변환한다.
  const art = profile?.image
    ? `data:image/png;base64,${(await sharp(join(process.cwd(), "public", profile.image)).png().toBuffer()).toString("base64")}`
    : null;

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
          {test?.title} · 나의 일간
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
            background: profile?.color ?? "#e4e4e7",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {art ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={art} width={290} height={180} style={{ borderRadius: 24 }} alt="" />
            ) : profile ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={emojiImageUrl(profile.emoji)} width={140} height={140} alt="" />
            ) : null}
            <div style={{ display: "flex", fontSize: 120, fontWeight: 700, color: "#18181b" }}>
              {stem ? `${stem.hanja}${element?.hanja}` : ""}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {profile ? `${profile.name} · ${profile.title}` : "일간 유형"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#27272a", marginTop: 12 }}>
            {profile?.subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 20 }}>
          오늘의 밈 테스트 · 내 사주 원국 보러 가기 👉
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

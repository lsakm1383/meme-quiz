import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { sajuTests, getSajuTest, dayMasters, getDayMaster, getElement } from "@/data/saju";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import zodiacCopy from "@/data/saju/zodiac";
import { ZODIAC_SLUGS, zodiacBranchOf } from "@/lib/saju/zodiac";
import { dreams, getDream } from "@/data/saju/dreams";

export const alt = "일간 유형";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 사토리(next/og)는 시스템 폰트가 없어 한글·한자는 직접 폰트를 넘겨줘야 깨지지 않는다.
const notoBold = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf"));
const notoRegular = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf"));

export function generateStaticParams() {
  return sajuTests.flatMap((test) =>
    test.kind === "chart"
      ? dayMasters.map((profile) => ({ testId: test.id, slug: profile.slug }))
      : test.kind === "zodiac"
        ? ZODIAC_SLUGS.map((slug) => ({ testId: test.id, slug }))
        : test.kind === "dream"
          ? dreams.map((dream) => ({ testId: test.id, slug: dream.slug }))
          : []
  );
}

const fonts = (regular: Buffer, bold: Buffer) => [
  { name: "Noto Sans KR", data: regular, weight: 400 as const, style: "normal" as const },
  { name: "Noto Sans KR", data: bold, weight: 700 as const, style: "normal" as const },
];

const DREAM_LABEL = { lucky: "길몽", neutral: "상황 따라 달라요", caution: "조심 신호" } as const;

/** 꿈해몽 공유 이미지 — 꿈 이름과 길몽 여부 */
async function dreamImage(slug: string, accentColor: string) {
  const dream = getDream(slug);
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
        <div style={{ display: "flex", fontSize: 32, color: "#71717a" }}>전통 운세 · 꿈해몽 사전</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 960,
            marginTop: 24,
            padding: "40px 64px",
            borderRadius: 48,
            background: `${accentColor}1f`,
          }}
        >
          {dream && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={emojiImageUrl(dream.emoji)} width={150} height={150} alt="" />
          )}
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#18181b", marginTop: 16 }}>
            {dream ? `${dream.title} 해몽` : "꿈해몽"}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#27272a", marginTop: 12 }}>
            {dream ? `${DREAM_LABEL[dream.tone]}${dream.taemong ? " · 태몽으로도 많이 꿔요" : ""}` : ""}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 20 }}>
          오늘의 밈 테스트 · 어젯밤 꿈 찾아보기 👉
        </div>
      </div>
    ),
    { ...size, fonts: fonts(regular, bold) }
  );
}

/** 띠별 운세 공유 이미지 — 날마다 바뀌는 점수 대신 띠와 별명만 그린다 */
async function zodiacImage(slug: string, accentColor: string) {
  const branch = zodiacBranchOf(slug) ?? 0;
  const animal = zodiacCopy.animals[ZODIAC_SLUGS[branch]];
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
        <div style={{ display: "flex", fontSize: 32, color: "#71717a" }}>사주 시리즈 · 띠별 운세</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 960,
            marginTop: 24,
            padding: "40px 64px",
            borderRadius: 48,
            background: `${accentColor}1f`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={emojiImageUrl(animal.emoji)} width={150} height={150} alt="" />
            <div style={{ display: "flex", fontSize: 110, fontWeight: 700, color: "#18181b" }}>
              {BRANCHES[branch].hanja}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#18181b", marginTop: 16 }}>
            {`${BRANCHES[branch].animal}띠 오늘의 운세`}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#27272a", marginTop: 12 }}>{animal.title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 20 }}>
          오늘의 밈 테스트 · 우리 띠 오늘 운세 보러 가기 👉
        </div>
      </div>
    ),
    { ...size, fonts: fonts(regular, bold) }
  );
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
  if (test?.kind === "zodiac") return zodiacImage(slug, test.accentColor);
  if (test?.kind === "dream") return dreamImage(slug, test.accentColor);
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

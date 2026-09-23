import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { mbtiTests, getMbtiTest, getMbtiProfileBySlug } from "@/data/mbti";
import { getMbtiPhoto } from "@/data/mbti/photos";

export const alt = "테스트 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const notoBold = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf")
);
const notoRegular = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf")
);

export function generateStaticParams() {
  return mbtiTests.flatMap((test) =>
    test.profiles.map((profile) => ({ testId: test.id, slug: profile.slug }))
  );
}

function emojiImageUrl(emoji: string) {
  const codepoints = [...emoji]
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

// 결과 화면과 같은 일러스트를 미리보기에도 쓴다. 원본 비율을 유지한 채 이 상자 안에 맞춘다.
const ART_BOX = { width: 600, height: 190 };

async function loadPhoto(slug: string) {
  const photo = getMbtiPhoto(slug);
  if (!photo) return null;
  const scale = Math.min(ART_BOX.width / photo.width, ART_BOX.height / photo.height);
  const width = Math.round(photo.width * scale);
  const height = Math.round(photo.height * scale);
  // 미리보기 렌더러(satori)가 webp를 못 읽으므로 png로 변환해서 넣는다.
  const png = await sharp(join(process.cwd(), "public", photo.src)).png().toBuffer();
  return { src: `data:image/png;base64,${png.toString("base64")}`, width, height };
}

export default async function Image({
  params,
}: {
  params: Promise<{ testId: string; slug: string }>;
}) {
  const { testId, slug } = await params;
  const test = getMbtiTest(testId);
  const profile = test && getMbtiProfileBySlug(test, slug);

  const [bold, regular] = await Promise.all([notoBold, notoRegular]);
  const art = profile ? await loadPhoto(profile.slug) : null;

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
            background: profile?.color ?? "#e4e4e7",
          }}
        >
          {art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={art.src}
              width={art.width}
              height={art.height}
              style={{ borderRadius: 24 }}
              alt=""
            />
          ) : profile?.emoji ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={emojiImageUrl(profile.emoji)} width={140} height={140} alt="" />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {profile?.title ?? "결과"}
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
            {profile?.subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 20 }}>
          오늘의 밈 테스트 · 너도 해보러 가기 👉
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

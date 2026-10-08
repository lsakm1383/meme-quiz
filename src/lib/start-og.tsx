import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

// 시작 화면(테스트 첫 화면) 공유 미리보기 이미지를 그리는 공용 틀.
// 결과 화면은 결과마다 따로 그리고, 시작 화면은 대표 그림 + 테스트 이름 + "나도 해보기"로 통일한다.

export const startOgSize = { width: 1200, height: 630 };

// 사토리(next/og)는 시스템 폰트가 없어 한글은 직접 폰트를 넘겨줘야 깨지지 않는다.
const notoBold = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf"));
const notoRegular = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf"));

type Art = { src: string; width: number; height: number };

/** public 경로의 그림을 상자 안에 비율 그대로 맞춘다. 미리보기 렌더러(satori)가 webp를 못 읽어서 png로 바꾼다. */
async function loadArt(path: string, maxWidth: number, maxHeight: number, fit: "inside" | "cover" = "inside"): Promise<Art> {
  const { data, info } = await sharp(join(process.cwd(), "public", path))
    .resize(maxWidth, maxHeight, { fit })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { src: `data:image/png;base64,${data.toString("base64")}`, width: info.width, height: info.height };
}

// 사토리는 색깔 이모지를 못 그리므로 Twemoji SVG를 코드포인트로 가져와 <img>로 그린다.
function emojiImageUrl(emoji: string) {
  const codepoints = [...emoji]
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

/** 강조색을 흰색에 옅게 섞은 단색 배경 — 반투명이면 메신저 다크 모드에서 배경이 검게 비친다 */
const tint = (hex: string, amount = 0.08) => {
  const value = parseInt(hex.slice(1), 16);
  const mix = (shift: number) => Math.round(255 - (255 - ((value >> shift) & 255)) * amount);
  return `rgb(${mix(16)}, ${mix(8)}, ${mix(0)})`;
};

/** 제목 길이에 따라 글자 크기를 줄여 두 줄 안에 들어가게 한다 */
const titleSize = (title: string, wide: boolean) =>
  wide ? (title.length > 16 ? 56 : 64) : title.length > 16 ? 58 : title.length > 11 ? 66 : 76;

export async function startOgImage({
  label,
  title,
  accentColor,
  images = [],
  emoji,
  button = "나도 해보기",
}: {
  /** 제목 위 작은 글씨 (예: "1분 테스트") */
  label: string;
  title: string;
  accentColor: string;
  /** public 경로. 1장이면 대표 그림, 여러 장이면 최대 4장을 2×2로 모아 그린다. */
  images?: string[];
  /** 그림이 없을 때 쓸 이모지 */
  emoji?: string;
  button?: string;
}) {
  const [bold, regular] = await Promise.all([notoBold, notoRegular]);
  const fonts = [
    { name: "Noto Sans KR", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Noto Sans KR", data: bold, weight: 700 as const, style: "normal" as const },
  ];

  // 가로로 아주 긴 대표 그림은 위에 크게 두고 제목을 아래에 놓는다.
  let wideArt: Art | null = null;
  let sideArt: Art | null = null;
  let grid: Art[] = [];
  if (images.length === 1) {
    const meta = await sharp(join(process.cwd(), "public", images[0])).metadata();
    const ratio = (meta.width ?? 1) / (meta.height ?? 1);
    if (ratio >= 1.6) wideArt = await loadArt(images[0], 1000, 330);
    else sideArt = await loadArt(images[0], 420, 420);
  } else if (images.length > 1) {
    grid = await Promise.all(images.slice(0, 4).map((path) => loadArt(path, 196, 196, "cover")));
  }

  const labelEl = (
    <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: accentColor }}>{label}</div>
  );
  const buttonEl = (
    <div
      style={{
        display: "flex",
        padding: "14px 34px",
        borderRadius: 999,
        background: accentColor,
        color: "#ffffff",
        fontSize: 32,
        fontWeight: 700,
      }}
    >
      {button}
    </div>
  );
  const siteEl = <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>오늘의 밈 테스트</div>;

  if (wideArt) {
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
            gap: 28,
            background: tint(accentColor),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wideArt.src} width={wideArt.width} height={wideArt.height} style={{ borderRadius: 32 }} alt="" />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 1000 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {labelEl}
              <div style={{ display: "flex", fontSize: titleSize(title, true), fontWeight: 700, color: "#18181b", wordBreak: "keep-all" }}>
                {title}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              {buttonEl}
              {siteEl}
            </div>
          </div>
        </div>
      ),
      { ...startOgSize, fonts }
    );
  }

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
          background: tint(accentColor),
        }}
      >
        {sideArt ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sideArt.src} width={sideArt.width} height={sideArt.height} style={{ borderRadius: 40 }} alt="" />
        ) : grid.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: 408 }}>
            {grid.map((art, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 196,
                  height: 196,
                  borderRadius: 28,
                  background: "#ffffff",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={art.src} width={art.width} height={art.height} style={{ borderRadius: 28 }} alt="" />
              </div>
            ))}
          </div>
        ) : emoji ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={emojiImageUrl(emoji)} width={280} height={280} alt="" />
        ) : null}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
          {labelEl}
          <div
            style={{
              display: "flex",
              fontSize: titleSize(title, false),
              fontWeight: 700,
              color: "#18181b",
              marginTop: 12,
              lineHeight: 1.2,
              wordBreak: "keep-all",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 40 }}>{buttonEl}</div>
          <div style={{ display: "flex", marginTop: 28 }}>{siteEl}</div>
        </div>
      </div>
    ),
    { ...startOgSize, fonts }
  );
}

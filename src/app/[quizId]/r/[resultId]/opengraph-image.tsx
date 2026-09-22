import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { quizzes, getQuiz, getResult } from "@/data/quizzes";

export const alt = "테스트 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 사토리(next/og)는 시스템 폰트가 없어 한글은 직접 폰트를 넘겨줘야 깨지지 않는다.
const notoBold = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf")
);
const notoRegular = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf")
);

export function generateStaticParams() {
  return quizzes.flatMap((quiz) =>
    quiz.results.map((result) => ({ quizId: quiz.id, resultId: result.id }))
  );
}

// 사토리는 색깔 이모지 글리프가 있는 폰트가 없으면 이모지를 못 그리므로,
// Twemoji SVG를 코드포인트로 가져와 <img>로 그린다 (앱 화면 결과 카드와 동일한 이모지가 보이도록).
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
  params: Promise<{ quizId: string; resultId: string }>;
}) {
  const { quizId, resultId } = await params;
  const quiz = getQuiz(quizId);
  const result = quiz && getResult(quiz, resultId);

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
          {quiz?.title}
        </div>
        {/* 앱 결과 화면의 카드(이모지 + 제목 + 부제)를 그대로 재현 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 760,
            marginTop: 32,
            padding: "56px 64px",
            borderRadius: 48,
            background: result?.color ?? "#e4e4e7",
          }}
        >
          {result?.emoji ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={emojiImageUrl(result.emoji)} width={176} height={176} alt="" />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            {result?.title ?? "결과"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 400,
              color: "#27272a",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {result?.subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 36 }}>
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

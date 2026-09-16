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
          background: result?.color ?? "#111827",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 400, color: "#3f3f46" }}>
          {quiz?.title}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#18181b",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          {result?.title ?? "결과"}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 400,
            color: "#27272a",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {result?.subtitle}
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

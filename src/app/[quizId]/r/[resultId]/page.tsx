import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { quizzes, getQuiz, getResult } from "@/data/quizzes";
import { ResultView } from "@/components/ResultView";

type Params = { quizId: string; resultId: string };

export function generateStaticParams() {
  return quizzes.flatMap((quiz) =>
    quiz.results.map((result) => ({ quizId: quiz.id, resultId: result.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { quizId, resultId } = await params;
  const quiz = getQuiz(quizId);
  const result = quiz && getResult(quiz, resultId);
  if (!quiz || !result) return {};

  const title = `나는 "${result.title}" ${result.emoji}`;
  const description = `${result.subtitle} — ${quiz.title}에서 나온 결과예요.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    // 결과 페이지는 공유용이라 검색 색인에서는 뺀다 (링크·미리보기는 그대로 동작, 페이지 안 링크는 follow).
    robots: { index: false, follow: true },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { quizId, resultId } = await params;
  const quiz = getQuiz(quizId);
  const result = quiz && getResult(quiz, resultId);
  if (!quiz || !result) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <ResultView quiz={quiz} result={result} />
    </div>
  );
}

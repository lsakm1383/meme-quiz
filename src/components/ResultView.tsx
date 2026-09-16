import Link from "next/link";
import type { QuizConfig, ResultType } from "@/data/quiz-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

export function ResultView({
  quiz,
  result,
  siteUrl,
}: {
  quiz: QuizConfig;
  result: ResultType;
  siteUrl: string;
}) {
  const resultUrl = `${siteUrl}/${quiz.id}/r/${result.id}`;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">{quiz.title} 결과</p>

      <div
        className="flex w-full flex-col items-center gap-3 rounded-3xl px-6 py-10 shadow-sm"
        style={{ backgroundColor: result.color }}
      >
        <div className="text-7xl">{result.emoji}</div>
        <h1 className="text-2xl font-extrabold text-zinc-900">
          {result.title}
        </h1>
        <p className="text-base font-medium text-zinc-800">
          {result.subtitle}
        </p>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {result.description}
      </p>

      <ShareBar
        title={`나는 "${result.title}" ${result.emoji}`}
        text={`${quiz.title} — 결과: ${result.title} ${result.emoji}\n${result.subtitle}`}
        url={resultUrl}
        accentColor={quiz.accentColor}
      />

      <Link
        href={`/${quiz.id}`}
        className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
      >
        다시 테스트하기
      </Link>

      <div className="w-full pt-4">
        <AdSlot slot="result-bottom" />
      </div>
    </div>
  );
}

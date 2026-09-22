import type { QuizConfig, ResultType } from "@/data/quiz-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { ResultStats } from "@/components/ResultStats";

export function ResultView({
  quiz,
  result,
}: {
  quiz: QuizConfig;
  result: ResultType;
}) {
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

      <ResultStats
        kind="quiz"
        groupId={quiz.id}
        resultId={result.id}
        accentColor={quiz.accentColor}
        items={quiz.results.map((r) => ({
          id: r.id,
          emoji: r.emoji,
          label: r.title,
        }))}
      />

      <ShareBar
        title={`${result.emoji} 나는 "${result.title}"`}
        text={`${quiz.title} 해봤더니 "${result.title}" 나왔어!\n${result.subtitle}\n너는 뭐 나올까? 👉`}
        accentColor={quiz.accentColor}
      />

      {/* 이 화면엔 광고가 있으므로, 다음 화면(광고 없음)으로 이동할 때 next/link의
          클라이언트 사이드 라우팅 대신 완전한 새로고침을 강제한다. SPA 전환으로 넘어가면
          구글 자동 광고 스크립트가 이전 화면의 흔적을 남길 수 있기 때문. */}
      <div className="flex items-center gap-4">
        <a
          href={`/${quiz.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 테스트하기
        </a>
        <span className="text-zinc-300">·</span>
        <a
          href="/"
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="result-bottom" />
      </div>
    </div>
  );
}

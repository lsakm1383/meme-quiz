import type { QuizConfig, ResultType } from "@/data/quiz-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { ResultStats } from "@/components/ResultStats";
import { QuizIcon } from "@/components/QuizIcon";

// 결과 상세(강점·조심할 점·잘 맞는/엇갈리기 쉬운 유형·오늘 해 볼 것). detail 이 있는 결과만 보여준다.
function ResultDetailSections({ quiz, result }: { quiz: QuizConfig; result: ResultType }) {
  const detail = result.detail!;
  const matches = [
    { label: "💞 잘 맞는 유형", ...detail.bestMatch },
    { label: "🌗 엇갈리기 쉬운 유형", ...detail.hardMatch },
  ].map((match) => ({ ...match, other: quiz.results.find((item) => item.id === match.id) }));

  return (
    <div className="flex w-full flex-col gap-3 text-left">
      <div className="grid grid-cols-2 gap-2">
        {[
          { heading: "✨ 강점", items: detail.strengths },
          { heading: "🌧️ 조심할 점", items: detail.cautions },
        ].map((group) => (
          <section key={group.heading} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <h2 className="text-sm font-bold">{group.heading}</h2>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {matches.map(
        (match) =>
          match.other && (
            <a
              key={match.label}
              href={`/${quiz.id}/r/${match.other.id}`}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800"
            >
              <QuizIcon image={match.other.image} emoji={match.other.emoji} size="lg" />
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-zinc-400">{match.label}</span>
                <span className="text-sm font-extrabold">{match.other.title}</span>
                <span className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">{match.reason}</span>
              </span>
            </a>
          )
      )}

      <section className="rounded-2xl px-4 py-3" style={{ backgroundColor: result.color }}>
        <h2 className="text-sm font-bold text-zinc-900">🌱 오늘 해 보면 좋은 것</h2>
        <ul className="mt-1.5 flex flex-col gap-1 text-sm text-zinc-800">
          {detail.tips.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

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
        <QuizIcon image={result.image} emoji={result.emoji} size="xl" />
        <h1 className="text-2xl font-extrabold text-zinc-900">
          {result.title}
        </h1>
        <p className="text-base font-medium text-zinc-800">
          {result.subtitle}
        </p>
      </div>

      {/* 상세가 있으면 문단이 길어져서 왼쪽 정렬로 읽기 편하게 둔다 */}
      <p
        className={`max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400 ${result.detail ? "text-left" : ""}`}
      >
        {result.description}
        {result.detail && ` ${result.detail.more}`}
      </p>

      {result.detail && <ResultDetailSections quiz={quiz} result={result} />}

      <ResultStats
        kind="quiz"
        groupId={quiz.id}
        resultId={result.id}
        accentColor={quiz.accentColor}
        items={quiz.results.map((r) => ({
          id: r.id,
          emoji: r.emoji,
          label: r.title,
          icon: r.image ? <QuizIcon image={r.image} emoji={r.emoji} size="xs" /> : undefined,
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

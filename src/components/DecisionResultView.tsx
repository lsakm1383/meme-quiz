import Link from "next/link";
import type { DecisionResult, DecisionTestConfig } from "@/data/decision-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { ResultStats } from "@/components/ResultStats";
import { DecisionResultIcon } from "@/components/DecisionResultIcon";

export function DecisionResultView({
  test,
  result,
}: {
  test: DecisionTestConfig;
  result: DecisionResult;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">{test.title} 결과</p>

      <div
        className="flex w-full flex-col items-center gap-3 rounded-3xl px-6 py-10 shadow-sm"
        style={{ backgroundColor: result.color }}
      >
        <DecisionResultIcon result={result} />
        <h1 className="text-2xl font-extrabold text-zinc-900">{result.title}</h1>
        <p className="text-base font-medium text-zinc-800">{result.subtitle}</p>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {result.description}
      </p>

      <ResultStats
        kind="decision"
        groupId={test.id}
        resultId={result.id}
        accentColor={test.accentColor}
        items={test.results.map((r) => ({
          id: r.id,
          emoji: r.emoji,
          label: r.title,
          icon: <DecisionResultIcon result={r} size="xs" />,
        }))}
      />

      <ShareBar
        title={`나는 "${result.title}" ${result.emoji}`}
        text={`${test.title} — 결과: ${result.title} ${result.emoji}\n${result.subtitle}`}
        accentColor={test.accentColor}
      />

      <div className="flex items-center gap-4">
        <Link
          href={`/d/${test.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 해보기
        </Link>
        <span className="text-zinc-300">·</span>
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다른 테스트 살펴보기
        </Link>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="decision-result-bottom" />
      </div>
    </div>
  );
}

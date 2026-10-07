import type { DecisionResult, DecisionTestConfig } from "@/data/decision-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { ResultStats } from "@/components/ResultStats";
import { DecisionResultIcon } from "@/components/DecisionResultIcon";
import { MoreDetails } from "@/components/MoreDetails";

// 추천 결과 상세. 첫 화면에는 이런 분께 추천과 함께 비교해 볼 결과만 두고,
// 긴 풀이 문단과 고를 때 팁은 "더 자세히 보기"로 접어 둔다. detail 이 있는 결과만 보여준다.
function DecisionDetailSections({ test, result }: { test: DecisionTestConfig; result: DecisionResult }) {
  const detail = result.detail!;
  const other = test.results.find((item) => item.id === detail.compare.id);

  return (
    <div className="flex w-full flex-col gap-3 text-left">
      <section className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <h2 className="text-sm font-bold">💡 이런 분께 잘 어울려요</h2>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
          {detail.goodFor.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      {other && (
        <a
          href={`/d/${test.id}/r/${other.id}`}
          className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800"
        >
          <span className="flex w-16 shrink-0 justify-center">
            <DecisionResultIcon result={other} shape={test.imageShape} size="lg" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-zinc-400">🔁 함께 비교해 보면 좋아요</span>
            <span className="text-sm font-extrabold">{other.title}</span>
            <span className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">{detail.compare.reason}</span>
          </span>
        </a>
      )}

      <MoreDetails label="📖 풀이와 고를 때 팁 더 보기">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{detail.more}</p>
        <section className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
          <h2 className="text-sm font-bold">📝 고를 때 팁</h2>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
            {detail.tips.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      </MoreDetails>
    </div>
  );
}

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
        <DecisionResultIcon result={result} shape={test.imageShape} size="xl" />
        <h1 className="text-2xl font-extrabold text-zinc-900">{result.title}</h1>
        <p className="text-base font-medium text-zinc-800">{result.subtitle}</p>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{result.description}</p>

      {/* 결과를 본 직후 가장 많이 하는 일이 공유라서, 긴 풀이보다 먼저 둔다 */}
      <ShareBar
        title={`${result.emoji} 나는 "${result.title}"`}
        text={`${test.title} 해봤더니 "${result.title}" 나왔어!\n${result.subtitle}\n너는 뭐 나올까? 👉`}
        accentColor={test.accentColor}
      />

      {result.detail && <DecisionDetailSections test={test} result={result} />}

      <ResultStats
        kind="decision"
        groupId={test.id}
        resultId={result.id}
        accentColor={test.accentColor}
        items={test.results.map((r) => ({
          id: r.id,
          emoji: r.emoji,
          label: r.title,
          icon: <DecisionResultIcon result={r} shape={test.imageShape} size="xs" />,
        }))}
      />

      {/* 광고 있는 화면 → 광고 없는 화면 이동은 완전한 새로고침으로 강제 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a
          href={`/d/${test.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 해보기
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
        <AdSlot slot="decision-result-bottom" />
      </div>
    </div>
  );
}

import { MIN_STATS_PARTICIPANTS } from "@/lib/stats-threshold";

// 참여자가 기준 인원에 못 미칠 때 통계 카드 자리에 대신 보여주는 안내.
// what은 조사까지 포함해서 넘긴다 (예: "결과별 비율을", "희귀도를").
export function StatsPending({ total, what }: { total: number; what: string }) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">아직 집계 중이에요</p>
      <p className="text-xs leading-relaxed text-zinc-500">
        지금까지 {total}명 참여 · {MIN_STATS_PARTICIPANTS}명이 모이면 {what} 보여드려요.
      </p>
    </div>
  );
}

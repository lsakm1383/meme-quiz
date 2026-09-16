import type { ToppingTestConfig } from "@/data/topping-types";
import { ToppingIcon } from "@/components/ToppingIcon";
import type { IngredientStatsResponse } from "@/lib/use-ingredient-stats";

// 상단 "희귀도" 밈 카드가 같은 통계를 쓰기 때문에, 패칭은 ToppingResultView(부모)에서
// 한 번만 하고 이 컴포넌트는 그 결과를 받아 카테고리별 상세 랭킹만 그린다.
export function ToppingIngredientStats({
  test,
  toppingIds,
  stats,
}: {
  test: ToppingTestConfig;
  toppingIds: string[];
  stats: IngredientStatsResponse | null;
}) {
  if (!stats || stats.totalParticipants === 0) return null;

  const mineSet = new Set(toppingIds);

  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      <p className="text-xs text-zinc-400">누적 {stats.totalParticipants}명 참여</p>

      {test.categories.map((category) => {
        const ranked = category.toppings
          .map((item) => ({ ...item, count: stats.counts[item.id] ?? 0 }))
          .sort((a, b) => b.count - a.count);
        const total = ranked.reduce((sum, item) => sum + item.count, 0);

        return (
          <div key={category.id} className="flex flex-col gap-2">
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              {category.label} 인기 랭킹
            </p>
            <div className="flex flex-col gap-2">
              {ranked.map((item, index) => {
                const percent = total > 0 ? Math.round((item.count / total) * 100) : 0;
                const isMine = mineSet.has(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-2 text-sm">
                    <span className="w-4 shrink-0 text-zinc-400">{index + 1}</span>
                    <ToppingIcon topping={item} size="sm" />
                    <span
                      className={`flex-1 truncate ${isMine ? "font-bold text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}
                    >
                      {item.name}
                    </span>
                    <div className="h-2 w-16 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: isMine ? test.accentColor : "#a1a1aa",
                        }}
                      />
                    </div>
                    <span className="w-9 shrink-0 text-right text-xs text-zinc-400">
                      {item.count}명
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

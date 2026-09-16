"use client";

import { useEffect, useState } from "react";
import type { ToppingTestConfig } from "@/data/topping-types";
import { ToppingIcon } from "@/components/ToppingIcon";

type IngredientStatsResponse = {
  counts: Record<string, number>;
  totalParticipants: number;
};

export function ToppingIngredientStats({
  test,
  comboKey,
  toppingIds,
}: {
  test: ToppingTestConfig;
  comboKey: string;
  toppingIds: string[];
}) {
  const [stats, setStats] = useState<IngredientStatsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 같은 브라우저에서 새로고침/재방문해도 중복 집계되지 않도록 한 번만 증가시킨다.
    const storageKey = `meme-quiz:ingredient-counted:${test.id}:${comboKey}`;
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // 세션스토리지 접근 불가 — 그냥 매번 증가로 취급
    }

    fetch("/api/ingredient-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId: test.id,
        comboKey,
        increment: !alreadyCounted,
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: IngredientStatsResponse | null) => {
        if (cancelled || !data) return;
        setStats(data);
        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {
          // 무시
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [test.id, comboKey]);

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

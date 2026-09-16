"use client";

import { useEffect, useState } from "react";
import type { ToppingTestConfig } from "@/data/topping-types";
import { findTopping } from "@/data/toppings";

type ComboStatsResponse = {
  count: number;
  total: number;
  rank: number;
  totalCombos: number;
  top: { comboKey: string; count: number; toppingIds: string[] }[];
};

export function ToppingComboStats({
  test,
  comboKey,
}: {
  test: ToppingTestConfig;
  comboKey: string;
}) {
  const [stats, setStats] = useState<ComboStatsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 같은 브라우저에서 새로고침/재방문해도 중복 집계되지 않도록 한 번만 증가시킨다.
    const storageKey = `meme-quiz:combo-counted:${test.id}:${comboKey}`;
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // 세션스토리지 접근 불가 — 그냥 매번 증가로 취급
    }

    fetch("/api/combo-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId: test.id,
        comboKey,
        increment: !alreadyCounted,
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ComboStatsResponse | null) => {
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

  if (!stats || stats.total === 0) return null;

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
        이 조합으로 먹은 사람{" "}
        <span style={{ color: test.accentColor }}>{stats.count}명</span>
        {" · "}
        전체 {stats.totalCombos}개 조합 중 {stats.rank}위
      </p>
      <div className="flex flex-col gap-2">
        {stats.top.map((entry, index) => {
          const percent = Math.round((entry.count / stats.total) * 100);
          const isMine = entry.comboKey === comboKey;
          const names = entry.toppingIds
            .map((id) => findTopping(test, id)?.name)
            .filter(Boolean)
            .join(", ");
          return (
            <div key={entry.comboKey} className="flex items-center gap-2 text-sm">
              <span className="w-4 shrink-0 text-zinc-400">{index + 1}</span>
              <span
                className={`flex-1 truncate ${isMine ? "font-bold text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}
                title={names}
              >
                {names}
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
                {entry.count}명
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-zinc-400">누적 {stats.total}명 참여</p>
    </div>
  );
}

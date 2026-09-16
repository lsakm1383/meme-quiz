"use client";

import { useEffect, useState } from "react";

export type StatItem = { id: string; emoji: string; label: string };

export function ResultStats({
  kind,
  groupId,
  resultId,
  items,
  accentColor,
}: {
  kind: "quiz" | "tournament";
  groupId: string;
  resultId: string;
  items: StatItem[];
  accentColor: string;
}) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 같은 브라우저에서 새로고침/재방문해도 중복 집계되지 않도록 한 번만 증가시킨다.
    const storageKey = `meme-quiz:counted:${kind}:${groupId}:${resultId}`;
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // 세션스토리지 접근 불가 — 그냥 매번 증가로 취급
    }

    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        groupId,
        resultId,
        increment: !alreadyCounted,
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (cancelled || !data?.counts) return;
        setCounts(data.counts);
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
  }, [kind, groupId, resultId]);

  if (!counts) return null;

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  if (total === 0) return null;

  const ranked = items
    .map((item) => ({ ...item, count: counts[item.id] ?? 0 }))
    .sort((a, b) => b.count - a.count);

  const myRank = ranked.findIndex((item) => item.id === resultId) + 1;
  const myPercent = Math.round(((counts[resultId] ?? 0) / total) * 100);

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
        전체 참여자 중 이 결과 비율{" "}
        <span style={{ color: accentColor }}>{myPercent}%</span>
        {" · "}
        {items.length}개 중 {myRank}위
      </p>
      <div className="flex flex-col gap-2">
        {ranked.map((item, index) => {
          const percent = Math.round((item.count / total) * 100);
          const isMine = item.id === resultId;
          return (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              <span className="w-4 shrink-0 text-zinc-400">{index + 1}</span>
              <span className="shrink-0">{item.emoji}</span>
              <span
                className={`flex-1 truncate ${isMine ? "font-bold text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}
              >
                {item.label}
              </span>
              <div className="h-2 w-20 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: isMine ? accentColor : "#a1a1aa",
                  }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-xs text-zinc-400">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-zinc-400">누적 {total}명 참여</p>
    </div>
  );
}

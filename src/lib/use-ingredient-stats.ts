"use client";

import { useEffect, useState } from "react";

export type IngredientStatsResponse = {
  counts: Record<string, number>;
  totalParticipants: number;
};

/**
 * 조합형 테스트의 재료별 통계를 한 번만 증가시키고 가져온다.
 * 상단 희귀도 밈 카드와 하단 카테고리별 상세 랭킹이 이 결과를 함께 쓴다.
 */
export function useIngredientStats(testId: string, comboKey: string) {
  const [stats, setStats] = useState<IngredientStatsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 같은 브라우저에서 새로고침/재방문해도 중복 집계되지 않도록 한 번만 증가시킨다.
    const storageKey = `meme-quiz:ingredient-counted:${testId}:${comboKey}`;
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
        testId,
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
  }, [testId, comboKey]);

  return stats;
}

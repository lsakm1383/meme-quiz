"use client";

import { useMemo, useState } from "react";
import { searchDreams, type DreamIndexItem } from "@/lib/saju/dream-search";

const TONE_LABEL = { lucky: "길몽", neutral: "상황 따라", caution: "조심 신호" } as const;

export function DreamSearch({
  index,
  accentColor,
  testId,
}: {
  index: DreamIndexItem[];
  accentColor: string;
  testId: string;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchDreams(index, query), [index, query]);
  const trimmed = query.trim();

  return (
    <div className="flex w-full flex-col gap-3 text-left">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value.slice(0, 30))}
        placeholder="예: 돼지, 이빨 빠지는 꿈, 하늘을 나는"
        aria-label="꿈 검색"
        className="w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-base dark:bg-zinc-900"
        style={{ borderColor: accentColor }}
      />
      {trimmed && results.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {results.map((item) => (
            <li key={item.slug}>
              {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
              <a
                href={`/s/${testId}/t/${item.slug}`}
                className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="flex-1 text-base font-bold">{item.title}</span>
                <span className="text-xs font-semibold text-zinc-400">{TONE_LABEL[item.tone]}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {trimmed && results.length === 0 && (
        <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-500 dark:bg-zinc-900">
          아직 사전에 없는 꿈이에요. 꿈에 나온 동물·사람·물건처럼 가장 기억에 남는 상징 하나로 다시 찾아보세요.
        </p>
      )}
    </div>
  );
}

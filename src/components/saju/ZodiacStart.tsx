"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { SajuTestConfig } from "@/data/saju";
import zodiacCopy from "@/data/saju/zodiac";
import { computeSaju, isSajuError } from "@/lib/saju/engine";
import { BRANCHES } from "@/lib/saju/constants";
import { loadRemembered } from "@/lib/saju/storage";
import { ZODIAC_SLUGS, zodiacOfYear, birthYearsOf } from "@/lib/saju/zodiac";
import { PhotoIcon } from "@/components/PhotoIcon";

const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: THIS_YEAR - 1930 + 1 }, (_, i) => THIS_YEAR - i);
const twoDigits = (year: number) => String(year % 100).padStart(2, "0");

export function ZodiacStart({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const [year, setYear] = useState(1995);
  const [mine, setMine] = useState<number | null>(null);

  // 다른 사주 운세에서 "이 기기에 기억하기"로 저장한 정보가 있으면 입춘 기준으로 정확한 내 띠를 표시한다.
  useEffect(() => {
    const saved = loadRemembered();
    const chart = saved && computeSaju(saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (chart && !isSajuError(chart)) setMine(chart.year.branch);
  }, []);

  const found = zodiacOfYear(year);
  const before = (found + 11) % 12;
  const href = (branch: number) => `/s/${test.id}/t/${ZODIAC_SLUGS[branch]}`;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {test.image ? (
        <PhotoIcon src={test.image} size="xl" alt={`${test.title} 대표 그림`} />
      ) : (
        <div className="text-7xl">{test.emoji}</div>
      )}
      <p className="text-sm font-bold" style={{ color: test.accentColor }}>
        사주 시리즈
      </p>
      <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {test.description}
      </p>

      {mine !== null && (
        <a
          href={href(mine)}
          className="w-full rounded-2xl border-2 px-4 py-3 text-sm font-bold"
          style={{ borderColor: test.accentColor, color: test.accentColor }}
        >
          이 기기에 기억한 정보로는 {BRANCHES[mine].animal}띠예요 · {BRANCHES[mine].animal}띠 운세 바로 보기
        </a>
      )}

      <section className="flex w-full flex-col gap-3">
        <h2 className="text-left text-sm font-bold">내 띠를 골라 주세요</h2>
        <div className="grid grid-cols-3 gap-2">
          {ZODIAC_SLUGS.map((slug, branch) => (
            <a
              key={slug}
              href={href(branch)}
              className="flex flex-col items-center gap-0.5 rounded-2xl border border-zinc-200 px-1 py-3 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
              style={branch === mine ? { borderColor: test.accentColor } : undefined}
            >
              <span className="text-3xl">{zodiacCopy.animals[slug].emoji}</span>
              <span className="text-sm font-bold">{BRANCHES[branch].animal}띠</span>
              <span className="text-[11px] text-zinc-400">
                {birthYearsOf(branch, THIS_YEAR)
                  .slice(-3)
                  .map(twoDigits)
                  .join("·")}
                년생
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-sm font-bold">태어난 해로 내 띠 찾기</h2>
        <select
          aria-label="태어난 해"
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900"
        >
          {YEARS.map((value) => (
            <option key={value} value={value}>
              {value}년생
            </option>
          ))}
        </select>
        <p className="text-base font-bold">
          {year}년생은 {zodiacCopy.animals[ZODIAC_SLUGS[found]].emoji} {BRANCHES[found].animal}띠예요
        </p>
        <p className="text-xs leading-relaxed text-zinc-500">
          사주에서는 해가 1월 1일이 아니라 입춘(2월 4일 무렵)에 바뀌어요. 생일이 1월 1일~2월 3일 무렵이라면{" "}
          {BRANCHES[before].animal}띠로 봐요.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={href(found)}
            className="rounded-full px-4 py-3 text-center text-sm font-bold text-white"
            style={{ backgroundColor: test.accentColor }}
          >
            {BRANCHES[found].animal}띠 운세 보기
          </a>
          <a
            href={href(before)}
            className="rounded-full border border-zinc-200 px-4 py-3 text-center text-sm font-bold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            입춘 전 생일 · {BRANCHES[before].animal}띠
          </a>
        </div>
      </section>

      {guide}
    </div>
  );
}

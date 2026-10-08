"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { dayMasters, getElement } from "@/data/saju";
import daily from "@/data/saju/daily";
import type { TenGod } from "@/data/saju/types";
import { computeSaju, isSajuError } from "@/lib/saju/engine";
import { computeDaily, DAILY_AREAS, type DailyFortune } from "@/lib/saju/daily";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import { loadSubmission } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

const TEN_GOD_HANJA: Record<TenGod, string> = {
  bigyeon: "比肩",
  geopjae: "劫財",
  siksin: "食神",
  sanggwan: "傷官",
  pyeonjae: "偏財",
  jeongjae: "正財",
  pyeongwan: "偏官",
  jeonggwan: "正官",
  pyeonin: "偏印",
  jeongin: "正印",
};

/** 마지막 글자에 받침이 있는지 — 은/는, 이에요/예요 고르기 */
function hasFinal(word: string): boolean {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; fortune: DailyFortune; dayMaster: string };

export function DailyResult({ test, related }: { test: SajuTestConfig; related?: ReactNode }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const submission = loadSubmission();
    const chart = submission && computeSaju(submission);
    // sessionStorage 와 "오늘" 날짜는 브라우저에서만 정할 수 있어서 effect 안에서 계산한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(
      submission && chart && !isSajuError(chart)
        ? {
            status: "ready",
            fortune: computeDaily(chart, submission.gender),
            dayMaster: dayMasters.find((item) => item.slug === STEMS[chart.day.stem].slug)!.name,
          }
        : { status: "missing" }
    );
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">오늘의 일진을 살펴보는 중이에요…</p>;
  }
  if (state.status === "missing") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        {test.image ? <PhotoIcon src={test.image} size="lg" /> : <div className="text-5xl">{test.emoji}</div>}
        <p className="text-base font-semibold">입력한 정보가 없어요</p>
        <a
          href={`/s/${test.id}`}
          className="rounded-full px-6 py-3 text-base font-bold text-white"
          style={{ backgroundColor: test.accentColor }}
        >
          생년월일 입력하러 가기
        </a>
      </div>
    );
  }

  const { fortune, dayMaster } = state;
  const copy = daily.tenGods[fortune.tenGod];
  const tier = daily.tiers.find((item) => fortune.score >= item.min) ?? daily.tiers[daily.tiers.length - 1];
  const lucky = daily.lucky[fortune.luckyElement];
  const luckyElement = getElement(fortune.luckyElement);
  const stem = STEMS[fortune.pillar.stem];
  const branch = BRANCHES[fortune.pillar.branch];
  const { year, month, day } = fortune.date;
  const branchLine =
    fortune.branchRelation === "combine"
      ? daily.branch.combine
      : fortune.branchRelation === "trine"
        ? daily.branch.trine
        : fortune.branchRelation === "same"
          ? daily.branch.same
          : null;
  const cautions = [
    copy.caution,
    fortune.branchRelation === "clash" ? daily.branch.clash : null,
    fortune.yearClash ? daily.branch.yearClash : null,
  ].filter((line): line is string => !!line);

  const luckyRows: { label: string; value: React.ReactNode }[] = [
    {
      label: "행운의 색",
      value: (
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 rounded-full border border-zinc-200"
            style={{ backgroundColor: lucky.color.hex }}
          />
          {lucky.color.name}
        </span>
      ),
    },
    { label: "행운의 아이템", value: lucky.items[fortune.rotation % lucky.items.length] },
    { label: "행운의 음식", value: lucky.foods[fortune.rotation % lucky.foods.length] },
    { label: "행운의 숫자", value: lucky.numbers.join(", ") },
    { label: "행운의 방향", value: lucky.direction },
    { label: "행운의 시간", value: fortune.luckyHour.label },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        <h1 className="text-2xl font-extrabold">
          {month}월 {day}일 오늘의 운세
        </h1>
        <p className="text-sm text-zinc-500">
          {year}년 {month}월 {day}일은 {stem.hanja}
          {branch.hanja}({stem.hangul}
          {branch.hangul})일 · 나의 일간 {dayMaster}
        </p>
      </div>

      <div
        className="flex w-full flex-col items-center gap-2 rounded-3xl px-6 py-8 shadow-sm"
        style={{ backgroundColor: `${test.accentColor}14` }}
      >
        <p className="text-sm font-semibold" style={{ color: test.accentColor }}>
          오늘의 총운
        </p>
        <p className="text-5xl font-extrabold" style={{ color: test.accentColor }}>
          {fortune.score}점
        </p>
        <p className="text-lg font-bold">{tier.title}</p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tier.text}</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1.5">
          {copy.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold dark:bg-zinc-900"
              style={{ color: test.accentColor }}
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-2">
        {DAILY_AREAS.map((area) => (
          <div key={area.key} className="flex flex-col gap-1.5 rounded-2xl bg-zinc-50 p-3 text-left dark:bg-zinc-900">
            <span className="flex items-center justify-between text-xs font-bold text-zinc-600 dark:text-zinc-300">
              <span>
                {area.emoji} {area.name}
              </span>
              <span style={{ color: test.accentColor }}>{fortune.areas[area.key]}점</span>
            </span>
            <span className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <span
                className="block h-full rounded-full"
                style={{ width: `${fortune.areas[area.key]}%`, backgroundColor: test.accentColor }}
              />
            </span>
          </div>
        ))}
      </div>

      <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">🌤️ 오늘의 풀이</h2>
        <p className="text-xs font-semibold" style={{ color: test.accentColor }}>
          오늘의 천간 {stem.hanja}({stem.hangul}){hasFinal(stem.hangul) ? "은" : "는"} 나에게 {copy.name}(
          {TEN_GOD_HANJA[fortune.tenGod]}){hasFinal(copy.name) ? "이에요" : "예요"}
        </p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{copy.reading}</p>
        {branchLine && <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{branchLine}</p>}
        {fortune.fillsLacking && (
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            오늘의 일진이 내 사주에 부족한 {luckyElement.name}({luckyElement.hanja}) 기운을 채워줘서, 평소보다
            균형이 잘 맞는 날이에요.
          </p>
        )}
      </section>

      <section className="flex w-full flex-col gap-2 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-left dark:border-amber-900 dark:bg-amber-950">
        <h2 className="text-lg font-bold">⚠️ 오늘 특히 주의할 것</h2>
        <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {cautions.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      </section>

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">🍀 오늘의 행운 아이템</h2>
        <p className="text-xs leading-relaxed text-zinc-500">
          내 사주에 가장 부족한 {luckyElement.name}({luckyElement.hanja}) 기운을 채워주는 것들이에요. {lucky.why}
        </p>
        <dl className="grid grid-cols-2 gap-2">
          {luckyRows.map((row) => (
            <div key={row.label} className="rounded-2xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-900">
              <dt className="text-[11px] font-semibold text-zinc-400">{row.label}</dt>
              <dd className="mt-0.5 text-sm font-bold">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="w-full rounded-2xl bg-zinc-50 px-4 py-3 text-left text-sm dark:bg-zinc-900">
        <span className="font-bold">오늘 해보면 좋은 것 · </span>
        <span className="text-zinc-600 dark:text-zinc-400">{copy.tip}</span>
      </div>

      <ShareBar
        title={`${test.emoji} 오늘의 사주 운세 ${fortune.score}점`}
        text={`오늘 내 사주 운세는 ${fortune.score}점, "${tier.title}"! 행운 아이템은 ${lucky.items[fortune.rotation % lucky.items.length]}래.\n너의 오늘은? 👉`}
        accentColor={test.accentColor}
        path={`/s/${test.id}`}
      />

      <p className="text-xs leading-relaxed text-zinc-400">
        오늘의 운세는 한국 날짜 기준으로 자정에 바뀌어요. 일진과 원국을 정해진 규칙으로 대 본 재미용 풀이예요.
      </p>

      {related}

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a href={`/s/${test.id}`} className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다시 하기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="daily-result-bottom" />
      </div>
    </div>
  );
}

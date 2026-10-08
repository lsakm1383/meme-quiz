"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import type { TojeongGua } from "@/data/saju/types";
import { loadGua } from "@/data/saju/tojeong";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import { todayInKorea } from "@/lib/saju/daily";
import { computeTojeong, lunarBirthOf, type LunarBirth } from "@/lib/saju/tojeong";
import { yearPillarOf } from "@/lib/saju/yearly";
import { loadSubmission } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

const MONTH_NAMES = ["정월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "동짓달", "섣달"];
const TONE = {
  great: { label: "크게 트이는 해", color: "#b45309" },
  good: { label: "순조로운 해", color: "#15803d" },
  mixed: { label: "오르락내리락하는 해", color: "#0369a1" },
  caution: { label: "다지고 지키는 해", color: "#6b21a8" },
} as const;
const MOOD = {
  good: { icon: "☀️", label: "좋음" },
  normal: { icon: "⛅", label: "보통" },
  care: { icon: "☔", label: "조심" },
} as const;

const ganji = (p: { stem: number; branch: number }) =>
  `${STEMS[p.stem].hanja}${BRANCHES[p.branch].hanja}(${STEMS[p.stem].hangul}${BRANCHES[p.branch].hangul})`;

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; birth: LunarBirth; thisYear: number; initialYear: number };

export function TojeongResult({ test, related }: { test: SajuTestConfig; related?: ReactNode }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [year, setYear] = useState<number | null>(null);
  const [gua, setGua] = useState<{ code: string; data: TojeongGua | null } | null>(null);

  useEffect(() => {
    const submission = loadSubmission();
    const birth = submission && lunarBirthOf(submission);
    if (!birth) {
      // sessionStorage 와 "올해"는 브라우저에서만 정할 수 있어서 effect 안에서 계산한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ status: "missing" });
      return;
    }
    // 10월부터는 다가오는 해를 먼저 보여준다 (토정비결을 찾는 시기)
    const today = todayInKorea();
    const initialYear = today.month >= 10 ? today.year + 1 : today.year;
    setState({ status: "ready", birth, thisYear: today.year, initialYear });
    setYear(initialYear);
  }, []);

  const result = useMemo(
    () => (state.status === "ready" && year ? computeTojeong(state.birth, year) : null),
    [state, year]
  );

  // 괘 풀이는 상괘별 파일로 나뉘어 있어 필요한 것만 불러온다.
  useEffect(() => {
    if (!result) return;
    let alive = true;
    loadGua(result.code).then((data) => {
      if (alive) setGua({ code: result.code, data });
    });
    return () => {
      alive = false;
    };
  }, [result]);

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
  if (state.status === "loading" || !result || !gua || gua.code !== result.code) {
    return <p className="py-20 text-center text-sm text-zinc-400">내 괘를 짓는 중이에요…</p>;
  }

  const { birth, thisYear } = state;
  const data = gua.data;
  const color = test.accentColor;
  const tone = data ? TONE[data.tone] : null;
  const { upper, middle, lower } = result;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">{seriesNameOf(test)} · {test.title}</p>
        <h1 className="text-2xl font-extrabold">{result.year}년 토정비결</h1>
        <p className="text-sm text-zinc-500">
          {ganji(result.yearPillar)}년 · 음력 {birth.year}년 {birth.leapMonth ? "윤" : ""}
          {birth.month}월 {birth.day}일생 · 세는 나이 {result.age}세
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-2" role="tablist" aria-label="연도 고르기">
        {[thisYear, thisYear + 1].map((value) => {
          const pillar = yearPillarOf(value);
          const active = value === result.year;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setYear(value)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${active ? "text-white" : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"}`}
              style={active ? { backgroundColor: color, borderColor: color } : undefined}
            >
              {value === thisYear ? "올해" : "내년"} · {value} {STEMS[pillar.stem].hangul}
              {BRANCHES[pillar.branch].hangul}년
            </button>
          );
        })}
      </div>

      <div
        className="flex w-full flex-col items-center gap-2 rounded-3xl px-6 py-8 shadow-sm"
        style={{ backgroundColor: `${color}14` }}
      >
        <p className="text-sm font-semibold" style={{ color }}>
          나의 {result.year}년 괘
        </p>
        <p className="text-5xl font-extrabold tracking-widest" style={{ color }}>
          {result.code}
        </p>
        <p className="text-xs text-zinc-500">
          상괘 {upper} · 중괘 {middle} · 하괘 {lower}
        </p>
        {data && tone && (
          <>
            <p className="mt-2 text-lg font-bold leading-snug">{data.title}</p>
            <span
              className="rounded-full bg-white px-3 py-1 text-xs font-bold dark:bg-zinc-900"
              style={{ color: tone.color }}
            >
              {tone.label}
            </span>
            <div className="mt-1 flex flex-wrap justify-center gap-1.5">
              {data.keywords.map((keyword) => (
                <span key={keyword} className="text-xs font-semibold" style={{ color }}>
                  #{keyword}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {data ? (
        <>
          <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
            <h2 className="text-lg font-bold">📜 한 해 총론</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{data.summary}</p>
          </section>

          <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
            <h2 className="text-lg font-bold">🌙 달마다의 흐름</h2>
            <p className="text-xs leading-relaxed text-zinc-500">
              토정비결의 달은 음력이에요. 정월은 대개 양력 2월 무렵에 시작해요.
            </p>
            <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
              {data.months.map((month, index) => (
                <li key={MONTH_NAMES[index]} className="flex gap-3 py-2.5">
                  <span className="flex w-14 shrink-0 flex-col items-center">
                    <span className="text-xl" aria-hidden>
                      {MOOD[month.mood].icon}
                    </span>
                    <span className="text-[11px] font-extrabold">{MONTH_NAMES[index]}</span>
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <span className="sr-only">{MOOD[month.mood].label} · </span>
                    {month.text}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <p className="text-sm text-zinc-400">이 괘의 풀이를 준비하고 있어요.</p>
      )}

      <details className="w-full rounded-2xl bg-zinc-50 px-4 py-3 text-left text-sm dark:bg-zinc-900">
        <summary className="cursor-pointer font-bold">🧮 작괘 과정 보기</summary>
        <ul className="mt-2 flex flex-col gap-1.5 text-zinc-600 dark:text-zinc-400">
          <li>
            <b className="text-zinc-800 dark:text-zinc-200">상괘 {upper}</b> · 세는 나이 {result.age} + {result.year}년{" "}
            {ganji(result.yearPillar)} 태세수 {result.taese} = {result.age + result.taese} → 8로 나눈 나머지
          </li>
          <li>
            <b className="text-zinc-800 dark:text-zinc-200">중괘 {middle}</b> · 그해 음력 {birth.month}월은{" "}
            {result.monthDays === 30 ? "큰달" : "작은달"} {result.monthDays} + {ganji(result.monthPillar)}월 월건수{" "}
            {result.wolgeon} = {result.monthDays + result.wolgeon} → 6으로 나눈 나머지
          </li>
          <li>
            <b className="text-zinc-800 dark:text-zinc-200">하괘 {lower}</b> · 생일 {result.birthDay} + 그해 음력{" "}
            {birth.month}월 {result.birthDay}일 {ganji(result.dayPillar)}일 일진수 {result.iljin} ={" "}
            {result.birthDay + result.iljin} → 3으로 나눈 나머지
          </li>
          <li className="text-xs text-zinc-400">나머지가 0이면 상괘 8 · 중괘 6 · 하괘 3으로 봐요.</li>
        </ul>
      </details>

      {data && (
        <ShareBar
          title={`${test.emoji} ${result.year}년 토정비결 ${result.code}괘`}
          text={`내 ${result.year}년 토정비결은 ${result.code}괘, "${data.title}"!\n너의 괘는? 👉`}
          accentColor={color}
          path={`/s/${test.id}`}
        />
      )}

      <p className="text-xs leading-relaxed text-zinc-400">
        괘는 전통 작괘법으로 찾고, 풀이는 원문 번역이 아니라 괘의 흐름을 오늘의 말로 새로 쓴 재미용 풀이예요.
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
        <AdSlot slot="tojeong-result-bottom" />
      </div>
    </div>
  );
}

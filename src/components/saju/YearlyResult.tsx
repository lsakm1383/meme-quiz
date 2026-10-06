"use client";

import { useEffect, useMemo, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { dayMasters, getElement } from "@/data/saju";
import yearly from "@/data/saju/yearly";
import daily from "@/data/saju/daily";
import daeunCopy from "@/data/saju/daeun";
import type { ElementKey, TenGod } from "@/data/saju/types";
import { computeSaju, isSajuError, type SajuChart } from "@/lib/saju/engine";
import { DAILY_AREAS, tenGodOf, todayInKorea } from "@/lib/saju/daily";
import { computeYearly, yearPillarOf } from "@/lib/saju/yearly";
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

/** 천간 오행으로 부르는 해의 색 — 병오년은 "붉은 말의 해" */
const YEAR_COLOR: Record<ElementKey, string> = {
  wood: "푸른",
  fire: "붉은",
  earth: "황금",
  metal: "하얀",
  water: "검은",
};

const SAMJAE_LABEL = { in: "들삼재", stay: "눌삼재", out: "날삼재" } as const;

/** 마지막 글자에 받침이 있는지 — 은/는, 이에요/예요 고르기 */
function hasFinal(word: string): boolean {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

const ganji = (stem: number, branch: number) =>
  `${STEMS[stem].hanja}${BRANCHES[branch].hanja}(${STEMS[stem].hangul}${BRANCHES[branch].hangul})`;

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; chart: SajuChart; gender: "female" | "male"; thisYear: number; initialYear: number };

export function YearlyResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const submission = loadSubmission();
    const chart = submission && computeSaju(submission);
    if (!submission || !chart || isSajuError(chart)) {
      // sessionStorage 와 "올해"는 브라우저에서만 정할 수 있어서 effect 안에서 계산한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ status: "missing" });
      return;
    }
    // 10월부터는 다가오는 해를 먼저 보여준다 (신년 운세를 찾는 시기)
    const today = todayInKorea();
    const initialYear = today.month >= 10 ? today.year + 1 : today.year;
    setState({ status: "ready", chart, gender: submission.gender, thisYear: today.year, initialYear });
    setYear(initialYear);
  }, []);

  const fortune = useMemo(
    () => (state.status === "ready" && year ? computeYearly(state.chart, state.gender, year) : null),
    [state, year]
  );

  if (state.status === "loading" || (state.status === "ready" && !fortune)) {
    return <p className="py-20 text-center text-sm text-zinc-400">한 해의 흐름을 살펴보는 중이에요…</p>;
  }
  if (state.status === "missing" || !fortune) {
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

  const { chart, thisYear } = state;
  const color = test.accentColor;
  const dayMaster = dayMasters.find((item) => item.slug === STEMS[chart.day.stem].slug)!.name;
  const stem = STEMS[fortune.pillar.stem];
  const branch = BRANCHES[fortune.pillar.branch];
  const yearName = `${YEAR_COLOR[stem.element]} ${branch.animal}의 해`;
  const theme = yearly.tenGods[fortune.stemGod];
  const second = yearly.tenGods[fortune.branchGod];
  const tier = yearly.tiers.find((item) => fortune.score >= item.min) ?? yearly.tiers[yearly.tiers.length - 1];
  const stemName = daily.tenGods[fortune.stemGod].name;
  const branchName = daily.tenGods[fortune.branchGod].name;
  const luckyElement = getElement(fortune.luckyElement);
  const lucky = daily.lucky[fortune.luckyElement];
  const rotation = (((fortune.year - 4) % 60) + 60) % 60;

  const notes = [
    fortune.branchRelation && fortune.branchRelation !== "clash" ? yearly.branch[fortune.branchRelation] : null,
    fortune.fillsLacking
      ? `${fortune.year}년의 간지가 내 사주에 가장 부족한 ${luckyElement.name}(${luckyElement.hanja}) 기운을 채워줘서, 한 해 동안 균형이 잘 맞는 편이에요.`
      : null,
  ].filter((line): line is string => !!line);
  const cautions = [
    theme.caution,
    fortune.branchRelation === "clash" ? yearly.branch.clash : null,
    fortune.zodiacClash ? yearly.branch.zodiacClash : null,
  ].filter((line): line is string => !!line);

  const sorted = [...fortune.months].sort((a, b) => b.score - a.score);
  const bestMonths = sorted.slice(0, 3);
  const cautionMonth = sorted[sorted.length - 1];
  const monthLabel = (m: number) => (m === 1 ? `${fortune.year + 1}년 1월` : `${m}월`);

  const daeunGod = fortune.daeunPillar ? tenGodOf(chart.day.stem, fortune.daeunPillar.stem) : null;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        <h1 className="text-2xl font-extrabold">{fortune.year}년 신년 운세</h1>
        <p className="text-sm text-zinc-500">
          {fortune.year}년은 {ganji(fortune.pillar.stem, fortune.pillar.branch)}년 · {yearName} · 나의 일간 {dayMaster}
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-2" role="tablist" aria-label="연도 고르기">
        {[thisYear, thisYear + 1].map((value) => {
          const pillar = yearPillarOf(value);
          const active = value === fortune.year;
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
          {fortune.year}년 총운
        </p>
        <p className="text-5xl font-extrabold" style={{ color }}>
          {fortune.score}점
        </p>
        <p className="text-lg font-bold">{tier.title}</p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tier.text}</p>
        <span
          className="mt-1 rounded-full bg-white px-3 py-1 text-xs font-bold dark:bg-zinc-900"
          style={{ color }}
        >
          한 해 테마 · {theme.title}
        </span>
      </div>

      <div className="grid w-full grid-cols-2 gap-2">
        {DAILY_AREAS.map((area) => (
          <div key={area.key} className="flex flex-col gap-1.5 rounded-2xl bg-zinc-50 p-3 text-left dark:bg-zinc-900">
            <span className="flex items-center justify-between text-xs font-bold text-zinc-600 dark:text-zinc-300">
              <span>
                {area.emoji} {area.name}
              </span>
              <span style={{ color }}>{fortune.areas[area.key]}점</span>
            </span>
            <span className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <span
                className="block h-full rounded-full"
                style={{ width: `${fortune.areas[area.key]}%`, backgroundColor: color }}
              />
            </span>
          </div>
        ))}
      </div>

      <section className="flex w-full flex-col gap-4 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">🎍 {fortune.year}년의 풀이</h2>
        {[
          {
            label: `상반기 · 천간 ${stem.hanja}(${stem.hangul}) = ${stemName}(${TEN_GOD_HANJA[fortune.stemGod]})`,
            copy: theme,
          },
          {
            label: `하반기 · 지지 ${branch.hanja}(${branch.hangul}) = ${branchName}(${TEN_GOD_HANJA[fortune.branchGod]})`,
            copy: second,
          },
        ].map(({ label, copy }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold" style={{ color }}>
              {label} · {copy.title}
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{copy.summary}</p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-zinc-200">기회 · </b>
              {copy.opportunity}
            </p>
          </div>
        ))}
        {notes.map((line) => (
          <p key={line} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {line}
          </p>
        ))}
      </section>

      <section className="flex w-full flex-col gap-2 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-left dark:border-amber-900 dark:bg-amber-950">
        <h2 className="text-lg font-bold">⚠️ {fortune.year}년에 조심할 것</h2>
        <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {cautions.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
        {fortune.samjae && (
          <p className="mt-1 rounded-2xl bg-white/70 px-3 py-2.5 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
            <b>
              {BRANCHES[chart.year.branch].animal}띠 · {SAMJAE_LABEL[fortune.samjae]} ·{" "}
            </b>
            {yearly.samjae[fortune.samjae]}
          </p>
        )}
      </section>

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">📅 월별 흐름</h2>
        <div className="flex w-full items-end justify-between gap-0.5" style={{ height: 150 }} role="img" aria-label="월별 운세 그래프">
          {fortune.months.map((month) => {
            const best = bestMonths.includes(month);
            const low = month === cautionMonth;
            return (
              <div key={month.solarMonth} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-[9px] font-bold" style={{ color: best ? color : "#a1a1aa" }}>
                  {month.score}
                </span>
                <span
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${(month.score / 100) * 100}px`,
                    backgroundColor: low ? "#a1a1aa" : color,
                    opacity: best ? 1 : low ? 0.6 : 0.35,
                  }}
                />
                <span className={`text-[10px] ${best ? "font-extrabold" : "text-zinc-500"}`}>{month.solarMonth}월</span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] leading-relaxed text-zinc-400">
          사주의 달은 절기로 바뀌어서 매달 4~8일쯤 넘어가요. {fortune.year}년은 입춘(2월 4일 무렵)에 시작해 다음 해
          1월까지 이어져요.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">🌟 좋은 달 TOP 3</p>
          {bestMonths.map((month) => (
            <div key={month.solarMonth} className="flex flex-col gap-0.5 rounded-2xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
              <span className="text-sm font-bold">
                {monthLabel(month.solarMonth)}{" "}
                <span className="text-xs font-normal text-zinc-500">
                  {ganji(month.pillar.stem, month.pillar.branch)}월 · {daily.tenGods[month.stemGod].name}의 달
                </span>
              </span>
              <span className="text-xs font-semibold" style={{ color }}>
                {daily.tenGods[month.stemGod].keywords.map((keyword) => `#${keyword}`).join(" ")}
              </span>
            </div>
          ))}
          <p className="mt-1 text-sm font-bold">🌧️ 쉬어 가면 좋은 달</p>
          <div className="flex flex-col gap-1 rounded-2xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
            <span className="text-sm font-bold">
              {monthLabel(cautionMonth.solarMonth)}{" "}
              <span className="text-xs font-normal text-zinc-500">
                {ganji(cautionMonth.pillar.stem, cautionMonth.pillar.branch)}월 · {daily.tenGods[cautionMonth.stemGod].name}의 달
              </span>
            </span>
            <span className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {cautionMonth.stemGod === fortune.stemGod
                ? "한 해의 천간과 같은 기운이 한 번 더 겹치는 달이라, 위의 '조심할 것'이 특히 도드라지기 쉬워요. 큰 결정은 이 달을 지나고 내려도 늦지 않아요."
                : yearly.tenGods[cautionMonth.stemGod].caution}
            </span>
          </div>
        </div>
      </section>

      {fortune.daeunPillar && daeunGod && (
        <section className="flex w-full flex-col gap-1.5 rounded-3xl bg-zinc-50 p-5 text-left dark:bg-zinc-900">
          <p className="text-xs font-bold text-zinc-400">🧭 큰 흐름과 함께 보기</p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {fortune.year}년은 10년 단위 큰 운인 {ganji(fortune.daeunPillar.stem, fortune.daeunPillar.branch)} 대운 안에
            있어요. 이 대운의 테마는 <b className="text-zinc-800 dark:text-zinc-200">{daeunCopy.tenGods[daeunGod].title}</b>
            {hasFinal(daeunCopy.tenGods[daeunGod].title) ? "이에요" : "예요"}. 한 해의 운은 이 큰 흐름 위에서 출렁이는
            물결이라고 생각하면 돼요.
          </p>
          <a href="/s/daeun" className="text-sm font-semibold underline underline-offset-4" style={{ color }}>
            내 대운 흐름 전체 보기 →
          </a>
        </section>
      )}

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">🍀 {fortune.year}년 행운 아이템</h2>
        <p className="text-xs leading-relaxed text-zinc-500">
          내 사주에 가장 부족한 {luckyElement.name}({luckyElement.hanja}) 기운을 채워주는 것들이에요. {lucky.why}
        </p>
        <dl className="grid grid-cols-2 gap-2">
          {[
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
            { label: "행운의 숫자", value: lucky.numbers.join(", ") },
            { label: "행운의 방향", value: lucky.direction },
            { label: "행운의 아이템", value: lucky.items[rotation % lucky.items.length] },
          ].map((row) => (
            <div key={row.label} className="rounded-2xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-900">
              <dt className="text-[11px] font-semibold text-zinc-400">{row.label}</dt>
              <dd className="mt-0.5 text-sm font-bold">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ShareBar
        title={`${test.emoji} ${fortune.year}년 신년 운세 ${fortune.score}점`}
        text={`사주로 본 내 ${fortune.year}년 운세는 ${fortune.score}점! ${fortune.year}년 테마는 "${theme.title}"래.\n너의 한 해는? 👉`}
        accentColor={color}
        path={`/s/${test.id}`}
      />

      <p className="text-xs leading-relaxed text-zinc-400">
        신년 운세는 그해의 간지와 원국을 정해진 규칙으로 대 본 재미용 풀이예요. 사주에서 한 해는 입춘에 바뀌어요.
      </p>

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
        <AdSlot slot="yearly-result-bottom" />
      </div>
    </div>
  );
}

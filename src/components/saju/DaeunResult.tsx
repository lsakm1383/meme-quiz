"use client";

import { useEffect, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { dayMasters, getElement } from "@/data/saju";
import daeunCopy from "@/data/saju/daeun";
import { computeSaju, isSajuError } from "@/lib/saju/engine";
import { computeDaeun, type DaeunPeriod, type DaeunResult as Daeun } from "@/lib/saju/daeun";
import { scarcestElement } from "@/lib/saju/daily";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import { loadSubmission } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; daeun: Daeun; dayMaster: string; lacking: string; timeUnknown: boolean };

/** "~로/으로": 받침이 없거나 ㄹ 받침이면 "로", 그 외 받침이면 "으로" */
function ro(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  if (code < 0 || code > 11171) return "로";
  const final = code % 28;
  return final === 0 || final === 8 ? "로" : "으로";
}

const tierOf = (score: number) =>
  daeunCopy.tiers.find((tier) => score >= tier.min) ?? daeunCopy.tiers[daeunCopy.tiers.length - 1];

const ganji = (period: DaeunPeriod) =>
  `${STEMS[period.pillar.stem].hanja}${BRANCHES[period.pillar.branch].hanja}`;
const ganjiHangul = (period: DaeunPeriod) =>
  `${STEMS[period.pillar.stem].hangul}${BRANCHES[period.pillar.branch].hangul}`;

function LifeGraph({ daeun, color }: { daeun: Daeun; color: string }) {
  return (
    <div className="flex w-full items-end justify-between gap-1" style={{ height: 180 }} role="img" aria-label="대운 인생 그래프">
      {daeun.periods.map((period, i) => {
        const current = i === daeun.currentIndex;
        return (
          <div key={period.startAge} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] font-bold" style={{ color: current ? color : "#a1a1aa" }}>
              {period.score}
            </span>
            <span
              className="w-full rounded-t-md"
              style={{
                height: `${(period.score / 100) * 120}px`,
                backgroundColor: color,
                opacity: current ? 1 : i === daeun.bestIndex ? 0.75 : 0.35,
              }}
            />
            <span className={`text-[11px] ${current ? "font-extrabold" : "text-zinc-500"}`}>
              {period.startAge}
            </span>
            <span className="text-[10px] text-zinc-400">{ganji(period)}</span>
          </div>
        );
      })}
    </div>
  );
}

function PeriodDetail({ period, color, lacking }: { period: DaeunPeriod; color: string; lacking: string }) {
  const first = daeunCopy.tenGods[period.stemGod];
  const second = daeunCopy.tenGods[period.branchGod];
  const notes = [
    period.relation === "combine" && "대운의 지지가 내 일지와 육합을 이뤄, 사람과 환경이 편안하게 맞물리는 흐름이 더해져요.",
    period.fillsLacking && `내 사주에 가장 부족한 ${lacking} 기운을 채워주는 대운이라 균형이 잘 맞아요.`,
    period.relation === "clash" && "대운의 지지가 내 일지와 충을 이뤄, 생활 환경이나 관계에 변화가 잦을 수 있어요. 변화를 기회로 삼는 유연함이 도움이 돼요.",
    period.monthClash && "대운의 지지가 월지와 충을 이뤄, 일하는 방식이나 소속이 바뀌는 계기가 생기기 쉬워요.",
  ].filter((note): note is string => typeof note === "string");

  return (
    <div className="flex flex-col gap-4 text-left">
      {[
        { label: `앞 5년 · ${STEMS[period.pillar.stem].hanja}(${STEMS[period.pillar.stem].hangul})`, copy: first },
        { label: `뒤 5년 · ${BRANCHES[period.pillar.branch].hanja}(${BRANCHES[period.pillar.branch].hangul})`, copy: second },
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
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <b className="text-zinc-800 dark:text-zinc-200">주의 · </b>
            {copy.caution}
          </p>
        </div>
      ))}
      {notes.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-2xl bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          {notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DaeunResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const submission = loadSubmission();
    const chart = submission && computeSaju(submission);
    // sessionStorage 와 "지금" 시점은 브라우저에서만 정할 수 있어서 effect 안에서 계산한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(
      submission && chart && !isSajuError(chart)
        ? {
            status: "ready",
            daeun: computeDaeun(chart, submission.gender),
            dayMaster: dayMasters.find((item) => item.slug === STEMS[chart.day.stem].slug)!.name,
            lacking: (() => {
              const element = getElement(scarcestElement(chart));
              return `${element.name}(${element.hanja})`;
            })(),
            timeUnknown: !submission.time,
          }
        : { status: "missing" }
    );
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">대운을 세우는 중이에요…</p>;
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

  const { daeun, dayMaster, lacking, timeUnknown } = state;
  const current = daeun.currentIndex !== null ? daeun.periods[daeun.currentIndex] : null;
  const best = daeun.periods[daeun.bestIndex];
  const color = test.accentColor;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        <h1 className="text-2xl font-extrabold">나의 대운 흐름</h1>
        <p className="text-sm text-zinc-500">
          일간 {dayMaster} · {daeun.forward ? "순행" : "역행"} · 대운수 {daeun.startAge}
        </p>
      </div>

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">📈 인생 그래프</h2>
        <LifeGraph daeun={daeun} color={color} />
        <p className="text-xs leading-relaxed text-zinc-400">
          막대 아래 숫자는 각 대운이 시작하는 만 나이예요. 진한 막대가 지금 대운, 중간 진하기가 점수가 가장 높은
          대운이에요.
        </p>
      </section>

      {current ? (
        <section
          className="flex w-full flex-col gap-3 rounded-3xl p-5 text-left"
          style={{ backgroundColor: `${color}14` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold" style={{ color }}>
                지금 지나고 있는 대운
              </p>
              <h2 className="text-xl font-extrabold">
                {ganji(current)}({ganjiHangul(current)}) 대운
              </h2>
              <p className="text-sm text-zinc-500">
                만 {current.startAge}~{current.startAge + 9}세 · {current.startYear}~{current.endYear}년
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold" style={{ color }}>
                {current.score}
              </p>
              <p className="text-xs font-bold">{tierOf(current.score).title}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tierOf(current.score).text}</p>
          <PeriodDetail period={current} color={color} lacking={lacking} />
        </section>
      ) : (
        <p className="w-full rounded-2xl bg-zinc-50 p-4 text-left text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          첫 대운은 만 {daeun.startAge}세부터 시작해요. 그 전까지는 타고난 원국의 기운이 그대로 흘러요.
        </p>
      )}

      {daeun.bestIndex !== daeun.currentIndex && (
        <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
          <p className="text-xs font-bold" style={{ color }}>
            🌟 가장 빛나는 대운
          </p>
          <h2 className="text-lg font-extrabold">
            만 {best.startAge}~{best.startAge + 9}세 · {ganji(best)}({ganjiHangul(best)}) 대운 · {best.score}점
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {daeunCopy.tenGods[best.stemGod].title}에서 {daeunCopy.tenGods[best.branchGod].title}
            {ro(daeunCopy.tenGods[best.branchGod].title)} 이어지는
            흐름이에요. {daeunCopy.tenGods[best.stemGod].opportunity}
          </p>
        </section>
      )}

      <section className="flex w-full flex-col gap-2 text-left">
        <h2 className="text-lg font-bold">전체 대운</h2>
        {daeun.periods.map((period, i) => (
          <details
            key={period.startAge}
            open={i === daeun.currentIndex}
            className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <span className="w-14 shrink-0 text-sm font-bold">만 {period.startAge}세</span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-bold">
                  {ganji(period)}({ganjiHangul(period)}){i === daeun.currentIndex ? " · 지금" : ""}
                </span>
                <span className="truncate text-xs text-zinc-500">
                  {daeunCopy.tenGods[period.stemGod].title} → {daeunCopy.tenGods[period.branchGod].title}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-base font-extrabold" style={{ color }}>
                  {period.score}
                </span>
                <span className="block text-[11px] text-zinc-500">{tierOf(period.score).title}</span>
              </span>
            </summary>
            <div className="pt-4">
              <PeriodDetail period={period} color={color} lacking={lacking} />
            </div>
          </details>
        ))}
      </section>

      {timeUnknown && (
        <p className="w-full rounded-xl bg-amber-50 px-4 py-3 text-left text-xs leading-relaxed text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          태어난 시간을 몰라서 그날 정오 기준으로 계산했어요. 대운 시작 나이가 몇 달 정도 달라질 수 있어요.
        </p>
      )}

      <ShareBar
        title={`${test.emoji} 나의 대운 흐름`}
        text={
          current
            ? `지금 내 대운은 ${ganjiHangul(current)} 대운, "${tierOf(current.score).title}"! 가장 빛나는 대운은 만 ${best.startAge}세부터래.\n너의 대운은? 👉`
            : `내 대운 인생 그래프를 봤어! 가장 빛나는 대운은 만 ${best.startAge}세부터래.\n너의 대운은? 👉`
        }
        accentColor={color}
        path={`/s/${test.id}`}
      />

      <p className="text-xs leading-relaxed text-zinc-400">
        대운 점수는 원국과 대운의 간지를 정해진 규칙으로 대 본 재미용 지표예요. 정해진 미래를 단정하지 않아요.
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
        <AdSlot slot="daeun-result-bottom" />
      </div>
    </div>
  );
}

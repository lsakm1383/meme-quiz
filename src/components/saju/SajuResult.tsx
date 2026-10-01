"use client";

import { useEffect, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { dayMasters, getElement, elementLevel, LEVEL_LABEL } from "@/data/saju";
import { computeSaju, isSajuError, type SajuChart } from "@/lib/saju/engine";
import { STEMS, ELEMENT_ORDER } from "@/lib/saju/constants";
import { loadSubmission, type SajuSubmission } from "@/lib/saju/storage";
import { PillarTable, ElementBars, pillarText } from "@/components/saju/SajuChartView";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { DayMasterIcon } from "@/components/saju/DayMasterIcon";

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; submission: SajuSubmission; chart: SajuChart };

function describeInput(submission: SajuSubmission): string {
  const calendar =
    submission.calendar === "lunar" ? `음력${submission.leapMonth ? "(윤달)" : ""}` : "양력";
  const time = submission.time
    ? `${String(submission.time.hour).padStart(2, "0")}:${String(submission.time.minute).padStart(2, "0")}`
    : "시간 모름";
  const gender = submission.gender === "female" ? "여성" : "남성";
  return `${calendar} ${submission.year}년 ${submission.month}월 ${submission.day}일 · ${time} · ${gender}`;
}

export function SajuResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const submission = loadSubmission();
    const chart = submission && computeSaju(submission);
    // sessionStorage 는 마운트 후에만 읽을 수 있어서 effect 안에서 상태를 정한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(
      submission && chart && !isSajuError(chart)
        ? { status: "ready", submission, chart }
        : { status: "missing" }
    );
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">사주를 세우는 중이에요…</p>;
  }

  if (state.status === "missing") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="text-5xl">{test.emoji}</div>
        <p className="text-base font-semibold">입력한 정보가 없어요</p>
        <p className="text-sm text-zinc-500">
          생년월일은 이 기기에만 잠시 보관돼서, 탭을 닫으면 다시 입력해야 해요.
        </p>
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

  const { submission, chart } = state;
  const stem = STEMS[chart.day.stem];
  const profile = dayMasters.find((item) => item.slug === stem.slug)!;
  const dayElement = getElement(stem.element);
  const total = ELEMENT_ORDER.reduce((sum, key) => sum + chart.elements[key], 0);
  const max = Math.max(...ELEMENT_ORDER.map((key) => chart.elements[key]));
  const strongest = ELEMENT_ORDER.filter((key) => chart.elements[key] === max).map(
    (key) => getElement(key).name
  );
  const missing = ELEMENT_ORDER.filter((key) => chart.elements[key] === 0).map(
    (key) => getElement(key).name
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">
          사주 시리즈 {test.episode} · {test.title}
        </p>
        <p className="text-xs text-zinc-400">{describeInput(submission)}</p>
      </div>

      <section className="flex w-full flex-col gap-4">
        <h2 className="text-left text-lg font-bold">사주 원국</h2>
        <PillarTable chart={chart} />
        <p className="text-left text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          연주 {pillarText(chart.year)} · 월주 {pillarText(chart.month)} · 일주{" "}
          {pillarText(chart.day)} · 시주 {pillarText(chart.hour)}
        </p>
        {chart.notes.map((note) => (
          <p
            key={note}
            className="rounded-xl bg-amber-50 px-4 py-3 text-left text-xs leading-relaxed text-amber-800 dark:bg-amber-950 dark:text-amber-200"
          >
            {note}
          </p>
        ))}
      </section>

      <div
        className="flex w-full flex-col items-center gap-3 rounded-3xl px-6 py-10 shadow-sm"
        style={{ backgroundColor: profile.color }}
      >
        <p className="text-sm font-semibold text-zinc-700">
          나의 일간 · {profile.name}({stem.hanja}
          {dayElement.hanja})
        </p>
        <DayMasterIcon profile={profile} />
        <h1 className="text-2xl font-extrabold text-zinc-900">{profile.title}</h1>
        <p className="text-base font-medium text-zinc-800">{profile.subtitle}</p>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.description}
      </p>

      <div className="grid w-full grid-cols-2 gap-3 text-left">
        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
          <p className="text-sm font-bold">타고난 강점</p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
            {profile.strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
          <p className="text-sm font-bold">조심하면 좋은 점</p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
            {profile.cautions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="flex w-full flex-col gap-4 text-left">
        <h2 className="text-lg font-bold">오행 분포</h2>
        <ElementBars chart={chart} />
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          원국 {total}글자 중 가장 많은 오행은 <b>{strongest.join("·")}</b>
          {missing.length > 0 ? (
            <>
              이고, 없는 오행은 <b>{missing.join("·")}</b>이에요.
            </>
          ) : (
            "이고, 다섯 오행이 모두 들어 있어요."
          )}{" "}
          나 자신을 뜻하는 일간은 <b>{dayElement.name}</b> 기운이에요.
        </p>
      </section>

      <section className="flex w-full flex-col gap-3 text-left">
        <h2 className="text-lg font-bold">오행으로 보는 성향과 기질</h2>
        {ELEMENT_ORDER.map((key) => {
          const info = getElement(key);
          const level = elementLevel(chart.elements[key]);
          return (
            <div key={key} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="flex items-center gap-2 text-sm font-bold">
                <span style={{ color: info.color }}>
                  {info.name}({info.hanja})
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs text-white"
                  style={{ backgroundColor: info.color }}
                >
                  {LEVEL_LABEL[level]}
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">{info.meaning}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {info.levels[level]}
              </p>
            </div>
          );
        })}
      </section>

      <ShareBar
        title={`${profile.emoji} 내 일간은 ${profile.name} "${profile.title}"`}
        text={`사주 원국 풀이 해봤더니 나는 ${profile.name}, "${profile.title}"!\n${profile.subtitle}\n너의 일간은 뭘까? 👉`}
        accentColor={test.accentColor}
        path={`/s/${test.id}/t/${profile.slug}`}
      />

      <p className="text-xs leading-relaxed text-zinc-400">
        사주 풀이는 재미와 자기 이해를 위한 참고용이에요. 정해진 운명을 단정하지 않아요.
      </p>

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a
          href={`/s/${test.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다른 생년월일로 보기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="saju-result-bottom" />
      </div>
    </div>
  );
}

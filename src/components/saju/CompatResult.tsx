"use client";

import { useEffect, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { dayMasters, getElement } from "@/data/saju";
import compatCopy from "@/data/saju/compat";
import type { DayMasterProfile } from "@/data/saju/types";
import { computeSaju, isSajuError, type SajuChart } from "@/lib/saju/engine";
import {
  compatProfileOf,
  compatibility,
  compatTier,
  pairBreakdown,
  type CompatDetail,
  type PairBreakdown,
} from "@/lib/saju/compat";
import { STEMS, BRANCHES, ELEMENT_ORDER } from "@/lib/saju/constants";
import { loadPair } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { DayMasterIcon } from "@/components/saju/DayMasterIcon";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

type Person = { name: string; chart: SajuChart; profile: DayMasterProfile };
type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; me: Person; them: Person; detail: CompatDetail; breakdown: PairBreakdown };

/** 마지막 글자에 받침이 있으면 "이래", 없으면 "래" */
const irae = (word: string) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0 ? "이래" : "래";
};

function personOf(name: string, fallback: string, chart: SajuChart): Person {
  return {
    name: name || fallback,
    chart,
    profile: dayMasters.find((item) => item.slug === STEMS[chart.day.stem].slug)!,
  };
}

function Section({ emoji, heading, title, text, children }: { emoji: string; heading: string; title: string; text: string; children?: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-1.5 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      <p className="text-xs font-bold text-zinc-400">
        {emoji} {heading}
      </p>
      <h2 className="text-base font-extrabold">{title}</h2>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{text}</p>
      {children}
    </section>
  );
}

export function CompatResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const pair = loadPair();
    const a = pair && computeSaju(pair.me);
    const b = pair && computeSaju(pair.partner);
    if (!pair || !a || !b || isSajuError(a) || isSajuError(b)) {
      // sessionStorage 는 마운트 후에만 읽을 수 있어서 effect 안에서 상태를 정한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ status: "missing" });
      return;
    }
    const pa = compatProfileOf(a);
    const pb = compatProfileOf(b);
    setState({
      status: "ready",
      me: personOf(pair.meName, "나", a),
      them: personOf(pair.partnerName, "상대", b),
      detail: compatibility(pa, pb),
      breakdown: pairBreakdown(pa, pb),
    });
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">두 사람의 사주를 맞대 보는 중이에요…</p>;
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
          두 사람 정보 입력하러 가기
        </a>
      </div>
    );
  }

  const { me, them, detail, breakdown } = state;
  const fill = (text: string) => text.replaceAll("{me}", me.name).replaceAll("{them}", them.name);
  const tier = compatTier(detail.score);
  const tierText = compatCopy.tiers.find((item) => detail.score >= item.min)?.text ?? "";
  const stem = compatCopy.stem[breakdown.stem];
  const dayBranch = compatCopy.dayBranch[breakdown.dayBranch];
  const zodiac = compatCopy.zodiac[breakdown.zodiac];
  const elementNames = (indexes: number[]) => indexes.map((i) => getElement(ELEMENT_ORDER[i]).name).join("·");

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        <h1 className="text-2xl font-extrabold">
          {me.name} <span style={{ color: tier.color }}>♥</span> {them.name}
        </h1>
      </div>

      <div
        className="flex w-full flex-col items-center gap-2 rounded-3xl px-6 py-8 shadow-sm"
        style={{ backgroundColor: `${tier.color}14` }}
      >
        <p className="text-sm font-semibold" style={{ color: tier.color }}>
          사주 궁합 점수
        </p>
        <p className="text-5xl font-extrabold" style={{ color: tier.color }}>
          {detail.score}점
        </p>
        <p className="text-lg font-bold">{tier.title}</p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tierText}</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3">
        {[me, them].map((person) => (
          <div
            key={person.name + person.profile.slug}
            className="flex flex-col items-center gap-2 rounded-2xl p-3"
            style={{ backgroundColor: person.profile.color }}
          >
            <DayMasterIcon profile={person.profile} size="lg" />
            <p className="text-sm font-extrabold text-zinc-900">{person.name}</p>
            <p className="text-xs font-semibold text-zinc-700">
              {person.profile.name} · {person.profile.title}
            </p>
            <p className="text-[11px] text-zinc-600">
              {BRANCHES[person.chart.year.branch].animal}띠 · 일지 {BRANCHES[person.chart.day.branch].hanja}
            </p>
          </div>
        ))}
      </div>

      <Section emoji="🧠" heading="성격 궁합 · 일간" title={fill(stem.title)} text={fill(stem.text)}>
        <p className="mt-1 text-xs text-zinc-500">
          {me.name} {STEMS[me.chart.day.stem].hanja}({STEMS[me.chart.day.stem].hangul}) · {them.name}{" "}
          {STEMS[them.chart.day.stem].hanja}({STEMS[them.chart.day.stem].hangul})
        </p>
      </Section>

      <Section emoji="🏠" heading="생활 궁합 · 일지" title={dayBranch.title} text={dayBranch.text} />

      <Section emoji="🐾" heading="띠 궁합" title={zodiac.title} text={zodiac.text}>
        <p className="mt-1 text-xs text-zinc-500">
          {BRANCHES[me.chart.year.branch].animal}띠 · {BRANCHES[them.chart.year.branch].animal}띠
        </p>
      </Section>

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <p className="text-xs font-bold text-zinc-400">🌈 오행 보완</p>
        {[me, them].map((person) => (
          <div key={person.name + "el"} className="flex flex-col gap-1">
            <span className="text-xs font-bold">{person.name}</span>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              {ELEMENT_ORDER.map((key) => {
                const total = ELEMENT_ORDER.reduce((sum, k) => sum + person.chart.elements[k], 0);
                return (
                  <span
                    key={key}
                    style={{
                      width: `${(person.chart.elements[key] / total) * 100}%`,
                      backgroundColor: getElement(key).color,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
          {ELEMENT_ORDER.map((key) => (
            <span key={key} className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: getElement(key).color }} />
              {getElement(key).name}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {breakdown.theyFill.length === 0 && breakdown.iFill.length === 0
            ? "두 사람에게 크게 비어 있는 기운을 서로 채워주는 관계는 아니에요. 대신 비슷한 기운 위에서 공감대를 쌓기 쉬워요."
            : [
                breakdown.theyFill.length > 0 &&
                  `${me.name}에게 없는 ${elementNames(breakdown.theyFill)} 기운을 ${them.name} 쪽이 넉넉히 채워줘요.`,
                breakdown.iFill.length > 0 &&
                  `${them.name}에게 없는 ${elementNames(breakdown.iFill)} 기운을 ${me.name} 쪽이 채워줘요.`,
              ]
                .filter(Boolean)
                .join(" ")}
        </p>
      </section>

      {detail.reasons.length > 0 && (
        <section className="flex w-full flex-col gap-2 rounded-3xl bg-zinc-50 p-5 text-left dark:bg-zinc-900">
          <p className="text-xs font-bold text-zinc-400">💡 궁합 포인트</p>
          <ul className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
            {detail.reasons.map((reason) => (
              <li key={reason}>• {reason}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="w-full rounded-2xl px-4 py-3 text-left text-sm" style={{ backgroundColor: `${tier.color}14` }}>
        <span className="font-bold">잘 지내는 팁 · </span>
        <span className="text-zinc-600 dark:text-zinc-400">{fill(stem.tip)}</span>
      </div>

      <ShareBar
        title={`💞 우리 사주 궁합 ${detail.score}점`}
        text={`사주로 궁합을 봤더니 ${detail.score}점, "${tier.title}"${irae(tier.title)}!\n너희 궁합도 확인해봐 👉`}
        accentColor={test.accentColor}
        path={`/s/${test.id}`}
      />

      <p className="text-xs leading-relaxed text-zinc-400">
        궁합 점수는 두 사람의 원국을 정해진 규칙으로 대 본 재미용 지표예요. 관계를 단정하지 않아요.
      </p>

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a href={`/s/${test.id}`} className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 사람과 보기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="compat-result-bottom" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import zodiacCopy from "@/data/saju/zodiac";
import yearly from "@/data/saju/yearly";
import { BRANCHES, STEMS } from "@/lib/saju/constants";
import {
  ZODIAC_SLUGS,
  computeZodiacDaily,
  computeZodiacYear,
  starsOf,
  zodiacMatches,
  type ZodiacDaily,
  type ZodiacYear,
} from "@/lib/saju/zodiac";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

const SAMJAE_LABEL = { in: "들삼재", stay: "눌삼재", out: "날삼재" } as const;
const RELATION_LABEL = { combine: "육합", trine: "삼합", clash: "충", same: "같은 띠", neutral: "" } as const;

const twoDigits = (year: number) => String(year % 100).padStart(2, "0");
const pick = <T,>(items: T[], index: number) => items[index % items.length];

function Stars({ score, color }: { score: number; color: string }) {
  const count = starsOf(score);
  return (
    <span aria-label={`별 ${count}개`} className="tracking-tight" style={{ color }}>
      {"★".repeat(count)}
      <span className="text-zinc-300 dark:text-zinc-700">{"★".repeat(5 - count)}</span>
    </span>
  );
}

function YearCard({ fortune, animal, color }: { fortune: ZodiacYear; animal: string; color: string }) {
  const relation = zodiacCopy.yearRelation[fortune.relation];
  const stem = STEMS[fortune.pillar.stem];
  const branch = BRANCHES[fortune.pillar.branch];
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl bg-zinc-50 p-4 text-left dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-extrabold">
          {fortune.year}년{" "}
          <span className="text-xs font-normal text-zinc-500">
            {stem.hanja}
            {branch.hanja}({stem.hangul}
            {branch.hangul})년 · {branch.animal}의 해
          </span>
        </p>
        <Stars score={fortune.score} color={color} />
      </div>
      <p className="text-xs font-bold" style={{ color }}>
        {relation.title}
        {fortune.relation !== "neutral" && ` · ${branch.animal}띠와 ${animal}띠는 ${RELATION_LABEL[fortune.relation]}`}
      </p>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {relation.text} {zodiacCopy.yearElement[fortune.element]}
      </p>
      {fortune.samjae && (
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <b className="text-zinc-800 dark:text-zinc-200">{SAMJAE_LABEL[fortune.samjae]} · </b>
          {yearly.samjae[fortune.samjae]}
        </p>
      )}
    </div>
  );
}

export function ZodiacResult({ test, branch }: { test: SajuTestConfig; branch: number }) {
  const [today, setToday] = useState<{ daily: ZodiacDaily; years: ZodiacYear[] } | null>(null);
  const slug = ZODIAC_SLUGS[branch];
  const profile = zodiacCopy.animals[slug];
  const animal = BRANCHES[branch].animal;
  const color = test.accentColor;
  const matches = zodiacMatches(branch);

  // "오늘"은 브라우저에서 한국 날짜로 정해야 해서 effect 안에서 계산한다 (정적 페이지가 날짜에 묶이지 않게).
  useEffect(() => {
    const daily = computeZodiacDaily(branch);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday({
      daily,
      years: [daily.date.year, daily.date.year + 1].map((year) => computeZodiacYear(branch, year)),
    });
  }, [branch]);

  const daily = today?.daily;
  const tier = daily && (zodiacCopy.tiers.find((item) => daily.score >= item.min) ?? zodiacCopy.tiers[zodiacCopy.tiers.length - 1]);
  const dayStem = daily && STEMS[daily.pillar.stem];
  const dayBranch = daily && BRANCHES[daily.pillar.branch];

  const animalLink = (target: number) => (
    <a
      key={target}
      href={`/s/${test.id}/t/${ZODIAC_SLUGS[target]}`}
      className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold dark:bg-zinc-900"
    >
      {zodiacCopy.animals[ZODIAC_SLUGS[target]].emoji} {BRANCHES[target].animal}띠
    </a>
  );

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        <div className="text-6xl">{profile.emoji}</div>
        <h1 className="text-2xl font-extrabold">{animal}띠 오늘의 운세</h1>
        <p className="text-sm text-zinc-500">
          {daily && dayStem && dayBranch
            ? `${daily.date.year}년 ${daily.date.month}월 ${daily.date.day}일 · ${dayStem.hanja}${dayBranch.hanja}(${dayStem.hangul}${dayBranch.hangul})일 · ${dayBranch.animal}의 날`
            : " "}
        </p>
      </div>

      {!daily || !tier ? (
        <p className="py-10 text-sm text-zinc-400">오늘의 일진을 살펴보는 중이에요…</p>
      ) : (
        <>
          <div
            className="flex w-full flex-col items-center gap-2 rounded-3xl px-6 py-8 shadow-sm"
            style={{ backgroundColor: `${color}14` }}
          >
            <p className="text-sm font-semibold" style={{ color }}>
              {animal}띠 오늘의 총운
            </p>
            <p className="text-4xl">
              <Stars score={daily.score} color={color} />
            </p>
            <p className="text-lg font-bold">{tier.title}</p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {pick(zodiacCopy.dailyRelation[daily.relation], daily.rotation)}{" "}
              {pick(zodiacCopy.dailyElement[daily.element], daily.rotation)}
            </p>
          </div>

          <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
            <h2 className="text-lg font-bold">🗓️ 년생별 오늘의 운세</h2>
            <p className="text-xs leading-relaxed text-zinc-500">
              같은 {animal}띠라도 태어난 해의 천간이 달라서 오늘 받는 기운이 조금씩 달라요.
            </p>
            <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
              {daily.years.map((line) => (
                <li key={line.year} className="flex flex-col gap-0.5 py-2.5">
                  <span className="flex items-center justify-between text-sm font-extrabold">
                    <span>
                      {twoDigits(line.year)}년생{" "}
                      <span className="text-xs font-normal text-zinc-400">
                        {STEMS[(((line.year - 4) % 10) + 10) % 10].hanja}
                        {BRANCHES[branch].hanja}
                      </span>
                    </span>
                    <Stars score={line.score} color={color} />
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {pick(zodiacCopy.dailyTenGods[line.tenGod], line.variant)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
            <h2 className="text-lg font-bold">🎍 올해·내년 {animal}띠 운세</h2>
            {today.years.map((fortune) => (
              <YearCard key={fortune.year} fortune={fortune} animal={animal} color={color} />
            ))}
            <a href="/s/newyear" className="text-sm font-semibold underline underline-offset-4" style={{ color }}>
              내 사주로 보는 신년 운세 →
            </a>
          </section>
        </>
      )}

      <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">
          {profile.emoji} {animal}띠는 어떤 사람?
        </h2>
        <p className="text-xs font-bold" style={{ color }}>
          {BRANCHES[branch].hanja}({BRANCHES[branch].hangul}) · {profile.title}
        </p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{profile.description}</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "타고난 강점", items: profile.strengths },
            { label: "조심하면 좋은 점", items: profile.cautions },
          ].map((group) => (
            <div key={group.label} className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
              <p className="text-sm font-bold">{group.label}</p>
              <ul className="mt-1.5 flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-2xl p-3" style={{ backgroundColor: `${color}14` }}>
          <p className="text-xs font-bold text-zinc-500">💞 잘 맞는 띠 · 삼합과 육합</p>
          <div className="flex flex-wrap gap-2">{[...matches.trine, matches.combine].map(animalLink)}</div>
          <p className="mt-1 text-xs font-bold text-zinc-500">⚡ 부딪히기 쉬운 띠 · 충</p>
          <div className="flex flex-wrap gap-2">{animalLink(matches.clash)}</div>
        </div>
        <a href="/s/compat" className="text-sm font-semibold underline underline-offset-4" style={{ color }}>
          생년월일로 자세한 사주 궁합 보기 →
        </a>
      </section>

      {daily && tier && (
        <ShareBar
          title={`${profile.emoji} ${animal}띠 오늘의 운세`}
          text={`오늘 ${animal}띠 운세는 "${tier.title}"!\n너희 띠는 오늘 어때? 👉`}
          accentColor={color}
          path={`/s/${test.id}/t/${slug}`}
        />
      )}

      <section className="flex w-full flex-col gap-2 text-left">
        <p className="text-sm font-bold">다른 띠 운세</p>
        <div className="grid grid-cols-6 gap-1.5">
          {ZODIAC_SLUGS.map((other, index) => (
            <a
              key={other}
              href={`/s/${test.id}/t/${other}`}
              aria-label={`${BRANCHES[index].animal}띠 운세`}
              className="flex flex-col items-center rounded-xl py-1.5 text-2xl"
              style={index === branch ? { backgroundColor: `${color}1f` } : undefined}
            >
              {zodiacCopy.animals[other].emoji}
              <span className="text-[10px] font-semibold text-zinc-500">{BRANCHES[index].animal}</span>
            </a>
          ))}
        </div>
      </section>

      <p className="text-xs leading-relaxed text-zinc-400">
        띠별 운세는 같은 띠 모두가 함께 보는 큰 흐름이에요. 한국 시간 자정에 바뀌고, 정해진 규칙으로 계산한 재미용
        풀이예요. 내 사주 전체로 보는 개인 운세는{" "}
        <a href="/s/today" className="underline underline-offset-2">
          오늘의 사주 운세
        </a>
        에서 볼 수 있어요.
      </p>

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a href={`/s/${test.id}`} className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          띠 다시 고르기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="zodiac-result-bottom" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import palm from "@/data/saju/palm";
import { loadPalmAnswers, type PalmAnswers, type PalmLine } from "@/lib/saju/palm";
import { PhotoIcon } from "@/components/PhotoIcon";
import { PalmSvg } from "@/components/saju/PalmSvg";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

type State = { status: "loading" } | { status: "missing" } | { status: "ready"; answers: PalmAnswers };

/** 마지막 글자에 받침이 있으면 "이래", 없으면 "래" */
const irae = (word: string) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0 ? "이래" : "래";
};

export function PalmResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const answers = loadPalmAnswers();
    // sessionStorage 는 마운트 후에만 읽을 수 있어서 effect 안에서 상태를 정한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(answers ? { status: "ready", answers } : { status: "missing" });
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">손금을 읽는 중이에요…</p>;
  }
  if (state.status === "missing") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        {test.image ? <PhotoIcon src={test.image} size="lg" /> : <div className="text-5xl">{test.emoji}</div>}
        <p className="text-base font-semibold">고른 손금이 없어요</p>
        <a
          href={`/s/${test.id}`}
          className="rounded-full px-6 py-3 text-base font-bold text-white"
          style={{ backgroundColor: test.accentColor }}
        >
          손금 보러 가기
        </a>
      </div>
    );
  }

  const { answers } = state;
  const color = test.accentColor;
  const simian = answers.heart === "simian";
  const heart = answers.heart !== "simian" ? palm.heart[answers.heart] : null;
  const head = answers.head ? palm.head[answers.head] : null;
  const name = simian ? palm.simian.name : `${heart?.adj} ${head?.noun}`;
  const intro = simian ? palm.simian.title : palm.combos[`${answers.head}-${answers.heart}`];
  const drawing = {
    heart: answers.heart,
    ...(answers.head && { head: answers.head }),
    ...(answers.headStart && { headStart: answers.headStart }),
    life: answers.life,
    fate: answers.fate,
    marriage: answers.marriage,
  };

  const sections: { line: PalmLine; emoji: string; label: string; title: string; text: string; extra?: string }[] = [
    ...(simian
      ? [
          {
            line: "heart" as const,
            emoji: "✊",
            label: "막쥔손금",
            title: "감정선과 두뇌선이 한 줄로 이어진 손",
            text: palm.simian.text,
          },
        ]
      : [
          { line: "heart" as const, emoji: "💗", label: "감정선", title: heart!.title, text: heart!.text },
          {
            line: "head" as const,
            emoji: "🧠",
            label: "두뇌선",
            title: head!.title,
            text: head!.text,
            extra: answers.headStart ? palm.headStart[answers.headStart] : undefined,
          },
        ]),
    { line: "life", emoji: "🌱", label: "생명선", ...palm.life[answers.life] },
    { line: "fate", emoji: "🧭", label: "운명선", ...palm.fate[answers.fate] },
    { line: "marriage", emoji: "💍", label: "결혼선", ...palm.marriage[answers.marriage] },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">
        {seriesNameOf(test)} · {test.title}
      </p>

      <div
        className="flex w-full flex-col items-center gap-2 rounded-3xl px-6 py-8 shadow-sm"
        style={{ backgroundColor: `${color}14` }}
      >
        <PalmSvg drawing={drawing} color={color} size={150} mirror={answers.side === "left"} />
        <p className="text-sm font-semibold" style={{ color }}>
          내 손금 유형
        </p>
        <h1 className="text-2xl font-extrabold leading-snug">{name}</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{intro}</p>
      </div>

      <p className="w-full rounded-2xl bg-zinc-50 px-4 py-3 text-left text-sm leading-relaxed text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        ✋ {palm.hand[answers.hand]}
      </p>

      {sections.map((section) => (
        <section
          key={section.label}
          className="flex w-full gap-3 rounded-3xl border border-zinc-200 p-4 text-left dark:border-zinc-800"
        >
          <div className="shrink-0">
            <PalmSvg
              drawing={drawing}
              focus={section.line}
              color={color}
              size={64}
              zoom={section.line === "marriage"}
              mirror={answers.side === "left"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-zinc-400">
              {section.emoji} {section.label}
            </p>
            <h2 className="text-base font-extrabold">{section.title}</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{section.text}</p>
            {section.extra && (
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{section.extra}</p>
            )}
          </div>
        </section>
      ))}

      <ShareBar
        title={`🖐️ 내 손금 유형은 "${name}"`}
        text={`손금을 봤더니 나는 "${name}"${irae(name)}!\n너의 손금은 어떤 유형일까? 👉`}
        accentColor={color}
        path={`/s/${test.id}`}
      />

      <p className="text-xs leading-relaxed text-zinc-400">
        손금 풀이는 전통적으로 전해 오는 해석을 바탕으로 새로 쓴 재미용 풀이예요. 건강이나 수명과는 관계없어요.
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
        <AdSlot slot="palm-result-bottom" />
      </div>
    </div>
  );
}

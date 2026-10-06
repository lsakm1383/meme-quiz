"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { seriesNameOf, type SajuTestConfig } from "@/data/saju";
import { savePalmAnswers, type PalmAnswers, type PalmDrawing, type PalmLine } from "@/lib/saju/palm";
import { PhotoIcon } from "@/components/PhotoIcon";
import { PalmSvg } from "@/components/saju/PalmSvg";

/** drawing: 손바닥 그림에 그릴 선 모양 · image: 그림 대신 보여줄 일러스트 (손 고르기) */
type Option = { value: string; label: string; drawing?: Partial<PalmDrawing>; image?: string; mirror?: boolean };
type Step = {
  key: keyof PalmAnswers;
  line?: PalmLine;
  title: string;
  hint: string;
  options: Option[];
};

const STEPS: Step[] = [
  {
    key: "side",
    title: "어느 손을 보고 있나요?",
    hint: "보고 있는 손과 같은 방향으로 그림을 보여드려요.",
    options: [
      { value: "left", label: "왼손", image: "/saju/palm-base.webp", mirror: true },
      { value: "right", label: "오른손", image: "/saju/palm-base.webp" },
    ],
  },
  {
    key: "hand",
    title: "그 손이 주로 쓰는 손인가요?",
    hint: "주로 쓰는 손은 살아오며 만든 모습, 반대 손은 타고난 모습을 본다고 해요.",
    options: [
      { value: "dominant", label: "네, 주로 쓰는 손", image: "/saju/palm-writing.webp" },
      { value: "other", label: "아니요, 반대 손", image: "/saju/palm-base.webp" },
    ],
  },
  {
    key: "heart",
    line: "heart",
    title: "감정선은 어디서 끝나나요?",
    hint: "새끼손가락 아래에서 시작해 손가락 쪽으로 이어지는, 가장 위쪽의 긴 선이에요.",
    options: [
      { value: "long", label: "검지 아래까지 길게", drawing: { heart: "long" } },
      { value: "between", label: "검지와 중지 사이", drawing: { heart: "between" } },
      { value: "short", label: "중지 아래에서 짧게", drawing: { heart: "short" } },
      { value: "straight", label: "휘지 않고 곧게 가로질러요", drawing: { heart: "straight" } },
      { value: "simian", label: "두뇌선과 하나로 이어져 있어요", drawing: { heart: "simian" } },
    ],
  },
  {
    key: "head",
    line: "head",
    title: "두뇌선은 어떤 모양인가요?",
    hint: "엄지와 검지 사이에서 시작해 손바닥을 가로지르는, 가운데쯤의 선이에요.",
    options: [
      { value: "straight", label: "곧게 가로질러요", drawing: { head: "straight" } },
      { value: "curve", label: "끝이 손목 쪽으로 휘어요", drawing: { head: "curve" } },
      { value: "fork", label: "끝이 두 갈래예요", drawing: { head: "fork" } },
      { value: "short", label: "중간쯤에서 짧게 끝나요", drawing: { head: "short" } },
    ],
  },
  {
    key: "headStart",
    line: "head",
    title: "두뇌선의 시작은 생명선과 붙어 있나요?",
    hint: "엄지와 검지 사이, 두 선이 시작하는 곳을 살펴보세요.",
    options: [
      { value: "joined", label: "붙어서 시작해요", drawing: { headStart: "joined" } },
      { value: "separate", label: "떨어져서 시작해요", drawing: { headStart: "separate" } },
    ],
  },
  {
    key: "life",
    line: "life",
    title: "생명선은 어떻게 돌아가나요?",
    hint: "엄지 뿌리를 둥글게 감싸며 손목 쪽으로 내려가는 선이에요.",
    options: [
      { value: "wide", label: "엄지에서 멀리, 크게 돌아요", drawing: { life: "wide" } },
      { value: "narrow", label: "엄지 쪽에 바짝 붙어요", drawing: { life: "narrow" } },
      { value: "broken", label: "중간에 끊기거나 겹쳐요", drawing: { life: "broken" } },
      { value: "double", label: "안쪽에 나란한 선이 하나 더", drawing: { life: "double" } },
    ],
  },
  {
    key: "fate",
    line: "fate",
    title: "운명선이 보이나요?",
    hint: "손목에서 중지 쪽으로 세로로 올라가는 선이에요. 없는 사람도 많아요.",
    options: [
      { value: "clear", label: "손목부터 중지까지 뚜렷해요", drawing: { fate: "clear" } },
      { value: "late", label: "손바닥 중간쯤부터 시작해요", drawing: { fate: "late" } },
      { value: "faint", label: "희미하거나 여러 갈래예요", drawing: { fate: "faint" } },
      { value: "none", label: "거의 안 보여요", drawing: { fate: "none" } },
    ],
  },
  {
    key: "marriage",
    line: "marriage",
    title: "결혼선은 몇 개인가요?",
    hint: "새끼손가락 아래, 손바닥 옆면에서 들어오는 짧은 가로선이에요.",
    options: [
      { value: "one", label: "뚜렷한 선 하나", drawing: { marriage: "one" } },
      { value: "two", label: "두 개 이상", drawing: { marriage: "two" } },
      { value: "faint", label: "희미하거나 잘 안 보여요", drawing: { marriage: "faint" } },
    ],
  },
];

const STORAGE_ERROR = "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";

export function PalmQuiz({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Partial<PalmAnswers>>({});
  const [index, setIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 막쥔손금이면 두뇌선 두 질문은 건너뛴다
  const steps = STEPS.filter(
    (step) => !(answers.heart === "simian" && (step.key === "head" || step.key === "headStart"))
  );
  const step = index === null ? null : steps[index];
  const mirror = answers.side === "left";
  // 앞에서 고른 모양은 다음 보기 그림에도 반영한다
  const chosen: Partial<PalmDrawing> = {
    ...(answers.heart && { heart: answers.heart }),
    ...(answers.head && { head: answers.head }),
    ...(answers.headStart && { headStart: answers.headStart }),
    ...(answers.life && { life: answers.life }),
    ...(answers.fate && { fate: answers.fate }),
  };

  function choose(value: string) {
    if (index === null || !step) return;
    const next = { ...answers, [step.key]: value } as Partial<PalmAnswers>;
    if (step.key === "heart" && value === "simian") {
      delete next.head;
      delete next.headStart;
    }
    setAnswers(next);
    const remaining = STEPS.filter(
      (item) => !(next.heart === "simian" && (item.key === "head" || item.key === "headStart"))
    );
    if (index + 1 < remaining.length) {
      setIndex(index + 1);
      return;
    }
    if (!savePalmAnswers(next as PalmAnswers)) {
      setError(STORAGE_ERROR);
      return;
    }
    router.push(`/s/${test.id}/me`);
  }

  if (step === null || index === null) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        {test.image ? <PhotoIcon src={test.image} size="xl" /> : <div className="text-7xl">{test.emoji}</div>}
        <p className="text-sm font-bold" style={{ color: test.accentColor }}>
          {seriesNameOf(test)}
        </p>
        <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
        <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{test.description}</p>
        <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
          <PalmSvg color={test.accentColor} size={140} />
          <p className="text-sm leading-relaxed text-zinc-500">
            밝은 곳에서 손바닥을 펴고, 살짝 오므리면 선이 더 잘 보여요. 사진은 필요 없어요.
          </p>
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: test.accentColor }}
          >
            손금 보러 가기
          </button>
        </div>
        {guide}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <div className="flex w-full items-center justify-between text-sm font-semibold text-zinc-400">
        <button type="button" onClick={() => setIndex(index === 0 ? null : index - 1)}>
          ← 이전
        </button>
        <span>
          {index + 1} / {steps.length}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${((index + 1) / steps.length) * 100}%`, backgroundColor: test.accentColor }}
        />
      </div>
      <h1 className="text-xl font-extrabold leading-snug">{step.title}</h1>
      <p className="-mt-2 text-sm leading-relaxed text-zinc-500">{step.hint}</p>
      <div className={`grid w-full gap-2 ${step.line || step.options.some((option) => option.image) ? "grid-cols-2" : "grid-cols-1"}`}>
        {step.options.map((option) => {
          const selected = answers[step.key] === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => choose(option.value)}
              className="flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 text-sm font-bold transition-colors active:scale-[0.98]"
              style={{ borderColor: selected ? test.accentColor : "#e4e4e7" }}
            >
              {option.image && (
                <span className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-[#faf7eb]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={option.image}
                    alt=""
                    className={`h-full w-full object-contain ${option.mirror || (step.key === "hand" && mirror) ? "-scale-x-100" : ""}`}
                  />
                </span>
              )}
              {step.line && (
                <PalmSvg
                  drawing={{ ...chosen, ...option.drawing }}
                  focus={step.line}
                  color={test.accentColor}
                  size={110}
                  zoom={step.line === "marriage"}
                  mirror={mirror}
                />
              )}
              <span className="leading-snug">{option.label}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}

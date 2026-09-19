"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MbtiTestConfig } from "@/data/mbti-types";
import { calculateMbtiCode } from "@/lib/scoring";
import { RunnerNav } from "@/components/RunnerNav";

export function MbtiRunner({ test }: { test: MbtiTestConfig }) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  function selectOption(optionIndex: number) {
    const nextAnswers = [...answers, optionIndex];
    const isLastQuestion = step + 1 >= test.questions.length;

    if (!isLastQuestion) {
      setAnswers(nextAnswers);
      setStep(step + 1);
      return;
    }

    const code = calculateMbtiCode(test, nextAnswers);
    router.push(`/m/${test.id}/r/${code}`);
  }

  function goBack() {
    if (step === 0) {
      setStarted(false);
      return;
    }
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-7xl">{test.emoji}</div>
        <h1 className="text-2xl font-bold leading-snug">{test.title}</h1>
        <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {test.description}
        </p>
        <button
          onClick={() => setStarted(true)}
          className="mt-2 w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: test.accentColor }}
        >
          시작하기
        </button>
        <p className="text-xs text-zinc-400">
          질문 {test.questions.length}개 · 1분 소요
        </p>
      </div>
    );
  }

  const question = test.questions[step];
  const progress = Math.round((step / test.questions.length) * 100);

  return (
    <div className="flex w-full flex-col gap-6">
      <RunnerNav onBack={goBack} />
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: test.accentColor }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">
        {step + 1} / {test.questions.length}
      </p>
      <h2 className="text-xl font-bold leading-snug">{question.text}</h2>
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => selectOption(index)}
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 text-left text-base font-medium transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

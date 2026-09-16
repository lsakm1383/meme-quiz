"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizConfig } from "@/data/quiz-types";
import { calculateResultId } from "@/lib/scoring";
import { RunnerNav } from "@/components/RunnerNav";

export function QuizRunner({ quiz }: { quiz: QuizConfig }) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  function selectOption(optionIndex: number) {
    const nextAnswers = [...answers, optionIndex];
    const isLastQuestion = step + 1 >= quiz.questions.length;

    if (!isLastQuestion) {
      setAnswers(nextAnswers);
      setStep(step + 1);
      return;
    }

    const resultId = calculateResultId(quiz, nextAnswers);
    router.push(`/${quiz.id}/r/${resultId}`);
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
        <div className="text-7xl">{quiz.emoji}</div>
        <h1 className="text-2xl font-bold leading-snug">{quiz.title}</h1>
        <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {quiz.description}
        </p>
        <button
          onClick={() => setStarted(true)}
          className="mt-2 w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: quiz.accentColor }}
        >
          시작하기
        </button>
        <p className="text-xs text-zinc-400">
          질문 {quiz.questions.length}개 · 30초 소요
        </p>
      </div>
    );
  }

  const question = quiz.questions[step];
  const progress = Math.round((step / quiz.questions.length) * 100);

  return (
    <div className="flex w-full flex-col gap-6">
      <RunnerNav onBack={goBack} />
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: quiz.accentColor }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">
        {step + 1} / {quiz.questions.length}
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

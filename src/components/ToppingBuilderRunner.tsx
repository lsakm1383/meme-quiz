"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ToppingTestConfig } from "@/data/topping-types";
import { buildComboKey } from "@/data/toppings";

export function ToppingBuilderRunner({ test }: { test: ToppingTestConfig }) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [pickedInStep, setPickedInStep] = useState<string[]>([]);

  const category = test.categories[step];
  const isSingleChoice = category.maxSelect === 1 && category.minSelect === 1;
  const progress = Math.round((step / test.categories.length) * 100);

  function finish(allIds: string[]) {
    router.push(`/c/${test.id}/r/${buildComboKey(allIds)}`);
  }

  function goToNextStep(allIds: string[]) {
    const isLastCategory = step + 1 >= test.categories.length;
    if (isLastCategory) {
      finish(allIds);
      return;
    }
    setSelected(allIds);
    setPickedInStep([]);
    setStep(step + 1);
  }

  function pickSingle(toppingId: string) {
    goToNextStep([...selected, toppingId]);
  }

  function toggleMulti(toppingId: string) {
    setPickedInStep((current) =>
      current.includes(toppingId)
        ? current.filter((id) => id !== toppingId)
        : current.length >= category.maxSelect
          ? current
          : [...current, toppingId]
    );
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
          토핑 담으러 가기
        </button>
        <p className="text-xs text-zinc-400">
          {test.categories.length}단계 · 1분 소요
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: test.accentColor }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">
        {step + 1} / {test.categories.length}
      </p>
      <h2 className="text-xl font-bold leading-snug">{category.label}</h2>

      <div className="grid grid-cols-2 gap-3">
        {category.toppings.map((topping) => {
          const isPicked = pickedInStep.includes(topping.id);
          return (
            <button
              key={topping.id}
              onClick={() =>
                isSingleChoice ? pickSingle(topping.id) : toggleMulti(topping.id)
              }
              className={`flex flex-col items-center gap-1 rounded-2xl border px-4 py-5 text-center transition-colors ${
                isPicked
                  ? "border-transparent text-white"
                  : "border-zinc-200 active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
              }`}
              style={isPicked ? { backgroundColor: test.accentColor } : undefined}
            >
              <span className="text-3xl">{topping.emoji}</span>
              <span className="text-sm font-semibold">{topping.name}</span>
            </button>
          );
        })}
      </div>

      {!isSingleChoice && (
        <button
          onClick={() => goToNextStep([...selected, ...pickedInStep])}
          disabled={pickedInStep.length < category.minSelect}
          className="w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform enabled:active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: test.accentColor }}
        >
          {pickedInStep.length < category.minSelect
            ? `최소 ${category.minSelect}개 골라주세요`
            : "다음"}
        </button>
      )}
    </div>
  );
}

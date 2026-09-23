"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { DecisionNode, DecisionTestConfig } from "@/data/decision-types";
import { getMaxDepth } from "@/data/decision-types";
import { RunnerNav } from "@/components/RunnerNav";
import { PhotoIcon } from "@/components/PhotoIcon";

export function DecisionRunner({ test }: { test: DecisionTestConfig }) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [node, setNode] = useState<DecisionNode>(test.root);
  const [history, setHistory] = useState<DecisionNode[]>([]);
  const maxDepth = useMemo(() => getMaxDepth(test.root), [test]);

  function choose(option: DecisionNode["options"][number]) {
    if (option.type === "result") {
      router.push(`/d/${test.id}/r/${option.resultId}`);
      return;
    }
    setHistory((h) => [...h, node]);
    setNode(option.node);
  }

  function goBack() {
    const previous = history[history.length - 1];
    if (!previous) {
      setStarted(false);
      return;
    }
    setHistory(history.slice(0, -1));
    setNode(previous);
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        {test.image ? (
          <PhotoIcon src={test.image} size="xl" />
        ) : (
          <div className="text-7xl">{test.emoji}</div>
        )}
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
        <p className="text-xs text-zinc-400">선택마다 다음 질문이 달라져요 · 30초 소요</p>
      </div>
    );
  }

  const step = history.length + 1;
  const progress = Math.round((history.length / maxDepth) * 100);

  return (
    <div className="flex w-full flex-col gap-6">
      <RunnerNav onBack={goBack} />
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: test.accentColor }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">{step}번째 선택</p>
      <h2 className="text-xl font-bold leading-snug">{node.text}</h2>
      <div className="flex flex-col gap-3">
        {node.options.map((option, index) => (
          <button
            key={index}
            onClick={() => choose(option)}
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 text-left text-base font-medium transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MbtiTestConfig } from "@/data/mbti-types";
import { calculateMbtiCode } from "@/lib/scoring";
import { getMbtiProfileByCode } from "@/data/mbti";
import { RunnerNav } from "@/components/RunnerNav";

type Phase = "intro" | "createTitle" | "nickname" | "quiz";

export function MbtiRunner({
  test,
  initialGroupId,
}: {
  test: MbtiTestConfig;
  initialGroupId?: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(initialGroupId ? "nickname" : "intro");
  const [groupId, setGroupId] = useState<string | null>(initialGroupId ?? null);
  const [groupTitle, setGroupTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  async function createGroup() {
    if (!groupTitle.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: groupTitle.trim(), testId: test.id }),
      });
      if (!res.ok) throw new Error();
      const data: { groupId: string } = await res.json();
      setGroupId(data.groupId);
      setPhase("nickname");
    } catch {
      setError("그룹을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  async function finishQuiz(nextAnswers: number[]) {
    const code = calculateMbtiCode(test, nextAnswers);

    if (groupId) {
      setBusy(true);
      try {
        const res = await fetch(`/api/groups/${groupId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nickname: nickname.trim(), code }),
        });
        const data: { memberId?: string } = res.ok ? await res.json() : {};
        router.push(
          data.memberId ? `/g/${groupId}?me=${data.memberId}` : `/g/${groupId}`
        );
      } catch {
        // 그룹 참여 요청이 실패해도 그룹 화면으로는 이동시킨다
        router.push(`/g/${groupId}`);
      }
      return;
    }

    const profile = getMbtiProfileByCode(test, code);
    router.push(`/m/${test.id}/r/${profile?.slug ?? code}`);
  }

  function selectOption(optionIndex: number) {
    const nextAnswers = [...answers, optionIndex];
    const isLastQuestion = step + 1 >= test.questions.length;

    if (!isLastQuestion) {
      setAnswers(nextAnswers);
      setStep(step + 1);
      return;
    }

    finishQuiz(nextAnswers);
  }

  function goBack() {
    if (step === 0) {
      setPhase(initialGroupId ? "nickname" : "intro");
      return;
    }
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  }

  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-7xl">{test.emoji}</div>
        <h1 className="text-2xl font-bold leading-snug">{test.title}</h1>
        <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {test.description}
        </p>
        <button
          onClick={() => setPhase("quiz")}
          className="mt-2 w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: test.accentColor }}
        >
          혼자 해보기
        </button>
        <button
          onClick={() => setPhase("createTitle")}
          className="text-sm font-semibold underline underline-offset-4"
          style={{ color: test.accentColor }}
        >
          친구들이랑 그룹 만들어서 같이 하기
        </button>
        <p className="text-xs text-zinc-400">
          질문 {test.questions.length}개 · 1분 소요
        </p>
      </div>
    );
  }

  if (phase === "createTitle") {
    return (
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <div className="text-6xl">🤝</div>
        <h1 className="text-xl font-bold">그룹 이름을 지어주세요</h1>
        <input
          value={groupTitle}
          onChange={(e) => setGroupTitle(e.target.value)}
          placeholder="예: 우리 팀 케미"
          maxLength={30}
          className="w-full max-w-xs rounded-2xl border border-zinc-300 px-5 py-3 text-center text-base dark:border-zinc-700 dark:bg-zinc-900"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          onClick={createGroup}
          disabled={!groupTitle.trim() || busy}
          className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: test.accentColor }}
        >
          {busy ? "만드는 중..." : "그룹 만들기"}
        </button>
        <button
          onClick={() => setPhase("intro")}
          className="text-sm font-semibold text-zinc-400 underline underline-offset-4"
        >
          뒤로
        </button>
      </div>
    );
  }

  if (phase === "nickname") {
    return (
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <div className="text-6xl">✍️</div>
        <h1 className="text-xl font-bold">닉네임을 알려주세요</h1>
        <p className="max-w-sm text-sm text-zinc-500">
          그룹 관계도에 표시될 이름이에요.
        </p>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="예: 민준"
          maxLength={12}
          className="w-full max-w-xs rounded-2xl border border-zinc-300 px-5 py-3 text-center text-base dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          onClick={() => setPhase("quiz")}
          disabled={!nickname.trim()}
          className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: test.accentColor }}
        >
          시작하기
        </button>
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
            disabled={busy}
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 text-left text-base font-medium transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900 disabled:opacity-50"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

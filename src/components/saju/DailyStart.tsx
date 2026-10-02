"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SajuTestConfig } from "@/data/saju";
import {
  saveSubmission,
  rememberSubmission,
  loadRemembered,
  forgetRemembered,
  type SajuSubmission,
} from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { BirthForm } from "@/components/saju/BirthForm";

const STORAGE_ERROR = "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";

function describe(submission: SajuSubmission): string {
  const calendar = submission.calendar === "lunar" ? `음력${submission.leapMonth ? "(윤달)" : ""}` : "양력";
  return `${calendar} ${submission.year}년 ${submission.month}월 ${submission.day}일`;
}

export function DailyStart({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const router = useRouter();
  const [remembered, setRemembered] = useState<SajuSubmission | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [remember, setRemember] = useState(true);

  // 이 기기에 기억해 둔 정보가 있으면 입력 없이 바로 볼 수 있게 한다 (localStorage 는 마운트 후에만 읽힌다).
  useEffect(() => {
    const saved = loadRemembered();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRemembered(saved);
      setShowForm(false);
    }
  }, []);

  function open(submission: SajuSubmission) {
    if (!saveSubmission(submission)) return STORAGE_ERROR;
    router.push(`/s/${test.id}/me`);
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {test.image ? (
        <PhotoIcon src={test.image} size="xl" />
      ) : (
        <div className="text-7xl">{test.emoji}</div>
      )}
      <p className="text-sm font-bold" style={{ color: test.accentColor }}>
        사주 시리즈
      </p>
      <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {test.description}
      </p>

      {remembered && !showForm && (
        <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-zinc-200 p-5 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">이 기기에 기억해 둔 정보 · {describe(remembered)}</p>
          <button
            type="button"
            onClick={() => open(remembered)}
            className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: test.accentColor }}
          >
            오늘의 운세 바로 보기
          </button>
          <div className="flex items-center gap-4 text-sm font-semibold text-zinc-400">
            <button type="button" onClick={() => setShowForm(true)} className="underline underline-offset-4">
              다른 정보로 보기
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                forgetRemembered();
                setRemembered(null);
                setShowForm(true);
              }}
              className="underline underline-offset-4"
            >
              기억한 정보 지우기
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <BirthForm
          accentColor={test.accentColor}
          submitLabel="오늘의 운세 보기"
          genderNote="연애운에서 배우자별(여성은 관성, 남성은 재성)을 정할 때 쓰여요."
          bottomSlot={
            <label className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="mt-0.5 h-4 w-4"
              />
              <span>
                이 기기에 기억하기
                <span className="block text-xs text-zinc-400">
                  내일부터는 입력 없이 바로 볼 수 있어요. 이 브라우저에만 저장되고 언제든 지울 수 있어요.
                </span>
              </span>
            </label>
          }
          onValid={(submission) => {
            if (remember) rememberSubmission(submission);
            else forgetRemembered();
            return open(submission);
          }}
        />
      )}

      {guide}
    </div>
  );
}

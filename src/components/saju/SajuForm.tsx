"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SajuTestConfig } from "@/data/saju";
import { saveSubmission } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { BirthForm } from "@/components/saju/BirthForm";

export function SajuForm({
  test,
  guide,
  submitLabel = "사주 풀이 보기",
  genderNote = "대운 방향을 정할 때 쓰여요. 원국 풀이에는 영향을 주지 않아요.",
}: {
  test: SajuTestConfig;
  guide?: ReactNode;
  submitLabel?: string;
  genderNote?: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {test.image ? (
        <PhotoIcon src={test.image} size="xl" alt={`${test.title} 대표 그림`} />
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

      <BirthForm
        accentColor={test.accentColor}
        submitLabel={submitLabel}
        genderNote={genderNote}
        onValid={(submission) => {
          if (!saveSubmission(submission)) {
            return "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";
          }
          router.push(`/s/${test.id}/me`);
        }}
      />

      {guide}
    </div>
  );
}

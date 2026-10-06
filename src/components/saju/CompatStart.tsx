"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SajuTestConfig } from "@/data/saju";
import { savePair, loadRemembered, type SajuSubmission } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";
import { BirthForm } from "@/components/saju/BirthForm";

const MAX_NAME = 10;
const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900";
const STORAGE_ERROR = "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";

export function CompatStart({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const router = useRouter();
  const [step, setStep] = useState<"me" | "partner">("me");
  const [me, setMe] = useState<SajuSubmission | null>(null);
  const [meName, setMeName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [remembered, setRemembered] = useState<SajuSubmission | null>(null);

  // 오늘의 운세에서 "이 기기에 기억하기"로 저장한 내 정보가 있으면 첫 단계를 건너뛸 수 있게 한다.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemembered(loadRemembered());
  }, []);

  const nameField = (label: string, value: string, onChange: (value: string) => void, placeholder: string) => (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, MAX_NAME))}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );

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

      <div className="flex w-full items-center justify-center gap-2 text-sm font-bold">
        <span style={{ color: step === "me" ? test.accentColor : "#a1a1aa" }}>① 내 정보</span>
        <span className="text-zinc-300">→</span>
        <span style={{ color: step === "partner" ? test.accentColor : "#a1a1aa" }}>② 상대 정보</span>
      </div>

      {step === "me" && remembered && (
        <button
          type="button"
          onClick={() => {
            setMe(remembered);
            setStep("partner");
          }}
          className="w-full rounded-2xl border-2 px-4 py-3 text-sm font-bold"
          style={{ borderColor: test.accentColor, color: test.accentColor }}
        >
          이 기기에 기억한 내 정보로 바로 시작 ({remembered.year}년 {remembered.month}월 {remembered.day}일)
        </button>
      )}

      {step === "me" ? (
        <BirthForm
          key="me"
          accentColor={test.accentColor}
          submitLabel="다음: 상대 정보 입력"
          genderNote={null}
          topSlot={nameField("내 이름 (선택)", meName, setMeName, "비워 두면 '나'로 보여요")}
          onValid={(submission) => {
            setMe(submission);
            setStep("partner");
          }}
        />
      ) : (
        <BirthForm
          key="partner"
          accentColor={test.accentColor}
          submitLabel="궁합 보기"
          genderNote={null}
          topSlot={
            <>
              {nameField("상대 이름 (선택)", partnerName, setPartnerName, "비워 두면 '상대'로 보여요")}
              <button
                type="button"
                onClick={() => setStep("me")}
                className="self-start text-sm font-semibold text-zinc-400"
              >
                ← 내 정보 다시 입력
              </button>
            </>
          }
          onValid={(partner) => {
            if (!me) return "내 정보를 먼저 입력해주세요.";
            if (
              !savePair({ me, meName: meName.trim(), partner, partnerName: partnerName.trim() })
            ) {
              return STORAGE_ERROR;
            }
            router.push(`/s/${test.id}/me`);
          }}
        />
      )}

      {guide}
    </div>
  );
}

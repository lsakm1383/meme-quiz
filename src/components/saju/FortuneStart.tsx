"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SajuTestConfig } from "@/data/saju";
import { computeSaju, isSajuError } from "@/lib/saju/engine";
import { computeFortunes } from "@/lib/saju/fortune";
import { STEMS } from "@/lib/saju/constants";
import { saveSubmission, type SajuSubmission } from "@/lib/saju/storage";
import { MAX_NICKNAME_LENGTH, MAX_TITLE_LENGTH } from "@/lib/groups";
import { PhotoIcon } from "@/components/PhotoIcon";
import { BirthForm } from "@/components/saju/BirthForm";

type Phase = "choose" | "solo" | "createTitle" | "join";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900";

const GENDER_NOTE = "연애운·결혼운에서 배우자별(여성은 관성, 남성은 재성)을 정할 때 쓰여요.";
const STORAGE_ERROR = "브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.";

export function FortuneStart({
  test,
  initialGroupId,
  guide,
}: {
  test: SajuTestConfig;
  initialGroupId?: string;
  guide?: ReactNode;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(initialGroupId ? "join" : "choose");
  const [groupId, setGroupId] = useState<string | null>(initialGroupId ?? null);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupError, setGroupError] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [busy, setBusy] = useState(false);

  // 초대 링크로 들어오면 그룹 이름을 불러와 "○○ 그룹에 참여하기"로 보여준다.
  useEffect(() => {
    if (!initialGroupId) return;
    let cancelled = false;
    fetch(`/api/groups/${initialGroupId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { title: string; testId: string; members: unknown[] }) => {
        if (cancelled) return;
        if (data.testId !== test.id) setGroupError("이 테스트의 그룹이 아니에요.");
        else setGroupTitle(data.title);
      })
      .catch(() => {
        if (!cancelled) setGroupError("그룹을 찾을 수 없어요. 링크를 다시 확인해주세요.");
      });
    return () => {
      cancelled = true;
    };
  }, [initialGroupId, test.id]);

  async function createGroup() {
    if (!groupTitle.trim()) return;
    setBusy(true);
    setGroupError(null);
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: groupTitle.trim(), testId: test.id }),
      });
      if (!res.ok) throw new Error();
      const data: { groupId: string } = await res.json();
      setGroupId(data.groupId);
      setPhase("join");
    } catch {
      setGroupError("그룹을 만들지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  function solo(submission: SajuSubmission) {
    if (!saveSubmission(submission)) return STORAGE_ERROR;
    router.push(`/s/${test.id}/me`);
  }

  async function join(submission: SajuSubmission) {
    if (!groupId) return "그룹 정보를 찾을 수 없어요.";
    if (!nickname.trim()) return "그룹에서 쓸 닉네임을 입력해주세요.";
    const chart = computeSaju(submission);
    if (isSajuError(chart)) return chart.error;
    // 생년월일·원국은 보내지 않고, 기기에서 계산한 점수와 일간 종류만 보낸다.
    const scores = computeFortunes(chart, submission.gender);
    setBusy(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          code: STEMS[chart.day.stem].slug,
          scores,
        }),
      });
      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        return data.error === "group full"
          ? "그룹 인원이 가득 찼어요 (최대 30명)."
          : "참여하지 못했어요. 닉네임을 확인해주세요.";
      }
      if (!res.ok) throw new Error();
      const data: { memberId: string } = await res.json();
      if (!saveSubmission(submission)) return STORAGE_ERROR;
      router.push(`/s/${test.id}/me?group=${groupId}&me=${data.memberId}`);
    } catch {
      return "그룹에 참여하지 못했어요. 잠시 후 다시 시도해주세요.";
    } finally {
      setBusy(false);
    }
  }

  const header = (
    <>
      {test.image ? (
        <PhotoIcon src={test.image} size="xl" />
      ) : (
        <div className="text-7xl">{test.emoji}</div>
      )}
      <p className="text-sm font-bold" style={{ color: test.accentColor }}>
        사주 시리즈
      </p>
      <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
    </>
  );

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {header}

      {phase === "choose" && (
        <>
          <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {test.description}
          </p>
          <button
            type="button"
            onClick={() => setPhase("createTitle")}
            className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: test.accentColor }}
          >
            친구들이랑 그룹 만들기
          </button>
          <button
            type="button"
            onClick={() => setPhase("solo")}
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: test.accentColor }}
          >
            혼자 내 점수만 보기
          </button>
        </>
      )}

      {phase === "createTitle" && (
        <div className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
          <span className="text-sm font-bold">그룹 이름</span>
          <input
            value={groupTitle}
            onChange={(event) => setGroupTitle(event.target.value.slice(0, MAX_TITLE_LENGTH))}
            placeholder="예: 우리 동기들, 3학년 2반"
            className={inputClass}
          />
          {groupError && <p className="text-sm font-semibold text-red-600">{groupError}</p>}
          <button
            type="button"
            onClick={createGroup}
            disabled={busy || !groupTitle.trim()}
            className="w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg disabled:opacity-50"
            style={{ backgroundColor: test.accentColor }}
          >
            그룹 만들기
          </button>
          <button
            type="button"
            onClick={() => setPhase("choose")}
            className="text-center text-sm font-semibold text-zinc-400"
          >
            ← 뒤로
          </button>
        </div>
      )}

      {phase === "solo" && (
        <BirthForm
          accentColor={test.accentColor}
          submitLabel="내 운세 점수 보기"
          genderNote={GENDER_NOTE}
          onValid={solo}
        />
      )}

      {phase === "join" &&
        (groupError ? (
          <p className="text-sm font-semibold text-red-600">{groupError}</p>
        ) : (
          <BirthForm
            accentColor={test.accentColor}
            submitLabel={busy ? "참여하는 중…" : "그룹에 참여하고 순위 보기"}
            genderNote={GENDER_NOTE}
            busy={busy}
            onValid={join}
            topSlot={
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold">
                  {groupTitle ? `"${groupTitle}" 그룹에서 쓸 닉네임` : "그룹에서 쓸 닉네임"}
                </span>
                <input
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value.slice(0, MAX_NICKNAME_LENGTH))}
                  placeholder="실명 대신 별명을 추천해요"
                  className={inputClass}
                />
                <span className="text-xs text-zinc-400">
                  그룹에는 닉네임과 운세 점수, 일간 종류만 저장돼요. 생년월일은 보내지 않아요.
                </span>
              </div>
            }
          />
        ))}

      {guide}
    </div>
  );
}

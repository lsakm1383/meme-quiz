"use client";

import { useEffect, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import type { GroupMember } from "@/lib/groups";
import { FortuneCards } from "@/components/saju/FortuneBoards";
import { GroupCompatSection } from "@/components/saju/GroupCompatSection";
import { ShareBar } from "@/components/ShareBar";

type Data = { title: string; testId: string; members: GroupMember[] };

// 그룹 초대 링크로 공유되는 화면 — 운세별 순위를 보여주고 참여 버튼으로 이어진다.
export function FortuneGroupBoard({ test, groupId }: { test: SajuTestConfig; groupId: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/groups/${groupId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json: Data) => {
        if (cancelled) return;
        if (json.testId !== test.id) throw new Error();
        setData(json);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [groupId, test.id]);

  if (status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">그룹 순위를 불러오는 중이에요…</p>;
  }
  if (status === "error" || !data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-base font-semibold">그룹을 찾을 수 없어요</p>
        <a
          href={`/s/${test.id}`}
          className="rounded-full px-6 py-3 text-base font-bold text-white"
          style={{ backgroundColor: test.accentColor }}
        >
          새 그룹 만들기
        </a>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        <h1 className="text-2xl font-extrabold">&ldquo;{data.title}&rdquo; 운세 랭킹</h1>
        <p className="text-sm text-zinc-500">{data.members.length}명 참여</p>
      </div>

      <a
        href={`/s/${test.id}?group=${groupId}`}
        className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg"
        style={{ backgroundColor: test.accentColor }}
      >
        나도 참여하고 순위 보기
      </a>

      <GroupCompatSection members={data.members} />

      <FortuneCards members={data.members} />

      <ShareBar
        title={`🏆 "${data.title}" 사주 운세 랭킹`}
        text={`"${data.title}" 그룹 사주 운세 순위, 너도 참여해서 확인해봐 👉`}
        accentColor={test.accentColor}
      />

      <a
        href={`/s/${test.id}?create=1`}
        className="w-full max-w-xs rounded-full border-2 px-8 py-3 text-base font-bold"
        style={{ borderColor: test.accentColor, color: test.accentColor }}
      >
        새 그룹 만들기
      </a>

      <p className="text-xs leading-relaxed text-zinc-400">
        운세 점수는 사주 원국을 정해진 규칙으로 계산한 재미용 지표예요. 그룹 링크를 아는 사람은 누구나 이
        순위를 볼 수 있어요.
      </p>

      <div className="flex items-center gap-4">
        <a
          href={`/s/${test.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 하기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>
    </div>
  );
}

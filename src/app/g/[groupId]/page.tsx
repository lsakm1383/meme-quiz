"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getMbtiTest } from "@/data/mbti";
import { GroupRelationGraph } from "@/components/GroupRelationGraph";
import { ShareBar } from "@/components/ShareBar";
import type { GroupMember } from "@/lib/groups";

type GroupData = { title: string; testId: string; members: GroupMember[] };

function GroupPageContent({ groupId }: { groupId: string }) {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("me") ?? undefined;
  const [data, setData] = useState<GroupData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/groups/${groupId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json: GroupData) => {
        if (!cancelled) {
          setData(json);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [groupId]);

  if (status === "loading") {
    return <p className="text-sm text-zinc-400">불러오는 중...</p>;
  }

  if (status === "error" || !data) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-bold">그룹을 찾을 수 없어요</p>
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          홈으로 가기
        </Link>
      </div>
    );
  }

  const test = getMbtiTest(data.testId);
  const joinHref = `/m/${data.testId}?group=${groupId}`;
  const accent = test?.accentColor ?? "#7c3aed";

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <h1 className="text-2xl font-extrabold">{data.title}</h1>
      <p className="text-sm text-zinc-500">우리 사이, MBTI로 잇다</p>

      {data.members.length > 0 && test ? (
        <div className="aspect-square w-full max-w-sm">
          <GroupRelationGraph
            test={test}
            members={data.members}
            highlightId={highlightId}
          />
        </div>
      ) : (
        <p className="text-sm text-zinc-400">
          아직 참여한 사람이 없어요. 첫 번째로 참여해보세요!
        </p>
      )}

      <Link
        href={joinHref}
        className="w-full max-w-xs rounded-full px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
        style={{ backgroundColor: accent }}
      >
        테스트하고 참여하기
      </Link>

      <ShareBar
        title={`${data.title} 케미 그룹에 초대합니다`}
        text={`${data.title} — 나도 테스트하고 우리 케미 확인해봐 👉`}
        accentColor={accent}
      />

      <Link
        href="/"
        className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
      >
        다른 테스트 살펴보기
      </Link>
    </div>
  );
}

export default function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <Suspense fallback={<p className="text-sm text-zinc-400">불러오는 중...</p>}>
        <GroupPageContent groupId={groupId} />
      </Suspense>
    </div>
  );
}

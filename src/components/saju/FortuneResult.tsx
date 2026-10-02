"use client";

import { useEffect, useState } from "react";
import type { SajuTestConfig } from "@/data/saju";
import { dayMasters } from "@/data/saju";
import { computeSaju, isSajuError } from "@/lib/saju/engine";
import { computeFortunes, type FortuneScores } from "@/lib/saju/fortune";
import { STEMS } from "@/lib/saju/constants";
import { loadSubmission } from "@/lib/saju/storage";
import type { GroupMember } from "@/lib/groups";
import { FortuneCards, FortuneSummary } from "@/components/saju/FortuneBoards";
import { GroupCompatSection } from "@/components/saju/GroupCompatSection";
import { PhotoIcon } from "@/components/PhotoIcon";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

type Group = { id: string; title: string; members: GroupMember[]; me?: string };

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; scores: FortuneScores; dayMaster: string; group: Group | null; groupError: boolean };

export function FortuneResult({ test }: { test: SajuTestConfig }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const submission = loadSubmission();
    const chart = submission && computeSaju(submission);
    if (!submission || !chart || isSajuError(chart)) {
      // sessionStorage 는 마운트 후에만 읽을 수 있어서 effect 안에서 상태를 정한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ status: "missing" });
      return;
    }
    const scores = computeFortunes(chart, submission.gender);
    const dayMaster = dayMasters.find((item) => item.slug === STEMS[chart.day.stem].slug)!.name;
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get("group");
    const me = params.get("me") ?? undefined;
    if (!groupId) {
      setState({ status: "ready", scores, dayMaster, group: null, groupError: false });
      return;
    }
    fetch(`/api/groups/${groupId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { title: string; members: GroupMember[] }) => {
        if (!cancelled) {
          setState({
            status: "ready",
            scores,
            dayMaster,
            group: { id: groupId, title: data.title, members: data.members, me },
            groupError: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: "ready", scores, dayMaster, group: null, groupError: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <p className="py-20 text-center text-sm text-zinc-400">운세 점수를 계산하는 중이에요…</p>;
  }

  if (state.status === "missing") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        {test.image ? <PhotoIcon src={test.image} size="lg" /> : <div className="text-5xl">{test.emoji}</div>}
        <p className="text-base font-semibold">입력한 정보가 없어요</p>
        <p className="text-sm text-zinc-500">
          생년월일은 이 기기에만 잠시 보관돼서, 탭을 닫으면 다시 입력해야 해요.
        </p>
        <a
          href={`/s/${test.id}`}
          className="rounded-full px-6 py-3 text-base font-bold text-white"
          style={{ backgroundColor: test.accentColor }}
        >
          생년월일 입력하러 가기
        </a>
      </div>
    );
  }

  const { scores, dayMaster, group, groupError } = state;

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-zinc-400">사주 시리즈 · {test.title}</p>
        {group ? (
          <h1 className="text-2xl font-extrabold">
            &ldquo;{group.title}&rdquo; 운세 랭킹
          </h1>
        ) : (
          <h1 className="text-2xl font-extrabold">나의 운세 점수</h1>
        )}
        <p className="text-sm text-zinc-500">
          일간 {dayMaster}
          {group ? ` · 그룹 ${group.members.length}명 참여` : ""}
        </p>
      </div>

      {groupError && (
        <p className="w-full rounded-xl bg-amber-50 px-4 py-3 text-left text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          그룹 순위를 불러오지 못했어요. 내 점수만 먼저 보여드려요.
        </p>
      )}

      <FortuneSummary scores={scores} members={group?.members} highlightId={group?.me} />

      {group && <GroupCompatSection members={group.members} highlightId={group.me} />}

      <FortuneCards scores={scores} members={group?.members} highlightId={group?.me} />

      {group ? (
        <>
          <ShareBar
            title={`🏆 "${group.title}" 사주 운세 랭킹`}
            text={`"${group.title}" 그룹 사주 운세 순위가 나왔어! 재물운부터 인기운·귀인운까지 10가지 운세 1등은 누굴까?\n너도 참여해서 순위 확인해봐 👉`}
            accentColor={test.accentColor}
            path={`/s/${test.id}/g/${group.id}`}
          />
          <a
            href={`/s/${test.id}/g/${group.id}`}
            className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
          >
            그룹 전체 순위 보기
          </a>
        </>
      ) : (
        <>
          <a
            href={`/s/${test.id}?create=1`}
            className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg"
            style={{ backgroundColor: test.accentColor }}
          >
            친구들이랑 그룹 만들기
          </a>
          <ShareBar
            title={`🏆 ${test.title}`}
            text={`사주로 재물운·연애운·인기운 등 10가지 운세 점수를 매겨봤어! 너는 몇 점일까? 👉`}
            accentColor={test.accentColor}
            path={`/s/${test.id}`}
          />
        </>
      )}

      <p className="text-xs leading-relaxed text-zinc-400">
        {!group &&
          "전체 상위 %는 1930년부터 지금까지 태어날 수 있는 모든 날짜·시간·성별(약 85만 가지) 중 내 점수 이상이 차지하는 비율이에요. "}
        운세 점수는 사주 원국을 정해진 규칙으로 계산한 재미용 지표예요. 실제 운명이나 미래를 단정하지 않아요.
      </p>

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <div className="flex items-center gap-4">
        <a href={`/s/${test.id}`} className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다시 하기
        </a>
        <span className="text-zinc-300">·</span>
        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="fortune-result-bottom" />
      </div>
    </div>
  );
}

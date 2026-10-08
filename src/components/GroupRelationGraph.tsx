"use client";

import { useState } from "react";
import type { MbtiTestConfig } from "@/data/mbti-types";
import type { GroupMember } from "@/lib/groups";
import { getGroupRelation } from "@/data/mbti/compat";
import { pickRelationEdges, labelSpot, CROWDED_MEMBERS } from "@/lib/relation-edges";

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 140;

/** 관계 4단계 — 순서(점수)는 "잘 통하는" 정도. 사람마다 가장 잘 통하는 선을 고를 때 쓴다. */
const RELATIONS = [
  { label: "베스트프렌드 케미", short: "베프", color: "#34d399", score: 4 },
  { label: "판박이 케미", short: "판박이", color: "#60a5fa", score: 3 },
  { label: "그냥저냥 케미", short: "그냥저냥", color: "#fbbf24", score: 2 },
  { label: "티격태격 케미", short: "티격태격", color: "#fb923c", score: 1 },
] as const;
type Relation = (typeof RELATIONS)[number];

type Pair = { a: GroupMember; b: GroupMember; score: number; relation: Relation };

function relationOf(a: GroupMember, b: GroupMember): Relation {
  const { label } = getGroupRelation(a.code, b.code);
  return RELATIONS.find((relation) => relation.label === label) ?? RELATIONS[RELATIONS.length - 1];
}

function nodePosition(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

/** 전체 보기에서 덜 통하는 선일수록 가늘고 흐리게 그린다 */
function lineStyle(score: number, mode: "base" | "all" | "focus", total: number) {
  if (mode === "focus") return { width: 2.5, opacity: 0.9 };
  if (mode === "all") return { width: [0, 1, 1.3, 2, 2.6][score], opacity: [0, 0.35, 0.45, 0.75, 0.9][score] };
  return { width: total > CROWDED_MEMBERS ? 2.4 : 1.8, opacity: 0.75 };
}

export function GroupRelationGraph({
  test,
  members,
  highlightId,
}: {
  test: MbtiTestConfig;
  members: GroupMember[];
  highlightId?: string;
}) {
  // 누른 사람 — 그 사람과 나머지 모두의 관계를 이름표와 함께 보여준다
  const [focusId, setFocusId] = useState<string | null>(null);
  // 모든 선 보기 — 인원이 많을 때만 의미가 있다 (적으면 원래 모든 선을 그린다)
  const [showAll, setShowAll] = useState(false);

  if (members.length === 0) return null;

  const crowded = members.length > CROWDED_MEMBERS;
  const nodeRadius = members.length > 16 ? 15 : members.length > 10 ? 19 : 24;
  const positions = members.map((_, i) => nodePosition(i, members.length));
  const index = new Map(members.map((member, i) => [member.id, i]));

  const pairs: Pair[] = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const relation = relationOf(members[i], members[j]);
      pairs.push({ a: members[i], b: members[j], score: relation.score, relation });
    }
  }

  const focus = focusId ? members.find((member) => member.id === focusId) : undefined;
  const mode = focus ? "focus" : crowded && showAll ? "all" : "base";
  const edges = focus
    ? pairs.filter((pair) => pair.a.id === focus.id || pair.b.id === focus.id).sort((x, y) => x.score - y.score)
    : mode === "all"
      ? [...pairs].sort((x, y) => x.score - y.score)
      : pickRelationEdges(
          members.map((member) => member.id),
          pairs,
          { strong: 4, mine: 3, highlightId }
        );
  // 인원이 아주 적으면 선 가운데에 관계 이름을 바로 적는다. 4명부터는 대각선 두 개의 가운데가 겹쳐서 범례로 대신한다.
  const midLabels = mode === "base" && members.length <= 3;

  const toggleFocus = (id: string) => setFocusId((current) => (current === id ? null : id));
  const buttonClass =
    "rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300";

  return (
    <div className="flex w-full flex-col gap-2 text-left">
      {(crowded || focus) && (
        <div className="flex justify-end">
          {focus ? (
            <button type="button" onClick={() => setFocusId(null)} className={buttonClass}>
              전체 관계도로
            </button>
          ) : (
            <button type="button" onClick={() => setShowAll((current) => !current)} className={buttonClass}>
              {showAll ? "잘 통하는 선만 보기" : `모든 선 보기 (${pairs.length}개)`}
            </button>
          )}
        </div>
      )}

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full select-none"
        role="img"
        aria-label={focus ? `${focus.nickname}님과 다른 사람들의 관계도` : "그룹 관계도"}
        onClick={(event) => {
          // 빈 곳을 누르면 원래 관계도로 돌아간다
          if (event.target === event.currentTarget) setFocusId(null);
        }}
      >
        {edges.map((pair) => {
          const p1 = positions[index.get(pair.a.id)!];
          const p2 = positions[index.get(pair.b.id)!];
          const style = lineStyle(pair.score, mode, members.length);
          return (
            <line
              key={`${pair.a.id}-${pair.b.id}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={pair.relation.color}
              strokeWidth={style.width}
              strokeOpacity={style.opacity}
              strokeLinecap="round"
              pointerEvents="none"
            />
          );
        })}
        {midLabels &&
          edges.map((pair) => {
            const p1 = positions[index.get(pair.a.id)!];
            const p2 = positions[index.get(pair.b.id)!];
            const width = pair.relation.label.length * 12 + 14;
            return (
              <g key={`mid-${pair.a.id}-${pair.b.id}`} pointerEvents="none">
                <rect x={(p1.x + p2.x) / 2 - width / 2} y={(p1.y + p2.y) / 2 - 10} width={width} height={20} rx={10} fill={pair.relation.color} />
                <text x={(p1.x + p2.x) / 2} y={(p1.y + p2.y) / 2 + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="#ffffff">
                  {pair.relation.label}
                </text>
              </g>
            );
          })}
        {focus &&
          edges.map((pair) => {
            // 관계 이름은 상대 동그라미 바로 앞에 둔다. 바로 옆자리라 누른 사람과 겹치면 아래 목록으로만 보여준다
            const other = pair.a.id === focus.id ? pair.b : pair.a;
            const width = pair.relation.short.length * 11 + 12;
            const spot = labelSpot(positions[index.get(focus.id)!], positions[index.get(other.id)!], nodeRadius, width / 2);
            if (!spot) return null;
            return (
              <g key={`label-${other.id}`} pointerEvents="none">
                <rect x={spot.x - width / 2} y={spot.y - 9} width={width} height={18} rx={9} fill={pair.relation.color} />
                <text x={spot.x} y={spot.y + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="#ffffff">
                  {pair.relation.short}
                </text>
              </g>
            );
          })}
        {members.map((member, i) => {
          const pos = positions[i];
          const profile = test.profiles.find((p) => p.code === member.code);
          const isMe = member.id === highlightId;
          const focused = member.id === focusId;
          const label = member.nickname.length > 6 ? `${member.nickname.slice(0, 6)}…` : member.nickname;
          return (
            <g
              key={member.id}
              role="button"
              tabIndex={0}
              aria-pressed={focused}
              aria-label={`${member.nickname}님의 관계 ${focused ? "숨기기" : "모두 보기"}`}
              className="cursor-pointer outline-none"
              onClick={() => toggleFocus(member.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleFocus(member.id);
                }
              }}
            >
              {/* 손가락으로 누르기 쉽게 보이지 않는 넓은 영역을 깐다 */}
              <circle cx={pos.x} cy={pos.y} r={nodeRadius + 8} fill="transparent" />
              {(isMe || focused) && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius + 5}
                  fill="none"
                  stroke={focused ? "#18181b" : test.accentColor}
                  strokeWidth={2.5}
                />
              )}
              <circle cx={pos.x} cy={pos.y} r={nodeRadius} fill={profile?.color ?? "#e4e4e7"} stroke="#ffffff" strokeWidth={3} />
              <text x={pos.x} y={pos.y + nodeRadius * 0.32} textAnchor="middle" fontSize={nodeRadius * 0.9}>
                {profile?.emoji ?? "❓"}
              </text>
              <text
                x={pos.x}
                y={pos.y > CENTER + 1 ? pos.y + nodeRadius + 15 : pos.y - nodeRadius - 7}
                textAnchor="middle"
                fontSize={12}
                fontWeight={focused ? 800 : 700}
                fill={focused ? "#18181b" : "#3f3f46"}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {focus && (
        <div className="flex flex-col gap-1.5" aria-label={`${focus.nickname}님과의 관계`}>
          {RELATIONS.map((relation) => {
            const names = edges
              .filter((pair) => pair.relation === relation)
              .map((pair) => (pair.a.id === focus.id ? pair.b : pair.a).nickname);
            if (names.length === 0) return null;
            return (
              <p key={relation.label} className="text-sm text-zinc-700 dark:text-zinc-300">
                <span className="font-bold" style={{ color: relation.color }}>
                  {relation.label}
                </span>{" "}
                {names.join(", ")}
              </p>
            );
          })}
        </div>
      )}

      {!midLabels && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
          {RELATIONS.map((relation) => (
            <span key={relation.label} className="flex items-center gap-1">
              <span className="inline-block h-1 w-4 rounded" style={{ backgroundColor: relation.color }} />
              {relation.label}
            </span>
          ))}
        </div>
      )}
      <p className="text-xs leading-relaxed text-zinc-400">
        {focus
          ? `${focus.nickname}님과 나머지 ${members.length - 1}명의 관계를 모두 보여주고 있어요.`
          : mode === "all"
            ? "모든 선을 그렸어요. 잘 통하는 사이일수록 선이 굵고 진해요."
            : crowded
              ? "인원이 많아서 사람마다 가장 잘 통하는 상대와의 선과, 베스트프렌드 케미 일부만 그렸어요."
              : ""}{" "}
        {!focus && "동그라미를 누르면 그 사람과 모두의 관계를 볼 수 있어요."}
      </p>
    </div>
  );
}

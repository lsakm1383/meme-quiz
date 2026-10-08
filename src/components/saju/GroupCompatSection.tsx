"use client";

import { useState } from "react";
import type { GroupMember } from "@/lib/groups";
import { pickRelationEdges, labelSpot, CROWDED_MEMBERS } from "@/lib/relation-edges";
import { STEMS, ELEMENT_ORDER } from "@/lib/saju/constants";
import {
  groupCompat,
  compatTier,
  COMPAT_TIERS,
  type CompatMember,
  type CompatPair,
} from "@/lib/saju/compat";

// 그룹 궁합: 가장 잘 맞는 짝 TOP 3 · 의외의 찰떡 조합 · (내가 있으면) 나와 가장 잘 맞는 사람 · 관계도.

const ELEMENT_NAME = ["목", "화", "토", "금", "수"];
/** 받침 있는 오행(목·금)은 이/을, 없는 오행(화·토·수)은 가/를 */
const HAS_FINAL = [true, false, false, true, false];

function PairCard({ pair, badge, note }: { pair: CompatPair; badge: string; note?: string }) {
  const tier = compatTier(pair.score);
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200 p-4 text-left dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold" style={{ color: tier.color }}>
          {badge}
        </span>
        <span className="text-xl font-extrabold" style={{ color: tier.color }}>
          {pair.score}점
        </span>
      </div>
      <p className="text-base font-bold">
        {pair.a.nickname} <span style={{ color: tier.color }}>♥</span> {pair.b.nickname}
        <span className="ml-2 text-xs font-semibold text-zinc-500">{tier.title}</span>
      </p>
      {note && <p className="text-xs leading-relaxed text-zinc-500">{note}</p>}
      {pair.reasons.length > 0 && (
        <ul className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
          {pair.reasons.slice(0, 3).map((reason) => (
            <li key={reason}>• {reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const SIZE = 360;
const CENTER = SIZE / 2;

/** 관계도에 그릴 선 — 인원이 많으면 잘 맞는 선(72점 이상)과 내 선(58점 이상) 위주로 고른다 */
export function relationEdges(members: CompatMember[], pairs: CompatPair[], highlightId?: string): CompatPair[] {
  return pickRelationEdges(members.map((member) => member.id), pairs, { strong: 72, mine: 58, highlightId });
}

/** 전체 보기에서 약한 선일수록 가늘고 흐리게 그려 강한 선이 묻히지 않게 한다 */
function lineStyle(score: number, mode: "base" | "all" | "focus") {
  if (mode === "all") {
    if (score >= 85) return { width: 4, opacity: 0.95 };
    if (score >= 72) return { width: 2.6, opacity: 0.85 };
    if (score >= 58) return { width: 1.6, opacity: 0.55 };
    if (score >= 44) return { width: 1.1, opacity: 0.4 };
    return { width: 0.9, opacity: 0.3 };
  }
  return { width: score >= 85 ? 5 : score >= 72 ? 3.5 : 2, opacity: 0.9 };
}

function RelationMap({
  members,
  pairs,
  highlightId,
}: {
  members: CompatMember[];
  pairs: CompatPair[];
  highlightId?: string;
}) {
  // 누른 사람 — 그 사람과 나머지 모두를 잇는 선을 점수와 함께 보여준다
  const [focusId, setFocusId] = useState<string | null>(null);
  // 모든 선 보기 — 인원이 많을 때만 의미가 있다 (6명 이하는 원래 모든 선을 그린다)
  const [showAll, setShowAll] = useState(false);
  const crowded = members.length > CROWDED_MEMBERS;

  const radius = members.length <= 2 ? 90 : 130;
  const position = (index: number) => {
    const angle = (-90 + (360 / members.length) * index) * (Math.PI / 180);
    return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
  };
  const index = new Map(members.map((member, i) => [member.id, i]));
  const focus = focusId ? members.find((member) => member.id === focusId) : undefined;
  const mode = focus ? "focus" : crowded && showAll ? "all" : "base";
  const edges = focus
    ? pairs.filter((pair) => pair.a.id === focus.id || pair.b.id === focus.id).sort((x, y) => x.score - y.score)
    : mode === "all"
      ? [...pairs].sort((x, y) => x.score - y.score)
      : relationEdges(members, pairs, highlightId);
  const nodeRadius = members.length > 12 ? 15 : 20;

  const toggleFocus = (id: string) => setFocusId((current) => (current === id ? null : id));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-zinc-500">관계도</h3>
        {crowded && !focus && (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            {showAll ? "잘 맞는 선만 보기" : `모든 선 보기 (${pairs.length}개)`}
          </button>
        )}
        {focus && (
          <button
            type="button"
            onClick={() => setFocusId(null)}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            전체 관계도로
          </button>
        )}
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full select-none"
        role="img"
        aria-label={focus ? `${focus.nickname}님과 다른 사람들의 궁합 관계도` : "그룹 궁합 관계도"}
        onClick={(event) => {
          // 빈 곳을 누르면 원래 관계도로 돌아간다
          if (event.target === event.currentTarget) setFocusId(null);
        }}
      >
        {edges.map((pair) => {
          const p1 = position(index.get(pair.a.id)!);
          const p2 = position(index.get(pair.b.id)!);
          const tier = compatTier(pair.score);
          const mine = highlightId !== undefined && (pair.a.id === highlightId || pair.b.id === highlightId);
          const style = lineStyle(pair.score, mode);
          const dim = mode === "base" && highlightId && !mine;
          return (
            <line
              key={`${pair.a.id}-${pair.b.id}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={tier.color}
              strokeWidth={style.width}
              strokeOpacity={dim ? 0.35 : style.opacity}
              strokeLinecap="round"
              pointerEvents="none"
            />
          );
        })}
        {focus &&
          edges.map((pair) => {
            // 점수 표시는 누른 사람 쪽이 아니라 상대 동그라미 바로 앞에 둬서 서로 겹치지 않게 한다
            const other = pair.a.id === focus.id ? pair.b : pair.a;
            const from = position(index.get(focus.id)!);
            const to = position(index.get(other.id)!);
            // 바로 옆자리라 점수가 누른 사람 동그라미와 겹치면 그림에서는 빼고 아래 목록으로만 보여준다
            const spot = labelSpot(from, to, nodeRadius, 13);
            if (!spot) return null;
            const { x, y } = spot;
            const tier = compatTier(pair.score);
            return (
              <g key={`score-${other.id}`} pointerEvents="none">
                <rect x={x - 13} y={y - 9} width={26} height={18} rx={9} fill="#ffffff" stroke={tier.color} strokeWidth={1.5} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={tier.color}>
                  {pair.score}
                </text>
              </g>
            );
          })}
        {members.map((member, i) => {
          const { x, y } = position(i);
          const mine = member.id === highlightId;
          const focused = member.id === focusId;
          const label = member.nickname.length > 5 ? `${member.nickname.slice(0, 5)}…` : member.nickname;
          return (
            <g
              key={member.id}
              role="button"
              tabIndex={0}
              aria-pressed={focused}
              aria-label={`${member.nickname}님의 궁합 선 ${focused ? "숨기기" : "모두 보기"}`}
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
              <circle cx={x} cy={y} r={nodeRadius + 10} fill="transparent" />
              <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill={mine ? "#b45309" : "#ffffff"}
                stroke={focused ? "#18181b" : mine ? "#b45309" : "#a1a1aa"}
                strokeWidth={focused ? 3.5 : 2}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize={members.length > 12 ? 10 : 12}
                fontWeight={700}
                fill={mine ? "#ffffff" : "#3f3f46"}
              >
                {STEMS[member.compat.ds].hangul}
              </text>
              <text
                x={x}
                y={y + (y > CENTER ? 34 : -26)}
                textAnchor="middle"
                fontSize={12}
                fontWeight={focused ? 800 : 600}
                fill={focused ? "#18181b" : "#52525b"}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {focus && (
        <ol className="flex flex-wrap gap-1.5" aria-label={`${focus.nickname}님과 잘 맞는 순서`}>
          {[...edges]
            .sort((x, y) => y.score - x.score)
            .map((pair) => {
              const other = pair.a.id === focus.id ? pair.b : pair.a;
              const tier = compatTier(pair.score);
              return (
                <li
                  key={other.id}
                  className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold"
                  style={{ borderColor: tier.color }}
                >
                  <span className="text-zinc-700 dark:text-zinc-200">{other.nickname}</span>
                  <span style={{ color: tier.color }}>{pair.score}</span>
                </li>
              );
            })}
        </ol>
      )}

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
        {COMPAT_TIERS.map((tier) => (
          <span key={tier.title} className="flex items-center gap-1">
            <span className="inline-block h-1 w-4 rounded" style={{ backgroundColor: tier.color }} />
            {tier.title} ({tier.min}점~)
          </span>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-zinc-400">
        {focus
          ? `${focus.nickname}님과 나머지 ${members.length - 1}명의 궁합을 모두 보여주고 있어요. 숫자는 궁합 점수이고, 위 목록은 잘 맞는 순서예요.`
          : mode === "all"
            ? "모든 선을 그렸어요. 잘 맞는 사이일수록 선이 굵고 진해요."
            : crowded
              ? "인원이 많아서 사람마다 가장 잘 맞는 상대와의 선과, 특히 잘 맞는 선 일부만 그렸어요."
              : "선 색이 진할수록 잘 맞는 사이예요."}{" "}
        {!focus && "동그라미를 누르면 그 사람과 모두의 궁합을 점수와 함께 볼 수 있어요. 동그라미 안 글자는 각자의 일간이에요."}
      </p>
    </div>
  );
}

export function GroupCompatSection({
  members,
  highlightId,
}: {
  members: GroupMember[];
  highlightId?: string;
}) {
  // 궁합이 추가되기 전에 참여한 사람은 궁합 정보가 없어서 빠진다.
  const ready: CompatMember[] = members
    .filter((member) => member.compat)
    .map((member) => ({ id: member.id, nickname: member.nickname, compat: member.compat! }));

  if (ready.length < 2) {
    return (
      <section className="flex w-full flex-col gap-2 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="text-lg font-bold">💞 그룹 궁합</h2>
        <p className="text-sm text-zinc-500">
          두 명 이상 참여하면 서로의 궁합과 관계도를 볼 수 있어요. 링크를 공유해서 친구를 불러보세요!
        </p>
      </section>
    );
  }

  const { pairs, top, surprise } = groupCompat(ready);
  const myBest = highlightId
    ? [...pairs]
        .filter((pair) => pair.a.id === highlightId || pair.b.id === highlightId)
        .sort((x, y) => y.score - x.score)[0]
    : undefined;

  const surpriseNote = surprise
    ? (() => {
        const ea = ELEMENT_ORDER.indexOf(STEMS[surprise.a.compat.ds].element);
        const eb = ELEMENT_ORDER.indexOf(STEMS[surprise.b.compat.ds].element);
        const [from, to] = (ea + 2) % 5 === eb ? [ea, eb] : [eb, ea];
        return `일간 오행만 보면 ${ELEMENT_NAME[from]}극${ELEMENT_NAME[to]}(${ELEMENT_NAME[from]}${HAS_FINAL[from] ? "이" : "가"} ${ELEMENT_NAME[to]}${HAS_FINAL[to] ? "을" : "를"} 누르는) 관계라 안 맞아 보이지만, 다른 자리에서 서로 잘 맞물려요.`;
      })()
    : undefined;

  return (
    <section
      id="group-compat"
      className="flex w-full scroll-mt-4 flex-col gap-4 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">💞 그룹 궁합</h2>
        <span className="text-xs text-zinc-400">{ready.length}명 · {pairs.length}쌍</span>
      </div>

      {myBest && (
        <PairCard pair={myBest} badge="나와 가장 잘 맞는 사람" />
      )}

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-zinc-500">가장 잘 맞는 짝 TOP {top.length}</h3>
        {top.map((pair, i) => (
          <PairCard key={`${pair.a.id}-${pair.b.id}`} pair={pair} badge={`${i + 1}위`} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-zinc-500">의외의 찰떡 조합</h3>
        {surprise ? (
          <PairCard
            pair={surprise}
            badge={top.includes(surprise) ? "반전 케미 · TOP 3" : "반전 케미"}
            note={surpriseNote}
          />
        ) : (
          <p className="text-sm text-zinc-500">
            아직 &lsquo;안 맞아 보이는데 잘 맞는&rsquo; 조합은 없어요. 인원이 늘면 나타날 수 있어요.
          </p>
        )}
      </div>

      <RelationMap members={ready} pairs={pairs} highlightId={highlightId} />

      <p className="text-xs leading-relaxed text-zinc-400">
        궁합은 일간의 천간합·상생, 일지와 띠의 육합·삼합·충, 서로 부족한 오행을 채워주는지로 점수를 매겨요.
        재미로 보는 지표예요.
      </p>
    </section>
  );
}

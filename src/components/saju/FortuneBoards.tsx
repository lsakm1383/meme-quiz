import type { GroupMember } from "@/lib/groups";
import { FORTUNE_KEYS, type FortuneKey, type FortuneScores } from "@/lib/saju/fortune";
import { rankMembers } from "@/lib/saju/ranking";
import { topPercent } from "@/lib/saju/percentile";
import { getFortune, fortuneTier } from "@/data/saju";

// 운세 카드(내 점수·별칭·풀이)와 그룹 순위표. 개인 결과·그룹 결과·그룹 페이지가 함께 쓴다.

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
      <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
    </div>
  );
}

export function RankingList({
  members,
  fortuneKey,
  highlightId,
}: {
  members: GroupMember[];
  fortuneKey: FortuneKey;
  highlightId?: string;
}) {
  const fortune = getFortune(fortuneKey);
  const ranked = rankMembers(members, fortuneKey);
  if (ranked.length === 0) {
    return <p className="text-sm text-zinc-400">아직 참여한 사람이 없어요.</p>;
  }
  return (
    <ol className="flex flex-col gap-2">
      {ranked.map(({ member, score, rank }) => {
        const mine = member.id === highlightId;
        return (
          <li
            key={member.id}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 ${mine ? "ring-2" : "bg-zinc-50 dark:bg-zinc-900"}`}
            style={mine ? { backgroundColor: `${fortune.color}1f`, ["--tw-ring-color" as string]: fortune.color } : undefined}
          >
            <span
              className="w-8 shrink-0 text-center text-sm font-extrabold"
              style={{ color: rank <= 3 ? fortune.color : "#a1a1aa" }}
            >
              {rank}위
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-bold">
                {member.nickname}
                {mine ? " (나)" : ""}
              </span>
              <span className="truncate text-xs text-zinc-500">{fortuneTier(fortuneKey, score).title}</span>
            </span>
            <span className="shrink-0 text-base font-extrabold" style={{ color: fortune.color }}>
              {score}점
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** 운세 하나에 대한 카드 — 내 점수가 있으면 점수·별칭·풀이, 그룹이면 순위표까지 */
export function FortuneCard({
  fortuneKey,
  scores,
  members,
  highlightId,
}: {
  fortuneKey: FortuneKey;
  scores?: FortuneScores;
  members?: GroupMember[];
  highlightId?: string;
}) {
  const fortune = getFortune(fortuneKey);
  const score = scores?.[fortuneKey];
  const tier = score !== undefined ? fortuneTier(fortuneKey, score) : null;
  const myRank =
    members && highlightId
      ? rankMembers(members, fortuneKey).find((entry) => entry.member.id === highlightId)
      : undefined;

  return (
    <section className="flex w-full flex-col gap-3 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">
          {fortune.emoji} {fortune.name}
        </h2>
        {myRank && members && (
          <span className="text-sm font-bold" style={{ color: fortune.color }}>
            {members.length}명 중 {myRank.rank}위
          </span>
        )}
        {/* 그룹이 아니면 전체(가능한 모든 원국) 기준 백분위를 보여준다 */}
        {!members && score !== undefined && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: fortune.color }}
          >
            전체 상위 {topPercent(fortuneKey, score)}%
          </span>
        )}
      </div>

      {score !== undefined && tier && (
        <>
          <div className="flex items-end justify-between gap-3">
            <p className="text-base font-extrabold">{tier.title}</p>
            <p className="text-2xl font-extrabold" style={{ color: fortune.color }}>
              {score}점
            </p>
          </div>
          <ScoreBar score={score} color={fortune.color} />
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tier.text}</p>
        </>
      )}

      {members && (
        <div className="flex flex-col gap-2 pt-1">
          <p className="text-xs font-bold text-zinc-400">그룹 순위</p>
          <RankingList members={members} fortuneKey={fortuneKey} highlightId={highlightId} />
        </div>
      )}

      <p className="text-xs leading-relaxed text-zinc-400">{fortune.basis}</p>
    </section>
  );
}

export function FortuneCards(props: {
  scores?: FortuneScores;
  members?: GroupMember[];
  highlightId?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      {FORTUNE_KEYS.map((key) => (
        <FortuneCard key={key} fortuneKey={key} {...props} />
      ))}
    </div>
  );
}

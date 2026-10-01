import type { GroupMember } from "@/lib/groups";
import type { FortuneKey } from "@/lib/saju/fortune";

export type RankedMember = { member: GroupMember; score: number; rank: number };

/** 운세 점수 높은 순으로 순위를 매긴다. 동점이면 같은 순위(1, 1, 3 …), 표시는 먼저 들어온 순. */
export function rankMembers(members: GroupMember[], key: FortuneKey): RankedMember[] {
  const scored = members
    .filter((member) => typeof member.scores?.[key] === "number")
    .map((member) => ({ member, score: member.scores![key] }))
    .sort((a, b) => b.score - a.score || a.member.joinedAt - b.member.joinedAt);
  return scored.map((entry) => ({
    ...entry,
    rank: scored.findIndex((other) => other.score === entry.score) + 1,
  }));
}

// 그룹 관계도에서 인원이 많을 때 어떤 선을 그릴지 고르는 공용 규칙 (사주 궁합·성격 유형 그룹이 함께 쓴다).

export type RelationPair = { a: { id: string }; b: { id: string }; score: number };

/** 인원이 이보다 많으면 선을 골라서 그린다 */
export const CROWDED_MEMBERS = 6;

/**
 * 인원이 적으면 모든 선을 그린다. 많으면
 *  1) 사람마다 가장 잘 맞는 상대와의 선을 하나씩 꼭 그려서 선 없이 혼자 떨어진 사람이 없게 하고,
 *  2) 내 선(mine 점수 이상)을 더한 뒤,
 *  3) 특히 잘 맞는 선(strong 점수 이상)을 점수 높은 순으로 인원의 1.5배까지만 더해 선이 엉키지 않게 한다.
 * 약한 선을 먼저 그려야 진한 선이 위에 올라오므로 점수 낮은 순으로 돌려준다.
 */
export function pickRelationEdges<P extends RelationPair>(
  memberIds: string[],
  pairs: P[],
  { strong, mine, highlightId }: { strong: number; mine: number; highlightId?: string }
): P[] {
  if (memberIds.length <= CROWDED_MEMBERS) return pairs;
  const touches = (pair: P, id: string) => pair.a.id === id || pair.b.id === id;
  const chosen = new Set<P>();
  for (const id of memberIds) {
    let best: P | undefined;
    for (const pair of pairs) {
      if (touches(pair, id) && (!best || pair.score > best.score)) best = pair;
    }
    if (best) chosen.add(best);
  }
  if (highlightId !== undefined) {
    for (const pair of pairs) if (touches(pair, highlightId) && pair.score >= mine) chosen.add(pair);
  }
  const limit = Math.max(chosen.size, Math.round(memberIds.length * 1.5));
  for (const pair of [...pairs].sort((x, y) => y.score - x.score)) {
    if (chosen.size >= limit || pair.score < strong) break;
    chosen.add(pair);
  }
  return pairs.filter((pair) => chosen.has(pair)).sort((x, y) => x.score - y.score);
}

/** 누른 사람과 다른 사람 사이 선 위 표시를 상대 동그라미 바로 앞에 둘 자리. 누른 사람 동그라미와 겹치면 null */
export function labelSpot(
  from: { x: number; y: number },
  to: { x: number; y: number },
  nodeRadius: number,
  halfWidth: number
): { x: number; y: number } | null {
  const length = Math.hypot(from.x - to.x, from.y - to.y);
  const gap = nodeRadius + halfWidth + 3;
  if (length < gap + nodeRadius + halfWidth + 1) return null;
  return { x: to.x + ((from.x - to.x) / length) * gap, y: to.y + ((from.y - to.y) / length) * gap };
}

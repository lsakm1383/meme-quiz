import type { GroupMember } from "@/lib/groups";
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

function RelationMap({
  members,
  pairs,
  highlightId,
}: {
  members: CompatMember[];
  pairs: CompatPair[];
  highlightId?: string;
}) {
  const radius = members.length <= 2 ? 90 : 130;
  const position = (index: number) => {
    const angle = (-90 + (360 / members.length) * index) * (Math.PI / 180);
    return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
  };
  const index = new Map(members.map((member, i) => [member.id, i]));
  // 인원이 적으면 모든 선을, 많으면 잘 맞는 선(72점 이상)과 내 선만 그린다.
  const showAll = members.length <= 6;
  const edges = pairs.filter(
    (pair) =>
      showAll ||
      pair.score >= 72 ||
      (highlightId !== undefined && (pair.a.id === highlightId || pair.b.id === highlightId) && pair.score >= 58)
  );

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" role="img" aria-label="그룹 궁합 관계도">
      {edges.map((pair) => {
        const p1 = position(index.get(pair.a.id)!);
        const p2 = position(index.get(pair.b.id)!);
        const tier = compatTier(pair.score);
        const mine = highlightId !== undefined && (pair.a.id === highlightId || pair.b.id === highlightId);
        return (
          <line
            key={`${pair.a.id}-${pair.b.id}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={tier.color}
            strokeWidth={pair.score >= 85 ? 5 : pair.score >= 72 ? 3.5 : 2}
            strokeOpacity={highlightId && !mine ? 0.35 : 0.9}
            strokeLinecap="round"
          />
        );
      })}
      {members.map((member, i) => {
        const { x, y } = position(i);
        const mine = member.id === highlightId;
        const label = member.nickname.length > 5 ? `${member.nickname.slice(0, 5)}…` : member.nickname;
        return (
          <g key={member.id}>
            <circle
              cx={x}
              cy={y}
              r={members.length > 12 ? 15 : 20}
              fill={mine ? "#b45309" : "#ffffff"}
              stroke={mine ? "#b45309" : "#a1a1aa"}
              strokeWidth={2}
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
              fontWeight={600}
              fill="#52525b"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
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

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold text-zinc-500">관계도</h3>
        <RelationMap members={ready} pairs={pairs} highlightId={highlightId} />
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
          {COMPAT_TIERS.map((tier) => (
            <span key={tier.title} className="flex items-center gap-1">
              <span className="inline-block h-1 w-4 rounded" style={{ backgroundColor: tier.color }} />
              {tier.title} ({tier.min}점~)
            </span>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-zinc-400">
          동그라미 안 글자는 각자의 일간이에요.{" "}
          {ready.length > 6
            ? "인원이 많아서 72점 이상인 잘 맞는 선만 그렸어요."
            : "선 색이 진할수록 잘 맞는 사이예요."}
        </p>
      </div>

      <p className="text-xs leading-relaxed text-zinc-400">
        궁합은 일간의 천간합·상생, 일지와 띠의 육합·삼합·충, 서로 부족한 오행을 채워주는지로 점수를 매겨요.
        재미로 보는 지표예요.
      </p>
    </section>
  );
}

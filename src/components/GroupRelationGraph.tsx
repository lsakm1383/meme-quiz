import type { MbtiTestConfig } from "@/data/mbti-types";
import type { GroupMember } from "@/lib/groups";
import { getGroupRelation } from "@/data/mbti/compat";

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 130;
const NODE_R = 26;

function nodePosition(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
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
  if (members.length === 0) return null;

  const positions = members.map((_, i) => nodePosition(i, members.length));

  const edges: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    label: string;
    color: string;
  }[] = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const relation = getGroupRelation(members[i].code, members[j].code);
      edges.push({
        x1: positions[i].x,
        y1: positions[i].y,
        x2: positions[j].x,
        y2: positions[j].y,
        label: relation.label,
        color: relation.color,
      });
    }
  }

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
      {edges.map((edge, i) => {
        const mx = (edge.x1 + edge.x2) / 2;
        const my = (edge.y1 + edge.y2) / 2;
        const labelWidth = edge.label.length * 12 + 14;
        return (
          <g key={i}>
            <line
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke={edge.color}
              strokeWidth={members.length > 6 ? 1 : 1.5}
              opacity={0.45}
            />
            <rect
              x={mx - labelWidth / 2}
              y={my - 10}
              width={labelWidth}
              height={20}
              rx={10}
              fill={edge.color}
            />
            <text
              x={mx}
              y={my + 4}
              textAnchor="middle"
              fontSize={10}
              fontWeight={700}
              fill="#ffffff"
            >
              {edge.label}
            </text>
          </g>
        );
      })}
      {members.map((member, i) => {
        const pos = positions[i];
        const profile = test.profiles.find((p) => p.code === member.code);
        const isMe = member.id === highlightId;
        return (
          <g key={member.id}>
            {isMe && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_R + 5}
                fill="none"
                stroke={test.accentColor}
                strokeWidth={2.5}
              />
            )}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={NODE_R}
              fill={profile?.color ?? "#e4e4e7"}
              stroke="#ffffff"
              strokeWidth={3}
            />
            <text x={pos.x} y={pos.y + 8} textAnchor="middle" fontSize={22}>
              {profile?.emoji ?? "❓"}
            </text>
            <text
              x={pos.x}
              y={pos.y + NODE_R + 16}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="#3f3f46"
            >
              {member.nickname}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

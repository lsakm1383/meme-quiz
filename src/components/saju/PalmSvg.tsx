import { DEFAULT_DRAWING, type PalmDrawing, type PalmLine } from "@/lib/saju/palm";

// 오른손 손바닥을 마주 본 모습 (엄지가 왼쪽). 선 모양은 보기마다 바뀌고, 고르는 중인 선만 진하게 칠한다.

const HEART: Record<PalmDrawing["heart"], string[]> = {
  long: ["M178 96 C140 92 92 90 58 72"],
  between: ["M178 96 C150 93 108 90 81 60"],
  short: ["M178 96 C160 94 132 92 108 90"],
  straight: ["M178 96 C140 97 100 97 60 98"],
  simian: ["M56 106 C100 104 140 101 180 98"],
};

const headPaths = (shape: PalmDrawing["head"], start: PalmDrawing["headStart"]) => {
  const from = start === "joined" ? "M62 112" : "M74 104";
  switch (shape) {
    case "straight":
      return [`${from} C100 114 140 118 176 121`];
    case "curve":
      return [`${from} C96 114 130 130 158 168`];
    case "fork":
      return [`${from} C98 114 128 120 148 128`, "M148 128 L176 121", "M148 128 L170 152"];
    case "short":
      return [`${from} C82 113 102 115 122 119`];
  }
};

const LIFE: Record<PalmDrawing["life"], string[]> = {
  wide: ["M62 110 C112 140 112 200 82 248"],
  narrow: ["M62 110 C78 140 76 192 62 244"],
  broken: ["M62 110 C96 134 100 160 95 178", "M90 186 C92 206 86 228 78 248"],
  double: ["M62 110 C104 140 104 200 78 248", "M70 128 C94 150 94 196 74 240"],
};

const FATE: Record<PalmDrawing["fate"], { d: string; dashed?: boolean }[]> = {
  clear: [{ d: "M120 250 C119 190 118 130 117 74" }],
  late: [{ d: "M119 168 C118 136 118 106 117 74" }],
  faint: [
    { d: "M120 250 C119 210 120 170 119 128", dashed: true },
    { d: "M127 196 C125 160 123 130 121 96", dashed: true },
  ],
  none: [],
};

const MARRIAGE: Record<PalmDrawing["marriage"], { d: string; dashed?: boolean }[]> = {
  one: [{ d: "M164 83 L181 82" }],
  two: [{ d: "M164 80 L181 79" }, { d: "M166 87 L181 86" }],
  faint: [{ d: "M166 84 L180 83", dashed: true }],
};

export function PalmSvg({
  drawing = {},
  focus,
  color,
  size = 150,
}: {
  drawing?: Partial<PalmDrawing>;
  focus?: PalmLine;
  color: string;
  size?: number;
}) {
  const d = { ...DEFAULT_DRAWING, ...drawing };
  const lines: { key: PalmLine; d: string; dashed?: boolean }[] = [
    ...HEART[d.heart].map((path) => ({ key: "heart" as const, d: path })),
    ...(d.heart === "simian" ? [] : headPaths(d.head, d.headStart).map((path) => ({ key: "head" as const, d: path }))),
    ...LIFE[d.life].map((path) => ({ key: "life" as const, d: path })),
    ...FATE[d.fate].map((line) => ({ key: "fate" as const, ...line })),
    ...MARRIAGE[d.marriage].map((line) => ({ key: "marriage" as const, ...line })),
  ];

  return (
    <svg viewBox="0 0 220 270" width={size} height={(size * 270) / 220} aria-hidden="true">
      <g fill="#fde7d4" stroke="#d6a77a" strokeWidth="2">
        <rect x="52" y="6" width="26" height="80" rx="13" />
        <rect x="82" y="0" width="27" height="84" rx="13" />
        <rect x="113" y="6" width="26" height="80" rx="13" />
        <rect x="143" y="24" width="23" height="66" rx="11" />
        <ellipse cx="34" cy="160" rx="17" ry="44" transform="rotate(-28 34 160)" />
        <path d="M50 70 Q48 60 60 62 L170 64 Q186 66 186 84 L186 220 Q186 262 140 264 L86 264 Q50 262 50 226 Z" />
      </g>
      {lines.map((line, index) => {
        const active = !focus || line.key === focus;
        return (
          <path
            key={`${line.key}-${index}`}
            d={line.d}
            fill="none"
            stroke={active ? color : "#c9a487"}
            strokeWidth={active ? 4 : 2}
            strokeLinecap="round"
            strokeDasharray={line.dashed ? "5 5" : undefined}
            opacity={active ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

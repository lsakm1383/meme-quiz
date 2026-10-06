import { DEFAULT_DRAWING, type PalmDrawing, type PalmLine } from "@/lib/saju/palm";

// 손바닥 일러스트(내 손바닥을 내려다본 왼손, 엄지가 왼쪽) 위에 손금을 SVG로 겹쳐 그린다. 고르는 중인 선만 진하게 칠한다.
// 좌표는 원본 1024×1024 그림 기준이고, 화면에는 손이 있는 부분(x 180~800, y 60~980)만 잘라 쓴 이미지를 같은 자리에 놓는다.
// 기준점: 엄지와 검지 사이 (365, 577) · 검지·중지 사이 (465, 431) · 새끼손가락 쪽 손바닥 가장자리 x≈716 · 손목 위 y≈800

const VIEW = { x: 180, y: 60, width: 620, height: 920 };
/** 결혼선처럼 작은 선을 볼 때 새끼손가락 아래만 확대한 화면 */
const ZOOM_VIEW = { x: 520, y: 330, width: 300, height: 330 };
/** 오른손은 그림 전체를 x = 980 - x 로 뒤집는다 (보이는 범위 180~800 이 그대로 180~800 으로 겹친다) */
const MIRROR_AXIS = VIEW.x * 2 + VIEW.width;

const HEART: Record<PalmDrawing["heart"], string[]> = {
  long: ["M715 540 C620 525 500 520 395 470"],
  between: ["M715 540 C630 532 520 520 466 442"],
  short: ["M715 540 C655 534 580 528 515 526"],
  straight: ["M715 540 C600 542 480 546 385 552"],
  simian: ["M372 585 C480 580 600 572 716 560"],
};

const headPaths = (shape: PalmDrawing["head"], start: PalmDrawing["headStart"]) => {
  const from = start === "joined" ? "M372 590" : "M394 564";
  switch (shape) {
    case "straight":
      return [`${from} C480 600 600 615 712 630`];
    case "curve":
      return [`${from} C470 600 570 650 630 760`];
    case "fork":
      return [`${from} C470 600 560 612 610 625`, "M610 625 L708 630", "M610 625 L688 712"];
    case "short":
      return [`${from} C440 596 500 604 548 612`];
  }
};

const LIFE: Record<PalmDrawing["life"], string[]> = {
  wide: ["M372 592 C505 640 520 740 460 800"],
  narrow: ["M372 592 C420 650 425 740 405 800"],
  broken: ["M372 592 C470 630 495 670 490 700", "M478 722 C482 750 470 780 455 800"],
  double: ["M372 592 C505 640 520 740 460 800", "M392 622 C478 662 488 740 440 795"],
};

const FATE: Record<PalmDrawing["fate"], { d: string; dashed?: boolean }[]> = {
  clear: [{ d: "M548 800 C540 700 525 560 515 455" }],
  late: [{ d: "M532 680 C526 600 520 520 515 455" }],
  faint: [
    { d: "M548 800 C544 740 540 690 536 630", dashed: true },
    { d: "M566 720 C560 650 552 580 540 505", dashed: true },
  ],
  none: [],
};

const MARRIAGE: Record<PalmDrawing["marriage"], { d: string; dashed?: boolean }[]> = {
  one: [{ d: "M722 506 L668 509" }],
  two: [{ d: "M722 494 L672 497" }, { d: "M720 518 L674 520" }],
  faint: [{ d: "M722 507 L676 510", dashed: true }],
};

export function PalmSvg({
  drawing = {},
  focus,
  color,
  size = 150,
  zoom = false,
  mirror = false,
}: {
  drawing?: Partial<PalmDrawing>;
  focus?: PalmLine;
  color: string;
  size?: number;
  /** 새끼손가락 아래만 확대해서 보여준다 (결혼선) */
  zoom?: boolean;
  /** 오른손 — 좌우로 뒤집어 그린다 */
  mirror?: boolean;
}) {
  const d = { ...DEFAULT_DRAWING, ...drawing };
  const base = zoom ? ZOOM_VIEW : VIEW;
  // 확대 화면도 뒤집힌 자리(새끼손가락 쪽이 왼쪽)로 옮겨 잡는다
  const view = mirror ? { ...base, x: MIRROR_AXIS - base.x - base.width } : base;
  const lines: { key: PalmLine; d: string; dashed?: boolean }[] = [
    ...HEART[d.heart].map((path) => ({ key: "heart" as const, d: path })),
    ...(d.heart === "simian" ? [] : headPaths(d.head, d.headStart).map((path) => ({ key: "head" as const, d: path }))),
    ...LIFE[d.life].map((path) => ({ key: "life" as const, d: path })),
    ...FATE[d.fate].map((line) => ({ key: "fate" as const, ...line })),
    ...MARRIAGE[d.marriage].map((line) => ({ key: "marriage" as const, ...line })),
  ];

  return (
    <svg
      viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
      width={size}
      height={(size * view.height) / view.width}
      aria-hidden="true"
      className="overflow-hidden rounded-xl"
    >
      <g transform={mirror ? `translate(${MIRROR_AXIS} 0) scale(-1 1)` : undefined}>
        <image href="/saju/palm-base.webp" x={VIEW.x} y={VIEW.y} width={VIEW.width} height={VIEW.height} />
        {lines.map((line, index) => {
          const active = !focus || line.key === focus;
          return (
            <path
              key={`${line.key}-${index}`}
              d={line.d}
              fill="none"
              stroke={active ? color : "#a0705a"}
              strokeWidth={(focus ? (active ? 16 : 7) : 11) * (zoom ? 0.6 : 1)}
              strokeLinecap="round"
              strokeDasharray={line.dashed ? "22 20" : undefined}
              opacity={active ? 0.95 : 0.4}
            />
          );
        })}
      </g>
    </svg>
  );
}

import type { Pillar, SajuChart } from "@/lib/saju/engine";
import { STEMS, BRANCHES, ELEMENT_ORDER } from "@/lib/saju/constants";
import { getElement, elementLevel, LEVEL_LABEL } from "@/data/saju";

// 원국 표: 전통 표기대로 오른쪽부터 연·월·일·시주가 오도록 시→연 순서로 그린다.
const COLUMNS: { key: "hour" | "day" | "month" | "year"; label: string }[] = [
  { key: "hour", label: "시주" },
  { key: "day", label: "일주" },
  { key: "month", label: "월주" },
  { key: "year", label: "연주" },
];

function Glyph({ hanja, hangul, element }: { hanja: string; hangul: string; element: string }) {
  const info = getElement(element as Parameters<typeof getElement>[0]);
  return (
    <div
      className="flex aspect-square w-full flex-col items-center justify-center rounded-xl"
      style={{ backgroundColor: `${info.color}26` }}
    >
      <span className="text-3xl font-bold leading-none text-zinc-900 dark:text-zinc-100">
        {hanja}
      </span>
      <span className="mt-1 text-xs font-semibold" style={{ color: info.color }}>
        {hangul} · {info.name}
      </span>
    </div>
  );
}

export function PillarTable({ chart }: { chart: SajuChart }) {
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {COLUMNS.map(({ key, label }) => {
        const pillar: Pillar | null = chart[key];
        return (
          <div key={key} className="flex flex-col items-center gap-1.5">
            <span
              className={`text-xs font-bold ${key === "day" ? "text-violet-700 dark:text-violet-300" : "text-zinc-400"}`}
            >
              {label}
              {key === "day" ? " (나)" : ""}
            </span>
            {pillar ? (
              <>
                <Glyph
                  hanja={STEMS[pillar.stem].hanja}
                  hangul={STEMS[pillar.stem].hangul}
                  element={STEMS[pillar.stem].element}
                />
                <Glyph
                  hanja={BRANCHES[pillar.branch].hanja}
                  hangul={BRANCHES[pillar.branch].hangul}
                  element={BRANCHES[pillar.branch].element}
                />
              </>
            ) : (
              <div className="flex aspect-[1/2] w-full items-center justify-center rounded-xl bg-zinc-100 text-center text-xs text-zinc-400 dark:bg-zinc-900">
                시간
                <br />
                모름
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function pillarText(pillar: Pillar | null): string {
  if (!pillar) return "(시간 모름)";
  const stem = STEMS[pillar.stem];
  const branch = BRANCHES[pillar.branch];
  return `${stem.hanja}${branch.hanja}(${stem.hangul}${branch.hangul})`;
}

export function ElementBars({ chart }: { chart: SajuChart }) {
  const total = ELEMENT_ORDER.reduce((sum, key) => sum + chart.elements[key], 0);
  return (
    <div className="flex w-full flex-col gap-2.5">
      {ELEMENT_ORDER.map((key) => {
        const info = getElement(key);
        const count = chart.elements[key];
        return (
          <div key={key} className="flex items-center gap-3 text-sm">
            <span className="w-12 shrink-0 font-bold" style={{ color: info.color }}>
              {info.name}({info.hanja})
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full"
                style={{ width: `${(count / total) * 100}%`, backgroundColor: info.color }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-xs text-zinc-500">
              {count}개 · {LEVEL_LABEL[elementLevel(count)]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

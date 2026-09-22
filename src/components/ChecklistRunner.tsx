"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ChecklistConfig } from "@/data/checklist-types";
import { countChecklistItems } from "@/data/checklist-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

export function ChecklistRunner({ checklist }: { checklist: ChecklistConfig }) {
  const storageKey = `meme-quiz:checklist:${checklist.id}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 서버 렌더링/첫 클라이언트 렌더는 항상 빈 상태로 맞추고, 마운트 후 한 틱 뒤에
    // 로컬 스토리지 값을 반영한다 (동기 setState로 인한 연쇄 렌더 경고를 피하기 위함).
    Promise.resolve().then(() => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) setChecked(JSON.parse(raw));
      } catch {
        // 로컬 스토리지 접근 불가 — 그냥 빈 상태로 시작
      }
      setLoaded(true);
    });
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // 무시
    }
  }, [checked, loaded, storageKey]);

  function toggle(itemId: string) {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }

  function reset() {
    setChecked({});
  }

  const total = countChecklistItems(checklist);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between text-sm font-semibold text-zinc-400">
        <span />
        <Link href="/" className="active:text-zinc-600 dark:active:text-zinc-300">
          다른 테스트 하러 가기
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-6xl">{checklist.emoji}</div>
        <h1 className="text-2xl font-bold leading-snug">{checklist.title}</h1>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {checklist.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${percent}%`, backgroundColor: checklist.accentColor }}
          />
        </div>
        <p className="text-center text-sm font-medium text-zinc-500">
          {doneCount} / {total} 완료 ({percent}%)
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {checklist.sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-zinc-400">{section.title}</h2>
            <div className="flex flex-col gap-2">
              {section.items.map((item) => {
                const isChecked = !!checked[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      isChecked
                        ? "border-transparent"
                        : "border-zinc-200 active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
                    }`}
                    style={isChecked ? { backgroundColor: `${checklist.accentColor}1a` } : undefined}
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white"
                      style={{
                        backgroundColor: isChecked ? checklist.accentColor : "transparent",
                        borderColor: isChecked ? checklist.accentColor : "#d4d4d8",
                      }}
                    >
                      {isChecked ? "✓" : ""}
                    </span>
                    <span className="flex flex-col">
                      <span
                        className={`text-sm font-semibold ${isChecked ? "text-zinc-400 line-through dark:text-zinc-500" : ""}`}
                      >
                        {item.text}
                      </span>
                      {item.note && (
                        <span className="text-xs text-zinc-400">{item.note}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={reset}
        className="text-center text-sm font-semibold text-zinc-400 underline underline-offset-4"
      >
        전체 초기화
      </button>

      <ShareBar
        title={`${checklist.emoji} ${checklist.title} ${percent}% 완료!`}
        text={`${checklist.title} 체크하다 보니 ${doneCount}/${total}(${percent}%)! 너도 빠뜨린 거 없는지 확인해봐 👉`}
        accentColor={checklist.accentColor}
      />

      <div className="w-full pt-2">
        <AdSlot slot="checklist-bottom" />
      </div>
    </div>
  );
}

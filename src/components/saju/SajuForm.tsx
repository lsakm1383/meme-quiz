"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SajuTestConfig } from "@/data/saju";
import { computeSaju, isSajuError, type CalendarType } from "@/lib/saju/engine";
import { saveSubmission } from "@/lib/saju/storage";
import { PhotoIcon } from "@/components/PhotoIcon";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1930 + 1 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const selectClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900";

function Toggle<T extends string>({
  value,
  options,
  onChange,
  accentColor,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  accentColor: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl border px-3 py-3 text-base font-semibold transition-colors ${active ? "text-white" : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"}`}
            style={active ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function SajuForm({ test, guide }: { test: SajuTestConfig; guide?: ReactNode }) {
  const router = useRouter();
  const [calendar, setCalendar] = useState<CalendarType>("solar");
  const [leapMonth, setLeapMonth] = useState(false);
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [gender, setGender] = useState<"female" | "male">("female");
  const [error, setError] = useState<string | null>(null);

  const days = Array.from({ length: calendar === "lunar" ? 30 : 31 }, (_, i) => i + 1);

  function submit() {
    setError(null);
    let parsedTime: { hour: number; minute: number } | null = null;
    if (!timeUnknown) {
      const match = /^(\d{1,2}):(\d{2})$/.exec(time);
      if (!match) {
        setError("태어난 시간을 입력하거나 '시간 모름'을 체크해주세요.");
        return;
      }
      parsedTime = { hour: Number(match[1]), minute: Number(match[2]) };
    }
    const input = {
      calendar,
      leapMonth: calendar === "lunar" && leapMonth,
      year,
      month,
      day,
      time: parsedTime,
    };
    const chart = computeSaju(input);
    if (isSajuError(chart)) {
      setError(chart.error);
      return;
    }
    if (!saveSubmission({ ...input, gender })) {
      setError("브라우저 설정 때문에 결과를 열 수 없어요. 시크릿 모드를 끄고 다시 시도해주세요.");
      return;
    }
    router.push(`/s/${test.id}/me`);
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {test.image ? (
        <PhotoIcon src={test.image} size="xl" />
      ) : (
        <div className="text-7xl">{test.emoji}</div>
      )}
      <p className="text-sm font-bold" style={{ color: test.accentColor }}>
        사주 시리즈 {test.episode}
      </p>
      <h1 className="-mt-4 text-2xl font-bold leading-snug">{test.title}</h1>
      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {test.description}
      </p>

      <div className="flex w-full flex-col gap-5 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">양력 / 음력</span>
          <Toggle
            value={calendar}
            onChange={(value) => {
              setCalendar(value);
              if (value === "solar") setLeapMonth(false);
              if (value === "lunar" && day > 30) setDay(30);
            }}
            options={[
              { value: "solar", label: "양력" },
              { value: "lunar", label: "음력" },
            ]}
            accentColor={test.accentColor}
          />
          {calendar === "lunar" && (
            <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={leapMonth}
                onChange={(event) => setLeapMonth(event.target.checked)}
                className="h-4 w-4"
              />
              윤달이에요
            </label>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">생년월일</span>
          <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2">
            <select
              aria-label="태어난 해"
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              className={selectClass}
            >
              {YEARS.map((value) => (
                <option key={value} value={value}>
                  {value}년
                </option>
              ))}
            </select>
            <select
              aria-label="태어난 달"
              value={month}
              onChange={(event) => setMonth(Number(event.target.value))}
              className={selectClass}
            >
              {MONTHS.map((value) => (
                <option key={value} value={value}>
                  {value}월
                </option>
              ))}
            </select>
            <select
              aria-label="태어난 날"
              value={day}
              onChange={(event) => setDay(Number(event.target.value))}
              className={selectClass}
            >
              {days.map((value) => (
                <option key={value} value={value}>
                  {value}일
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">태어난 시간</span>
          <input
            type="time"
            aria-label="태어난 시간"
            value={time}
            disabled={timeUnknown}
            onChange={(event) => setTime(event.target.value)}
            className={`${selectClass} disabled:opacity-40`}
          />
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={timeUnknown}
              onChange={(event) => setTimeUnknown(event.target.checked)}
              className="h-4 w-4"
            />
            시간을 몰라요 (시주 없이 6글자로 풀이해요)
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">성별</span>
          <Toggle
            value={gender}
            onChange={setGender}
            options={[
              { value: "female", label: "여성" },
              { value: "male", label: "남성" },
            ]}
            accentColor={test.accentColor}
          />
          <span className="text-xs text-zinc-400">
            대운 방향을 정할 때 쓰여요. 1편 풀이에는 영향을 주지 않아요.
          </span>
        </div>

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <button
          type="button"
          onClick={submit}
          className="w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: test.accentColor }}
        >
          사주 풀이 보기
        </button>
        <p className="text-center text-xs text-zinc-400">
          입력한 정보는 이 기기 안에서만 계산하고 서버로 보내지 않아요.
        </p>
      </div>

      {guide}
    </div>
  );
}

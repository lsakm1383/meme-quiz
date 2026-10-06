"use client";

import { useState, type ReactNode } from "react";
import { computeSaju, hasLeapMonth, isSajuError, type CalendarType } from "@/lib/saju/engine";
import type { SajuSubmission } from "@/lib/saju/storage";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1930 + 1 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const selectClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900";

export function Toggle<T extends string>({
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

// 사주 입력 칸(양력/음력·생년월일·윤달·시간·성별)과 검증. 제출 후 처리는 쓰는 쪽이 정한다.
export function BirthForm({
  accentColor,
  submitLabel,
  genderNote,
  topSlot,
  bottomSlot,
  busy = false,
  onValid,
}: {
  accentColor: string;
  submitLabel: string;
  /** 성별 칸 아래 안내 문구. null 이면 성별을 묻지 않는다 (궁합처럼 성별을 쓰지 않을 때) */
  genderNote: string | null;
  /** 입력 칸 맨 위에 끼워 넣을 내용 (예: 그룹 닉네임) */
  topSlot?: ReactNode;
  /** 제출 버튼 바로 위에 끼워 넣을 내용 (예: 기억하기 체크) */
  bottomSlot?: ReactNode;
  busy?: boolean;
  /** 검증을 통과한 입력. 실패 메시지를 돌려주면 폼 아래에 보여준다. */
  onValid: (submission: SajuSubmission) => string | null | void | Promise<string | null | void>;
}) {
  const [calendar, setCalendar] = useState<CalendarType>("solar");
  const [leapMonth, setLeapMonth] = useState(false);
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [gender, setGender] = useState<"female" | "male">("female");
  const [error, setError] = useState<string | null>(null);

  // 음력 날짜는 기본적으로 평달로 보고, 그해 그 달에 윤달이 있을 때만 어느 쪽인지 물어본다.
  const leapAvailable = calendar === "lunar" && hasLeapMonth(year, month);

  const days = Array.from({ length: calendar === "lunar" ? 30 : 31 }, (_, i) => i + 1);

  async function submit() {
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
      leapMonth: leapAvailable && leapMonth,
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
    const message = await onValid({ ...input, gender });
    if (message) setError(message);
  }

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
      {topSlot}

      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">양력 / 음력</span>
        <Toggle
          value={calendar}
          onChange={(value) => {
            setCalendar(value);
            if (value === "lunar" && day > 30) setDay(30);
          }}
          options={[
            { value: "solar", label: "양력" },
            { value: "lunar", label: "음력" },
          ]}
          accentColor={accentColor}
        />
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

      {leapAvailable && (
        <div className="flex flex-col gap-2 rounded-2xl bg-violet-50 p-3 dark:bg-violet-950">
          <span className="text-sm font-bold">
            {year}년에는 윤{month}월이 있어요. 윤달에 태어나셨나요?
          </span>
          <Toggle
            value={leapMonth ? "leap" : "normal"}
            onChange={(value) => setLeapMonth(value === "leap")}
            options={[
              { value: "normal", label: `평달 ${month}월` },
              { value: "leap", label: `윤${month}월` },
            ]}
            accentColor={accentColor}
          />
        </div>
      )}

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

      {genderNote !== null && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">성별</span>
          <Toggle
            value={gender}
            onChange={setGender}
            options={[
              { value: "female", label: "여성" },
              { value: "male", label: "남성" },
            ]}
            accentColor={accentColor}
          />
          <span className="text-xs text-zinc-400">{genderNote}</span>
        </div>
      )}

      {bottomSlot}

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={busy}
        className="w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-60"
        style={{ backgroundColor: accentColor }}
      >
        {submitLabel}
      </button>
      <p className="text-center text-xs text-zinc-400">
        입력한 정보는 이 기기 안에서만 계산하고 서버로 보내지 않아요.
      </p>
    </div>
  );
}

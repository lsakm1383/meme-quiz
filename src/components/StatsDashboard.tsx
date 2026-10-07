"use client";

import { useEffect, useState } from "react";
import type { EventType } from "@/lib/events";

type Counts = Record<EventType, number>;
type Data = {
  days: number;
  tests: { key: string; title: string; group: string; counts: Counts }[];
  daily: { date: string; counts: Counts }[];
};

const SECRET_KEY = "meme-quiz:admin-secret";

const rate = (a: number, b: number) => (b > 0 ? `${Math.round((a / b) * 100)}%` : "–");

const COLUMNS: { label: string; title: string; value: (c: Counts) => string | number }[] = [
  { label: "방문", title: "시작 화면을 연 횟수", value: (c) => c.view },
  { label: "시작", title: "시작 버튼을 누른 횟수", value: (c) => c.start },
  { label: "시작률", title: "시작 ÷ 방문", value: (c) => rate(c.start, c.view) },
  { label: "결과", title: "결과 화면을 본 횟수 (공유 링크로 들어온 경우 포함)", value: (c) => c.result },
  { label: "공유", title: "공유 버튼을 누른 횟수", value: (c) => c.share },
  { label: "공유율", title: "공유 ÷ 결과", value: (c) => rate(c.share, c.result) },
  { label: "풀이 펼침", title: "'풀이 더 보기'를 펼친 횟수", value: (c) => c.fold },
  { label: "펼침률", title: "풀이 펼침 ÷ 결과", value: (c) => rate(c.fold, c.result) },
  { label: "다른 테스트로", title: "다른 테스트·홈으로 이동한 횟수", value: (c) => c.explore },
];

export function StatsDashboard() {
  const [secret, setSecret] = useState("");
  const [days, setDays] = useState(7);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(currentSecret: string, currentDays: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/events?days=${currentDays}`, {
        headers: { "x-admin-secret": currentSecret },
      });
      if (response.status === 401) throw new Error("비밀값이 맞지 않아요.");
      if (!response.ok) throw new Error("통계를 불러오지 못했어요.");
      setData(await response.json());
      // 탭을 닫으면 사라지는 저장소에만 둔다
      try {
        sessionStorage.setItem(SECRET_KEY, currentSecret);
      } catch {}
    } catch (caught) {
      setData(null);
      setError(caught instanceof Error ? caught.message : "통계를 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  }

  // 같은 탭에서 이미 입력했던 비밀값이 있으면 바로 불러온다 (sessionStorage 는 마운트 후에만 읽힌다)
  useEffect(() => {
    let saved = "";
    try {
      saved = sessionStorage.getItem(SECRET_KEY) ?? "";
    } catch {}
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSecret(saved);
      void load(saved, 7);
    }
  }, []);

  const total = data?.tests.reduce(
    (sum, test) => {
      for (const key of Object.keys(sum) as EventType[]) sum[key] += test.counts[key];
      return sum;
    },
    { view: 0, start: 0, result: 0, share: 0, fold: 0, explore: 0 } as Counts
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold">이용 통계</h1>

      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void load(secret, days);
        }}
      >
        <input
          type="password"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          placeholder="관리자 비밀값"
          className="min-w-0 flex-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <select
          value={days}
          onChange={(event) => {
            const next = Number(event.target.value);
            setDays(next);
            if (data) void load(secret, next);
          }}
          className="rounded-xl border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value={1}>오늘</option>
          <option value={7}>최근 7일</option>
          <option value={30}>최근 30일</option>
        </select>
        <button
          type="submit"
          disabled={!secret || loading}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-900"
        >
          {loading ? "불러오는 중…" : "불러오기"}
        </button>
      </form>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      {data && total && (
        <>
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-zinc-500">전체 ({data.days === 1 ? "오늘" : `최근 ${data.days}일`})</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {COLUMNS.filter((column) => !column.label.endsWith("률")).map((column) => (
                <div key={column.label} className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900" title={column.title}>
                  <p className="text-xs text-zinc-500">{column.label}</p>
                  <p className="text-lg font-extrabold">{column.value(total)}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500">
              시작률 {rate(total.start, total.view)} · 공유율 {rate(total.share, total.result)} · 풀이 펼침률{" "}
              {rate(total.fold, total.result)}
            </p>
          </section>

          {data.days > 1 && (
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-bold text-zinc-500">날짜별</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="py-1 text-left font-semibold">날짜</th>
                      <th className="font-semibold">방문</th>
                      <th className="font-semibold">시작</th>
                      <th className="font-semibold">결과</th>
                      <th className="font-semibold">공유</th>
                      <th className="font-semibold">풀이 펼침</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.daily.map((day) => (
                      <tr key={day.date} className="border-t border-zinc-100 dark:border-zinc-800">
                        <td className="py-1 text-left">{day.date}</td>
                        <td>{day.counts.view}</td>
                        <td>{day.counts.start}</td>
                        <td>{day.counts.result}</td>
                        <td>{day.counts.share}</td>
                        <td>{day.counts.fold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-zinc-500">테스트별</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-right text-xs">
                <thead className="text-zinc-500">
                  <tr>
                    <th className="py-1 text-left font-semibold">테스트</th>
                    {COLUMNS.map((column) => (
                      <th key={column.label} className="font-semibold" title={column.title}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.tests.map((test) => (
                    <tr key={test.key} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="py-1.5 text-left">
                        <span className="font-semibold">{test.title}</span>{" "}
                        <span className="text-zinc-400">{test.group}</span>
                      </td>
                      {COLUMNS.map((column) => (
                        <td key={column.label}>{column.value(test.counts)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="text-xs leading-relaxed text-zinc-400">
            누가 했는지는 저장하지 않고 횟수만 날짜별로 더해요. 결과 화면 조회에는 공유 링크로 들어온 경우도
            포함되어서, 결과가 시작보다 많을 수 있어요.
          </p>
        </>
      )}
    </div>
  );
}

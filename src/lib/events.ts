// 이용 통계(자체 집계). 누가 했는지는 남기지 않고, 테스트별·날짜별로 몇 번 일어났는지만 센다.
//   view    테스트 시작 화면을 연 횟수
//   start   시작 버튼(또는 생년월일 제출)을 누른 횟수
//   result  결과 화면을 본 횟수 (공유 링크로 들어온 경우도 포함)
//   share   결과 공유 버튼을 누른 횟수
//   fold    결과 화면의 "풀이 더 보기"를 펼친 횟수
//   explore 테스트 화면에서 다른 테스트·홈으로 이동한 횟수

export const EVENT_TYPES = ["view", "start", "result", "share", "fold", "explore"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const isEventType = (value: unknown): value is EventType =>
  typeof value === "string" && (EVENT_TYPES as readonly string[]).includes(value);

const SECTION_PREFIXES = ["s", "m", "d", "w", "c", "l"];
/** 퀴즈가 아닌 최상위 경로 — 1분 테스트 주소(/{quizId})와 헷갈리지 않게 뺀다 */
const NON_TEST_ROOTS = new Set(["about", "privacy", "admin", "api", "g"]);

export type PageKind = "start" | "result" | "other";

/**
 * 주소에서 테스트 키와 화면 종류를 뽑는다.
 *   /moon-phase → "moon-phase" (start),  /moon-phase/r/x → "moon-phase" (result)
 *   /s/saju → "s/saju" (start),  /s/saju/me · /s/zodiac/t/x · /s/fortune/g/x → result
 * 키가 실제로 있는 테스트인지는 서버에서 따로 확인한다.
 */
export function parseTestPath(pathname: string): { key: string; kind: PageKind } | null {
  const parts = pathname.split("?")[0].split("/").filter(Boolean);
  if (parts.length === 0) return null;
  if (SECTION_PREFIXES.includes(parts[0])) {
    if (parts.length < 2) return null;
    const key = `${parts[0]}/${parts[1]}`;
    return { key, kind: parts.length === 2 ? "start" : "result" };
  }
  if (NON_TEST_ROOTS.has(parts[0])) return null;
  return { key: parts[0], kind: parts.length === 1 ? "start" : "result" };
}

/** 한국 날짜 (YYYY-MM-DD) — 날짜별 집계 키에 쓴다 */
export function koreaDate(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(now);
}

import type { BirthInput } from "@/lib/saju/engine";

// 입력한 생년월일은 서버로 보내지 않고, 결과 화면으로 넘길 때만 이 탭의 sessionStorage 에 둔다
// (탭을 닫으면 사라진다). 결과 주소에는 생년월일을 넣지 않는다.
export type SajuSubmission = BirthInput & { gender: "female" | "male" };

const KEY = "meme-quiz:saju:input";

export function saveSubmission(value: SajuSubmission): boolean {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// "이 기기에 기억하기"를 켠 경우에만 localStorage 에 둔다 — 오늘의 운세를 매일 다시 입력하지 않도록.
const REMEMBER_KEY = "meme-quiz:saju:remembered";

export function rememberSubmission(value: SajuSubmission): void {
  try {
    localStorage.setItem(REMEMBER_KEY, JSON.stringify(value));
  } catch {
    // 저장소를 못 쓰면 기억하지 않고 넘어간다
  }
}

export function loadRemembered(): SajuSubmission | null {
  try {
    const raw = localStorage.getItem(REMEMBER_KEY);
    return raw ? (JSON.parse(raw) as SajuSubmission) : null;
  } catch {
    return null;
  }
}

export function forgetRemembered(): void {
  try {
    localStorage.removeItem(REMEMBER_KEY);
  } catch {
    // 무시
  }
}

export function loadSubmission(): SajuSubmission | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SajuSubmission) : null;
  } catch {
    return null;
  }
}

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

export function loadSubmission(): SajuSubmission | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SajuSubmission) : null;
  } catch {
    return null;
  }
}

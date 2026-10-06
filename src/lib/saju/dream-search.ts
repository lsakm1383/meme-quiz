// 꿈해몽 검색. "이빨 빠지는 꿈", "돼지가집에" 처럼 띄어쓰기·조사·"꿈"이 섞여 들어와도 찾을 수 있게
// 낱말 단위로 맞춰 보고, 한 글자 상징(개·소·말·눈 …)은 뒤에 조사만 붙은 경우에만 맞는 것으로 본다.

export type DreamIndexItem = {
  slug: string;
  title: string;
  emoji: string;
  tone: "lucky" | "neutral" | "caution";
  keywords: string[];
  situations: string[];
};

const PARTICLES = /^(이|가|을|를|은|는|에|에게|한테|의|랑|이랑|와|과|도|만|에서|으로|로|꿈|이꿈|가꿈|을꿈|를꿈)?$/;
const compact = (text: string) => text.replace(/\s+/g, "").replace(/꿈$/, "");

/** 낱말이 상징어와 맞는지 — 두 글자 이상은 포함만 되어도, 한 글자는 뒤에 조사만 붙은 경우만 */
function tokenMatches(token: string, keyword: string): boolean {
  if (token === keyword) return true;
  if (keyword.length >= 2) return token.includes(keyword);
  return token.startsWith(keyword) && PARTICLES.test(token.slice(keyword.length));
}

export function searchDreams(index: DreamIndexItem[], query: string, limit = 8): DreamIndexItem[] {
  const whole = compact(query);
  if (!whole) return [];
  const tokens = query
    .split(/\s+/)
    .map((token) => token.replace(/꿈$/, ""))
    .filter(Boolean);

  const scored = index.map((item) => {
    const keywords = [compact(item.title), ...item.keywords.map(compact)].filter(Boolean);
    let score = 0;
    for (const keyword of keywords) {
      if (whole === keyword) score = Math.max(score, 100);
      else if (tokens.some((token) => tokenMatches(token, keyword)))
        score = Math.max(score, 60 + Math.min(keyword.length, 6) * 5);
      else if (keyword.length >= 2 && whole.includes(keyword)) score = Math.max(score, 55 + keyword.length * 4);
      else if (whole.length >= 2 && keyword.includes(whole)) score = Math.max(score, 50);
    }
    if (whole.length >= 2 && item.situations.some((situation) => compact(situation).includes(whole))) {
      score = Math.max(score, 45);
    }
    return { item, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

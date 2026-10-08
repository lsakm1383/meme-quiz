import { RELATED_TESTS } from "@/data/related-tests";
import { getRegisteredTest, registeredTests, type RegisteredTest } from "@/lib/test-registry";

const COUNT = 3;

/** 손으로 고른 추천을 먼저 쓰고, 모자라면 같은 분야의 다른 테스트로 채운다 */
export function relatedTestsOf(current: string): RegisteredTest[] {
  const picked = (RELATED_TESTS[current] ?? [])
    .map(getRegisteredTest)
    .filter((test): test is RegisteredTest => test !== undefined && test.key !== current);
  const group = getRegisteredTest(current)?.group;
  for (const test of registeredTests) {
    if (picked.length >= COUNT) break;
    if (test.key !== current && test.group === group && !picked.includes(test)) picked.push(test);
  }
  return picked.slice(0, COUNT);
}

// 결과 화면 아래 "이 테스트도 해보세요" — 서버에서만 그린다 (테스트 목록 전체를 브라우저로 보내지 않기 위해).
// 결과 화면이 클라이언트 컴포넌트면 페이지에서 이 컴포넌트를 related 속성으로 넘겨준다.
export function RelatedTests({ current }: { current: string }) {
  const tests = relatedTestsOf(current);
  if (tests.length === 0) return null;
  return (
    <section className="flex w-full flex-col gap-2 text-left" aria-labelledby={`related-${current.replace("/", "-")}`}>
      <h2 id={`related-${current.replace("/", "-")}`} className="text-sm font-bold text-zinc-500">
        이 테스트도 해보세요
      </h2>
      {tests.map((test) => (
        // 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지)
        <a
          key={test.key}
          href={test.href}
          className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-3 py-3 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
        >
          {test.image ? (
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={test.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </span>
          ) : (
            <span className="flex h-14 w-14 shrink-0 items-center justify-center text-3xl">{test.emoji}</span>
          )}
          <span className="flex min-w-0 flex-col">
            <span className="text-xs font-semibold text-zinc-400">{test.group}</span>
            <span className="truncate text-base font-bold">{test.title}</span>
            <span className="truncate text-sm text-zinc-500">{test.description}</span>
          </span>
        </a>
      ))}
    </section>
  );
}

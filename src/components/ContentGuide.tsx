import type { ReactNode } from "react";
import type { ContentGuide as Guide } from "@/data/guide-types";
import { getRegisteredTest } from "@/lib/test-registry";
import { JsonLd, breadcrumbData, faqData, testTrail } from "@/lib/structured-data";

export type GuideItem = {
  key: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  /** 결과 상세 문단 — 카드 아래 "더보기"로 접어 둔다 */
  more?: string;
  /** 있으면 해당 결과 화면으로 가는 링크로 만든다 */
  href?: string;
};

const SUMMARY =
  "flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden";

function Chevron() {
  return (
    <span aria-hidden="true" className="shrink-0 text-zinc-400 transition-transform group-open:rotate-180">
      ▾
    </span>
  );
}

// 테스트 시작 화면 아래의 소개 섹션 (모든 콘텐츠 유형 공용). 서버에서 렌더링해 HTML에
// 그대로 들어가므로 "시작하기"를 누르기 전에도 설명·진행 방식·전체 결과·FAQ를 읽을 수 있다.
// 글이 길어 보이지 않도록 소개는 첫 문단만, 진행 방식과 FAQ는 제목·질문만 보여 주고 눌러서 펼친다
// (<details> 라 접혀 있어도 내용은 HTML 에 그대로 있다).
// layout: 큰 일러스트(가로로 긴 배너 포함)는 "stack"으로 위에, 이모지·작은 그림은 "row"로 옆에 둔다.
export function ContentGuide({
  guide,
  accentColor,
  items = [],
  layout = "row",
}: {
  guide: Guide;
  accentColor: string;
  /** 비어 있거나 resultsHeading이 없으면 결과 목록 섹션을 생략한다 */
  items?: GuideItem[];
  layout?: "row" | "stack";
}) {
  const itemClass =
    layout === "stack"
      ? "flex flex-col items-center gap-3 p-4"
      : "flex items-start gap-3 p-3";
  const [firstParagraph, ...restParagraphs] = guide.intro;
  const test = guide.path ? getRegisteredTest(guide.path) : undefined;
  const trail = test ? testTrail(test) : [];

  return (
    <div className="mt-8 flex w-full flex-col gap-10 border-t border-zinc-200 pt-10 text-left dark:border-zinc-800">
      {/* 검색엔진용 구조화 정보 — 아래 화면의 경로와 자주 묻는 질문을 그대로 옮긴다 */}
      <JsonLd data={[...(trail.length > 0 ? [breadcrumbData(trail)] : []), ...(guide.faq.length > 0 ? [faqData(guide.faq)] : [])]} />
      {trail.length > 0 && (
        <nav aria-label="현재 위치" className="-mb-6 text-xs font-semibold text-zinc-400">
          {trail.map((step, index) => (
            <span key={step.path}>
              {index > 0 && <span aria-hidden="true"> › </span>}
              {index < trail.length - 1 ? (
                // 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지)
                <a href={step.path} className="underline underline-offset-4">
                  {step.name}
                </a>
              ) : (
                <span aria-current="page">{step.name}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{guide.introHeading ?? "이런 테스트예요"}</h2>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{firstParagraph}</p>
        {restParagraphs.length > 0 && (
          <details className="group">
            <summary className={`${SUMMARY} text-sm font-semibold`} style={{ color: accentColor }}>
              <span>소개 더 읽기</span>
              <Chevron />
            </summary>
            <div className="mt-3 flex flex-col gap-3">
              {restParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{guide.howHeading}</h2>
        <ol className="flex flex-col gap-2">
          {guide.how.map((step, index) => (
            <li key={step.title}>
              <details className="group rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
                <summary className={SUMMARY}>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold">
                      {index + 1}. {step.title}
                    </span>
                    {step.highlight && (
                      <span className="mt-1 text-xs font-semibold" style={{ color: accentColor }}>
                        {step.highlight}
                      </span>
                    )}
                  </span>
                  <Chevron />
                </summary>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </details>
            </li>
          ))}
        </ol>
      </section>

      {guide.resultsHeading && items.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{guide.resultsHeading}</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => {
              const body = (
                <>
                  {item.icon}
                  <span className="flex w-full min-w-0 flex-col gap-0.5">
                    <span className="text-sm font-bold">{item.title}</span>
                    {item.subtitle && (
                      <span className="text-xs font-medium text-zinc-500">{item.subtitle}</span>
                    )}
                    {item.description && (
                      <span className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {item.description}
                      </span>
                    )}
                  </span>
                </>
              );
              return (
                <li key={item.key} className="rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  {item.href ? (
                    // 결과 화면(광고 있음)으로 가는 링크 — 다른 화면 이동과 같이 완전한 새로고침으로 연다
                    <a
                      href={item.href}
                      className={`${itemClass} rounded-2xl transition-colors active:bg-zinc-100 dark:active:bg-zinc-900`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={itemClass}>{body}</div>
                  )}
                  {/* 링크 안에 접기 상자를 넣을 수 없어서 카드 아래에 따로 둔다 */}
                  {item.more && (
                    <details className="group border-t border-zinc-100 px-3 py-2 dark:border-zinc-800">
                      <summary className={`${SUMMARY} text-xs font-semibold text-zinc-500`}>
                        <span>더보기</span>
                        <Chevron />
                      </summary>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.more}</p>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">자주 묻는 질문</h2>
        <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
          {guide.faq.map((item) => (
            <details key={item.question} className="group py-3">
              <summary className={`${SUMMARY} text-sm font-bold`}>
                <span>Q. {item.question}</span>
                <Chevron />
              </summary>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

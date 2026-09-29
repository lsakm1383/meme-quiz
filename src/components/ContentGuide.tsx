import type { ReactNode } from "react";
import type { ContentGuide as Guide } from "@/data/guide-types";

export type GuideItem = {
  key: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  /** 있으면 해당 결과 화면으로 가는 링크로 만든다 */
  href?: string;
};

// 테스트 시작 화면 아래의 소개 섹션 (모든 콘텐츠 유형 공용). 서버에서 렌더링해 HTML에
// 그대로 들어가므로 "시작하기"를 누르기 전에도 설명·진행 방식·전체 결과·FAQ를 읽을 수 있다.
// layout: 큰 일러스트(가로로 긴 배너 포함)는 "stack"으로 위에, 이모지·작은 그림은 "row"로 옆에 둔다.
export function ContentGuide({
  guide,
  accentColor,
  items,
  layout = "row",
}: {
  guide: Guide;
  accentColor: string;
  items: GuideItem[];
  layout?: "row" | "stack";
}) {
  const itemClass =
    layout === "stack"
      ? "flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
      : "flex items-start gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800";

  return (
    <div className="mt-8 flex w-full flex-col gap-10 border-t border-zinc-200 pt-10 text-left dark:border-zinc-800">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">이런 테스트예요</h2>
        {guide.intro.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{guide.howHeading}</h2>
        <ol className="flex flex-col gap-3">
          {guide.how.map((step, index) => (
            <li key={step.title} className="rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
              <p className="text-sm font-bold">
                {index + 1}. {step.title}
              </p>
              {step.highlight && (
                <p className="mt-1 text-xs font-semibold" style={{ color: accentColor }}>
                  {step.highlight}
                </p>
              )}
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

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
              <li key={item.key}>
                {item.href ? (
                  // 결과 화면(광고 있음)으로 가는 링크 — 다른 화면 이동과 같이 완전한 새로고침으로 연다
                  <a
                    href={item.href}
                    className={`${itemClass} transition-colors active:bg-zinc-100 dark:active:bg-zinc-900`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={itemClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">자주 묻는 질문</h2>
        <dl className="flex flex-col gap-4">
          {guide.faq.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-bold">Q. {item.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

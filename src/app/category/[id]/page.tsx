import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/data/categories";
import { getRegisteredTest, type RegisteredTest } from "@/lib/test-registry";
import { getSiteUrl } from "@/lib/site";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, categoryData } from "@/lib/structured-data";

type Params = { id: string };

/** 마지막 글자에 받침이 있으면 "은", 없으면 "는" */
const topic = (word: string) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0 ? "은" : "는";
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return {};
  const title = `${category.title} 모아보기`;
  return {
    title,
    description: category.summary,
    openGraph: { title, description: category.summary, type: "website" },
    twitter: { card: "summary_large_image", title, description: category.summary },
    alternates: { canonical: `${getSiteUrl()}/category/${category.id}` },
  };
}

// 분야별 모아보기 — 분야 소개, 이렇게 즐겨보세요, 테스트 목록, 다른 분야 바로가기.
export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();
  const tests = category.tests.map(getRegisteredTest).filter((test): test is RegisteredTest => test !== undefined);

  return (
    <div className="flex w-full max-w-md flex-1 flex-col gap-8 px-6 py-14">
      <JsonLd data={categoryData(category)} />
      <nav aria-label="현재 위치" className="text-xs font-semibold text-zinc-400">
        {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
        <a href="/" className="underline underline-offset-4">
          홈
        </a>{" "}
        › {category.title}
      </nav>

      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold">
          {category.emoji} {category.title}
          <span className="ml-2 align-middle text-sm font-semibold text-zinc-400">{tests.length}개</span>
        </h1>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{category.summary}</p>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="tests-title">
        <h2 id="tests-title" className="text-base font-extrabold">
          {category.title} 전체
        </h2>
        {tests.map((test) => (
          <a
            key={test.key}
            href={test.href}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-4 py-4 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
          >
            {test.image ? (
              <span className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={test.image} alt="" className="h-full w-full object-cover" />
              </span>
            ) : (
              <span className="flex h-16 w-16 shrink-0 items-center justify-center text-4xl">{test.emoji}</span>
            )}
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-bold">{test.title}</span>
              <span className="text-sm text-zinc-500">{test.description}</span>
              {test.meta && <span className="text-xs font-semibold text-zinc-400">{test.meta}</span>}
            </span>
          </a>
        ))}
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="about-title">
        <h2 id="about-title" className="text-base font-extrabold">
          {category.title}
          {topic(category.title)} 이런 테스트예요
        </h2>
        {category.intro.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="tips-title">
        <h2 id="tips-title" className="text-base font-extrabold">
          이렇게 즐겨보세요
        </h2>
        <ul className="flex flex-col gap-2">
          {category.tips.map((tip) => (
            <li key={tip.title} className="rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
              <p className="text-sm font-bold">{tip.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tip.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-labelledby="other-title" className="flex flex-col gap-3">
        <h2 id="other-title" className="text-base font-extrabold">
          다른 분야 둘러보기
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((other) => other.id !== category.id)
            .map((other) => (
              <a
                key={other.id}
                href={`/category/${other.id}`}
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-600 transition-colors active:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:active:bg-zinc-900"
              >
                {other.emoji} {other.title}
              </a>
            ))}
        </div>
      </nav>

      <div className="w-full pt-2">
        <AdSlot slot="category-bottom" />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { decisionTests } from "@/data/decisions";
import { checklists } from "@/data/checklists";
import { mbtiTests } from "@/data/mbti";
import { sajuSeriesTests, traditionalTests } from "@/data/saju";
import { getRegisteredTest, registeredTests, type RegisteredTest } from "@/lib/test-registry";
import { categories, getCategory } from "@/data/categories";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, websiteData } from "@/lib/structured-data";
import { MbtiResultIcon } from "@/components/MbtiResultIcon";
import { PhotoIcon } from "@/components/PhotoIcon";
import { QuizIcon } from "@/components/QuizIcon";

const DESCRIPTION =
  "1분 성격 유형 테스트부터 사주·타로·손금 같은 운세, 메뉴·드레스 추천과 취향 월드컵까지 모아 둔 재미용 테스트 모음이에요.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  openGraph: { title: "오늘의 밈 테스트", description: DESCRIPTION, type: "website" },
};

/** 처음 온 사람에게 먼저 권하는 테스트 — 분야가 겹치지 않게 하나씩 골랐다 */
const STARTER_KEYS = ["m/flavor-type", "s/saju", "s/tarot", "w/ramen-worldcup"];

const CARD =
  "flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900";

/** 분야 묶음 — 제목·설명은 분야 데이터(categories)에서 가져오고, 제목 옆 링크로 분야 모아보기에 이어진다 */
function Section({ id, count, children }: { id: string; count: number; children: ReactNode }) {
  const category = getCategory(id);
  if (!category) return null;
  return (
    <section id={id} className="flex w-full scroll-mt-6 flex-col gap-3" aria-labelledby={`${id}-title`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h2 id={`${id}-title`} className="flex items-baseline gap-2 text-base font-extrabold">
            {category.title}
            <span className="text-xs font-semibold text-zinc-400">{count}개</span>
          </h2>
          <a
            href={`/category/${id}`}
            className="shrink-0 text-xs font-semibold text-zinc-500 underline underline-offset-4"
          >
            분야 소개
          </a>
        </div>
        <p className="text-sm leading-relaxed text-zinc-500">{category.summary}</p>
      </div>
      {children}
    </section>
  );
}

function CardText({ title, description }: { title: string; description: string }) {
  return (
    <span className="flex flex-col">
      <span className="text-base font-bold">{title}</span>
      <span className="text-sm text-zinc-500">{description}</span>
    </span>
  );
}

export default function Home() {
  const typeQuizzes = quizzes.filter((quiz) => (quiz.category ?? "type") === "type");
  const starters = STARTER_KEYS.map(getRegisteredTest).filter((test): test is RegisteredTest => test !== undefined);


  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center gap-10 px-6 py-14">
      <JsonLd data={websiteData(DESCRIPTION)} />
      <header className="flex w-full flex-col gap-3 text-center">
        <h1 className="text-2xl font-extrabold">오늘의 밈 테스트</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          1분이면 끝나는 성격 유형 테스트부터 사주·타로 같은 운세, 메뉴 추천과 취향 월드컵까지{" "}
          {registeredTests.length}가지 테스트를 모아 뒀어요. 회원가입 없이 바로 해보고, 결과를 친구에게 공유해 비교해
          보세요.{" "}
          <a href="/about" className="font-semibold underline underline-offset-4">
            사이트 소개
          </a>
        </p>
        <nav aria-label="분야 바로가기" className="flex flex-wrap justify-center gap-2 pt-1">
          {categories.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors active:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:active:bg-zinc-900"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </header>

      <section className="flex w-full flex-col gap-3" aria-labelledby="starter-title">
        <h2 id="starter-title" className="text-base font-extrabold">
          처음이라면 이것부터
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {starters.map((test) => (
            <a
              key={test.key}
              href={test.href}
              className="flex flex-col gap-2 rounded-2xl border border-zinc-200 p-3 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
            >
              {test.image ? (
                // 가로로 긴 그림도 잘리지 않게 비율을 지켜 담는다
                <span className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={test.image} alt="" className="h-full w-full object-contain" />
                </span>
              ) : (
                <span className="flex aspect-square w-full items-center justify-center text-6xl">{test.emoji}</span>
              )}
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-zinc-400">{test.group}</span>
                <span className="text-sm font-bold leading-snug">{test.title}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Section
        id="quick"
        count={typeQuizzes.length}
      >
        {typeQuizzes.map((quiz) => (
          <a key={quiz.id} href={`/${quiz.id}`} className={CARD}>
            <QuizIcon image={quiz.image} emoji={quiz.emoji} size="lg" />
            <CardText title={quiz.title} description={quiz.description} />
          </a>
        ))}
      </Section>

      <Section
        id="personality"
        count={mbtiTests.length}
      >
        {mbtiTests.map((test) => (
          <a key={test.id} href={`/m/${test.id}`} className={CARD}>
            <MbtiResultIcon profile={test.profiles[0]} size="lg" />
            <CardText title={test.title} description={test.description} />
          </a>
        ))}
      </Section>

      {[
        { id: "saju", tests: sajuSeriesTests },
        { id: "traditional", tests: traditionalTests },
      ].map((section) => (
        <Section key={section.id} id={section.id} count={section.tests.length}>
          {section.tests.map((test) => (
            <a key={test.id} href={`/s/${test.id}`} className={CARD}>
              {test.image ? <PhotoIcon src={test.image} size="lg" /> : <span className="text-4xl">{test.emoji}</span>}
              <CardText title={test.title} description={test.description} />
            </a>
          ))}
        </Section>
      ))}

      <Section
        id="pick"
        count={tournaments.length + toppingTests.length}
      >
        {tournaments.map((tournament) => (
          <a key={tournament.id} href={`/w/${tournament.id}`} className={CARD}>
            {tournament.image ? (
              <PhotoIcon src={tournament.image} size="lg" />
            ) : (
              <span className="text-4xl">{tournament.emoji}</span>
            )}
            <CardText title={tournament.title} description={tournament.description} />
          </a>
        ))}
        {toppingTests.map((test) => (
          <a key={test.id} href={`/c/${test.id}`} className={CARD}>
            {test.image ? (
              <PhotoIcon src={test.image} size="lg" aspect="aspect-[5/6]" />
            ) : (
              <span className="text-4xl">{test.emoji}</span>
            )}
            <CardText title={test.title} description={test.description} />
          </a>
        ))}
      </Section>

      <Section
        id="life"
        count={decisionTests.length + checklists.length}
      >
        {decisionTests.map((test) => (
          <a key={test.id} href={`/d/${test.id}`} className={CARD}>
            {test.image ? (
              <PhotoIcon
                src={test.image}
                size="lg"
                aspect={test.imageShape?.aspect}
                sizeBy={test.imageShape?.wide ? "width" : "height"}
              />
            ) : (
              <span className="text-4xl">{test.emoji}</span>
            )}
            <CardText title={test.title} description={test.description} />
          </a>
        ))}
        {checklists.map((checklist) => (
          <a key={checklist.id} href={`/l/${checklist.id}`} className={CARD}>
            {checklist.image ? (
              <PhotoIcon src={checklist.image} size="lg" />
            ) : (
              <span className="text-4xl">{checklist.emoji}</span>
            )}
            <CardText title={checklist.title} description={checklist.description} />
          </a>
        ))}
      </Section>

      <div className="w-full pt-2">
        <AdSlot slot="home-bottom" />
      </div>
    </div>
  );
}

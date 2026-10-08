import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sajuTests, getSajuTest, dayMasters, getDayMaster, getElement } from "@/data/saju";
import { STEMS, BRANCHES } from "@/lib/saju/constants";
import zodiacCopy from "@/data/saju/zodiac";
import { ZODIAC_SLUGS, zodiacBranchOf } from "@/lib/saju/zodiac";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { DayMasterIcon } from "@/components/saju/DayMasterIcon";
import { ZodiacResult } from "@/components/saju/ZodiacResult";
import { DreamEntryView, DREAM_TONE } from "@/components/saju/DreamEntryView";
import { dreams, getDream } from "@/data/saju/dreams";
import { RelatedTests } from "@/components/RelatedTests";
import { TarotMeaningView } from "@/components/saju/TarotMeaningView";
import { tarotCards } from "@/data/saju/tarot";
import { ItemTrail } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/site";

type Params = { testId: string; slug: string };

export function generateStaticParams() {
  return sajuTests.flatMap((test) =>
    test.kind === "chart"
      ? dayMasters.map((profile) => ({ testId: test.id, slug: profile.slug }))
      : test.kind === "zodiac"
        ? ZODIAC_SLUGS.map((slug) => ({ testId: test.id, slug }))
        : test.kind === "dream"
          ? dreams.map((dream) => ({ testId: test.id, slug: dream.slug }))
          : test.kind === "tarot"
            ? tarotCards.map((card) => ({ testId: test.id, slug: card.slug }))
            : []
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { testId, slug } = await params;
  const test = getSajuTest(testId);
  // 풀이 항목 페이지는 개인 결과가 아니라 누구에게나 같은 내용이라 검색에 노출한다 (사이트맵에도 싣는다).
  const canonical = { canonical: `${getSiteUrl()}/s/${testId}/t/${slug}` };
  if (test?.kind === "tarot") {
    const card = tarotCards.find((item) => item.slug === slug);
    if (!card) return {};
    const title = `타로 ${card.nameKo}(${card.nameEn}) 카드 의미 — 정방향·역방향 풀이`;
    const description = `${card.nameKo} 카드는 정방향이면 ${card.keywords.upright.join("·")}, 역방향이면 ${card.keywords.reversed.join("·")}. 전체운·연애·일·금전 풀이와 그림에 담긴 상징을 정리했어요.`;
    return {
      title,
      description,
      openGraph: { title, description, type: "article" },
      twitter: { card: "summary_large_image", title, description },
      alternates: canonical,
    };
  }
  if (test?.kind === "dream") {
    const dream = getDream(slug);
    if (!dream) return {};
    const title = `${dream.emoji} ${dream.title} 해몽 — ${DREAM_TONE[dream.tone].label}`;
    const description = dream.summary;
    return {
      title,
      description,
      openGraph: { title, description, type: "website" },
      twitter: { card: "summary_large_image", title, description },
      alternates: canonical,
    };
  }
  if (test?.kind === "zodiac") {
    const branch = zodiacBranchOf(slug);
    if (branch === null) return {};
    const animal = zodiacCopy.animals[slug];
    const title = `${animal.emoji} ${BRANCHES[branch].animal}띠 오늘의 운세`;
    const description = `${BRANCHES[branch].animal}띠 오늘의 운세와 년생별 한 줄 운세, 올해·내년 띠 운세 — ${animal.title}`;
    return {
      title,
      description,
      openGraph: { title, description, type: "website" },
      twitter: { card: "summary_large_image", title, description },
      alternates: canonical,
    };
  }
  const profile = getDayMaster(slug);
  if (!test || !profile) return {};

  const title = `${profile.name} 일간 성격과 특징 — "${profile.title}" ${profile.emoji}`;
  const description = `${profile.subtitle} — 사주 일간이 ${profile.name}인 사람의 강점, 조심하면 좋은 점, 오행 기운을 정리했어요.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: canonical,
  };
}

// 공유 링크로 들어오는 일간 유형 소개 페이지 — 생년월일 없이 유형 설명만 보여준다.
export default async function SajuTypePage({ params }: { params: Promise<Params> }) {
  const { testId, slug } = await params;
  const test = getSajuTest(testId);
  const itemPath = `/s/${testId}/t/${slug}`;
  if (test?.kind === "tarot") {
    const card = tarotCards.find((item) => item.slug === slug);
    if (!card) notFound();
    return (
      <div className="flex w-full max-w-md flex-1 flex-col items-center gap-6 px-6 py-16">
        <ItemTrail testKey={`s/${test.id}`} item={{ name: `${card.nameKo} 카드`, path: itemPath }} />
        <TarotMeaningView test={test} card={card} />
      </div>
    );
  }
  if (test?.kind === "dream") {
    const dream = getDream(slug);
    if (!dream) notFound();
    return (
      <div className="flex w-full max-w-md flex-1 flex-col items-center gap-6 px-6 py-16">
        <ItemTrail testKey={`s/${test.id}`} item={{ name: `${dream.title} 해몽`, path: itemPath }} />
        <DreamEntryView test={test} dream={dream} />
      </div>
    );
  }
  if (test?.kind === "zodiac") {
    const branch = zodiacBranchOf(slug);
    if (branch === null) notFound();
    return (
      <div className="flex w-full max-w-md flex-1 flex-col items-center gap-6 px-6 py-16">
        <ItemTrail testKey={`s/${test.id}`} item={{ name: `${BRANCHES[branch].animal}띠`, path: itemPath }} />
        <ZodiacResult test={test} branch={branch} related={<RelatedTests current={`s/${test.id}`} />} />
      </div>
    );
  }
  const profile = getDayMaster(slug);
  if (!test || test.kind !== "chart" || !profile) notFound();

  const stem = STEMS.find((item) => item.slug === profile.slug)!;
  const element = getElement(stem.element);

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <ItemTrail testKey={`s/${test.id}`} item={{ name: `${profile.name} 일간`, path: itemPath }} />
        <p className="text-sm font-medium text-zinc-400">
          사주 시리즈 · 일간 유형
        </p>

        <div
          className="flex w-full flex-col items-center gap-3 rounded-3xl px-6 py-10 shadow-sm"
          style={{ backgroundColor: profile.color }}
        >
          <p className="text-sm font-semibold text-zinc-700">
            {profile.name}({stem.hanja}
            {element.hanja}) · {stem.yang ? "양" : "음"}의 {element.name}
          </p>
          <DayMasterIcon profile={profile} alt={`${profile.name} 일간 일러스트`} />
          <h1 className="text-2xl font-extrabold text-zinc-900">{profile.title}</h1>
          <p className="text-base font-medium text-zinc-800">{profile.subtitle}</p>
        </div>

        <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {profile.description}
        </p>

        <div className="grid w-full grid-cols-2 gap-3 text-left">
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="text-sm font-bold">타고난 강점</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
              {profile.strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="text-sm font-bold">조심하면 좋은 점</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
              {profile.cautions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-zinc-200 p-4 text-left dark:border-zinc-800">
          <p className="text-sm font-bold" style={{ color: element.color }}>
            {element.name}({element.hanja}) 기운이란?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {element.meaning}
          </p>
        </div>

        {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
        <a
          href={`/s/${test.id}`}
          className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg"
          style={{ backgroundColor: test.accentColor }}
        >
          내 사주 원국 보러 가기
        </a>

        <ShareBar
          title={`${profile.emoji} 일간 ${profile.name} "${profile.title}"`}
          text={`${profile.name}은 "${profile.title}" 유형이래!\n${profile.subtitle}\n너의 일간은 뭘까? 👉`}
          accentColor={test.accentColor}
        />

        <RelatedTests current={`s/${test.id}`} />

        <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
          다른 테스트 살펴보기
        </a>

        <div className="w-full pt-4">
          <AdSlot slot="saju-type-bottom" />
        </div>
      </div>
    </div>
  );
}

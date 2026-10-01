import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sajuTests, getSajuTest, dayMasters, getDayMaster, getElement } from "@/data/saju";
import { STEMS } from "@/lib/saju/constants";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { DayMasterIcon } from "@/components/saju/DayMasterIcon";

type Params = { testId: string; slug: string };

export function generateStaticParams() {
  return sajuTests.flatMap((test) => dayMasters.map((profile) => ({ testId: test.id, slug: profile.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { testId, slug } = await params;
  const test = getSajuTest(testId);
  const profile = getDayMaster(slug);
  if (!test || !profile) return {};

  const title = `내 일간은 ${profile.name} "${profile.title}" ${profile.emoji}`;
  const description = `${profile.subtitle} — ${test.title}에서 나온 일간 유형이에요.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    // 다른 결과 페이지와 마찬가지로 공유용이라 검색 색인에서는 뺀다.
    robots: { index: false, follow: true },
  };
}

// 공유 링크로 들어오는 일간 유형 소개 페이지 — 생년월일 없이 유형 설명만 보여준다.
export default async function SajuTypePage({ params }: { params: Promise<Params> }) {
  const { testId, slug } = await params;
  const test = getSajuTest(testId);
  const profile = getDayMaster(slug);
  if (!test || !profile) notFound();

  const stem = STEMS.find((item) => item.slug === profile.slug)!;
  const element = getElement(stem.element);

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex w-full flex-col items-center gap-6 text-center">
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
          <DayMasterIcon profile={profile} />
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

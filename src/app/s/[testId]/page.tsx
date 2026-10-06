import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sajuTests, getSajuTest } from "@/data/saju";
import { SajuForm } from "@/components/saju/SajuForm";
import { FortuneStart } from "@/components/saju/FortuneStart";
import { DailyStart } from "@/components/saju/DailyStart";
import { CompatStart } from "@/components/saju/CompatStart";
import { SajuGuide, FortuneGuide, DailyGuide, DaeunGuide, CompatGuide, YearlyGuide, ZodiacGuide, TojeongGuide } from "@/components/TestGuides";
import { ZodiacStart } from "@/components/saju/ZodiacStart";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return sajuTests.map((test) => ({ testId: test.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ testId: string }>;
}): Promise<Metadata> {
  const { testId } = await params;
  const test = getSajuTest(testId);
  if (!test) return {};

  const title = `${test.emoji} ${test.title}`;
  return {
    title,
    description: test.description,
    openGraph: { title, description: test.description, type: "website" },
    twitter: { card: "summary_large_image", title, description: test.description },
    alternates: { canonical: `${getSiteUrl()}/s/${test.id}` },
  };
}

export default async function SajuTestPage({
  params,
  searchParams,
}: {
  params: Promise<{ testId: string }>;
  searchParams: Promise<{ group?: string; create?: string }>;
}) {
  const { testId } = await params;
  const { group, create } = await searchParams;
  const test = getSajuTest(testId);
  if (!test) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      {test.kind === "fortune" ? (
        <FortuneStart
          test={test}
          initialGroupId={group}
          startWithCreate={create === "1"}
          guide={<FortuneGuide test={test} />}
        />
      ) : test.kind === "daily" ? (
        <DailyStart test={test} guide={<DailyGuide test={test} />} />
      ) : test.kind === "tojeong" ? (
        <DailyStart
          test={test}
          guide={<TojeongGuide test={test} />}
          submitLabel="토정비결 보기"
          quickLabel="토정비결 바로 보기"
          genderNote={null}
          askTime={false}
          allowRemember={false}
        />
      ) : test.kind === "zodiac" ? (
        <ZodiacStart test={test} guide={<ZodiacGuide test={test} />} />
      ) : test.kind === "yearly" ? (
        <DailyStart
          test={test}
          guide={<YearlyGuide test={test} />}
          submitLabel="신년 운세 보기"
          quickLabel="신년 운세 바로 보기"
          rememberNote="다음에는 입력 없이 바로 볼 수 있어요."
        />
      ) : test.kind === "compat" ? (
        <CompatStart test={test} guide={<CompatGuide test={test} />} />
      ) : test.kind === "daeun" ? (
        <SajuForm
          test={test}
          guide={<DaeunGuide test={test} />}
          submitLabel="내 대운 보기"
          genderNote="대운이 앞으로 흐를지(순행) 거꾸로 흐를지(역행)를 정할 때 쓰여요."
        />
      ) : (
        <SajuForm test={test} guide={<SajuGuide test={test} />} />
      )}
    </div>
  );
}

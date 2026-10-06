import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sajuTests, getSajuTest } from "@/data/saju";
import { SajuResult } from "@/components/saju/SajuResult";
import { FortuneResult } from "@/components/saju/FortuneResult";
import { DailyResult } from "@/components/saju/DailyResult";
import { DaeunResult } from "@/components/saju/DaeunResult";
import { CompatResult } from "@/components/saju/CompatResult";
import { YearlyResult } from "@/components/saju/YearlyResult";

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
  return {
    title: `${test.title} 결과`,
    // 생년월일로 계산한 개인 결과 화면 — 내용이 사람마다 브라우저에서만 만들어지므로 색인하지 않는다.
    robots: { index: false, follow: true },
  };
}

export default async function SajuResultPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getSajuTest(testId);
  if (!test) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center px-6 py-16">
      {test.kind === "fortune" ? (
        <FortuneResult test={test} />
      ) : test.kind === "daily" ? (
        <DailyResult test={test} />
      ) : test.kind === "compat" ? (
        <CompatResult test={test} />
      ) : test.kind === "yearly" ? (
        <YearlyResult test={test} />
      ) : test.kind === "daeun" ? (
        <DaeunResult test={test} />
      ) : (
        <SajuResult test={test} />
      )}
    </div>
  );
}

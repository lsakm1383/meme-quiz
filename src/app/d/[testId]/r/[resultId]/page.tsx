import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { decisionTests, getDecisionTest, getDecisionResult } from "@/data/decisions";
import { DecisionResultView } from "@/components/DecisionResultView";
import { getSiteUrl } from "@/lib/site";

type Params = { testId: string; resultId: string };

export function generateStaticParams() {
  return decisionTests.flatMap((test) =>
    test.results.map((result) => ({ testId: test.id, resultId: result.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { testId, resultId } = await params;
  const test = getDecisionTest(testId);
  const result = test && getDecisionResult(test, resultId);
  if (!test || !result) return {};

  const title = `나는 "${result.title}" ${result.emoji}`;
  const description = `${result.subtitle} — ${test.title}에서 나온 결과예요.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `${getSiteUrl()}/d/${test.id}/r/${result.id}`,
    },
  };
}

export default async function DecisionResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { testId, resultId } = await params;
  const test = getDecisionTest(testId);
  const result = test && getDecisionResult(test, resultId);
  if (!test || !result) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <DecisionResultView test={test} result={result} />
    </div>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mbtiTests, getMbtiTest } from "@/data/mbti";
import { MbtiRunner } from "@/components/MbtiRunner";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return mbtiTests.map((test) => ({ testId: test.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ testId: string }>;
}): Promise<Metadata> {
  const { testId } = await params;
  const test = getMbtiTest(testId);
  if (!test) return {};

  const title = `${test.emoji} ${test.title}`;
  return {
    title,
    description: test.description,
    openGraph: { title, description: test.description, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description: test.description,
    },
    alternates: { canonical: `${getSiteUrl()}/m/${test.id}` },
  };
}

export default async function MbtiTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const test = getMbtiTest(testId);
  if (!test) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <MbtiRunner test={test} />
    </div>
  );
}

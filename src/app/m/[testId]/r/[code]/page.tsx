import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mbtiTests, getMbtiTest, getMbtiProfile } from "@/data/mbti";
import { MbtiResultView } from "@/components/MbtiResultView";
import { getSiteUrl } from "@/lib/site";

type Params = { testId: string; code: string };

export function generateStaticParams() {
  return mbtiTests.flatMap((test) =>
    test.profiles.map((profile) => ({ testId: test.id, code: profile.code }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { testId, code } = await params;
  const test = getMbtiTest(testId);
  const profile = test && getMbtiProfile(test, code);
  if (!test || !profile) return {};

  const title = `나는 "${profile.code} ${profile.title}" ${profile.emoji}`;
  const description = `${profile.subtitle} — ${test.title}에서 나온 결과예요.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${getSiteUrl()}/m/${test.id}/r/${profile.code}` },
  };
}

export default async function MbtiResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { testId, code } = await params;
  const test = getMbtiTest(testId);
  const profile = test && getMbtiProfile(test, code);
  if (!test || !profile) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <MbtiResultView test={test} profile={profile} />
    </div>
  );
}

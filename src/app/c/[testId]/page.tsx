import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toppingTests, getToppingTest } from "@/data/toppings";
import { ToppingBuilderRunner } from "@/components/ToppingBuilderRunner";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return toppingTests.map((test) => ({ testId: test.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ testId: string }>;
}): Promise<Metadata> {
  const { testId } = await params;
  const test = getToppingTest(testId);
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
    alternates: { canonical: `${getSiteUrl()}/c/${test.id}` },
  };
}

export default async function ToppingTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const test = getToppingTest(testId);
  if (!test) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <ToppingBuilderRunner test={test} />
    </div>
  );
}

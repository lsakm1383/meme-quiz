import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSajuTest } from "@/data/saju";
import { FortuneGroupBoard } from "@/components/saju/FortuneGroupBoard";

type Params = { testId: string; groupId: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { testId } = await params;
  const test = getSajuTest(testId);
  if (!test) return {};
  const title = `🏆 우리 그룹 사주 운세 순위 | ${test.title}`;
  const description = "재물운·연애운·결혼운·직업운, 우리 그룹 1등은 누구일까? 참여해서 순위를 확인해보세요.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    // 사용자가 만든 그룹 화면이라 검색 색인에서 뺀다.
    robots: { index: false, follow: true },
  };
}

export default async function FortuneGroupPage({ params }: { params: Promise<Params> }) {
  const { testId, groupId } = await params;
  const test = getSajuTest(testId);
  if (!test || test.kind !== "fortune") notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center px-6 py-16">
      <FortuneGroupBoard test={test} groupId={groupId} />
    </div>
  );
}

import { notFound } from "next/navigation";
import { decisionTests, getDecisionTest } from "@/data/decisions";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "생활 편의 테스트";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return decisionTests.map((test) => ({ testId: test.id }));
}

// 시작 화면 공유 미리보기 — 대표 그림과 테스트 이름
export default async function Image({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getDecisionTest(testId);
  if (!test) notFound();
  return startOgImage({ label: "생활 편의", title: test.title, accentColor: test.accentColor, images: test.image ? [test.image] : [], emoji: test.emoji });
}

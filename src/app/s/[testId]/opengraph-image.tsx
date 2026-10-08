import { notFound } from "next/navigation";
import { sajuTests, getSajuTest, seriesNameOf } from "@/data/saju";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "사주·전통 운세 테스트";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return sajuTests.map((test) => ({ testId: test.id }));
}

// 시작 화면 공유 미리보기 — 결과를 시작 화면 주소로 공유하는 테스트(손금·타로·토정비결 등)도 이 그림이 미리보기로 뜬다.
export default async function Image({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getSajuTest(testId);
  if (!test) notFound();
  return startOgImage({
    label: seriesNameOf(test),
    title: test.title,
    accentColor: test.accentColor,
    images: test.image ? [test.image] : [],
    emoji: test.emoji,
  });
}

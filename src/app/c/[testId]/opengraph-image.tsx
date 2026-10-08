import { notFound } from "next/navigation";
import { toppingTests, getToppingTest } from "@/data/toppings";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "나만의 조합 만들기";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return toppingTests.map((test) => ({ testId: test.id }));
}

// 시작 화면 공유 미리보기 — 대표 그림과 테스트 이름
export default async function Image({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getToppingTest(testId);
  if (!test) notFound();
  return startOgImage({ label: "나만의 조합 만들기", title: test.title, accentColor: test.accentColor, images: test.image ? [test.image] : [], emoji: test.emoji });
}

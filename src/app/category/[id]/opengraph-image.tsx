import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getRegisteredTest } from "@/lib/test-registry";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "분야별 모아보기";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

// 분야 공유 미리보기 — 그 분야 테스트 그림 4장을 모아 보여준다.
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();
  const images = category.tests.flatMap((key) => getRegisteredTest(key)?.image ?? []).slice(0, 4);
  return startOgImage({
    label: "분야별 모아보기",
    title: `${category.title} ${category.tests.length}가지`,
    accentColor: "#6d28d9",
    images,
    button: "골라 보기",
  });
}

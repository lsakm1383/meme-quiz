import { notFound } from "next/navigation";
import { quizzes, getQuiz } from "@/data/quizzes";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "1분 테스트";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return quizzes.map((test) => ({ quizId: test.id }));
}

// 시작 화면 공유 미리보기 — 대표 그림과 테스트 이름
export default async function Image({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const test = getQuiz(quizId);
  if (!test) notFound();
  return startOgImage({ label: "1분 테스트", title: test.title, accentColor: test.accentColor, images: test.image ? [test.image.src] : [], emoji: test.emoji });
}

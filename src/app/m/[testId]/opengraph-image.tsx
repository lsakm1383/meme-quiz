import { notFound } from "next/navigation";
import { mbtiTests, getMbtiTest } from "@/data/mbti";
import { getMbtiPhoto } from "@/data/mbti/photos";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "성격 유형 테스트";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return mbtiTests.map((test) => ({ testId: test.id }));
}

// 시작 화면 공유 미리보기 — 대표 그림과 테스트 이름
export default async function Image({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  const test = getMbtiTest(testId);
  if (!test) notFound();
  // 대표 그림이 따로 없어서 결과 유형 그림 4장을 모아 보여준다.
  const images = [0, 5, 10, 15].flatMap((index) => {
    const profile = test.profiles[index];
    const photo = profile && getMbtiPhoto(profile.slug);
    return photo ? [photo.src] : [];
  });
  return startOgImage({ label: "성격 유형 테스트", title: test.title, accentColor: test.accentColor, images, emoji: test.emoji });
}

import { notFound } from "next/navigation";
import { tournaments, getTournament } from "@/data/tournaments";
import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "월드컵";
export const size = startOgSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return tournaments.map((test) => ({ tournamentId: test.id }));
}

// 시작 화면 공유 미리보기 — 대표 그림과 테스트 이름
export default async function Image({ params }: { params: Promise<{ tournamentId: string }> }) {
  const { tournamentId } = await params;
  const test = getTournament(tournamentId);
  if (!test) notFound();
  return startOgImage({ label: "월드컵", title: test.title, accentColor: test.accentColor, images: test.image ? [test.image] : [], emoji: test.emoji });
}

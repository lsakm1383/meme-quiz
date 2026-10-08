import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { tournaments, getTournament, getCandidate } from "@/data/tournaments";
import { TournamentResultView } from "@/components/TournamentResultView";

type Params = { tournamentId: string; winnerId: string };

export function generateStaticParams() {
  return tournaments.flatMap((tournament) =>
    tournament.candidates.map((candidate) => ({
      tournamentId: tournament.id,
      winnerId: candidate.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tournamentId, winnerId } = await params;
  const tournament = getTournament(tournamentId);
  const winner = tournament && getCandidate(tournament, winnerId);
  if (!tournament || !winner) return {};

  const title = `최종 우승: "${winner.name}" ${winner.emoji}`;
  const description = `${winner.tagline} — ${tournament.title} 최종 우승은 ${winner.name}!`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    // 후보마다 한 줄 설명뿐인 얇은 페이지라 검색 색인에서는 뺀다 (공유 링크·미리보기는 그대로 동작).
    // 페이지 안의 링크는 계속 따라가도록 follow는 유지한다.
    robots: { index: false, follow: true },
  };
}

export default async function TournamentResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tournamentId, winnerId } = await params;
  const tournament = getTournament(tournamentId);
  const winner = tournament && getCandidate(tournament, winnerId);
  if (!tournament) notFound();
  // 후보에서 빠진 항목(예: 라면 월드컵 64강→32강)으로 예전에 공유된 링크는 시작 화면으로 보낸다
  if (!winner) redirect(`/w/${tournament.id}`);

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <TournamentResultView tournament={tournament} winner={winner} />
    </div>
  );
}

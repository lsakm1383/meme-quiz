import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tournaments, getTournament, getCandidate } from "@/data/tournaments";
import { TournamentResultView } from "@/components/TournamentResultView";
import { getSiteUrl } from "@/lib/site";

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
    alternates: {
      canonical: `${getSiteUrl()}/w/${tournament.id}/r/${winner.id}`,
    },
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
  if (!tournament || !winner) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <TournamentResultView tournament={tournament} winner={winner} />
    </div>
  );
}

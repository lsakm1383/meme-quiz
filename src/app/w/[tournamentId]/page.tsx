import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tournaments, getTournament } from "@/data/tournaments";
import { TournamentRunner } from "@/components/TournamentRunner";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return tournaments.map((tournament) => ({ tournamentId: tournament.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tournamentId: string }>;
}): Promise<Metadata> {
  const { tournamentId } = await params;
  const tournament = getTournament(tournamentId);
  if (!tournament) return {};

  const title = `${tournament.emoji} ${tournament.title}`;
  return {
    title,
    description: tournament.description,
    openGraph: { title, description: tournament.description, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description: tournament.description,
    },
    alternates: { canonical: `${getSiteUrl()}/w/${tournament.id}` },
  };
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ tournamentId: string }>;
}) {
  const { tournamentId } = await params;
  const tournament = getTournament(tournamentId);
  if (!tournament) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <TournamentRunner tournament={tournament} />
    </div>
  );
}

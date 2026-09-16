import Link from "next/link";
import type { TournamentCandidate, TournamentConfig } from "@/data/tournament-types";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

export function TournamentResultView({
  tournament,
  winner,
}: {
  tournament: TournamentConfig;
  winner: TournamentCandidate;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">
        {tournament.title} 최종 우승
      </p>

      <div
        className="flex w-full flex-col items-center gap-2 rounded-3xl px-6 py-10 shadow-sm"
        style={{ backgroundColor: winner.color }}
      >
        <div className="text-5xl">🏆</div>
        <div className="text-6xl">{winner.emoji}</div>
        <h1 className="mt-1 text-2xl font-extrabold text-zinc-900">
          {winner.name}
        </h1>
        <p className="text-base font-medium text-zinc-800">{winner.tagline}</p>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {winner.description}
      </p>

      <ShareBar
        title={`나의 최종 우승은 "${winner.name}" ${winner.emoji}`}
        text={`${tournament.title} — 최종 우승: ${winner.name} ${winner.emoji}\n${winner.tagline}`}
        accentColor={tournament.accentColor}
      />

      <div className="flex items-center gap-4">
        <Link
          href={`/w/${tournament.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 하기
        </Link>
        <span className="text-zinc-300">·</span>
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다른 테스트 살펴보기
        </Link>
      </div>

      <div className="w-full pt-4">
        <AdSlot slot="tournament-result-bottom" />
      </div>
    </div>
  );
}

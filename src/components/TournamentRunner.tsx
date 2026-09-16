"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  TournamentCandidate,
  TournamentConfig,
} from "@/data/tournament-types";
import { RamenIcon } from "@/components/RamenIcon";

export function TournamentRunner({
  tournament,
}: {
  tournament: TournamentConfig;
}) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState<TournamentCandidate[]>(
    tournament.candidates
  );
  const [matchIndex, setMatchIndex] = useState(0);
  const [winners, setWinners] = useState<TournamentCandidate[]>([]);
  const [matchesDone, setMatchesDone] = useState(0);

  const totalMatches = tournament.candidates.length - 1;

  function pick(winner: TournamentCandidate) {
    const updatedWinners = [...winners, winner];
    const doneCount = matchesDone + 1;
    const isLastMatchInRound = matchIndex + 1 >= round.length / 2;

    if (!isLastMatchInRound) {
      setWinners(updatedWinners);
      setMatchIndex(matchIndex + 1);
      setMatchesDone(doneCount);
      return;
    }

    if (updatedWinners.length === 1) {
      router.push(`/w/${tournament.id}/r/${updatedWinners[0].id}`);
      return;
    }

    setRound(updatedWinners);
    setWinners([]);
    setMatchIndex(0);
    setMatchesDone(doneCount);
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-7xl">{tournament.emoji}</div>
        <h1 className="text-2xl font-bold leading-snug">{tournament.title}</h1>
        <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {tournament.description}
        </p>
        <button
          onClick={() => setStarted(true)}
          className="mt-2 w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: tournament.accentColor }}
        >
          시작하기
        </button>
        <p className="text-xs text-zinc-400">
          {tournament.candidates.length}강 토너먼트 · 1분 소요
        </p>
      </div>
    );
  }

  const left = round[matchIndex * 2];
  const right = round[matchIndex * 2 + 1];
  const progress = Math.round((matchesDone / totalMatches) * 100);
  const roundLabel = round.length === 2 ? "결승" : `${round.length}강`;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: tournament.accentColor,
          }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">{roundLabel}</p>
      <h2 className="text-center text-lg font-bold leading-snug">
        둘 중 하나만 고른다면?
      </h2>
      <div className="flex flex-col gap-4">
        {[left, right].map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => pick(candidate)}
            className="flex flex-col items-center gap-2 rounded-3xl border border-zinc-200 px-6 py-8 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
          >
            <RamenIcon candidate={candidate} />
            <span className="text-lg font-bold">{candidate.name}</span>
            <span className="text-sm text-zinc-500">{candidate.tagline}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

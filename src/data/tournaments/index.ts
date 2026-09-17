import type { TournamentConfig } from "@/data/tournament-types";
import ramenWorldcup from "@/data/tournaments/ramen-worldcup";
import icecreamWorldcup from "@/data/tournaments/icecream-worldcup";

// 새 월드컵 추가 방법:
// 1. 이 폴더에 새 데이터 파일 하나 추가 (ramen-worldcup.ts 복사해서 후보만 교체, 후보 개수는 2의 거듭제곱)
// 2. 아래 배열에 import + 등록
export const tournaments: TournamentConfig[] = [ramenWorldcup, icecreamWorldcup];

export function getTournament(id: string): TournamentConfig | undefined {
  return tournaments.find((tournament) => tournament.id === id);
}

export function getCandidate(tournament: TournamentConfig, candidateId: string) {
  return tournament.candidates.find((candidate) => candidate.id === candidateId);
}

import type { TournamentCandidate } from "@/data/tournament-types";
import { getRamenStyle } from "@/data/ramen-styles";
import { getIceCreamStyle } from "@/data/icecream-styles";
import { RamenIcon } from "@/components/RamenIcon";
import { IceCreamIcon } from "@/components/IceCreamIcon";

type IconSize = "lg" | "sm" | "xs";

const TEXT: Record<IconSize, string> = { lg: "text-5xl", sm: "text-3xl", xs: "text-lg" };

// 후보 id가 어느 그림 스타일 매핑에 속하는지 보고 알맞은 일러스트 컴포넌트로 넘긴다.
// 매핑이 없는 토너먼트(향후 추가분 포함)는 그냥 emoji로 폴백한다.
export function TournamentIcon({
  candidate,
  size = "lg",
}: {
  candidate: TournamentCandidate;
  size?: IconSize;
}) {
  if (getRamenStyle(candidate.id)) return <RamenIcon candidate={candidate} size={size} />;
  if (getIceCreamStyle(candidate.id)) return <IceCreamIcon candidate={candidate} size={size} />;
  return <span className={TEXT[size]}>{candidate.emoji}</span>;
}

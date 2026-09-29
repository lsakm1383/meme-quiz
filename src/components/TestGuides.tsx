import type { QuizConfig } from "@/data/quiz-types";
import type { TournamentConfig } from "@/data/tournament-types";
import type { DecisionTestConfig } from "@/data/decision-types";
import type { ToppingTestConfig } from "@/data/topping-types";
import type { MbtiTestConfig } from "@/data/mbti-types";
import { getGuide } from "@/data/guides";
import { TIERS } from "@/lib/topping-rarity";
import { ContentGuide } from "@/components/ContentGuide";
import { MbtiResultIcon } from "@/components/MbtiResultIcon";
import { TournamentIcon } from "@/components/TournamentIcon";
import { DecisionResultIcon } from "@/components/DecisionResultIcon";
import { PhotoIcon } from "@/components/PhotoIcon";

// 콘텐츠 유형별로 결과 목록을 ContentGuide 항목으로 바꿔 넘기는 얇은 래퍼들.
// 소개글이 등록되지 않은 테스트는 null — 시작 화면에 소개 섹션 없이 버튼만 보인다.

export function MbtiGuide({ test }: { test: MbtiTestConfig }) {
  const guide = getGuide(`m/${test.id}`);
  if (!guide) return null;
  return (
    <ContentGuide
      guide={guide}
      accentColor={test.accentColor}
      layout="stack"
      items={test.profiles.map((profile) => ({
        key: profile.slug,
        icon: <MbtiResultIcon profile={profile} size="xl" />,
        title: profile.title,
        subtitle: profile.subtitle,
        description: profile.description,
        href: `/m/${test.id}/r/${profile.slug}`,
      }))}
    />
  );
}

export function QuizGuide({ quiz }: { quiz: QuizConfig }) {
  const guide = getGuide(quiz.id);
  if (!guide) return null;
  return (
    <ContentGuide
      guide={guide}
      accentColor={quiz.accentColor}
      items={quiz.results.map((result) => ({
        key: result.id,
        icon: <span className="shrink-0 text-4xl">{result.emoji}</span>,
        title: result.title,
        subtitle: result.subtitle,
        description: result.description,
        href: `/${quiz.id}/r/${result.id}`,
      }))}
    />
  );
}

// 월드컵 결과 페이지는 "최종 우승" 화면이라, 직접 고르지 않은 후보로 링크하지 않는다.
export function TournamentGuide({ tournament }: { tournament: TournamentConfig }) {
  const guide = getGuide(`w/${tournament.id}`);
  if (!guide) return null;
  return (
    <ContentGuide
      guide={guide}
      accentColor={tournament.accentColor}
      items={tournament.candidates.map((candidate) => ({
        key: candidate.id,
        icon: (
          <span className="flex w-12 shrink-0 justify-center">
            <TournamentIcon candidate={candidate} size="sm" />
          </span>
        ),
        title: candidate.name,
        subtitle: candidate.tagline,
        description: candidate.description,
      }))}
    />
  );
}

export function DecisionGuide({ test }: { test: DecisionTestConfig }) {
  const guide = getGuide(`d/${test.id}`);
  if (!guide) return null;
  return (
    <ContentGuide
      guide={guide}
      accentColor={test.accentColor}
      items={test.results.map((result) => ({
        key: result.id,
        icon: (
          <span className="flex w-16 shrink-0 justify-center">
            <DecisionResultIcon result={result} size="lg" />
          </span>
        ),
        title: result.title,
        subtitle: result.subtitle,
        description: result.description,
        href: `/d/${test.id}/r/${result.id}`,
      }))}
    />
  );
}

// 조합형은 결과가 고정돼 있지 않으므로 희귀도 등급 5가지를 결과 목록으로 보여준다.
export function ToppingGuide({ test }: { test: ToppingTestConfig }) {
  const guide = getGuide(`c/${test.id}`);
  if (!guide) return null;
  return (
    <ContentGuide
      guide={guide}
      accentColor={test.accentColor}
      items={TIERS.map((tier, index) => {
        // 등급은 정수 희귀도가 max "미만"인 첫 등급으로 정해진다 (computeRarity).
        const from = index === 0 ? 0 : TIERS[index - 1].max;
        const range = Number.isFinite(tier.max) ? `${from}~${tier.max - 1}%` : `${from}% 이상`;
        return {
          key: tier.image,
          icon: <PhotoIcon src={tier.image} size="lg" aspect="aspect-[5/6]" />,
          title: tier.title,
          subtitle: tier.subtitle,
          description: `희귀도 ${range}`,
        };
      })}
    />
  );
}

import type { QuizConfig } from "@/data/quiz-types";
import type { TournamentConfig } from "@/data/tournament-types";
import type { DecisionTestConfig } from "@/data/decision-types";
import type { ToppingTestConfig } from "@/data/topping-types";
import type { MbtiTestConfig } from "@/data/mbti-types";
import type { ChecklistConfig } from "@/data/checklist-types";
import { dayMasters, type SajuTestConfig } from "@/data/saju";
import { getGuide } from "@/data/guides";
import { TIERS } from "@/lib/topping-rarity";
import { ContentGuide } from "@/components/ContentGuide";
import { MbtiResultIcon } from "@/components/MbtiResultIcon";
import { TournamentIcon } from "@/components/TournamentIcon";
import { DecisionResultIcon } from "@/components/DecisionResultIcon";
import { PhotoIcon } from "@/components/PhotoIcon";
import { DayMasterIcon } from "@/components/saju/DayMasterIcon";
import { QuizIcon } from "@/components/QuizIcon";

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
      // 결과 일러스트가 있으면 그림이 잘 보이도록 위에 크게 둔다
      layout={quiz.results.some((result) => result.image) ? "stack" : "row"}
      items={quiz.results.map((result) => ({
        key: result.id,
        icon: (
          <QuizIcon image={result.image} emoji={result.emoji} size={result.image ? "xl" : "lg"} />
        ),
        title: result.title,
        subtitle: result.subtitle,
        // 결과 상세가 있으면 이어지는 문단까지 보여준다 (강점·궁합 등은 결과 페이지에서)
        description: result.detail ? `${result.description} ${result.detail.more}` : result.description,
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
      // 가로로 긴 일러스트는 옆에 두면 너무 작아지므로 위에 크게 둔다
      layout={test.imageShape?.wide ? "stack" : "row"}
      items={test.results.map((result) => ({
        key: result.id,
        icon: test.imageShape?.wide ? (
          <DecisionResultIcon result={result} shape={test.imageShape} size="xl" />
        ) : (
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

// 사주는 일간 10유형을 결과 목록으로 보여주고, 각 유형 소개 페이지로 연결한다.
export function SajuGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return (
    <ContentGuide
      guide={guide}
      accentColor={test.accentColor}
      layout="stack"
      items={dayMasters.map((profile) => ({
        key: profile.slug,
        icon: <DayMasterIcon profile={profile} />,
        title: `${profile.name} · ${profile.title}`,
        subtitle: profile.subtitle,
        description: profile.description,
        href: `/s/${test.id}/t/${profile.slug}`,
      }))}
    />
  );
}

// 그룹 운세는 고정된 결과 목록 대신 점수 규칙 설명이 중심이라 결과 목록 없이 보여준다.
export function FortuneGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 오늘의 운세도 고정된 결과 목록이 없어 설명·FAQ만 보여준다.
export function DailyGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 대운도 고정 결과 목록 없이 계산 방법·FAQ만 보여준다.
export function DaeunGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 1:1 궁합도 고정 결과 목록 없이 보는 방법·FAQ만 보여준다.
export function CompatGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 신년 운세도 고정 결과 목록 없이 보는 방법·FAQ만 보여준다.
export function YearlyGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 띠별 운세도 고정 결과 목록 없이 보는 방법·FAQ만 보여준다.
export function ZodiacGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 토정비결도 고정 결과 목록 없이 보는 방법·FAQ만 보여준다.
export function TojeongGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 꿈해몽도 고정 결과 목록 없이 찾는 방법·FAQ만 보여준다.
export function DreamGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 손금도 고정 결과 목록 없이 보는 방법·FAQ만 보여준다.
export function PalmGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 타로도 고정 결과 목록 없이 보는 방법·FAQ만 보여준다.
export function TarotGuide({ test }: { test: SajuTestConfig }) {
  const guide = getGuide(`s/${test.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={test.accentColor} />;
}

// 체크리스트는 결과가 없으므로 결과 목록 없이 준비 가이드만 보여준다.
export function ChecklistGuide({ checklist }: { checklist: ChecklistConfig }) {
  const guide = getGuide(`l/${checklist.id}`);
  if (!guide) return null;
  return <ContentGuide guide={guide} accentColor={checklist.accentColor} />;
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

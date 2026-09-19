import Link from "next/link";
import type { MbtiTestConfig, MbtiTypeProfile } from "@/data/mbti-types";
import { getMbtiProfileByCode } from "@/data/mbti";
import { getTopCloseCode, getTopCautionCode } from "@/data/mbti/compat";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { ResultStats } from "@/components/ResultStats";

function RelationCard({
  label,
  tone,
  profile,
  reason,
}: {
  label: string;
  tone: string;
  profile: MbtiTypeProfile;
  reason: string;
}) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-zinc-200 p-4 text-left dark:border-zinc-800">
      <span
        className="w-fit rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ backgroundColor: tone }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{profile.emoji}</span>
        <span className="font-bold">{profile.title}</span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {reason}
      </p>
    </div>
  );
}

export function MbtiResultView({
  test,
  profile,
}: {
  test: MbtiTestConfig;
  profile: MbtiTypeProfile;
}) {
  const closeCode = getTopCloseCode(profile.code);
  const cautionCode = getTopCautionCode(profile.code);
  const closeProfile = getMbtiProfileByCode(test, closeCode);
  const cautionProfile = getMbtiProfileByCode(test, cautionCode);

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">{test.title} 결과</p>

      <div
        className="flex w-full flex-col items-center gap-3 rounded-3xl px-6 py-10 shadow-sm"
        style={{ backgroundColor: profile.color }}
      >
        <div className="text-6xl">{profile.emoji}</div>
        <h1 className="text-2xl font-extrabold text-zinc-900">{profile.title}</h1>
        <p className="text-base font-medium text-zinc-800">{profile.subtitle}</p>
      </div>

      <p className="max-w-sm text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.description}
      </p>

      <div className="flex w-full flex-col gap-3 text-left">
        <div>
          <h2 className="mb-2 text-sm font-bold text-zinc-400">강점</h2>
          <ul className="flex flex-col gap-1">
            {profile.strengths.map((item) => (
              <li key={item} className="text-sm text-zinc-700 dark:text-zinc-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-bold text-zinc-400">성장 포인트</h2>
          <ul className="flex flex-col gap-1">
            {profile.growthAreas.map((item) => (
              <li key={item} className="text-sm text-zinc-700 dark:text-zinc-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        {closeProfile && (
          <RelationCard
            label="나와 가까운 사이"
            tone="#22c55e"
            profile={closeProfile}
            reason={`${profile.title}인 나와 ${closeProfile.title}은 에너지를 쓰는 방향(외향/내향)만 다르고, 가치관·관심사·생활 리듬은 똑같아서 편하게 통하는 사이예요.`}
          />
        )}
        {cautionProfile && (
          <RelationCard
            label="조심해야 할 사이"
            tone="#f97316"
            profile={cautionProfile}
            reason={`${profile.title}인 나와 ${cautionProfile.title}은 생활 리듬은 잘 맞아도 판단 기준(논리/감정)이 정반대라서, 같은 상황을 다르게 받아들여 오해가 생기기 쉬운 사이예요.`}
          />
        )}
      </div>

      <ResultStats
        kind="mbti"
        groupId={test.id}
        resultId={profile.slug}
        accentColor={test.accentColor}
        items={test.profiles.map((p) => ({
          id: p.slug,
          emoji: p.emoji,
          label: p.title,
        }))}
      />

      <ShareBar
        title={`${profile.emoji} 나는 "${profile.title}"`}
        text={`${test.title} 해봤더니 "${profile.title}" 나왔어!\n${profile.subtitle}\n너는 뭐 나올까? 👉`}
        accentColor={test.accentColor}
      />

      <div className="flex items-center gap-4">
        <Link
          href={`/m/${test.id}`}
          className="text-sm font-semibold text-zinc-500 underline underline-offset-4"
        >
          다시 해보기
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
        <AdSlot slot="mbti-result-bottom" />
      </div>
    </div>
  );
}

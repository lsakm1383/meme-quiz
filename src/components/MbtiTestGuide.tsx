import type { MbtiTestConfig, MbtiTestGuide as Guide } from "@/data/mbti-types";
import { MbtiResultIcon } from "@/components/MbtiResultIcon";

// 성격 유형 테스트 시작 화면 아래의 소개 섹션. 서버에서 렌더링해 HTML에 그대로 들어가므로
// "시작하기"를 누르기 전에도 테스트 설명·판단 기준·전체 유형·FAQ를 읽을 수 있다.
export function MbtiTestGuide({ test, guide }: { test: MbtiTestConfig; guide: Guide }) {
  return (
    <div className="mt-8 flex w-full flex-col gap-10 border-t border-zinc-200 pt-10 text-left dark:border-zinc-800">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">이런 테스트예요</h2>
        {guide.intro.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">네 가지 기준으로 봐요</h2>
        <ol className="flex flex-col gap-3">
          {guide.axes.map((axis, index) => (
            <li
              key={axis.name}
              className="rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900"
            >
              <p className="text-sm font-bold">
                {index + 1}. {axis.name}
              </p>
              <p className="mt-1 text-xs font-semibold" style={{ color: test.accentColor }}>
                {axis.poles[0]} ↔ {axis.poles[1]}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {axis.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{guide.typesHeading}</h2>
        <ul className="flex flex-col gap-3">
          {test.profiles.map((profile) => (
            <li key={profile.slug}>
              {/* 결과 화면(광고 있음)으로 가는 링크 — 다른 화면 이동과 같이 완전한 새로고침으로 연다 */}
              <a
                href={`/m/${test.id}/r/${profile.slug}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 p-4 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
              >
                {/* 시리즈마다 일러스트 비율이 달라(가로로 긴 배너 포함) 옆이 아닌 위에 크게 둔다 */}
                <MbtiResultIcon profile={profile} size="xl" />
                <span className="flex w-full flex-col gap-0.5">
                  <span className="text-sm font-bold">{profile.title}</span>
                  <span className="text-xs font-medium text-zinc-500">{profile.subtitle}</span>
                  <span className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {profile.description}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">자주 묻는 질문</h2>
        <dl className="flex flex-col gap-4">
          {guide.faq.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-bold">Q. {item.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { decisionTests } from "@/data/decisions";
import { checklists } from "@/data/checklists";
import { mbtiTests } from "@/data/mbti";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "사이트 소개",
  description:
    "오늘의 밈 테스트는 친구와 함께 가볍게 즐기는 유형 테스트·월드컵·추천 테스트 모음이에요. 어떤 콘텐츠가 있고 어떻게 만드는지 소개해요.",
  alternates: { canonical: `${getSiteUrl()}/about` },
};

const CONTACT_EMAIL = "memequiz86@gmail.com";

// 홈 화면과 같은 묶음으로 전체 콘텐츠를 나열한다 (각 시작 페이지로 연결).
const categories = [
  {
    title: "1분 테스트",
    description: "6개 질문에 답하면 나와 가장 가까운 유형을 알려주는 짧은 테스트예요.",
    links: quizzes.map((quiz) => ({ href: `/${quiz.id}`, emoji: quiz.emoji, title: quiz.title })),
  },
  {
    title: "성격 유형 테스트",
    description:
      "20개 질문으로 네 가지 성향을 살펴 16가지 유형 중 하나를 알려줘요. 친구들과 그룹을 만들어 서로의 관계도 볼 수 있어요.",
    links: mbtiTests.map((test) => ({ href: `/m/${test.id}`, emoji: test.emoji, title: test.title })),
  },
  {
    title: "월드컵",
    description: "후보 둘 중 하나를 계속 고르며 토너먼트를 치르고, 끝까지 남은 최종 우승을 가려요.",
    links: tournaments.map((tournament) => ({
      href: `/w/${tournament.id}`,
      emoji: tournament.emoji,
      title: tournament.title,
    })),
  },
  {
    title: "나만의 조합 만들기",
    description:
      "재료를 단계별로 골라 나만의 조합을 완성하고, 다른 사람들의 선택과 비교해 얼마나 희귀한 조합인지 알려줘요.",
    links: toppingTests.map((test) => ({ href: `/c/${test.id}`, emoji: test.emoji, title: test.title })),
  },
  {
    title: "생활 편의",
    description:
      "선택에 따라 다음 질문이 달라지는 추천 테스트와, 큰 준비를 앞두고 빠뜨린 게 없는지 확인하는 체크리스트예요.",
    links: [
      ...decisionTests.map((test) => ({ href: `/d/${test.id}`, emoji: test.emoji, title: test.title })),
      ...checklists.map((checklist) => ({
        href: `/l/${checklist.id}`,
        emoji: checklist.emoji,
        title: checklist.title,
      })),
    ],
  },
];

const principles = [
  {
    title: "모든 질문과 결과는 새로 만든 콘텐츠예요",
    description:
      "질문, 결과 이름, 결과 설명은 이 사이트를 위해 새로 만들었어요. 다른 사이트의 테스트나 공식 심리검사의 문항을 가져다 쓰지 않아요.",
  },
  {
    title: "결과가 정해지는 방식을 공개해요",
    description:
      "각 테스트 시작 화면 아래에 어떤 기준으로 결과가 정해지는지, 나올 수 있는 결과에는 무엇이 있는지를 모두 적어두었어요.",
  },
  {
    title: "재미와 참고를 위한 콘텐츠예요",
    description:
      "테스트 결과는 전문적인 심리 진단이나 상담, 재무·의료 조언이 아니에요. 친구와 이야기 나눌 거리로, 가벼운 참고용으로 즐겨주세요.",
  },
  {
    title: "개인정보를 묻지 않아요",
    description:
      "회원가입 없이 바로 이용할 수 있고, 답변은 이용자의 기기 안에서 계산해요. 결과 비율을 보여주기 위해 어떤 결과가 나왔는지만 이름 없이 집계해요.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-2xl font-extrabold">오늘의 밈 테스트 소개</h1>

      <div className="mt-8 flex flex-col gap-10 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            어떤 사이트인가요?
          </h2>
          <p>
            &ldquo;오늘의 밈 테스트&rdquo;는 쉬는 시간이나 친구와 수다 떨 때 가볍게 해볼 수 있는
            테스트 모음이에요. 대부분 30초에서 3분이면 끝나고, 결과를 링크로 공유해 친구의 결과와
            비교해볼 수 있어요.
          </p>
          <p>
            카톡 답장 스타일, 회사 속 내 모습, 라면 취향처럼 일상에서 누구나 한 번쯤 이야기해본
            주제를 골라 테스트로 만들어요. 웨딩드레스·신혼여행·가전제품처럼 실제로 고민이 되는
            주제는 선택을 돕는 추천 테스트와 체크리스트로 준비했어요.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            어떤 콘텐츠가 있나요?
          </h2>
          {categories.map((category) => (
            <div key={category.title} className="flex flex-col gap-2">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                {category.title} ({category.links.length}개)
              </h3>
              <p>{category.description}</p>
              <ul className="flex flex-col gap-1.5">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="underline underline-offset-4">
                      {link.emoji} {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            이렇게 만들고 있어요
          </h2>
          <ul className="flex flex-col gap-3">
            {principles.map((principle) => (
              <li key={principle.title}>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{principle.title}</p>
                <p className="mt-1">{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">광고 안내</h2>
          <p>
            사이트 운영 비용을 마련하기 위해 Google AdSense 광고를 싣고 있어요. 광고는 결과 화면
            아래쪽 등 콘텐츠와 구분되는 자리에 표시되며, 광고와 쿠키에 대한 자세한 내용은{" "}
            <a href="/privacy" className="underline underline-offset-4">
              개인정보처리방침
            </a>
            에서 확인할 수 있어요.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">문의하기</h2>
          <p>
            테스트 오류 제보, 새로운 테스트 아이디어, 그룹 삭제 요청 등은 아래 이메일로 보내주세요.
            확인하는 대로 답장드릴게요.
          </p>
          <p className="font-medium">{CONTACT_EMAIL}</p>
        </section>
      </div>
    </div>
  );
}

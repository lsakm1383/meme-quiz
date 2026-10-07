import type { Metadata } from "next";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { decisionTests } from "@/data/decisions";
import { checklists } from "@/data/checklists";
import { mbtiTests } from "@/data/mbti";
import { sajuSeriesTests, traditionalTests } from "@/data/saju";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "사이트 소개",
  description:
    "오늘의 밈 테스트는 유형 테스트·월드컵·추천 테스트와 사주·전통 운세를 모은 사이트예요. 어떤 콘텐츠가 있고, 결과를 어떻게 정하고 계산을 어떻게 확인했는지 소개해요.",
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
    title: "사주 시리즈",
    description:
      "생년월일과 태어난 시간으로 사주 여덟 글자를 세우고, 오행 분포와 타고난 성향을 풀어드리는 시리즈예요. 계산은 이용자의 기기 안에서만 이루어져요.",
    links: sajuSeriesTests.map((test) => ({ href: `/s/${test.id}`, emoji: test.emoji, title: test.title })),
  },
  {
    title: "전통 운세",
    description:
      "사주 여덟 글자가 아닌 다른 전통 방식으로 보는 운세예요. 토정비결은 음력 생년월일로 전통 작괘법에 따라 괘를 찾고, 꿈해몽은 자주 꾸는 꿈의 상징을 사전처럼 찾아볼 수 있어요. 손금은 사진 없이 내 손바닥을 보고 그림에서 비슷한 모양을 골라 풀이하고, 타로는 메이저 아르카나 22장 중에서 직접 카드를 골라 봐요.",
    links: traditionalTests.map((test) => ({ href: `/s/${test.id}`, emoji: test.emoji, title: test.title })),
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

// 테스트 종류마다 결과가 정해지는 방식
const resultMethods = [
  {
    title: "1분 테스트",
    description:
      "보기마다 결과 유형별 점수가 정해져 있어, 6개 질문에서 고른 보기의 점수를 더해 가장 높은 유형이 결과가 돼요. 각 결과에는 강점·조심할 점·잘 맞는 유형까지 함께 적어 두었어요.",
  },
  {
    title: "성격 유형 테스트",
    description:
      "20개 질문으로 네 가지 성향(에너지 방향·정보를 받아들이는 방식·판단 기준·생활 방식)을 각각 살펴, 쪽마다 더 많이 고른 성향을 조합해 16가지 유형 중 하나를 정해요.",
  },
  {
    title: "사주 시리즈",
    description:
      "생년월일과 태어난 시간으로 사주 여덟 글자를 세운 뒤, 정해진 규칙(십성·오행·합충 등)으로 점수와 풀이를 골라요. 같은 정보를 넣으면 언제나 같은 결과가 나와요.",
  },
  {
    title: "토정비결·띠별 운세",
    description:
      "토정비결은 전통 작괘법으로 144괘 중 하나를 찾고, 띠별 운세는 오늘 일진·그해 간지와 띠의 관계로 정해요. 날짜가 바뀌면 결과도 바뀌어요.",
  },
  {
    title: "타로 카드",
    description:
      "메이저 아르카나 22장을 볼 때마다 브라우저에서 무작위로 섞고, 이용자가 뒷면 카드 중에서 직접 골라요. 그래서 같은 질문도 매번 다른 카드가 나올 수 있어요.",
  },
  {
    title: "꿈해몽·손금",
    description:
      "꿈해몽은 120여 가지 꿈의 상징을 사전처럼 찾아보고, 손금은 사진 없이 내 손바닥을 보며 그림 보기에서 가장 가까운 모양을 골라 풀이해요.",
  },
  {
    title: "월드컵·조합 만들기",
    description:
      "월드컵은 이용자가 고른 후보가 끝까지 올라가 우승이 되고, 조합 만들기는 다른 이용자들이 고른 비율과 비교해 내 조합이 얼마나 희귀한지 보여줘요.",
  },
];

// 사주·운세 계산을 어떻게 확인했는지
const verifications = [
  {
    title: "절기와 한국 시간 기준으로 계산해요",
    description:
      "사주의 해와 달은 1월 1일이 아니라 입춘 같은 절기에 바뀌어서, 절기 시각을 기준으로 연주·월주를 정해요. 태어난 시간은 한국 표준시로 받아 서머타임이 있던 해와 1954~1961년의 표준시(UTC+8:30)까지 반영하고, 서울 경도에 맞춰 시주를 나눠요(자시는 23:30~01:30).",
  },
  {
    title: "공개 만세력 라이브러리와 맞춰 봤어요",
    description:
      "무작위로 뽑은 생년월일시 4,000개의 사주 여덟 글자를 공개된 만세력 라이브러리의 계산과 비교해 모두 일치하는 것을 확인했어요. 대운도 1,500개를 비교해 대운의 간지는 모두 일치했고, 대운이 시작되는 나이는 93%가 같았어요. 나머지는 절입일까지 남은 날을 나이로 바꾸는 반올림 방식의 차이예요.",
  },
  {
    title: "음력은 변환한 뒤 거꾸로 다시 확인해요",
    description:
      "음력으로 입력하면 양력으로 바꾼 다음, 그 양력 날짜를 다시 음력으로 되돌려 처음 입력과 같은지 확인해요. 윤달은 그해 그 달에 실제로 윤달이 있을 때만 물어봐요.",
  },
  {
    title: "토정비결은 공개된 풀이 예시로 확인했어요",
    description:
      "상괘·중괘·하괘를 구하는 전통 작괘법을 그대로 구현하고, 공개된 풀이 예시 두 가지(음력 1976년 8월 26일생의 2005년 212괘 등)를 계산해 같은 괘가 나오는 것을 확인했어요.",
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
    title: "겁을 주거나 단정하지 않아요",
    description:
      "흉한 뜻이 있는 꿈이나 카드도 '조심하라는 신호'처럼 부드럽게 풀고, 건강·수명·재산을 단정하는 표현은 쓰지 않아요. 생명선처럼 오해하기 쉬운 부분은 수명과 관계없다고 따로 적어 두었어요.",
  },
  {
    title: "개인정보를 묻지 않아요",
    description:
      "회원가입 없이 바로 이용할 수 있고, 답변은 이용자의 기기 안에서 계산해요. 결과 비율을 보여주기 위해 어떤 결과가 나왔는지만 이름 없이 집계해요.",
  },
  {
    title: "꾸준히 고치고 보강해요",
    description:
      "오류 제보나 읽기 불편한 부분이 있으면 바로 고치고, 짧았던 결과 설명은 강점·궁합까지 담도록 계속 보강하고 있어요.",
  },
];

const updates = [
  "1분 테스트 7종의 모든 결과에 강점·조심할 점·잘 맞는 유형 등 상세 풀이 추가",
  "전통 운세 카테고리 신설: 토정비결·꿈해몽 사전·손금 보기·타로 카드 뽑기",
  "사주 시리즈에 신년 운세·띠별 운세 추가",
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
            요즘은 생년월일로 보는 사주 시리즈와 토정비결·타로·꿈해몽 같은 전통 운세도 함께 다루고
            있어요. 운세는 재미로 보는 콘텐츠지만, 계산만큼은 정확하게 하려고 아래처럼 확인해
            두었어요.
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
            결과는 이렇게 정해져요
          </h2>
          <ul className="flex flex-col gap-3">
            {resultMethods.map((method) => (
              <li key={method.title}>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{method.title}</p>
                <p className="mt-1">{method.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            사주·운세 계산은 이렇게 확인했어요
          </h2>
          <ul className="flex flex-col gap-3">
            {verifications.map((item) => (
              <li key={item.title}>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                <p className="mt-1">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="text-zinc-500">
            계산은 정해진 규칙을 따르지만, 그 결과를 풀어 쓴 문구는 재미와 참고를 위한 것이에요.
          </p>
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
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">최근 업데이트 (2026년 10월)</h2>
          <ul className="flex flex-col gap-1.5">
            {updates.map((update) => (
              <li key={update}>• {update}</li>
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

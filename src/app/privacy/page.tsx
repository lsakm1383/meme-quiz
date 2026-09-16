import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "오늘의 밈 테스트 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-2xl font-extrabold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-zinc-400">최종 수정일: 2026년 9월 16일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            1. 수집하는 개인정보
          </h2>
          <p className="mt-2">
            &ldquo;오늘의 밈 테스트&rdquo;(이하 &ldquo;본 사이트&rdquo;)는 회원가입이나
            로그인 기능이 없으며, 이름·이메일 등 개인을 식별할 수 있는 정보를
            직접 수집하지 않습니다. 테스트 응답과 결과는 이용자의 브라우저
            안에서만 계산되며 서버에 저장되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            2. 쿠키와 광고
          </h2>
          <p className="mt-2">
            본 사이트는 Google을 포함한 제3자 광고 벤더가 쿠키를 사용하여
            이용자가 본 사이트 및 다른 사이트를 방문한 기록을 바탕으로 관심
            기반 광고를 게재할 수 있습니다.
          </p>
          <p className="mt-2">
            이용자는{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Google 광고 설정
            </a>
            에서 맞춤 광고에 사용되는 쿠키를 비활성화할 수 있으며, 제3자
            벤더의 쿠키 사용에 대한 자세한 내용은{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              aboutads.info
            </a>
            에서 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            3. 호스팅 및 접속 기록
          </h2>
          <p className="mt-2">
            본 사이트는 Vercel Inc.에 호스팅되어 있으며, 서비스 운영 및 보안
            목적으로 접속 IP, 접속 시간 등 일반적인 서버 로그가 호스팅사에
            의해 자동으로 기록될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            4. 문의
          </h2>
          <p className="mt-2">
            개인정보처리방침에 대한 문의는 아래 이메일로 연락해 주세요.
          </p>
          <p className="mt-2 font-medium">memequiz86@gmail.com</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            5. 방침의 변경
          </h2>
          <p className="mt-2">
            본 방침은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며,
            변경 시 본 페이지를 통해 고지합니다.
          </p>
        </section>
      </div>
    </div>
  );
}

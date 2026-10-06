import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "오늘의 밈 테스트 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-2xl font-extrabold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-zinc-400">최종 수정일: 2026년 9월 29일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            1. 수집하는 정보
          </h2>
          <p className="mt-2">
            &ldquo;오늘의 밈 테스트&rdquo;(이하 &ldquo;본 사이트&rdquo;)는 회원가입이나
            로그인 기능이 없으며, 이름·이메일·전화번호 등 개인을 식별할 수 있는
            정보를 직접 수집하지 않습니다. 기능별로 처리하는 정보는 다음과
            같습니다.
          </p>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
            <li>
              <strong>테스트 답변:</strong> 질문에 대한 답변과 결과 계산은
              이용자의 브라우저 안에서만 이루어지며, 답변 내용은 서버로 전송되지
              않습니다.
            </li>
            <li>
              <strong>결과 통계:</strong> 결과 화면에서 결과별 비율을 보여주기
              위해, 결과 화면이 열리면 어떤 테스트에서 어떤 결과가 나왔는지(결과
              종류)를 서버로 보내 결과별 합계 횟수만 저장합니다. 마라탕 조합
              만들기는 고른 재료 목록을 재료별 선택 횟수로 더해 저장합니다. 누가
              어떤 결과를 받았는지 알 수 있는 정보는 함께 저장하지 않습니다.
            </li>
            <li>
              <strong>사주 시리즈:</strong> 입력한 생년월일, 태어난 시간, 양력·음력
              여부, 성별은 이용자의 브라우저 안에서만 사주 계산에 쓰이며 서버로
              전송되지 않습니다. 결과 화면으로 넘어갈 때만 해당 브라우저 탭의
              임시 저장소(sessionStorage)에 보관되고, 탭을 닫으면 삭제됩니다. 오늘의 사주 운세·신년 운세에서
              &lsquo;이 기기에 기억하기&rsquo;를 켜면 입력한 정보가 그 브라우저의 저장소(localStorage)에만
              남아 다음 방문 때 다시 입력하지 않아도 되며, 화면의 &lsquo;기억한 정보 지우기&rsquo;로 언제든 지울 수
              있습니다. 사주
              결과는 결과 통계에도 집계하지 않습니다. 사주 운세 그룹에 참여하면 생년월일 대신
              기기에서 계산한 운세 점수(재물운·연애운 등 10가지)와 궁합 계산용 일주(일간·일지)·
              띠·오행 개수만 닉네임과 함께 그 그룹에 저장됩니다.
            </li>
            <li>
              <strong>전통 운세:</strong> 토정비결에 입력한 생년월일과 양력·음력 여부는 사주 시리즈와 같은
              방식으로 브라우저 안에서만 계산에 쓰이며 서버로 전송되지 않고, 결과 통계에도 집계하지
              않습니다. 꿈해몽 사전은 따로 입력받는 정보가 없고, 검색어도 브라우저 안에서만 쓰이며 저장하지
              않습니다. 손금 보기는 손 사진을 받지 않으며, 그림에서 고른 손금 모양도 브라우저 탭의 임시
              저장소에만 잠시 보관되고 서버로 전송되지 않습니다.
            </li>
            <li>
              <strong>그룹 기능:</strong> 성격 유형 테스트의 그룹 기능을 이용하면
              그룹 이름, 참여자가 입력한 닉네임, 결과 유형, 참여 시각이 해당
              그룹에 저장되며, 그룹 링크를 아는 사람은 누구나 이 내용을 볼 수
              있습니다. 닉네임에는 실명 등 개인정보를 입력하지 않도록 주의해
              주세요.
            </li>
            <li>
              <strong>부정 이용 방지:</strong> 짧은 시간에 반복되는 비정상 요청을
              막기 위해 접속 IP 주소를 요청 횟수 확인에만 사용하며, 이 기록은
              몇 분 이내에 자동으로 삭제됩니다. IP 주소는 결과
              통계나 그룹 정보와 함께 저장하지 않습니다.
            </li>
            <li>
              <strong>체크리스트:</strong> 체크한 항목은 이용자 기기의 브라우저
              저장소(localStorage)에만 저장되며 서버로 전송되지 않습니다.
              브라우저 데이터를 지우면 함께 삭제됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            2. 저장 위치와 보관 기간
          </h2>
          <p className="mt-2">
            결과 통계와 그룹 정보는 Vercel과 연동된 Upstash, Inc.의 데이터베이스
            서비스에 저장됩니다. 결과 통계는 개인을 알아볼 수 없는 합계 값으로
            서비스 운영 기간 동안 보관합니다. 그룹 정보는 서비스 운영 기간 동안
            보관하며, 그룹 삭제를 원하시면 아래 문의 이메일로 그룹 링크와 함께
            요청해 주시면 확인 후 삭제합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            3. 쿠키와 광고
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
            4. 호스팅 및 접속 기록
          </h2>
          <p className="mt-2">
            본 사이트는 Vercel Inc.에 호스팅되어 있으며, 서비스 운영 및 보안
            목적으로 접속 IP, 접속 시간 등 일반적인 서버 로그가 호스팅사에
            의해 자동으로 기록될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            5. 문의
          </h2>
          <p className="mt-2">
            개인정보처리방침에 대한 문의는 아래 이메일로 연락해 주세요.
          </p>
          <p className="mt-2 font-medium">memequiz86@gmail.com</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            6. 방침의 변경
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

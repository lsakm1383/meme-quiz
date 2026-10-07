"use client";

import { usePathname } from "next/navigation";

// 모든 화면 아래의 링크. 개인정보처리방침 화면에서는 자기 자신 대신 홈 화면으로 가는 링크를 둔다.
// 광고가 있는 화면에서도 보이는 링크라 완전한 새로고침으로 이동한다 (자동 광고 잔존 방지).
export function SiteFooter() {
  const pathname = usePathname();
  const onPrivacy = pathname === "/privacy";

  return (
    <footer className="flex w-full justify-center gap-3 py-8 text-xs text-zinc-400">
      <a href="/about" className="underline underline-offset-4">
        사이트 소개
      </a>
      <span>·</span>
      {onPrivacy ? (
        <a href="/" className="underline underline-offset-4">
          오늘의 밈 홈 화면
        </a>
      ) : (
        <a href="/privacy" className="underline underline-offset-4">
          개인정보처리방침
        </a>
      )}
    </footer>
  );
}

"use client";

import { usePathname } from "next/navigation";

const LINK = "underline underline-offset-4";

// 모든 화면 아래의 링크. 사이트 소개·개인정보처리방침 화면에서는 자기 자신 대신 홈 화면으로 가는 링크를 둔다.
// 광고가 있는 화면에서도 보이는 링크라 완전한 새로고침으로 이동한다 (자동 광고 잔존 방지).
export function SiteFooter() {
  const pathname = usePathname();
  const home = (
    <a href="/" className={LINK}>
      오늘의 밈 홈 화면
    </a>
  );

  return (
    <footer className="flex w-full justify-center gap-3 py-8 text-xs text-zinc-400">
      {pathname === "/about" ? (
        home
      ) : (
        <a href="/about" className={LINK}>
          사이트 소개
        </a>
      )}
      <span>·</span>
      {pathname === "/privacy" ? (
        home
      ) : (
        <a href="/privacy" className={LINK}>
          개인정보처리방침
        </a>
      )}
    </footer>
  );
}

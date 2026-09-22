"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Next.js는 페이지 이동을 새로고침 없이(클라이언트 사이드 라우팅) 처리하기 때문에,
// 광고 슬롯이 있는 화면(예: 홈)에서 광고 슬롯이 없는 화면(예: 퀴즈 질문 진행 화면)으로
// 이동해도 애드센스 스크립트와 그게 만든 <ins> DOM이 브라우저 탭에 그대로 남아있을 수
// 있다. 이게 "콘텐츠 없는 화면에 광고" 애드센스 정책 위반으로 잡힐 수 있어서, 경로가
// 바뀔 때마다 현재 화면에 우리가 직접 배치한 광고 슬롯(AdSlot)이 없으면 이전 화면의
// 광고 흔적(구글이 자체적으로 추가한 것 포함)을 전부 정리한다.
export function AdRouteGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const hasOwnAdSlot = document.querySelector("ins.adsbygoogle[data-ad-slot]");
    if (hasOwnAdSlot) return;

    document.querySelectorAll("ins.adsbygoogle").forEach((el) => el.remove());
    document
      .querySelectorAll('script[id="adsbygoogle-init"]')
      .forEach((el) => el.remove());
    delete window.adsbygoogle;
  }, [pathname]);

  return null;
}

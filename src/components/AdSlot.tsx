"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// NEXT_PUBLIC_ADSENSE_CLIENT_ID가 없으면(=아직 AdSense 승인 전) 아무것도 렌더링하지 않는다.
// 승인 후 .env.local에 두 값을 채우면 바로 광고가 나온다.
//
// 광고 스크립트는 layout이 아니라 여기서 불러온다 — AdSlot이 실제로 쓰이는 화면(홈/결과)에서만
// 로드돼야, 질문/대결 진행 화면처럼 광고 자리 자체가 없는 "행동 유도용" 화면까지 구글 자동
// 광고가 끼어드는 걸(애드센스 정책 위반: 콘텐츠 없는 화면에 광고) 막을 수 있다.
export function AdSlot({ slot }: { slot: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!clientId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense 스크립트가 아직 로드되지 않았거나 차단된 경우 조용히 무시
    }
  }, [clientId]);

  if (!clientId) return null;

  return (
    <>
      <Script
        id="adsbygoogle-init"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}

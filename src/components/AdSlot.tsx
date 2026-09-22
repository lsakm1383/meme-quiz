"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// NEXT_PUBLIC_ADSENSE_CLIENT_ID가 없으면(=아직 AdSense 승인 전) 아무것도 렌더링하지 않는다.
//
// 애드센스 스크립트는 여기, 즉 실제로 광고 자리를 넣은 페이지(홈/결과 화면)에서만 불러온다.
// 모든 페이지에 전역으로 깔아두면 자동 광고(Auto ads)가 콘텐츠 적은 화면(퀴즈 시작 화면,
// 월드컵 대진 화면 등)에도 광고를 끼워 넣어서 "콘텐츠 없는 화면에 광고" 정책 위반으로
// 이어질 수 있다 — 광고를 원하는 페이지에만 스크립트가 존재하게 해서 원천 차단한다.
export function AdSlot({ slot }: { slot: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  function push() {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // 아직 스크립트가 준비되지 않았거나 차단된 경우 조용히 무시
    }
  }

  useEffect(() => {
    // 이미 다른 AdSlot이 같은 페이지에서 스크립트를 로드해둔 경우를 위한 보강 시도
    if (clientId && window.adsbygoogle) push();
  }, [clientId]);

  if (!clientId) return null;

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={push}
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

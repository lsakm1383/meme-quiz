"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// NEXT_PUBLIC_ADSENSE_CLIENT_ID가 없으면(=아직 AdSense 승인 전) 아무것도 렌더링하지 않는다.
// 승인 후 .env.local에 두 값을 채우면 바로 광고가 나온다.
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
    <ins
      ref={insRef}
      className="adsbygoogle block w-full"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

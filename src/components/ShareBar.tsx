"use client";

import { useState } from "react";

export function ShareBar({
  title,
  text,
  accentColor,
}: {
  title: string;
  text: string;
  accentColor: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    // 배포 도메인(NEXT_PUBLIC_SITE_URL) 설정과 무관하게, 지금 보고 있는 실제 주소를 공유한다.
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // 사용자가 공유 시트를 취소한 경우 등 — 무시
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근 불가 — 무시
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <button
        onClick={handleShare}
        className="w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
        style={{ backgroundColor: accentColor }}
      >
        {copied ? "링크 복사됨! 📋" : "결과 공유하기 🔗"}
      </button>
    </div>
  );
}

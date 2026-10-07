"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isEventType, parseTestPath, type EventType } from "@/lib/events";

// 이용 통계 수집 (src/lib/events.ts 참고). 화면에 아무것도 그리지 않는다.
// - 테스트 시작 화면·결과 화면을 열면 view / result
// - data-track="start" | "share" 가 붙은 버튼을 누르면 그 이벤트
// - data-track="fold" 인 접기 상자를 처음 펼치면 fold
// - 테스트 화면에서 다른 테스트나 홈으로 가는 링크를 누르면 explore
function send(key: string, event: EventType) {
  const body = JSON.stringify({ key, event });
  try {
    // 화면을 떠나는 순간에도 전송이 끊기지 않도록 sendBeacon 을 먼저 쓴다
    if (navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/events", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
  } catch {
    // 통계 전송 실패는 이용에 영향을 주지 않는다
  }
}

const IGNORED_LINKS = new Set(["/about", "/privacy"]);

export function EventTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    const page = parseTestPath(pathname);
    if (page && page.kind !== "other") send(page.key, page.kind === "start" ? "view" : "result");
  }, [pathname]);

  useEffect(() => {
    const currentKey = () => parseTestPath(window.location.pathname)?.key;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const key = currentKey();
      if (!target || !key) return;

      const tracked = target.closest<HTMLElement>("[data-track]")?.dataset.track;
      if (tracked && tracked !== "fold" && isEventType(tracked)) {
        send(key, tracked);
        return;
      }

      const href = target.closest("a")?.getAttribute("href");
      if (!href || !href.startsWith("/") || IGNORED_LINKS.has(href)) return;
      if (parseTestPath(href)?.key !== key) send(key, "explore");
    };

    // toggle 은 버블링되지 않아서 캡처 단계에서 받는다. 같은 상자는 한 번만 센다.
    const opened = new WeakSet<Element>();
    const onToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      const key = currentKey();
      if (!key || details.dataset?.track !== "fold" || !details.open || opened.has(details)) return;
      opened.add(details);
      send(key, "fold");
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return null;
}

import type { ReactNode } from "react";

// 첫 화면은 짧게 두고, 긴 풀이는 눌러서 펼쳐 보게 하는 접기 상자.
// 브라우저 기본 <details> 라 자바스크립트 없이 동작하고, 접혀 있어도 내용은 HTML 에 그대로 들어간다.
export function MoreDetails({
  label = "더 자세히 보기",
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <details className={`group w-full rounded-2xl border border-zinc-200 text-left dark:border-zinc-800 ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
        <span>{label}</span>
        <span aria-hidden="true" className="text-zinc-400 transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="flex flex-col gap-3 px-4 pb-4">{children}</div>
    </details>
  );
}

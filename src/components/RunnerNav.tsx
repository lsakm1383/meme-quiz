import Link from "next/link";

// 퀴즈/월드컵/조합형 진행 화면 공통 상단 내비게이션 — 이전 단계로 되돌아가거나 홈으로 이탈할 수 있게 한다.
export function RunnerNav({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex w-full items-center justify-between text-sm font-semibold text-zinc-400">
      <button
        onClick={onBack}
        className="flex items-center gap-1 active:text-zinc-600 dark:active:text-zinc-300"
      >
        ← 뒤로
      </button>
      <Link href="/" className="active:text-zinc-600 dark:active:text-zinc-300">
        다른 테스트 하러 가기
      </Link>
    </div>
  );
}

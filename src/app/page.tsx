import Link from "next/link";
import { quizzes } from "@/data/quizzes";
import { AdSlot } from "@/components/AdSlot";

export default function Home() {
  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-extrabold">오늘의 밈 테스트</h1>
        <p className="text-sm text-zinc-500">
          30초면 끝나는 유형 테스트, 친구랑 결과 비교해보기
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/${quiz.id}`}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition-colors active:bg-zinc-100 dark:border-zinc-800 dark:active:bg-zinc-900"
          >
            <span className="text-4xl">{quiz.emoji}</span>
            <span className="flex flex-col">
              <span className="text-base font-bold">{quiz.title}</span>
              <span className="text-sm text-zinc-500">{quiz.description}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="w-full pt-2">
        <AdSlot slot="home-bottom" />
      </div>
    </div>
  );
}

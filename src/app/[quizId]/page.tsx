import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { quizzes, getQuiz } from "@/data/quizzes";
import { QuizRunner } from "@/components/QuizRunner";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ quizId: quiz.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ quizId: string }>;
}): Promise<Metadata> {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  if (!quiz) return {};

  const title = `${quiz.emoji} ${quiz.title}`;
  return {
    title,
    description: quiz.description,
    openGraph: { title, description: quiz.description, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description: quiz.description,
    },
    alternates: { canonical: `${getSiteUrl()}/${quiz.id}` },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  if (!quiz) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <QuizRunner quiz={quiz} />
    </div>
  );
}

import type { QuizConfig } from "@/data/quiz-types";

/** 선택한 보기 인덱스 배열을 받아 가장 점수가 높은 결과 유형의 id를 반환한다. */
export function calculateResultId(
  quiz: QuizConfig,
  selectedOptionIndexes: number[]
): string {
  const totals = new Map<string, number>(
    quiz.results.map((result) => [result.id, 0])
  );

  selectedOptionIndexes.forEach((optionIndex, questionIndex) => {
    const option = quiz.questions[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [resultId, weight] of Object.entries(option.scores)) {
      totals.set(resultId, (totals.get(resultId) ?? 0) + weight);
    }
  });

  let bestId = quiz.results[0].id;
  let bestScore = -Infinity;
  for (const result of quiz.results) {
    const score = totals.get(result.id) ?? 0;
    if (score > bestScore) {
      bestScore = score;
      bestId = result.id;
    }
  }
  return bestId;
}

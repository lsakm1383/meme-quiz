import type { QuizConfig } from "@/data/quiz-types";
import type { MbtiTestConfig } from "@/data/mbti-types";

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

/**
 * MBTI류 테스트 채점: 퀴즈처럼 "결과 하나에 최고점"이 아니라, 4개 축(E/I, S/N, T/F, J/P)을
 * 각각 독립적으로 집계해서 축마다 이긴 글자를 이어붙인 4글자 코드를 만든다.
 */
export function calculateMbtiCode(
  test: MbtiTestConfig,
  selectedOptionIndexes: number[]
): string {
  const tally: Record<string, number> = {};

  selectedOptionIndexes.forEach((optionIndex, questionIndex) => {
    const question = test.questions[questionIndex];
    const option = question?.options[optionIndex];
    if (!question || !option) return;
    tally[option.letter] = (tally[option.letter] ?? 0) + 1;
  });

  return test.axes
    .map(([a, b]) => ((tally[a] ?? 0) >= (tally[b] ?? 0) ? a : b))
    .join("");
}

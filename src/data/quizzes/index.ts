import type { QuizConfig } from "@/data/quiz-types";
import internetPickle from "@/data/quizzes/internet-pickle";
import corporateCattle from "@/data/quizzes/corporate-cattle";
import replySpeed from "@/data/quizzes/reply-speed";
import spendingStyle from "@/data/quizzes/spending-style";
import travelStyle from "@/data/quizzes/travel-style";
import flowerType from "@/data/quizzes/flower-type";
import moonPhase from "@/data/quizzes/moon-phase";

// 새 테스트 추가 방법:
// 1. 이 폴더에 새 데이터 파일 하나 추가 (internet-pickle.ts 복사해서 문구만 교체)
// 2. 아래 배열에 import + 등록
// 그러면 홈 목록, /[quizId] 진행 화면, 결과 카드, OG 이미지, 공유까지 전부 자동으로 붙는다.
// (분기가 필요한 "메뉴 추천"류는 quiz가 아니라 src/data/decisions에 만든다)
export const quizzes: QuizConfig[] = [
  internetPickle,
  corporateCattle,
  replySpeed,
  spendingStyle,
  travelStyle,
  flowerType,
  moonPhase,
];

export function getQuiz(id: string): QuizConfig | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

export function getResult(quiz: QuizConfig, resultId: string) {
  return quiz.results.find((result) => result.id === resultId);
}

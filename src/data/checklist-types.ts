// "생활 편의" 카테고리의 체크리스트형 템플릿.
// 질문에 답하거나 대결을 고르는 게 아니라, 항목을 하나씩 체크해가며 진행률을 관리하는 도구.
// 체크 상태는 서버에 안 남기고 이 기기(브라우저)에만 저장한다 — 개인 준비 목록이라
// 굳이 공유 통계로 쌓을 이유가 없고, 그래야 부담 없이 지웠다 다시 체크할 수 있다.

export type ChecklistItem = {
  id: string;
  text: string;
  /** 항목 옆에 붙는 짧은 도움말 (선택) */
  note?: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export type ChecklistConfig = {
  /** URL에 노출되는 슬러그 (영문 소문자, 하이픈) */
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  sections: ChecklistSection[];
};

export function countChecklistItems(checklist: ChecklistConfig): number {
  return checklist.sections.reduce((sum, section) => sum + section.items.length, 0);
}

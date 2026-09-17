import type { ChecklistConfig } from "@/data/checklist-types";
import wedding from "@/data/checklists/wedding";
import appliances from "@/data/checklists/appliances";

// 새 체크리스트 추가 방법:
// 1. 이 폴더에 새 데이터 파일 하나 추가 (wedding.ts 복사해서 섹션/항목만 교체)
// 2. 아래 배열에 import + 등록
export const checklists: ChecklistConfig[] = [wedding, appliances];

export function getChecklist(id: string): ChecklistConfig | undefined {
  return checklists.find((checklist) => checklist.id === id);
}

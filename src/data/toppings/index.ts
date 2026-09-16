import type { ToppingItem, ToppingTestConfig } from "@/data/topping-types";
import malatang from "@/data/toppings/malatang";

// 새 조합형 테스트 추가 방법:
// 1. 이 폴더에 새 데이터 파일 하나 추가 (malatang.ts 복사해서 카테고리/토핑만 교체)
// 2. 아래 배열에 import + 등록
export const toppingTests: ToppingTestConfig[] = [malatang];

export function getToppingTest(id: string): ToppingTestConfig | undefined {
  return toppingTests.find((test) => test.id === id);
}

export function allToppings(test: ToppingTestConfig): ToppingItem[] {
  return test.categories.flatMap((category) => category.toppings);
}

export function findTopping(
  test: ToppingTestConfig,
  toppingId: string
): ToppingItem | undefined {
  return allToppings(test).find((topping) => topping.id === toppingId);
}

/** 고른 토핑 id들을 정렬해서 이어붙인, 순서 무관 조합 키. 결과 URL과 통계 키로 그대로 쓰인다. */
export function buildComboKey(toppingIds: string[]): string {
  return [...new Set(toppingIds)].sort().join(",");
}

// Next.js는 동적 세그먼트 값을 URI 컴포넌트로 인코딩해서 다루므로,
// 쉼표가 "%2C"로 들어오는 경우까지 디코딩한 뒤 나눠야 한다.
export function comboKeyToToppingIds(comboKey: string): string[] {
  return decodeURIComponent(comboKey).split(",").filter(Boolean);
}

/** 각 카테고리의 min/max 선택 규칙을 만족하는 조합인지 검증한다. */
export function isValidCombo(
  test: ToppingTestConfig,
  toppingIds: string[]
): boolean {
  if (toppingIds.length === 0) return false;

  const validIds = new Set(allToppings(test).map((topping) => topping.id));
  if (!toppingIds.every((id) => validIds.has(id))) return false;

  return test.categories.every((category) => {
    const categoryIds = new Set(category.toppings.map((t) => t.id));
    const chosenCount = toppingIds.filter((id) => categoryIds.has(id)).length;
    return chosenCount >= category.minSelect && chosenCount <= category.maxSelect;
  });
}

export type ComboByCategory = {
  categoryId: string;
  label: string;
  items: ToppingItem[];
};

export function groupComboByCategory(
  test: ToppingTestConfig,
  toppingIds: string[]
): ComboByCategory[] {
  const idSet = new Set(toppingIds);
  return test.categories.map((category) => ({
    categoryId: category.id,
    label: category.label,
    items: category.toppings.filter((topping) => idSet.has(topping.id)),
  }));
}

/** 결과 카드/공유/OG 이미지에 쓰는 조합 제목·부제. 고정 페르소나 대신 실제 고른 조합에서 뽑아낸다. */
export function describeCombo(
  test: ToppingTestConfig,
  toppingIds: string[]
): { title: string; subtitle: string } {
  const grouped = groupComboByCategory(test, toppingIds);
  const byCategory = (categoryId: string) =>
    grouped.find((g) => g.categoryId === categoryId)?.items ?? [];

  const broth = byCategory("broth")[0];
  const spice = byCategory("spice")[0];
  const rest = grouped
    .filter((g) => g.categoryId !== "broth" && g.categoryId !== "spice")
    .flatMap((g) => g.items);

  const title = [broth?.name, spice?.name].filter(Boolean).join(" · ") + " 마라탕";

  const mainItems = rest.slice(0, 2).map((item) => item.name);
  const remaining = rest.length - mainItems.length;
  const subtitle =
    mainItems.join(", ") + (remaining > 0 ? ` 외 ${remaining}종` : "");

  return { title, subtitle };
}

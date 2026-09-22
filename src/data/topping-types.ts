// 조합형(토핑 빌더) 콘텐츠용 타입.
// 고정된 결과 몇 개가 아니라, 실제로 고른 토핑 조합 그 자체가 결과가 된다.
// 새 조합형 테스트를 추가할 때는 이 타입에 맞춰 데이터 파일만 하나 만들면 된다.

export type ToppingItem = {
  /** 조합 키에 쓰이는 슬러그. 쉼표로 조합 키를 만들기 때문에 쉼표는 쓸 수 없다. */
  id: string;
  emoji: string;
  name: string;
};

export type ToppingCategory = {
  id: string;
  /** 진행 화면에 보여줄 카테고리 제목, 예: "육수 선택" */
  label: string;
  toppings: ToppingItem[];
  /** 이 카테고리에서 최소로 골라야 하는 개수 */
  minSelect: number;
  /** 이 카테고리에서 최대로 고를 수 있는 개수 */
  maxSelect: number;
};

export type ToppingTestConfig = {
  /** URL에 노출되는 테스트 슬러그 */
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  categories: ToppingCategory[];
};

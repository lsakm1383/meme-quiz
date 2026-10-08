// 아이스크림 월드컵 전용 그림 스타일 매핑. 라면 때와 같은 이유로(실제 제품 사진은
// 저작권 문제) 각 제품의 실제 생김새(바/콘/튜브/컵/샌드/한입/통)와 색을 흉내낸 일러스트를 쓴다.

export type IceCreamShape = "bar" | "cone" | "tube" | "cup" | "sandwich" | "bite" | "tub";

export type IceCreamStyle = {
  shape: IceCreamShape;
  color: string;
  secondary?: string;
};

const STYLES: Record<string, IceCreamStyle> = {
  // 바 — secondary 는 막대 반대쪽 끝(윗부분) 색
  melona: { shape: "bar", color: "#86efac" },
  "watermelon-bar": { shape: "bar", color: "#f87171", secondary: "#16a34a" },
  screwbar: { shape: "bar", color: "#ef4444", secondary: "#fef2f2" },
  jawsbar: { shape: "bar", color: "#7c93b5" },
  candybar: { shape: "bar", color: "#7dd3fc" },
  ssangssangbar: { shape: "bar", color: "#78350f" },
  nugabar: { shape: "bar", color: "#92400e" },
  dwaejibar: { shape: "bar", color: "#7c4a1e" },
  bibibig: { shape: "bar", color: "#8b4a3c" },
  bavamba: { shape: "bar", color: "#ca8a04" },
  "hodu-maru": { shape: "bar", color: "#e7c9a0" },
  okdongja: { shape: "bar", color: "#f5f0e6", secondary: "#78350f" },
  // 튜브·밀어먹기·파우치
  papico: { shape: "tube", color: "#78350f" },
  deowisanyang: { shape: "tube", color: "#c8a27a" },
  bbongtta: { shape: "tube", color: "#38bdf8" },
  tankboy: { shape: "tube", color: "#fde68a" },
  polarpop: { shape: "tube", color: "#a78bfa" },
  sulreim: { shape: "tube", color: "#bfdbfe" },
  // 콘
  worldcone: { shape: "cone", color: "#f5e6c8" },
  bravocone: { shape: "cone", color: "#fff7ed" },
  gugucone: { shape: "cone", color: "#e9c46a" },
  ppangbbare: { shape: "cone", color: "#fef3c7" },
  // 컵
  yomamttae: { shape: "cup", color: "#fbcfe8" },
  "double-bianco": { shape: "cup", color: "#fecdd3" },
  // 샌드
  "boongeo-ssamanco": { shape: "sandwich", color: "#78350f", secondary: "#fef3c7" },
  ppangttoa: { shape: "sandwich", color: "#f3d19c", secondary: "#f5f5f4" },
  // 한입 박스
  tico: { shape: "bite", color: "#5b3a1e" },
  excellent: { shape: "bite", color: "#fef9c3" },
  // 통
  "haagen-dazs": { shape: "tub", color: "#fef3c7" },
  naturu: { shape: "tub", color: "#86efac" },
  together: { shape: "tub", color: "#fef3c7", secondary: "#facc15" },
  "baskin-pint": { shape: "tub", color: "#f472b6", secondary: "#a78bfa" },
};

export function getIceCreamStyle(candidateId: string): IceCreamStyle | undefined {
  return STYLES[candidateId];
}

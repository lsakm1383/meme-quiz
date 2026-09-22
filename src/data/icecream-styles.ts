// 아이스크림 월드컵 전용 그림 스타일 매핑. 라면 때와 같은 이유로(실제 제품 사진은
// 저작권 문제) 각 제품의 실제 생김새(바/콘/튜브/컵/샌드/통)와 색을 흉내낸 일러스트를 쓴다.

export type IceCreamShape = "bar" | "cone" | "tube" | "cup" | "sandwich" | "tub";

export type IceCreamStyle = {
  shape: IceCreamShape;
  color: string;
  secondary?: string;
};

const STYLES: Record<string, IceCreamStyle> = {
  melona: { shape: "bar", color: "#86efac" },
  screwbar: { shape: "bar", color: "#60a5fa", secondary: "#bef264" },
  jawsbar: { shape: "bar", color: "#f87171", secondary: "#60a5fa" },
  nugabar: { shape: "bar", color: "#92400e" },
  bibibig: { shape: "bar", color: "#7f1d1d" },
  deowisanyang: { shape: "bar", color: "#fef3c7", secondary: "#78350f" },
  "watermelon-bar": { shape: "bar", color: "#f87171", secondary: "#16a34a" },
  "hodu-maru": { shape: "bar", color: "#78350f" },
  bbongtta: { shape: "bar", color: "#4ade80" },
  "ttalgi-manna": { shape: "bar", color: "#f9a8d4" },
  tankboy: { shape: "bar", color: "#38bdf8" },
  dwaejibar: { shape: "bar", color: "#fde68a", secondary: "#78350f" },
  bavamba: { shape: "bar", color: "#ca8a04" },
  "choco-boongeo": { shape: "bar", color: "#451a03" },
  okdongja: { shape: "bar", color: "#eab308", secondary: "#78350f" },
  gugucone: { shape: "cone", color: "#fef3c7" },
  worldcone: { shape: "cone", color: "#d97706" },
  bravocone: { shape: "cone", color: "#fda4af" },
  ppangbbare: { shape: "cone", color: "#f59e0b" },
  tico: { shape: "cone", color: "#fefce8" },
  wakle: { shape: "cone", color: "#92400e" },
  papico: { shape: "tube", color: "#78350f" },
  polarpop: { shape: "tube", color: "#a78bfa" },
  sulreim: { shape: "cup", color: "#93c5fd" },
  yomamttae: { shape: "cup", color: "#fb923c" },
  "boongeo-ssamanco": { shape: "sandwich", color: "#78350f", secondary: "#fef3c7" },
  gukhwappang: { shape: "sandwich", color: "#eab308", secondary: "#fef3c7" },
  "jelly-cookie": { shape: "sandwich", color: "#451a03", secondary: "#f472b6" },
  "moncher-ice": { shape: "sandwich", color: "#78350f", secondary: "#fecdd3" },
  "haagen-dazs": { shape: "tub", color: "#fef3c7" },
  naturu: { shape: "tub", color: "#86efac" },
  "baskin-pint": { shape: "tub", color: "#f472b6", secondary: "#a78bfa" },
};

export function getIceCreamStyle(candidateId: string): IceCreamStyle | undefined {
  return STYLES[candidateId];
}

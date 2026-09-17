// 드레스 테스트 전용 그림 스타일 매핑. 실제 드레스 사진은 저작권 문제가 있으니,
// 각 결과의 실제 실루엣(A라인/볼륨 스커트/머메이드/롱슬리브/슬립)을 흉내낸 일러스트를 쓴다.

export type DressShape = "aLine" | "ballGown" | "mermaid" | "longSleeve" | "slipDress";

export type DressStyle = {
  shape: DressShape;
  color: string;
  secondary?: string;
};

const STYLES: Record<string, DressStyle> = {
  "a-line": { shape: "aLine", color: "#fdf8f2", secondary: "#f4b8c9" },
  "ball-gown": { shape: "ballGown", color: "#fdf8f2", secondary: "#f472b6" },
  mermaid: { shape: "mermaid", color: "#fdf3e7", secondary: "#c4b5fd" },
  "long-sleeve": { shape: "longSleeve", color: "#fdfaf5", secondary: "#a5b4fc" },
  "slip-dress": { shape: "slipDress", color: "#f7f4f0", secondary: "#a8a29e" },
};

export function getDressStyle(resultId: string): DressStyle | undefined {
  return STYLES[resultId];
}

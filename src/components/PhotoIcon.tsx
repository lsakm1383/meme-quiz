type IconSize = "xl" | "lg" | "sm" | "xs";

const SQUARE: Record<IconSize, string> = {
  xl: "h-40 w-40",
  lg: "h-16 w-16",
  sm: "h-9 w-9",
  xs: "h-5 w-5",
};

const HEIGHT: Record<IconSize, string> = {
  xl: "h-40",
  lg: "h-16",
  sm: "h-9",
  xs: "h-5",
};

// 가로로 아주 긴 이미지(예: 2.8:1)는 높이 기준으로 키우면 카드 폭을 넘치므로 너비 기준으로 잡는다.
const WIDTH: Record<IconSize, string> = {
  xl: "w-full max-w-72",
  lg: "w-28",
  sm: "w-16",
  xs: "w-10",
};

// 크롭한 참고 이미지를 결과 아이콘으로 그대로 보여줄 때 쓰는 공용 컴포넌트.
// aspect를 주면 그 비율(예: "aspect-[256/153]")로, 생략하면 정사각형으로 렌더링한다.
// 컨테이너 비율을 이미지 원본 비율과 맞추면 object-cover를 써도 잘리는 부분이 없다.
export function PhotoIcon({
  src,
  size = "lg",
  aspect,
  sizeBy = "height",
}: {
  src: string;
  size?: IconSize;
  aspect?: string;
  sizeBy?: "height" | "width";
}) {
  const base = sizeBy === "width" ? WIDTH[size] : HEIGHT[size];
  const shapeClass = aspect ? `${base} ${aspect}` : SQUARE[size];
  return (
    <span className={`inline-block shrink-0 overflow-hidden rounded-2xl ${shapeClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

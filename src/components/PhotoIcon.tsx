type IconSize = "lg" | "sm" | "xs";

const BOX: Record<IconSize, string> = {
  lg: "h-16 w-16",
  sm: "h-9 w-9",
  xs: "h-5 w-5",
};

// 크롭한 참고 이미지를 결과 아이콘으로 그대로 보여줄 때 쓰는 공용 컴포넌트.
export function PhotoIcon({ src, size = "lg" }: { src: string; size?: IconSize }) {
  return (
    <span className={`inline-block overflow-hidden rounded-2xl ${BOX[size]}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

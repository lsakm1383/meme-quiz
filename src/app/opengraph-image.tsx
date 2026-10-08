import { startOgImage, startOgSize } from "@/lib/start-og";

export const alt = "오늘의 밈 테스트";
export const size = startOgSize;
export const contentType = "image/png";

// 홈 화면 공유 미리보기 — 여러 분야의 대표 그림을 모아 보여준다.
// 따로 미리보기가 없는 화면(사이트 소개·개인정보처리방침 등)도 이 그림을 쓴다.
export default async function Image() {
  return startOgImage({
    label: "30초면 끝나는 테스트 모음",
    title: "오늘의 밈 테스트",
    accentColor: "#6d28d9",
    images: [
      "/saju/tarot-cover.webp",
      "/tournament/ramen-worldcup/cover.webp",
      "/saju/cover.webp",
      "/checklist/wedding/cover.webp",
    ],
    button: "테스트 골라 보기",
  });
}

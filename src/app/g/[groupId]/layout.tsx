import type { Metadata } from "next";

// 그룹 페이지는 사용자가 만든 짧은 결과 모음이라 검색 색인에서 뺀다.
// page.tsx가 클라이언트 컴포넌트라 metadata를 내보낼 수 없어서 레이아웃에서 지정한다.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

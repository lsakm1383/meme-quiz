import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { AdRouteGuard } from "@/components/AdRouteGuard";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: "%s | 오늘의 밈 테스트",
    default: "오늘의 밈 테스트",
  },
  description: "30초면 끝나는 밈 유형 테스트 모음",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col items-center bg-white font-sans dark:bg-black dark:text-white">
        <AdRouteGuard />
        {children}
        {/* 광고가 있는 화면에서도 보이는 링크라 완전한 새로고침으로 이동한다 (자동 광고 잔존 방지) */}
        <footer className="flex w-full justify-center gap-3 py-8 text-xs text-zinc-400">
          <a href="/about" className="underline underline-offset-4">
            사이트 소개
          </a>
          <span>·</span>
          <a href="/privacy" className="underline underline-offset-4">
            개인정보처리방침
          </a>
        </footer>
      </body>
    </html>
  );
}

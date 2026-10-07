import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { AdRouteGuard } from "@/components/AdRouteGuard";
import { SiteFooter } from "@/components/SiteFooter";
import { EventTracker } from "@/components/EventTracker";

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
        <EventTracker />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

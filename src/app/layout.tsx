import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

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
        {children}
        <footer className="w-full py-8 text-center text-xs text-zinc-400">
          <Link href="/privacy" className="underline underline-offset-4">
            개인정보처리방침
          </Link>
        </footer>
        {adsenseClientId ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}

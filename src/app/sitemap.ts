import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { decisionTests } from "@/data/decisions";
import { checklists } from "@/data/checklists";
import { mbtiTests } from "@/data/mbti";
import { sajuTests } from "@/data/saju";
import { categories } from "@/data/categories";
import { dayMasters } from "@/data/saju";
import { dreams } from "@/data/saju/dreams";
import { tarotCards } from "@/data/saju/tarot";
import { ZODIAC_SLUGS } from "@/lib/saju/zodiac";

// 결과 페이지(/r/)는 공유용이라 색인하지 않으므로, 홈·시작 페이지·체크리스트만 싣는다.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const urls: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy` },
    { url: `${base}/about` },
  ];

  for (const category of categories) {
    urls.push({ url: `${base}/category/${category.id}`, changeFrequency: "weekly" });
  }

  for (const quiz of quizzes) {
    urls.push({ url: `${base}/${quiz.id}` });
  }

  for (const tournament of tournaments) {
    urls.push({ url: `${base}/w/${tournament.id}` });
  }

  for (const test of toppingTests) {
    urls.push({ url: `${base}/c/${test.id}` });
  }

  for (const test of decisionTests) {
    urls.push({ url: `${base}/d/${test.id}` });
  }

  for (const checklist of checklists) {
    urls.push({ url: `${base}/l/${checklist.id}` });
  }

  for (const test of mbtiTests) {
    urls.push({ url: `${base}/m/${test.id}` });
  }

  for (const test of sajuTests) {
    urls.push({ url: `${base}/s/${test.id}` });
  }

  // 누구에게나 같은 풀이 항목 페이지 (꿈해몽·띠·일간·타로 카드) — 개인 결과가 아니라 검색에 싣는다
  const items: [string, readonly string[]][] = [
    ["dream", dreams.map((dream) => dream.slug)],
    ["zodiac", ZODIAC_SLUGS],
    ["saju", dayMasters.map((profile) => profile.slug)],
    ["tarot", tarotCards.map((card) => card.slug)],
  ];
  for (const [testId, slugs] of items) {
    for (const slug of slugs) urls.push({ url: `${base}/s/${testId}/t/${slug}` });
  }

  return urls;
}

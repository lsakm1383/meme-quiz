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

  return urls;
}

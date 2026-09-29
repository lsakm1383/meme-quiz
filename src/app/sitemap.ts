import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { quizzes } from "@/data/quizzes";
import { tournaments } from "@/data/tournaments";
import { toppingTests } from "@/data/toppings";
import { decisionTests } from "@/data/decisions";
import { checklists } from "@/data/checklists";
import { mbtiTests } from "@/data/mbti";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const urls: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy` },
  ];

  for (const quiz of quizzes) {
    urls.push({ url: `${base}/${quiz.id}` });
    for (const result of quiz.results) {
      urls.push({ url: `${base}/${quiz.id}/r/${result.id}` });
    }
  }

  // 월드컵 결과 페이지(후보별 한 줄 설명)는 색인하지 않으므로 시작 페이지만 싣는다.
  for (const tournament of tournaments) {
    urls.push({ url: `${base}/w/${tournament.id}` });
  }

  for (const test of toppingTests) {
    urls.push({ url: `${base}/c/${test.id}` });
  }

  for (const test of decisionTests) {
    urls.push({ url: `${base}/d/${test.id}` });
    for (const result of test.results) {
      urls.push({ url: `${base}/d/${test.id}/r/${result.id}` });
    }
  }

  for (const checklist of checklists) {
    urls.push({ url: `${base}/l/${checklist.id}` });
  }

  for (const test of mbtiTests) {
    urls.push({ url: `${base}/m/${test.id}` });
    for (const profile of test.profiles) {
      urls.push({ url: `${base}/m/${test.id}/r/${profile.slug}` });
    }
  }

  return urls;
}

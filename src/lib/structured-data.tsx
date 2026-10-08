import { categories, type Category } from "@/data/categories";
import { getRegisteredTest, type RegisteredTest } from "@/lib/test-registry";
import { getSiteUrl } from "@/lib/site";

// 검색엔진용 구조화 정보(JSON-LD). 화면에 실제로 보이는 내용(경로·자주 묻는 질문·목록)만 그대로 옮긴다.
// 서버에서만 쓴다 (테스트 목록 전체를 불러오므로).

type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  // </script> 로 태그가 끊기지 않게 < 를 이스케이프한다
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

const absolute = (path: string) => `${getSiteUrl()}${path}`;

/** 테스트 키가 속한 분야 */
export function categoryOfTest(key: string): Category | undefined {
  return categories.find((category) => category.tests.includes(key));
}

export function breadcrumbData(trail: { name: string; path: string }[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}

/** 홈 › 분야 › 테스트 */
export function testTrail(test: RegisteredTest) {
  const category = categoryOfTest(test.key);
  return [
    { name: "홈", path: "/" },
    ...(category ? [{ name: category.title, path: `/category/${category.id}` }] : []),
    { name: test.title, path: test.href },
  ];
}

export function faqData(faq: { question: string; answer: string }[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function categoryData(category: Category): JsonLdData[] {
  const tests = category.tests.map(getRegisteredTest).filter((test): test is RegisteredTest => test !== undefined);
  return [
    breadcrumbData([
      { name: "홈", path: "/" },
      { name: category.title, path: `/category/${category.id}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${category.title} 모아보기`,
      description: category.summary,
      url: absolute(`/category/${category.id}`),
      inLanguage: "ko-KR",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: tests.map((test, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: test.title,
          url: absolute(test.href),
        })),
      },
    },
  ];
}

export function websiteData(description: string): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "오늘의 밈 테스트",
    url: absolute("/"),
    description,
    inLanguage: "ko-KR",
  };
}

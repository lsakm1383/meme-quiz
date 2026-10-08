import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getToppingTest,
  isValidCombo,
  comboKeyToToppingIds,
  describeCombo,
} from "@/data/toppings";
import { ToppingResultView } from "@/components/ToppingResultView";
import { RelatedTests } from "@/components/RelatedTests";

type Params = { testId: string; comboKey: string };

// 조합은 사람 수만큼 다양해질 수 있어 모든 경우를 미리 만들어둘 수 없다 —
// 요청이 들어올 때마다 그 조합이 유효한지만 검증해서 즉석으로 렌더링한다.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { testId, comboKey } = await params;
  const test = getToppingTest(testId);
  const toppingIds = comboKeyToToppingIds(comboKey);
  if (!test || !isValidCombo(test, toppingIds)) return {};

  const { title, subtitle } = describeCombo(test, toppingIds);
  const description = `${subtitle} — ${test.title}에서 나온 조합이에요.`;
  return {
    title: `나의 마라탕: ${title}`,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    // 결과 페이지는 공유용이라 검색 색인에서는 뺀다 (링크·미리보기는 그대로 동작, 페이지 안 링크는 follow).
    robots: { index: false, follow: true },
  };
}

export default async function ToppingComboResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { testId, comboKey } = await params;
  const test = getToppingTest(testId);
  const toppingIds = comboKeyToToppingIds(comboKey);
  if (!test || !isValidCombo(test, toppingIds)) notFound();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
      <ToppingResultView
        test={test}
        comboKey={comboKey}
        toppingIds={toppingIds}
        related={<RelatedTests current={`c/${test.id}`} />}
      />
    </div>
  );
}

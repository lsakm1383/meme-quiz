const fs = require("fs");
const edit = (f, pairs) => { let s = fs.readFileSync(f, "utf8"); for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(f + " missing: " + a.slice(0, 60)); s = s.split(a).join(b); } fs.writeFileSync(f, s); };

edit("src/data/saju/index.ts", [
  ["  /** 홈 카드·시작 화면용 대표 일러스트 (public 기준 경로, 정사각형). 없으면 emoji. */\n  image?: string;\n};",
   "  /** 홈 카드·시작 화면용 대표 일러스트 (public 기준 경로, 정사각형). 없으면 emoji. */\n  image?: string;\n  /** 사주(생년월일시의 여덟 글자)로 보지 않는 토정비결·꿈해몽 등은 \"전통 운세\"로 따로 묶는다 */\n  series?: \"saju\" | \"traditional\";\n};"],
  ["    accentColor: \"#92400e\",\n", "    accentColor: \"#92400e\",\n    series: \"traditional\",\n"],
  ["    accentColor: \"#0f766e\",\n", "    accentColor: \"#0f766e\",\n    series: \"traditional\",\n"],
  ["export function getSajuTest(id: string): SajuTestConfig | undefined {",
   "export const SERIES_NAME = { saju: \"사주 시리즈\", traditional: \"전통 운세\" } as const;\n\n/** 화면 위쪽에 붙이는 시리즈 이름 */\nexport const seriesNameOf = (test: SajuTestConfig) => SERIES_NAME[test.series ?? \"saju\"];\n\nexport const sajuSeriesTests = sajuTests.filter((test) => (test.series ?? \"saju\") === \"saju\");\nexport const traditionalTests = sajuTests.filter((test) => test.series === \"traditional\");\n\nexport function getSajuTest(id: string): SajuTestConfig | undefined {"],
]);

edit("src/app/page.tsx", [
  ["import { sajuTests } from \"@/data/saju\";", "import { sajuSeriesTests, traditionalTests } from \"@/data/saju\";"],
]);
{
  const f = "src/app/page.tsx"; let s = fs.readFileSync(f, "utf8");
  const start = s.indexOf("      <div className=\"flex w-full flex-col gap-3\">\n        <h2 className=\"text-sm font-bold text-zinc-400\">사주 시리즈</h2>");
  const end = s.indexOf("      </div>\n", s.indexOf("        ))}\n", start)) + "      </div>\n".length;
  if (start < 0) throw new Error("home section");
  const block = s.slice(start, end);
  const saju = block.replace("{sajuTests.map(", "{sajuSeriesTests.map(");
  const trad = block.replace("사주 시리즈</h2>", "전통 운세</h2>").replace("{sajuTests.map(", "{traditionalTests.map(");
  s = s.slice(0, start) + saju + "\n" + trad + s.slice(end);
  fs.writeFileSync(f, s);
}

edit("src/app/about/page.tsx", [
  ["import { sajuTests } from \"@/data/saju\";", "import { sajuSeriesTests, traditionalTests } from \"@/data/saju\";"],
  ["    links: sajuTests.map((test) => ({ href: `/s/${test.id}`, emoji: test.emoji, title: test.title })),\n  },",
   "    links: sajuSeriesTests.map((test) => ({ href: `/s/${test.id}`, emoji: test.emoji, title: test.title })),\n  },\n  {\n    title: \"전통 운세\",\n    description:\n      \"사주 여덟 글자가 아닌 다른 전통 방식으로 보는 운세예요. 토정비결은 음력 생년월일로 전통 작괘법에 따라 괘를 찾고, 꿈해몽은 자주 꾸는 꿈의 상징을 사전처럼 찾아볼 수 있어요.\",\n    links: traditionalTests.map((test) => ({ href: `/s/${test.id}`, emoji: test.emoji, title: test.title })),\n  },"],
]);

edit("src/app/privacy/page.tsx", [
  ["임시 저장소(sessionStorage)에 보관되고, 탭을 닫으면 삭제됩니다. 오늘의 사주 운세에서",
   "임시 저장소(sessionStorage)에 보관되고, 탭을 닫으면 삭제됩니다. 오늘의 사주 운세·신년 운세에서"],
  ["              띠·오행 개수만 닉네임과 함께 그 그룹에 저장됩니다.\n            </li>",
   "              띠·오행 개수만 닉네임과 함께 그 그룹에 저장됩니다.\n            </li>\n            <li>\n              <strong>전통 운세:</strong> 토정비결에 입력한 생년월일과 양력·음력 여부는 사주 시리즈와 같은\n              방식으로 브라우저 안에서만 계산에 쓰이며 서버로 전송되지 않고, 결과 통계에도 집계하지\n              않습니다. 꿈해몽 사전은 따로 입력받는 정보가 없고, 검색어도 브라우저 안에서만 쓰이며 저장하지\n              않습니다.\n            </li>"],
]);

const label = (f, pairs) => edit(f, pairs);
label("src/components/saju/DailyStart.tsx", [
  ["import type { SajuTestConfig } from \"@/data/saju\";", "import { seriesNameOf, type SajuTestConfig } from \"@/data/saju\";"],
  ["        사주 시리즈\n", "        {seriesNameOf(test)}\n"],
]);
label("src/components/saju/DreamStart.tsx", [
  ["import type { SajuTestConfig } from \"@/data/saju\";", "import { seriesNameOf, type SajuTestConfig } from \"@/data/saju\";"],
  ["        사주 시리즈\n", "        {seriesNameOf(test)}\n"],
]);
label("src/components/saju/DreamEntryView.tsx", [
  ["import type { SajuTestConfig } from \"@/data/saju\";", "import { seriesNameOf, type SajuTestConfig } from \"@/data/saju\";"],
  ["          사주 시리즈 · {test.title} · {category.name}", "          {seriesNameOf(test)} · {test.title} · {category.name}"],
]);
label("src/components/saju/TojeongResult.tsx", [
  ["import type { SajuTestConfig } from \"@/data/saju\";", "import { seriesNameOf, type SajuTestConfig } from \"@/data/saju\";"],
  ["사주 시리즈 · {test.title}", "{seriesNameOf(test)} · {test.title}"],
]);
label("src/app/s/[testId]/t/[slug]/opengraph-image.tsx", [
  ["사주 시리즈 · 꿈해몽 사전", "전통 운세 · 꿈해몽 사전"],
]);
label("src/data/guides/s-tojeong.ts", [["(사주 시리즈)", "(전통 운세)"]]);
label("src/data/guides/s-dream.ts", [["(사주 시리즈)", "(전통 운세)"]]);
label("src/data/saju/index.ts", [["// 사주 시리즈 설정.", "// 사주 시리즈·전통 운세 설정."]]);
console.log("ok");

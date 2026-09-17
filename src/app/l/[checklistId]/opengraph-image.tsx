import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { checklists, getChecklist } from "@/data/checklists";
import { countChecklistItems } from "@/data/checklist-types";

export const alt = "체크리스트";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const notoBold = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf")
);
const notoRegular = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf")
);

export function generateStaticParams() {
  return checklists.map((checklist) => ({ checklistId: checklist.id }));
}

function emojiImageUrl(emoji: string) {
  const codepoints = [...emoji]
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ checklistId: string }>;
}) {
  const { checklistId } = await params;
  const checklist = getChecklist(checklistId);
  const total = checklist ? countChecklistItems(checklist) : 0;

  const [bold, regular] = await Promise.all([notoBold, notoRegular]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 760,
            padding: "56px 64px",
            borderRadius: 48,
            background: checklist ? `${checklist.accentColor}1a` : "#e4e4e7",
          }}
        >
          {checklist?.emoji ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={emojiImageUrl(checklist.emoji)} width={176} height={176} alt="" />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            {checklist?.title ?? "체크리스트"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 400,
              color: "#71717a",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            총 {total}개 항목 체크하기
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 36 }}>
          오늘의 밈 테스트 · 너도 체크하러 가기 👉
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: regular, weight: 400, style: "normal" },
        { name: "Noto Sans KR", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}

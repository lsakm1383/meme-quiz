import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { tournaments, getTournament, getCandidate } from "@/data/tournaments";

export const alt = "월드컵 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 사토리는 색깔 이모지 글리프가 있는 폰트가 없으면 이모지를 못 그리므로,
// Twemoji SVG를 코드포인트로 가져와 <img>로 그린다.
const notoBold = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf")
);
const notoRegular = readFile(
  join(process.cwd(), "assets/fonts/NotoSansKR-Regular.ttf")
);

function emojiImageUrl(emoji: string) {
  const codepoints = [...emoji]
    .map((char) => char.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

export function generateStaticParams() {
  return tournaments.flatMap((tournament) =>
    tournament.candidates.map((candidate) => ({
      tournamentId: tournament.id,
      winnerId: candidate.id,
    }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ tournamentId: string; winnerId: string }>;
}) {
  const { tournamentId, winnerId } = await params;
  const tournament = getTournament(tournamentId);
  const winner = tournament && getCandidate(tournament, winnerId);

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
        <div style={{ display: "flex", fontSize: 32, color: "#71717a" }}>
          {tournament?.title} · 최종 우승
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 760,
            marginTop: 32,
            padding: "48px 64px",
            borderRadius: 48,
            background: winner?.color ?? "#e4e4e7",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emojiImageUrl("🏆")} width={88} height={88} />
          {winner?.emoji ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={emojiImageUrl(winner.emoji)}
              width={140}
              height={140}
              style={{ marginTop: 8 }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#18181b",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {winner?.name ?? "결과"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 400,
              color: "#27272a",
              marginTop: 14,
              textAlign: "center",
            }}
          >
            {winner?.tagline}
          </div>
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

import type { SajuTestConfig } from "@/data/saju";
import type { TarotCard } from "@/data/saju/types";
import { TAROT_TOPICS, tarotCards } from "@/data/saju/tarot";
import { romanOf } from "@/lib/saju/tarot";
import { TarotCardFace } from "@/components/saju/TarotCardView";
import { MoreDetails } from "@/components/MoreDetails";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { RelatedTests } from "@/components/RelatedTests";

function Keywords({ words, color }: { words: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {words.map((word) => (
        <span
          key={word}
          className="rounded-full px-2.5 py-1 text-xs font-bold"
          style={{ backgroundColor: `${color}14`, color }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

/** 정방향·역방향 한쪽 풀이 — 전체운은 바로 보이고, 연애·일·금전은 접어 둔다 (내용은 HTML에 그대로 들어간다) */
function Reading({
  card,
  side,
  color,
}: {
  card: TarotCard;
  side: "upright" | "reversed";
  color: string;
}) {
  const [general, ...others] = TAROT_TOPICS;
  return (
    <section className="flex w-full flex-col gap-3 text-left" aria-labelledby={`${side}-title`}>
      <h2 id={`${side}-title`} className="text-lg font-bold">
        {side === "upright" ? "정방향으로 나왔을 때" : "역방향(거꾸로)으로 나왔을 때"}
      </h2>
      <Keywords words={card.keywords[side]} color={color} />
      <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <p className="text-sm font-bold">
          {general.emoji} {general.name}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{card.meanings[side][general.key]}</p>
      </div>
      <MoreDetails label={`📖 연애·일·금전 풀이 더 보기`}>
        {others.map((topic) => (
          <div key={topic.key}>
            <p className="text-sm font-bold">
              {topic.emoji} {topic.name}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{card.meanings[side][topic.key]}</p>
          </div>
        ))}
      </MoreDetails>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <span className="font-bold" style={{ color }}>
          한 줄 조언
        </span>{" "}
        {card.advice[side]}
      </p>
    </section>
  );
}

// 타로 카드 한 장의 의미 — 입력 없이 고정된 내용이라 서버에서 그리고, 검색에도 노출한다.
export function TarotMeaningView({ test, card }: { test: SajuTestConfig; card: TarotCard }) {
  const color = test.accentColor;
  const prev = tarotCards.find((item) => item.number === card.number - 1);
  const next = tarotCards.find((item) => item.number === card.number + 1);

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium text-zinc-400">타로 · 메이저 아르카나 {romanOf(card.number)}번</p>
      <TarotCardFace card={card} size="lg" />
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold">
          {card.nameKo} 카드의 의미
        </h1>
        <p className="text-sm font-semibold text-zinc-500">
          {card.number}번 · {card.nameEn}
        </p>
      </div>

      <section className="flex w-full flex-col gap-2 text-left" aria-labelledby="symbol-title">
        <h2 id="symbol-title" className="text-lg font-bold">
          그림에 담긴 상징
        </h2>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{card.symbol}</p>
      </section>

      <Reading card={card} side="upright" color={color} />
      <Reading card={card} side="reversed" color={color} />

      <p className="text-xs leading-relaxed text-zinc-400">
        타로 풀이는 지금의 마음을 비춰 보는 재미용 이야기예요. 앞날을 정하지 않으니 가볍게 참고해 주세요.
      </p>

      {/* 광고 있는 화면 → 다른 화면 이동은 완전한 새로고침으로 (자동 광고 잔존 방지) */}
      <a
        href={`/s/${test.id}`}
        className="w-full max-w-xs rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg"
        style={{ backgroundColor: color }}
      >
        나도 카드 뽑아 보기
      </a>

      <ShareBar
        title={`🃏 타로 ${card.nameKo} 카드의 의미`}
        text={`타로 ${card.nameKo}(${card.nameEn}) 카드는 정방향이면 "${card.keywords.upright.join(", ")}", 역방향이면 "${card.keywords.reversed.join(", ")}"래.\n너도 카드 한 장 뽑아 봐 👉`}
        accentColor={color}
      />

      <nav aria-label="다른 카드" className="flex w-full items-center justify-between gap-2 text-sm font-semibold">
        {prev ? (
          <a href={`/s/${test.id}/t/${prev.slug}`} className="text-zinc-500 underline underline-offset-4">
            ← {prev.number}. {prev.nameKo}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={`/s/${test.id}/t/${next.slug}`} className="text-zinc-500 underline underline-offset-4">
            {next.number}. {next.nameKo} →
          </a>
        ) : (
          <span />
        )}
      </nav>

      <RelatedTests current={`s/${test.id}`} />

      <a href="/" className="text-sm font-semibold text-zinc-500 underline underline-offset-4">
        다른 테스트 살펴보기
      </a>

      <div className="w-full pt-4">
        <AdSlot slot="tarot-card-bottom" />
      </div>
    </div>
  );
}

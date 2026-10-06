import type { TarotCard, TarotTopic } from "@/data/saju/types";
import cardsA from "@/data/saju/tarot-a";
import cardsB from "@/data/saju/tarot-b";

// 메이저 아르카나 22장 (0 바보 ~ 21 세계). 앞면 일러스트는 public/saju/tarot/<slug>.webp
export const tarotCards: TarotCard[] = [...cardsA, ...cardsB]
  .sort((a, b) => a.number - b.number)
  .map((card) => ({ ...card, image: card.image ?? `/saju/tarot/${card.slug}.webp` }));

export const getTarotCard = (number: number) => tarotCards.find((card) => card.number === number)!;

export const TAROT_TOPICS: { key: TarotTopic; name: string; emoji: string; question: string }[] = [
  { key: "general", name: "전체운", emoji: "✨", question: "요즘 나의 흐름은 어떨까?" },
  { key: "love", name: "연애", emoji: "💗", question: "마음과 관계는 어떻게 흘러갈까?" },
  { key: "work", name: "일·공부", emoji: "📚", question: "하고 있는 일은 잘 풀릴까?" },
  { key: "money", name: "금전", emoji: "💰", question: "돈의 흐름은 어떨까?" },
];

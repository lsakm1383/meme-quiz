import type { ToppingTestConfig } from "@/data/topping-types";

const test: ToppingTestConfig = {
  id: "malatang",
  emoji: "🍲",
  title: "나만의 마라탕 조합 만들기",
  description:
    "실제 마라탕집 토핑을 그대로 골라 담아서 완성하는 나만의 마라탕. 같은 조합을 고른 사람이 몇 명인지, 인기 조합 랭킹은 어떤지도 확인해보세요.",
  accentColor: "#dc2626",
  categories: [
    {
      id: "broth",
      label: "육수는?",
      minSelect: 1,
      maxSelect: 1,
      toppings: [
        { id: "bone-broth", emoji: "🥛", name: "사골 육수" },
        { id: "mala-broth", emoji: "🔴", name: "마라 육수" },
        { id: "mushroom-broth", emoji: "🍄", name: "버섯 육수" },
        { id: "half-half-broth", emoji: "🌗", name: "사골+마라 반반" },
      ],
    },
    {
      id: "spice",
      label: "맵기는?",
      minSelect: 1,
      maxSelect: 1,
      toppings: [
        { id: "mild", emoji: "😌", name: "안 매운맛" },
        { id: "medium", emoji: "🙂", name: "보통맛" },
        { id: "hot", emoji: "😅", name: "매운맛" },
        { id: "extra-hot", emoji: "🥵", name: "마라 매운맛" },
      ],
    },
    {
      id: "meat",
      label: "고기 (1~2개)",
      minSelect: 1,
      maxSelect: 2,
      toppings: [
        { id: "beef", emoji: "🥩", name: "얇은 소고기" },
        { id: "lamb", emoji: "🐑", name: "양고기" },
      ],
    },
    {
      id: "seafood",
      label: "해산물 (0~2개)",
      minSelect: 0,
      maxSelect: 2,
      toppings: [
        { id: "fishcake", emoji: "🍢", name: "어묵" },
        { id: "shrimp", emoji: "🍤", name: "칵테일 새우" },
        { id: "squid", emoji: "🦑", name: "오징어" },
      ],
    },
    {
      id: "vegetable",
      label: "채소 (2~4개)",
      minSelect: 2,
      maxSelect: 4,
      toppings: [
        { id: "napa-cabbage", emoji: "🥬", name: "배추" },
        { id: "bok-choy", emoji: "🥦", name: "청경채" },
        { id: "bean-sprout", emoji: "🌱", name: "숙주나물" },
        { id: "potato", emoji: "🥔", name: "감자" },
        { id: "lotus-root", emoji: "🪷", name: "연근" },
        { id: "burdock", emoji: "🌾", name: "우엉" },
      ],
    },
    {
      id: "mushroom",
      label: "버섯 (1~2개)",
      minSelect: 1,
      maxSelect: 2,
      toppings: [
        { id: "enoki", emoji: "🍄", name: "팽이버섯" },
        { id: "king-oyster", emoji: "🍄", name: "새송이버섯" },
        { id: "wood-ear", emoji: "🍄", name: "목이버섯" },
        { id: "shiitake", emoji: "🍄", name: "표고버섯" },
      ],
    },
    {
      id: "tofu",
      label: "두부류 (0~2개)",
      minSelect: 0,
      maxSelect: 2,
      toppings: [
        { id: "tofu", emoji: "⬜", name: "두부" },
        { id: "dried-tofu", emoji: "🟫", name: "건두부" },
        { id: "tofu-skin", emoji: "📄", name: "두부피" },
      ],
    },
    {
      id: "noodle",
      label: "면/사리 (1~4개)",
      minSelect: 1,
      maxSelect: 4,
      toppings: [
        { id: "glass-noodle", emoji: "🍜", name: "당면" },
        { id: "wide-glass-noodle", emoji: "🍝", name: "넓적당면" },
        { id: "bunmoja", emoji: "🍜", name: "분모자" },
        { id: "ramen-noodle", emoji: "🍥", name: "라면사리" },
        { id: "jjolmyeon-noodle", emoji: "🍲", name: "쫄면" },
        { id: "udon-noodle", emoji: "🍜", name: "우동사리" },
      ],
    },
    {
      id: "extra",
      label: "추가 토핑 (1~3개)",
      minSelect: 1,
      maxSelect: 3,
      toppings: [
        { id: "egg", emoji: "🥚", name: "계란" },
        { id: "meatball", emoji: "🍡", name: "완자" },
        { id: "mandu", emoji: "🥟", name: "만두" },
        { id: "seaweed", emoji: "🟩", name: "미역" },
        { id: "corn", emoji: "🌽", name: "옥수수" },
        { id: "cheese", emoji: "🧀", name: "치즈" },
      ],
    },
  ],
};

export default test;

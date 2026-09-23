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
        { id: "bone-broth", emoji: "🥛", name: "사골 육수", image: "/topping/malatang/bone-broth.webp" },
        { id: "mala-broth", emoji: "🔴", name: "마라 육수", image: "/topping/malatang/mala-broth.webp" },
        { id: "mushroom-broth", emoji: "🍄", name: "버섯 육수", image: "/topping/malatang/mushroom-broth.webp" },
        { id: "half-half-broth", emoji: "🌗", name: "사골+마라 반반", image: "/topping/malatang/half-half-broth.webp" },
      ],
    },
    {
      id: "spice",
      label: "맵기는?",
      minSelect: 1,
      maxSelect: 1,
      toppings: [
        { id: "mild", emoji: "😌", name: "안 매운맛", image: "/topping/malatang/mild.webp" },
        { id: "medium", emoji: "🙂", name: "보통맛", image: "/topping/malatang/medium.webp" },
        { id: "hot", emoji: "😅", name: "매운맛", image: "/topping/malatang/hot.webp" },
        { id: "extra-hot", emoji: "🥵", name: "마라 매운맛", image: "/topping/malatang/extra-hot.webp" },
      ],
    },
    {
      id: "meat",
      label: "고기 (1~2개)",
      minSelect: 1,
      maxSelect: 2,
      toppings: [
        { id: "beef", emoji: "🥩", name: "얇은 소고기", image: "/topping/malatang/beef.webp" },
        { id: "lamb", emoji: "🐑", name: "양고기", image: "/topping/malatang/lamb.webp" },
      ],
    },
    {
      id: "seafood",
      label: "해산물 (0~2개)",
      minSelect: 0,
      maxSelect: 2,
      toppings: [
        { id: "fishcake", emoji: "🍢", name: "어묵", image: "/topping/malatang/fishcake.webp" },
        { id: "shrimp", emoji: "🍤", name: "칵테일 새우", image: "/topping/malatang/shrimp.webp" },
        { id: "squid", emoji: "🦑", name: "오징어", image: "/topping/malatang/squid.webp" },
      ],
    },
    {
      id: "vegetable",
      label: "채소 (2~4개)",
      minSelect: 2,
      maxSelect: 4,
      toppings: [
        { id: "napa-cabbage", emoji: "🥬", name: "배추", image: "/topping/malatang/napa-cabbage.webp" },
        { id: "bok-choy", emoji: "🥦", name: "청경채", image: "/topping/malatang/bok-choy.webp" },
        { id: "bean-sprout", emoji: "🌱", name: "숙주나물", image: "/topping/malatang/bean-sprout.webp" },
        { id: "potato", emoji: "🥔", name: "감자", image: "/topping/malatang/potato.webp" },
        { id: "lotus-root", emoji: "🪷", name: "연근", image: "/topping/malatang/lotus-root.webp" },
        { id: "burdock", emoji: "🌾", name: "우엉", image: "/topping/malatang/burdock.webp" },
      ],
    },
    {
      id: "mushroom",
      label: "버섯 (1~2개)",
      minSelect: 1,
      maxSelect: 2,
      toppings: [
        { id: "enoki", emoji: "🍄", name: "팽이버섯", image: "/topping/malatang/enoki.webp" },
        { id: "king-oyster", emoji: "🍄", name: "새송이버섯", image: "/topping/malatang/king-oyster.webp" },
        { id: "wood-ear", emoji: "🍄", name: "목이버섯", image: "/topping/malatang/wood-ear.webp" },
        { id: "shiitake", emoji: "🍄", name: "표고버섯", image: "/topping/malatang/shiitake.webp" },
      ],
    },
    {
      id: "tofu",
      label: "두부류 (0~2개)",
      minSelect: 0,
      maxSelect: 2,
      toppings: [
        { id: "tofu", emoji: "⬜", name: "두부", image: "/topping/malatang/tofu.webp" },
        { id: "dried-tofu", emoji: "🟫", name: "건두부", image: "/topping/malatang/dried-tofu.webp" },
        { id: "tofu-skin", emoji: "📄", name: "두부피", image: "/topping/malatang/tofu-skin.webp" },
      ],
    },
    {
      id: "noodle",
      label: "면/사리 (1~4개)",
      minSelect: 1,
      maxSelect: 4,
      toppings: [
        { id: "glass-noodle", emoji: "🍜", name: "당면", image: "/topping/malatang/glass-noodle.webp" },
        { id: "wide-glass-noodle", emoji: "🍝", name: "넓적당면", image: "/topping/malatang/wide-glass-noodle.webp" },
        { id: "bunmoja", emoji: "🍜", name: "분모자", image: "/topping/malatang/bunmoja.webp" },
        { id: "ramen-noodle", emoji: "🍥", name: "라면사리", image: "/topping/malatang/ramen-noodle.webp" },
        { id: "jjolmyeon-noodle", emoji: "🍲", name: "쫄면", image: "/topping/malatang/jjolmyeon-noodle.webp" },
        { id: "udon-noodle", emoji: "🍜", name: "우동사리", image: "/topping/malatang/udon-noodle.webp" },
      ],
    },
    {
      id: "extra",
      label: "추가 토핑 (1~3개)",
      minSelect: 1,
      maxSelect: 3,
      toppings: [
        { id: "egg", emoji: "🥚", name: "계란", image: "/topping/malatang/egg.webp" },
        { id: "meatball", emoji: "🍡", name: "완자", image: "/topping/malatang/meatball.webp" },
        { id: "mandu", emoji: "🥟", name: "만두", image: "/topping/malatang/mandu.webp" },
        { id: "seaweed", emoji: "🟩", name: "미역", image: "/topping/malatang/seaweed.webp" },
        { id: "corn", emoji: "🌽", name: "옥수수", image: "/topping/malatang/corn.webp" },
        { id: "cheese", emoji: "🧀", name: "치즈", image: "/topping/malatang/cheese.webp" },
      ],
    },
  ],
};

export default test;

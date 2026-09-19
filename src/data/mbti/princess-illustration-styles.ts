// 공주 시리즈 전용 손그림 일러스트 스타일 매핑. 동화 삽화 느낌의 인물 초상을
// 헤어스타일·헤어컬러·드레스 색·액세서리 조합으로 표현한다 (실제 특정 브랜드의
// 캐릭터 디자인을 베끼지 않고, 매번 새로 조합해서 그린 손그림 스타일).

export type PrincessHairStyle = "long" | "wavy" | "updo" | "twin" | "short";
export type PrincessAccessory = "crown" | "flower" | "band" | "bow" | "none";
export type PrincessDressStyle = "gown" | "mermaid";

export type PrincessIllustrationStyle = {
  skin: string;
  hairStyle: PrincessHairStyle;
  hairColor: string;
  dressStyle: PrincessDressStyle;
  dressColor: string;
  /** dressStyle이 "mermaid"일 때 꼬리 색. 생략하면 dressColor를 그대로 쓴다. */
  tailColor?: string;
  accessory: PrincessAccessory;
  accessoryColor?: string;
};

const SKIN = "#fde8d2";

const STYLES: Record<string, PrincessIllustrationStyle> = {
  snowwhite: {
    skin: SKIN,
    hairStyle: "short",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#2563eb",
    accessory: "bow",
    accessoryColor: "#dc2626",
  },
  mermaid: {
    skin: SKIN,
    hairStyle: "long",
    hairColor: "#ea580c",
    dressStyle: "mermaid",
    dressColor: "#fda4af",
    tailColor: "#14b8a6",
    accessory: "none",
  },
  cinderella: {
    skin: SKIN,
    hairStyle: "updo",
    hairColor: "#eab308",
    dressStyle: "gown",
    dressColor: "#93c5fd",
    accessory: "band",
    accessoryColor: "#e5e7eb",
  },
  rapunzel: {
    skin: SKIN,
    hairStyle: "long",
    hairColor: "#facc15",
    dressStyle: "gown",
    dressColor: "#a78bfa",
    accessory: "flower",
    accessoryColor: "#f472b6",
  },
  aurora: {
    skin: SKIN,
    hairStyle: "wavy",
    hairColor: "#fde047",
    dressStyle: "gown",
    dressColor: "#f9a8d4",
    accessory: "crown",
    accessoryColor: "#fbbf24",
  },
  belle: {
    skin: SKIN,
    hairStyle: "updo",
    hairColor: "#78350f",
    dressStyle: "gown",
    dressColor: "#fde047",
    accessory: "band",
    accessoryColor: "#facc15",
  },
  thumbelina: {
    skin: SKIN,
    hairStyle: "twin",
    hairColor: "#fef08a",
    dressStyle: "gown",
    dressColor: "#bbf7d0",
    accessory: "flower",
    accessoryColor: "#fda4af",
  },
  pea: {
    skin: SKIN,
    hairStyle: "wavy",
    hairColor: "#b91c1c",
    dressStyle: "gown",
    dressColor: "#7c3aed",
    accessory: "crown",
    accessoryColor: "#facc15",
  },
  odette: {
    skin: SKIN,
    hairStyle: "updo",
    hairColor: "#e5e7eb",
    dressStyle: "gown",
    dressColor: "#f8fafc",
    accessory: "band",
    accessoryColor: "#60a5fa",
  },
  frogprince: {
    skin: SKIN,
    hairStyle: "long",
    hairColor: "#facc15",
    dressStyle: "gown",
    dressColor: "#fef08a",
    accessory: "none",
  },
  bari: {
    skin: SKIN,
    hairStyle: "long",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#0d9488",
    accessory: "band",
    accessoryColor: "#fbbf24",
  },
  pyeonggang: {
    skin: SKIN,
    hairStyle: "updo",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#b91c1c",
    accessory: "crown",
    accessoryColor: "#fbbf24",
  },
  seonhwa: {
    skin: SKIN,
    hairStyle: "wavy",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#c4b5fd",
    accessory: "flower",
    accessoryColor: "#fbcfe8",
  },
  nakrang: {
    skin: SKIN,
    hairStyle: "short",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#f97316",
    accessory: "band",
    accessoryColor: "#1c1917",
  },
  jacheongbi: {
    skin: SKIN,
    hairStyle: "twin",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#14b8a6",
    accessory: "none",
  },
  kongjwi: {
    skin: SKIN,
    hairStyle: "short",
    hairColor: "#1c1917",
    dressStyle: "gown",
    dressColor: "#d6d3d1",
    accessory: "none",
  },
};

export function getPrincessStyle(slug: string): PrincessIllustrationStyle | undefined {
  return STYLES[slug];
}

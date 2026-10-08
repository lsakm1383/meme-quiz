// 라면 취향 월드컵 전용 그림 스타일 매핑.
// 실제 제품 사진은 저작권 문제가 있어 쓸 수 없어서, 대신 각 라면의 실제 특징
// (국물 색/면발 굵기/컵라면 여부/고명)을 흉내낸 일러스트를 그린다.
// 다른 토너먼트에는 매핑이 없으니 RamenIcon이 알아서 이모지로 폴백한다.

export type RamenShape = "bowl" | "cup" | "bag";
export type RamenGarnish =
  | "none"
  | "chili"
  | "chiliDouble"
  | "greenOnion"
  | "cheese"
  | "pepper"
  | "veg"
  | "cucumber"
  | "shrimp"
  | "sesame"
  | "kimchi"
  | "tempura";

export type RamenStyle = {
  shape: RamenShape;
  broth: string;
  noodle: string;
  garnish: RamenGarnish;
};

const PRESETS = {
  classicRed: { shape: "bowl", broth: "#ef4444", noodle: "#fde68a", garnish: "chili" },
  classicHot: { shape: "bowl", broth: "#dc2626", noodle: "#fde68a", garnish: "chiliDouble" },
  classicMild: { shape: "bowl", broth: "#f59e0b", noodle: "#fde68a", garnish: "greenOnion" },
  classicRich: { shape: "bowl", broth: "#92400e", noodle: "#fde68a", garnish: "none" },
  dryHot: { shape: "bowl", broth: "#dc2626", noodle: "#fbbf24", garnish: "chili" },
  dryCreamy: { shape: "bowl", broth: "#f87171", noodle: "#fbbf24", garnish: "cheese" },
  dryMala: { shape: "bowl", broth: "#7c2d12", noodle: "#fbbf24", garnish: "pepper" },
  dryCurry: { shape: "bowl", broth: "#f59e0b", noodle: "#fbbf24", garnish: "none" },
  jjajang: { shape: "bowl", broth: "#3f3a37", noodle: "#d6d3d1", garnish: "veg" },
  jjajangHot: { shape: "bowl", broth: "#292524", noodle: "#d6d3d1", garnish: "chili" },
  bibim: { shape: "bowl", broth: "#f43f5e", noodle: "#fecdd3", garnish: "cucumber" },
  bibimHot: { shape: "bowl", broth: "#e11d48", noodle: "#fecdd3", garnish: "cucumber" },
  jjamppong: { shape: "bowl", broth: "#dc2626", noodle: "#fde68a", garnish: "shrimp" },
  whiteBroth: { shape: "bowl", broth: "#fdf2f2", noodle: "#fef3c7", garnish: "greenOnion" },
  whiteChili: { shape: "bowl", broth: "#fdf2f2", noodle: "#fef3c7", garnish: "chili" },
  seafood: { shape: "bowl", broth: "#fb923c", noodle: "#fde68a", garnish: "shrimp" },
  udon: { shape: "bowl", broth: "#fef3c7", noodle: "#fffbe6", garnish: "none" },
  udonTempura: { shape: "bowl", broth: "#fef3c7", noodle: "#fffbe6", garnish: "tempura" },
  gomtang: { shape: "bowl", broth: "#f5e6d3", noodle: "#fde68a", garnish: "none" },
  jjigae: { shape: "bowl", broth: "#b91c1c", noodle: "#fde68a", garnish: "kimchi" },
  nutty: { shape: "bowl", broth: "#fde68a", noodle: "#fef3c7", garnish: "sesame" },
  creamy: { shape: "bowl", broth: "#fef9c3", noodle: "#fffbe6", garnish: "cheese" },
  clear: { shape: "bowl", broth: "#fdf2e2", noodle: "#fde68a", garnish: "none" },
  cupClassic: { shape: "cup", broth: "#f59e0b", noodle: "#fde68a", garnish: "greenOnion" },
  cupRich: { shape: "cup", broth: "#92400e", noodle: "#fde68a", garnish: "none" },
  cupJjigae: { shape: "cup", broth: "#b91c1c", noodle: "#fde68a", garnish: "kimchi" },
  cupRed: { shape: "cup", broth: "#ef4444", noodle: "#fde68a", garnish: "greenOnion" },
  cupSeafood: { shape: "cup", broth: "#fb923c", noodle: "#fde68a", garnish: "shrimp" },
  cupUdonTempura: { shape: "cup", broth: "#fef3c7", noodle: "#fffbe6", garnish: "tempura" },
  cupSesame: { shape: "cup", broth: "#f97316", noodle: "#fde68a", garnish: "sesame" },
  bagCorn: { shape: "bag", broth: "#fbbf24", noodle: "#fde68a", garnish: "none" },
  bagTomato: { shape: "bag", broth: "#ef4444", noodle: "#fde68a", garnish: "none" },
} satisfies Record<string, RamenStyle>;

type PresetName = keyof typeof PRESETS;

const CANDIDATE_PRESET: Record<string, PresetName> = {
  shin: "classicRed",
  jin: "classicRed",
  yeol: "classicHot",
  maeptaeng: "classicHot",
  samyang: "classicMild",
  "anseong-tangmyun": "classicMild",
  neoguri: "seafood",
  "omori-kimchi-jjigae": "cupJjigae",
  "jin-mild": "classicMild",
  "snack-myun": "classicMild",
  "shin-black": "classicRich",
  "sari-gomtang": "gomtang",
  kkokkomyeon: "whiteChili",
  "nagasaki-jjamppong": "whiteBroth",
  "jin-jjamppong": "jjamppong",
  "mat-jjamppong": "jjamppong",
  chamkke: "cupSesame",
  dosirak: "cupClassic",
  yukgaejang: "cupClassic",
  wangdukgeong: "cupRed",
  saeutang: "cupSeafood",
  "tuigim-udon": "cupUdonTempura",
  odongtong: "seafood",
  "saengsaeng-udon": "udon",
  chapagetti: "jjajang",
  jjapaguri: "jjajang",
  jjawang: "jjajang",
  jinjjajang: "jjajang",
  bibim: "bibim",
  baehongdong: "bibim",
  buldak: "dryHot",
  "buldak-carbo": "dryCreamy",
};

export function getRamenStyle(candidateId: string): RamenStyle | undefined {
  const preset = CANDIDATE_PRESET[candidateId];
  return preset ? PRESETS[preset] : undefined;
}

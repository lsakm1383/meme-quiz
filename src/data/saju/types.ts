import type { FortuneKey } from "@/lib/saju/fortune";

// 사주 시리즈 해석 문구용 타입. 명식 계산은 src/lib/saju 에서 하고,
// 여기 데이터는 계산 결과(일간·오행 분포)에 맞춰 골라 보여줄 미리 쓴 풀이다.

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

/** 오행 개수에 따른 단계 — 8글자(시간 모르면 6글자) 중 몇 글자인지로 정한다 */
export type ElementLevel = "none" | "low" | "balanced" | "strong" | "excessive";

/** 일간(태어난 날의 천간) 10유형 — 결과 페이지의 대표 유형 */
export type DayMasterProfile = {
  /** URL 슬러그: gap, eul, byeong, jeong, mu, gi, gyeong, sin, im, gye */
  slug: string;
  /** 천간 한자 (예: "甲") */
  hanja: string;
  /** 천간 한글 + 오행 (예: "갑목") */
  name: string;
  emoji: string;
  /** 유형 일러스트 (public 기준 경로, 348x216 가로형). 없으면 emoji로 대체한다. */
  image?: string;
  /** 유형 이름 (예: "곧게 뻗는 큰 나무") */
  title: string;
  /** 한 줄 요약 (카드·공유 문구) */
  subtitle: string;
  /** 3~4문장 성향 설명 */
  description: string;
  /** 강점 3개 */
  strengths: string[];
  /** 조심하면 좋은 점 2개 */
  cautions: string[];
  /** 카드 배경색 (연한 톤) */
  color: string;
};

/** 오행별 해석 */
export type ElementProfile = {
  key: ElementKey;
  /** 한글 이름 (예: "목") */
  name: string;
  /** 한자 (예: "木") */
  hanja: string;
  /** 그래프 색 */
  color: string;
  /** 이 오행이 성향에서 뜻하는 것 1~2문장 */
  meaning: string;
  /** 단계별 성향 풀이 2~3문장 */
  levels: Record<ElementLevel, string>;
};

/** 그룹 운세(재물운·연애운 등 10가지) 해석 */
export type FortuneProfile = {
  key: FortuneKey;
  /** 예: "재물운" */
  name: string;
  emoji: string;
  /** 순위표·막대 색 */
  color: string;
  /** 이 운세가 원국의 무엇을 보고 점수를 매기는지 1~2문장 */
  basis: string;
  /** 점수 구간별 별칭과 풀이 — min 이상이면 해당. 높은 구간부터 5개 */
  tiers: { min: number; title: string; text: string }[];
};

/** 일간 기준 십성 10가지 — 오늘의 운세에서 "오늘 일진의 천간"이 나에게 무엇인지 */
export type TenGod =
  | "bigyeon" // 비견
  | "geopjae" // 겁재
  | "siksin" // 식신
  | "sanggwan" // 상관
  | "pyeonjae" // 편재
  | "jeongjae" // 정재
  | "pyeongwan" // 편관
  | "jeonggwan" // 정관
  | "pyeonin" // 편인
  | "jeongin"; // 정인

/** 오늘의 운세 해석 문구 */
export type DailyCopy = {
  /** 오늘 천간이 내게 어떤 십성인지에 따른 풀이 */
  tenGods: Record<
    TenGod,
    {
      /** 한글 이름 (예: "정재") */
      name: string;
      /** 오늘의 키워드 2~3개 (예: ["실속", "꼼꼼함"]) */
      keywords: string[];
      /** 오늘의 풀이 3문장 */
      reading: string;
      /** 오늘 특히 주의할 것 1~2문장 */
      caution: string;
      /** 오늘 해보면 좋은 행동 한 줄 */
      tip: string;
    }
  >;
  /** 오늘 일진의 지지가 내 일지·연지와 맺는 관계 */
  branch: {
    /** 일지와 육합 — 한 줄 */
    combine: string;
    /** 일지와 삼합 — 한 줄 */
    trine: string;
    /** 일지와 충 — 주의 한 줄 */
    clash: string;
    /** 연지(띠)와 충 — 주의 한 줄 */
    yearClash: string;
    /** 일지와 같은 글자 — 한 줄 */
    same: string;
  };
  /** 내 원국에 가장 부족한 오행으로 정하는 행운 아이템 */
  lucky: Record<
    ElementKey,
    {
      color: { name: string; hex: string };
      numbers: number[];
      direction: string;
      /** 날마다 돌아가며 하나씩 고른다 (8개) */
      items: string[];
      /** 날마다 돌아가며 하나씩 고른다 (6개) */
      foods: string[];
      /** 이 기운을 채우면 좋은 이유 한 줄 */
      why: string;
    }
  >;
  /** 오늘 총운 점수 구간 — min 이상, 높은 구간부터 5개 */
  tiers: { min: number; title: string; text: string }[];
};

/** 대운 해석 문구 */
export type DaeunCopy = {
  /** 대운의 천간·지지가 내게 어떤 십성인지에 따른 10년 테마 */
  tenGods: Record<
    TenGod,
    {
      /** 10년 테마 이름 (예: "배움과 귀인의 시기") */
      title: string;
      /** 이 기운이 흐르는 시기의 성격 2~3문장 */
      summary: string;
      /** 이 시기에 잡으면 좋은 기회 1~2문장 */
      opportunity: string;
      /** 이 시기에 조심할 점 1~2문장 */
      caution: string;
    }
  >;
  /** 대운 점수 구간 — min 이상, 높은 구간부터 5개 (인생 그래프 라벨) */
  tiers: { min: number; title: string; text: string }[];
};

/** 1:1 궁합 해석 문구. 본문에서 "나"와 "상대"는 이름이 있으면 이름으로 바꿔 보여준다 ({me}, {them}). */
export type CompatCopy = {
  /** 일간끼리 — 성격 궁합 */
  stem: Record<
    "combine" | "iGenerate" | "theyGenerate" | "same" | "iControl" | "theyControl",
    { title: string; text: string; tip: string }
  >;
  /** 일지끼리 — 생활 궁합 */
  dayBranch: Record<"combine" | "trine" | "clash" | "same" | "neutral", { title: string; text: string }>;
  /** 띠(연지)끼리 */
  zodiac: Record<"combine" | "trine" | "clash" | "same" | "neutral", { title: string; text: string }>;
  /** 궁합 점수 구간별 한마디 — COMPAT_TIERS 와 같은 min (85/72/58/44/0) */
  tiers: { min: number; text: string }[];
};

/** 신년 운세(세운) 해석 문구 */
export type YearlyCopy = {
  /** 그해 천간이 내게 어떤 십성인지에 따른 한 해 테마 */
  tenGods: Record<
    TenGod,
    {
      /** 한 해 테마 (예: "기회를 넓히는 해") */
      title: string;
      /** 한 해의 성격 2~3문장 */
      summary: string;
      /** 올해 잡으면 좋은 기회 1~2문장 */
      opportunity: string;
      /** 올해 조심할 점 1~2문장 */
      caution: string;
    }
  >;
  /** 그해 지지와 내 일지·띠의 관계 — 한 줄씩 */
  branch: { combine: string; trine: string; clash: string; same: string; zodiacClash: string };
  /** 삼재 — 들삼재·눌삼재·날삼재 (부드럽게) */
  samjae: { in: string; stay: string; out: string };
  /** 한 해 점수 구간 — min 85/72/58/44/0, 높은 구간부터 5개 */
  tiers: { min: number; title: string; text: string }[];
};

/** 띠별 운세 해석 문구 */
export type ZodiacCopy = {
  /** 열두 띠 소개 — 키는 ZODIAC_SLUGS (rat, ox, …) */
  animals: Record<
    string,
    {
      emoji: string;
      /** 띠 별명 (예: "재치 만점 아이디어 뱅크") */
      title: string;
      /** 전통적으로 말하는 띠의 성향 3문장 */
      description: string;
      strengths: string[];
      cautions: string[];
    }
  >;
  /** 오늘 일진의 지지와 내 띠의 관계 — 각 3가지 문장을 날마다 돌려 쓴다 */
  dailyRelation: Record<"combine" | "trine" | "clash" | "same" | "neutral", string[]>;
  /** 오늘 일진의 천간이 내 띠의 오행과 맺는 관계 — 각 2가지 문장 */
  dailyElement: Record<"same" | "generated" | "generates" | "controls" | "controlled", string[]>;
  /** 년생별 한 줄 운세 — 태어난 해 천간 기준 오늘 천간의 십성. 각 4가지 문장을 날마다 돌려 쓴다 */
  dailyTenGods: Record<TenGod, string[]>;
  /** 오늘 총운 구간 — min 85/72/58/44/0, 높은 구간부터 5개 */
  tiers: { min: number; title: string }[];
  /** 그해 띠(지지)와 내 띠의 관계 */
  yearRelation: Record<"combine" | "trine" | "clash" | "same" | "neutral", { title: string; text: string }>;
  /** 그해 천간 오행과 내 띠 오행의 관계 — 한 문장 */
  yearElement: Record<"same" | "generated" | "generates" | "controls" | "controlled", string>;
};

/** 토정비결 한 괘의 풀이 (원문 번역이 아니라 괘의 흐름을 오늘의 말로 새로 쓴 풀이) */
export type TojeongGua = {
  /** 한 해를 한 줄로 (예: "언 땅에 봄바람이 부는 해") */
  title: string;
  /** 한 해의 기운 — great 크게 좋음 · good 좋음 · mixed 좋고 나쁨이 섞임 · caution 조심 */
  tone: "great" | "good" | "mixed" | "caution";
  /** 한 해 키워드 3개 */
  keywords: string[];
  /** 한 해 총론 3~4문장 */
  summary: string;
  /** 음력 정월부터 섣달까지 12개월 */
  months: { mood: "good" | "normal" | "care"; text: string }[];
};

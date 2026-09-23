// 성격 테스트 결과 일러스트(public/mbti/<dir>/<slug>.webp)의 위치와 비율.
// 결과 화면 아이콘(MbtiResultIcon)과 공유 미리보기 이미지(opengraph-image)가 함께 쓴다.

type PhotoSeries = {
  dir: string;
  /** 원본 가로/세로 비율 */
  width: number;
  height: number;
  /** 가로로 아주 긴 배너형이라 화면에선 너비 기준으로 크기를 잡는다 */
  sizeByWidth?: boolean;
  /** Tailwind는 소스에 그대로 적힌 클래스만 생성하므로 동적으로 만들지 않고 여기 적어둔다 */
  aspectClass?: string;
  slugs: string[];
};

const SERIES: PhotoSeries[] = [
  {
    dir: "flavor",
    width: 7,
    height: 5,
    aspectClass: "aspect-[7/5]",
    slugs: [
      "mayo", "original", "cider", "neutral", "milk", "peach", "earlgrey", "mint",
      "darkchoco", "lavender", "fire", "honeybutter", "strawberry", "blackcoffee",
      "caramel", "lemon",
    ],
  },
  {
    dir: "princess",
    width: 1,
    height: 1,
    slugs: [
      "chimhollina", "kopanella", "elsayeon", "jjaryeojasmin", "udangtang-mermaid",
      "routine-keep", "flyswatter-fairy", "nabdwo", "jjingjjingi", "chronic-fatigue",
      "clear-eyed", "missing-tooth", "birdnest", "maple-kingdom", "joker-smile",
      "tragic-heroine",
    ],
  },
  {
    dir: "gamer",
    width: 14,
    height: 9,
    aspectClass: "aspect-[14/9]",
    slugs: [
      "healer", "strategist", "decisive", "tank", "mechanic", "sniper", "experimenter",
      "seer", "dreamer", "commander", "assassin", "hypeman", "showman", "wildcard",
      "initiator", "highlight",
    ],
  },
  {
    dir: "office",
    width: 398,
    height: 141,
    sizeByWidth: true,
    aspectClass: "aspect-[398/141]",
    slugs: [
      "overtime", "smoke-break", "pantry", "earphones", "clock-out", "excel-macro",
      "nunchi", "resignation", "meeting", "sales-king", "dinner-host", "stage-ace",
      "red-pen", "post-it", "mentor", "project-starter",
    ],
  },
];

export type MbtiPhoto = {
  /** public 기준 경로 (예: "/mbti/office/overtime.webp") */
  src: string;
  width: number;
  height: number;
  sizeByWidth: boolean;
  /** 정사각형이면 undefined */
  aspectClass?: string;
};

const BY_SLUG = new Map<string, MbtiPhoto>();
for (const series of SERIES) {
  for (const slug of series.slugs) {
    BY_SLUG.set(slug, {
      src: `/mbti/${series.dir}/${slug}.webp`,
      width: series.width,
      height: series.height,
      sizeByWidth: series.sizeByWidth ?? false,
      aspectClass: series.aspectClass,
    });
  }
}

/** 전용 일러스트가 없는 slug면 undefined (그땐 이모지로 대체한다). */
export function getMbtiPhoto(slug: string): MbtiPhoto | undefined {
  return BY_SLUG.get(slug);
}

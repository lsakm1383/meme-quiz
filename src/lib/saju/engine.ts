import KoreanLunarCalendar from "korean-lunar-calendar";
import { Solar } from "lunar-javascript";
import type { ElementKey } from "@/data/saju/types";
import { STEMS, BRANCHES, ELEMENT_ORDER } from "@/lib/saju/constants";

// 사주 원국(연·월·일·시주) 계산.
//
// 기준:
// - 연주는 입춘, 월주는 12절(節)의 절입 시각으로 바뀐다 (1월 1일·음력 설 기준이 아님).
//   절기 시각은 lunar-javascript 의 천문 계산(중국 표준시 UTC+8)을 UTC로 바꿔 쓴다.
// - 입력한 시각은 서울의 당시 법정 시간으로 보고 UTC로 바꾼다. 브라우저/Node 의 시간대
//   데이터(Asia/Seoul)에 1948~60·87~88년 서머타임과 1954~61년 UTC+8:30 시절이 들어 있다.
// - 시주와 날짜 경계는 한반도 중앙 경도(동경 127.5도) 평균태양시로 본다 = UTC+8:30.
//   그래서 요즘 표준시로는 자시가 23:30~01:30 이고, 23:30부터는 다음 날 일주로 넘어간다
//   (야자시/조자시를 나누지 않는 방식).
// - 음력 입력은 한국천문연구원 기준 음력 데이터(korean-lunar-calendar)로 양력으로 바꾼다.

export type CalendarType = "solar" | "lunar";

export type BirthInput = {
  calendar: CalendarType;
  /** 음력 윤달 여부 (양력이면 무시) */
  leapMonth: boolean;
  year: number;
  month: number;
  day: number;
  /** 태어난 시각 (서울 기준 당시 시계). 모르면 null */
  time: { hour: number; minute: number } | null;
};

export type Pillar = { stem: number; branch: number };

export type SajuChart = {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  /** 태어난 시간을 모르면 null */
  hour: Pillar | null;
  /** 원국 글자(시간 모르면 6글자) 중 각 오행 개수 */
  elements: Record<ElementKey, number>;
  /** 계산에 쓴 양력 날짜 (음력 입력이면 변환된 날짜) */
  solarDate: { year: number; month: number; day: number };
  /** 시간을 몰라서 절입일 등 경계가 애매할 때 보여줄 안내 */
  notes: string[];
};

export type SajuError = { error: string };

const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;
/** 동경 127.5도 평균태양시 = UTC+8:30 */
const LOCAL_MEAN_OFFSET = 8.5 * HOUR;
/** 1970-01-01(UTC 날짜)의 일진 인덱스 = 辛巳(17) */
const DAY_PILLAR_EPOCH_INDEX = 17;

/** 절(節) 이름 → 그 절부터 시작하는 달의 지지 인덱스 */
const JIE_TO_BRANCH: Record<string, number> = {
  小寒: 1, XIAO_HAN: 1,
  立春: 2, LI_CHUN: 2,
  惊蛰: 3, JING_ZHE: 3,
  清明: 4,
  立夏: 5,
  芒种: 6,
  小暑: 7,
  立秋: 8,
  白露: 9,
  寒露: 10,
  立冬: 11,
  大雪: 0, DA_XUE: 0,
};

type Jie = { time: number; branch: number };

const jieCache = new Map<number, Jie[]>();

/** 해당 양력 연도 앞뒤를 포함한 12절 절입 시각(UTC ms) 목록, 시간순 */
function jieAround(year: number): Jie[] {
  const cached = jieCache.get(year);
  if (cached) return cached;
  const seen = new Map<number, Jie>();
  for (const y of [year - 1, year, year + 1]) {
    const table = Solar.fromYmd(y, 6, 1).getLunar().getJieQiTable();
    for (const [name, solar] of Object.entries(table)) {
      const branch = JIE_TO_BRANCH[name];
      if (branch === undefined) continue;
      const time = chinaWallToUtc(solar.toYmdHms());
      seen.set(Math.round(time / 60000), { time, branch });
    }
  }
  const list = [...seen.values()].sort((a, b) => a.time - b.time);
  jieCache.set(year, list);
  return list;
}

function chinaWallToUtc(ymdhms: string): number {
  const [date, clock] = ymdhms.split(" ");
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm, ss] = clock.split(":").map(Number);
  return Date.UTC(y, m - 1, d, hh, mm, ss) - 8 * HOUR;
}

const seoulFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

/** 그 순간 서울의 UTC 오프셋(ms) */
function seoulOffset(utc: number): number {
  const parts = Object.fromEntries(
    seoulFormatter.formatToParts(new Date(utc)).map((p) => [p.type, p.value])
  );
  const wall = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute)
  );
  return wall - Math.floor(utc / 60000) * 60000;
}

/** 서울 당시 시계 기준 시각 → UTC ms (서머타임·UTC+8:30 시절 반영) */
function seoulWallToUtc(y: number, m: number, d: number, hh: number, mm: number): number {
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  let utc = wall - 9 * HOUR;
  for (let i = 0; i < 3; i++) utc = wall - seoulOffset(utc);
  return utc;
}

function dayPillarOf(utcMidnightOfDate: number): Pillar {
  const days = Math.floor(utcMidnightOfDate / DAY);
  const index = (((days + DAY_PILLAR_EPOCH_INDEX) % 60) + 60) % 60;
  return { stem: index % 10, branch: index % 12 };
}

function isValidSolarDate(y: number, m: number, d: number): boolean {
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export function computeSaju(input: BirthInput): SajuChart | SajuError {
  let { year, month, day } = input;

  if (input.calendar === "lunar") {
    const calendar = new KoreanLunarCalendar();
    if (!calendar.setLunarDate(year, month, day, input.leapMonth)) {
      return { error: "존재하지 않는 음력 날짜예요. 날짜나 윤달 여부를 확인해주세요." };
    }
    const solar = calendar.getSolarCalendar();
    // 윤달이 없는 달에 윤달을 체크하면 라이브러리가 평달로 바꿔버리므로 직접 확인한다.
    const back = new KoreanLunarCalendar();
    back.setSolarDate(solar.year, solar.month, solar.day);
    const lunar = back.getLunarCalendar();
    if (!!lunar.intercalation !== input.leapMonth || lunar.month !== month || lunar.day !== day) {
      return { error: "존재하지 않는 음력 날짜예요. 날짜나 윤달 여부를 확인해주세요." };
    }
    ({ year, month, day } = solar);
  } else if (!isValidSolarDate(year, month, day)) {
    return { error: "존재하지 않는 날짜예요. 다시 확인해주세요." };
  }

  const notes: string[] = [];
  const time = input.time;

  // 연·월주 판단 시각: 시간을 모르면 그날 정오로 본다.
  const instant = seoulWallToUtc(year, month, day, time?.hour ?? 12, time?.minute ?? 0);
  if (instant > Date.now()) {
    return { error: "미래의 날짜는 입력할 수 없어요." };
  }

  const jies = jieAround(year);
  const current = [...jies].reverse().find((jie) => jie.time <= instant);
  if (!current) return { error: "지원하지 않는 날짜예요." };

  // 연주: 그해 입춘 전이면 전년도
  const lichun = jies.find((jie) => jie.branch === 2 && new Date(jie.time + 9 * HOUR).getUTCFullYear() === year);
  const sajuYear = lichun && instant < lichun.time ? year - 1 : year;
  const yearIndex = (((sajuYear - 4) % 60) + 60) % 60;
  const yearPillar: Pillar = { stem: yearIndex % 10, branch: yearIndex % 12 };

  // 월주: 절입 후 지지, 천간은 연간에 따라 寅월 천간이 정해진다 (甲己년 丙寅월 ...)
  const monthOffset = (current.branch - 2 + 12) % 12;
  const firstMonthStem = ((yearPillar.stem % 5) * 2 + 2) % 10;
  const monthPillar: Pillar = { stem: (firstMonthStem + monthOffset) % 10, branch: current.branch };

  if (!time) {
    const dayStart = seoulWallToUtc(year, month, day, 0, 0);
    const dayEnd = dayStart + DAY;
    if (jies.some((jie) => jie.time >= dayStart && jie.time < dayEnd)) {
      notes.push(
        "태어난 날이 절기가 바뀌는 날이라, 태어난 시간에 따라 월주(또는 연주)가 달라질 수 있어요."
      );
    }
  }

  // 일주·시주: 평균태양시 기준. 23시(= 표준시 23:30) 이후면 다음 날 일주.
  let dayPillar: Pillar;
  let hourPillar: Pillar | null = null;
  if (time) {
    const local = new Date(instant + LOCAL_MEAN_OFFSET);
    const localHour = local.getUTCHours();
    const localDate = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
    dayPillar = dayPillarOf(localHour >= 23 ? localDate + DAY : localDate);
    const branch = Math.floor((localHour + 1) / 2) % 12;
    const ziStem = (dayPillar.stem % 5) * 2;
    hourPillar = { stem: (ziStem + branch) % 10, branch };
  } else {
    dayPillar = dayPillarOf(Date.UTC(year, month - 1, day));
  }

  const elements = Object.fromEntries(ELEMENT_ORDER.map((key) => [key, 0])) as Record<
    ElementKey,
    number
  >;
  for (const pillar of [yearPillar, monthPillar, dayPillar, hourPillar]) {
    if (!pillar) continue;
    elements[STEMS[pillar.stem].element] += 1;
    elements[BRANCHES[pillar.branch].element] += 1;
  }

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    elements,
    solarDate: { year, month, day },
    notes,
  };
}

export function isSajuError(value: SajuChart | SajuError): value is SajuError {
  return "error" in value;
}

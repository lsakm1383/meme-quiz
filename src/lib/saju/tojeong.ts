import KoreanLunarCalendar from "korean-lunar-calendar";
import { dayPillarForDate, type BirthInput, type Pillar } from "@/lib/saju/engine";
import { yearPillarOf } from "@/lib/saju/yearly";

// 토정비결 작괘법. 음력 생년월일과 보려는 해로 상괘(1~8)·중괘(1~6)·하괘(1~3)를 정해 144괘 중 하나를 찾는다.
//   상괘 = (세는 나이 + 그해 태세수) ÷ 8 의 나머지 (0이면 8)
//   중괘 = (그해 생월의 날수 30/29 + 그해 생월의 월건수) ÷ 6 의 나머지 (0이면 6)
//   하괘 = (음력 생일 + 그해 음력 생일의 일진수) ÷ 3 의 나머지 (0이면 3)
// 태세수·월건수·일진수는 60갑자마다 정해진 조견표 값인데, 표를 맞춰 보면 아래처럼 천간·지지 값의 합으로 정리된다.
//   월건수 = 천간 선천수 + 지지 선천수 · 태세수 = 천간 선천수 + 지지 태세값 · 일진수 = 태세수 - 2

/** 천간 선천수 (甲己 9, 乙庚 8, 丙辛 7, 丁壬 6, 戊癸 5) */
const STEM_NUM = [9, 8, 7, 6, 5, 9, 8, 7, 6, 5];
/** 지지 선천수 (子午 9, 丑未 8, 寅申 7, 卯酉 6, 辰戌 5, 巳亥 4) */
const BRANCH_NUM = [9, 8, 7, 6, 5, 4, 9, 8, 7, 6, 5, 4];
/** 조견표의 태세수에서 천간 선천수를 뺀 지지 값 */
const BRANCH_TAESE = [11, 13, 10, 10, 13, 9, 9, 13, 12, 12, 13, 11];

export const taeseNumber = (p: Pillar) => STEM_NUM[p.stem] + BRANCH_TAESE[p.branch];
export const wolgeonNumber = (p: Pillar) => STEM_NUM[p.stem] + BRANCH_NUM[p.branch];
export const iljinNumber = (p: Pillar) => taeseNumber(p) - 2;

export type LunarBirth = { year: number; month: number; day: number; leapMonth: boolean };

/** 입력(양력이면 음력으로 바꿔서)을 음력 생년월일로 */
export function lunarBirthOf(input: BirthInput): LunarBirth | null {
  if (input.calendar === "lunar") {
    return { year: input.year, month: input.month, day: input.day, leapMonth: input.leapMonth };
  }
  const calendar = new KoreanLunarCalendar();
  if (!calendar.setSolarDate(input.year, input.month, input.day)) return null;
  const lunar = calendar.getLunarCalendar();
  return { year: lunar.year, month: lunar.month, day: lunar.day, leapMonth: !!lunar.intercalation };
}

/** 그해 음력 m월(평달)의 날수 — 큰달 30, 작은달 29 */
function lunarMonthDays(year: number, month: number): 29 | 30 {
  const calendar = new KoreanLunarCalendar();
  if (!calendar.setLunarDate(year, month, 30, false)) return 29;
  // 30일이 다음 달 1일로 넘어가 버리지 않았는지 되짚어 본다
  const solar = calendar.getSolarCalendar();
  const back = new KoreanLunarCalendar();
  back.setSolarDate(solar.year, solar.month, solar.day);
  const lunar = back.getLunarCalendar();
  return lunar.month === month && lunar.day === 30 && !lunar.intercalation ? 30 : 29;
}

export type TojeongGuaCode = `${number}`;

export type Tojeong = {
  year: number;
  /** 세는 나이 (음력 생년 기준) */
  age: number;
  birth: LunarBirth;
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  taese: number;
  wolgeon: number;
  iljin: number;
  monthDays: 29 | 30;
  /** 그해 생일로 친 날 — 작은달에 30일생이면 29일로 본다 */
  birthDay: number;
  upper: number;
  middle: number;
  lower: number;
  /** "352" 같은 괘 번호 */
  code: string;
};

export function computeTojeong(birth: LunarBirth, year: number): Tojeong {
  const age = year - birth.year + 1;
  const yearPillar = yearPillarOf(year);
  const taese = taeseNumber(yearPillar);
  const upper = (age + taese) % 8 || 8;

  // 그해 생월의 월건: 정월이 寅월이고, 정월 천간은 그해 천간으로 정해진다 (甲己년 丙寅월 …)
  const monthPillar: Pillar = {
    stem: (((yearPillar.stem % 5) * 2 + 2 + (birth.month - 1)) % 10 + 10) % 10,
    branch: (birth.month + 1) % 12,
  };
  const wolgeon = wolgeonNumber(monthPillar);
  const monthDays = lunarMonthDays(year, birth.month);
  const middle = (monthDays + wolgeon) % 6 || 6;

  const birthDay = Math.min(birth.day, monthDays);
  const calendar = new KoreanLunarCalendar();
  calendar.setLunarDate(year, birth.month, birthDay, false);
  const solar = calendar.getSolarCalendar();
  const dayPillar = dayPillarForDate(solar.year, solar.month, solar.day);
  const iljin = iljinNumber(dayPillar);
  const lower = (birthDay + iljin) % 3 || 3;

  return {
    year,
    age,
    birth,
    yearPillar,
    monthPillar,
    dayPillar,
    taese,
    wolgeon,
    iljin,
    monthDays,
    birthDay,
    upper,
    middle,
    lower,
    code: `${upper}${middle}${lower}`,
  };
}

/** 144괘 번호 목록 (111 ~ 863) */
export const TOJEONG_CODES: string[] = Array.from({ length: 8 }, (_, u) =>
  Array.from({ length: 6 }, (_, m) => Array.from({ length: 3 }, (_, l) => `${u + 1}${m + 1}${l + 1}`))
).flat(2);

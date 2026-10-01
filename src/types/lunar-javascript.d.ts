// lunar-javascript 는 타입 정의를 제공하지 않아, 사주 계산(절기 시각)에 쓰는 부분만 선언한다.
declare module "lunar-javascript" {
  export class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    static fromYmdHms(
      year: number,
      month: number,
      day: number,
      hour: number,
      minute: number,
      second: number
    ): Solar;
    getLunar(): Lunar;
    /** "YYYY-MM-DD HH:mm:ss" (중국 표준시, UTC+8) */
    toYmdHms(): string;
  }

  export class Lunar {
    /** 절기 이름 → 시각. 한자 이름과 앞뒤 해의 병음 대문자 키(LI_CHUN 등)가 섞여 있다. */
    getJieQiTable(): Record<string, Solar>;
    getEightChar(): EightChar;
    getDayInGanZhi(): string;
  }

  export class EightChar {
    setSect(sect: number): void;
    getYear(): string;
    getMonth(): string;
    getDay(): string;
    getTime(): string;
  }
}

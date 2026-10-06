// 손금 보기. 사진 없이 이용자가 자기 손바닥을 보고 각 손금의 모양을 그림 보기에서 고른다.
// 감정선 × 두뇌선으로 유형 이름을 만들고, 생명선·운명선·결혼선은 따로 풀이한다.

export type PalmSide = "left" | "right";
export type PalmHand = "dominant" | "other";
export type HeartShape = "long" | "between" | "short" | "straight";
export type HeadShape = "straight" | "curve" | "fork" | "short";
export type HeadStart = "joined" | "separate";
export type LifeShape = "wide" | "narrow" | "broken" | "double";
export type FateShape = "clear" | "late" | "faint" | "none";
export type MarriageShape = "one" | "two" | "faint";

export type PalmAnswers = {
  /** 보고 있는 손 — 왼손이면 그림을 좌우로 뒤집어 보여준다 (예전에 저장된 답에는 없을 수 있다) */
  side?: PalmSide;
  hand: PalmHand;
  /** 막쥔손금이면 "simian" — 이때 두뇌선 질문은 건너뛴다 */
  heart: HeartShape | "simian";
  head?: HeadShape;
  headStart?: HeadStart;
  life: LifeShape;
  fate: FateShape;
  marriage: MarriageShape;
};

/** 손바닥 그림에서 강조할 선 */
export type PalmLine = "heart" | "head" | "life" | "fate" | "marriage";

/** 그림에 그릴 각 선의 모양 — 고르지 않은 선은 기본 모양으로 흐리게 그린다 */
export type PalmDrawing = {
  heart: HeartShape | "simian";
  head: HeadShape;
  headStart: HeadStart;
  life: LifeShape;
  fate: FateShape;
  marriage: MarriageShape;
};

export const DEFAULT_DRAWING: PalmDrawing = {
  heart: "long",
  head: "straight",
  headStart: "joined",
  life: "wide",
  fate: "clear",
  marriage: "one",
};

const STORAGE_KEY = "meme-quiz:palm:answers";

export function savePalmAnswers(answers: PalmAnswers): boolean {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    return true;
  } catch {
    return false;
  }
}

export function loadPalmAnswers(): PalmAnswers | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PalmAnswers) : null;
  } catch {
    return null;
  }
}

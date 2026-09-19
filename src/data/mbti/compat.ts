// 16가지 유형 × 16가지 유형의 궁합을 일일이 표로 만드는 대신, 글자 차이(해밍 거리)를
// 기반으로 한 순수 함수로 계산한다. 대칭이 저절로 보장되고, 유형이 추가/변경돼도
// 매트릭스를 다시 손볼 필요가 없다.

const AXES = ["EI", "SN", "TF", "JP"] as const;

function flipAxis(code: string, axisIndex: number): string {
  const pair = AXES[axisIndex];
  const letters = code.split("");
  letters[axisIndex] = letters[axisIndex] === pair[0] ? pair[1] : pair[0];
  return letters.join("");
}

export function hammingDistance(a: string, b: string): number {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) count++;
  }
  return count;
}

/** 가까운 사이 Top1 — 에너지 방향(E/I)만 다르고 나머지 3글자는 같은 유형. */
export function getTopCloseCode(code: string): string {
  return flipAxis(code, 0);
}

/** 조심해야 할 사이 Top1 — 판단 기준(T/F)만 다르고 나머지 3글자는 같은 유형. */
export function getTopCautionCode(code: string): string {
  return flipAxis(code, 2);
}

export type GroupRelation = {
  label: string;
  color: string;
};

/** 그룹 관계도에서 아무 두 유형 사이에나 매길 수 있는 4단계 궁합 라벨. */
export function getGroupRelation(a: string, b: string): GroupRelation {
  if (a === b) {
    return { label: "판박이 케미", color: "#60a5fa" };
  }

  const distance = hammingDistance(a, b);

  if (distance === 1) {
    const diffIndex = [0, 1, 2, 3].find((i) => a[i] !== b[i]);
    const axis = diffIndex !== undefined ? AXES[diffIndex] : null;
    if (axis === "EI" || axis === "JP") {
      return { label: "베스트프렌드 케미", color: "#34d399" };
    }
    return { label: "티격태격 케미", color: "#fb923c" };
  }

  if (distance === 2) {
    return { label: "그냥저냥 케미", color: "#fbbf24" };
  }

  return { label: "티격태격 케미", color: "#fb923c" };
}

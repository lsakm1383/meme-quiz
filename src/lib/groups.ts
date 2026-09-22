// 그룹(친구 케미 테스트) 데이터 모델. Redis Hash 하나(group:<groupId>)에
// __meta 필드(그룹 제목·테스트 id·생성 시각)와 member:<memberId> 필드(참여자마다
// 하나씩)를 같이 담는다. 필드 단위로 HSET하기 때문에 여러 명이 동시에 참여해도
// 서로 덮어쓰지 않는다.

export type GroupMember = {
  id: string;
  nickname: string;
  code: string;
  joinedAt: number;
};

export type GroupMeta = {
  title: string;
  testId: string;
  createdAt: number;
};

export const MAX_TITLE_LENGTH = 30;
export const MAX_NICKNAME_LENGTH = 12;
export const MAX_MEMBERS = 30;

export function groupKey(groupId: string): string {
  return `group:${groupId}`;
}

export function memberField(memberId: string): string {
  return `member:${memberId}`;
}

export function isValidTitle(title: unknown): title is string {
  return (
    typeof title === "string" &&
    title.trim().length > 0 &&
    title.trim().length <= MAX_TITLE_LENGTH
  );
}

export function isValidNickname(nickname: unknown): nickname is string {
  return (
    typeof nickname === "string" &&
    nickname.trim().length > 0 &&
    nickname.trim().length <= MAX_NICKNAME_LENGTH
  );
}

// @upstash/redis는 해시 값을 저장/조회할 때 JSON을 자동으로 직렬화/역직렬화한다.
// 그래서 hgetall로 돌아온 값이 이미 파싱된 객체일 수도, 아직 문자열일 수도 있어
// 둘 다 방어적으로 처리한다.
function parseValue<T>(value: unknown): T | null {
  if (value == null) return null;
  if (typeof value === "object") return value as T;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  return null;
}

export function parseGroupHash(raw: Record<string, unknown> | null): {
  meta: GroupMeta;
  members: GroupMember[];
} | null {
  if (!raw) return null;

  const meta = parseValue<GroupMeta>(raw.__meta);
  if (!meta) return null;

  const members = Object.entries(raw)
    .filter(([field]) => field !== "__meta")
    .map(([, value]) => parseValue<GroupMember>(value))
    .filter((member): member is GroupMember => member !== null)
    .sort((a, b) => a.joinedAt - b.joinedAt);

  return { meta, members };
}

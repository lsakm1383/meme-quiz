# 오늘의 밈 테스트

밈형 유형 테스트(SBTI류)를 여러 개 찍어낼 수 있는 재사용 템플릿. 질문/보기/결과 카피만 담긴 데이터 파일 하나로 새 테스트가 홈 목록, 진행 화면, 결과 카드, OG 공유 이미지, 공유 버튼까지 전부 자동으로 붙는다.

```bash
npm run dev
```

## 새 테스트 추가하기

1. `src/data/quizzes/internet-pickle.ts`를 복사해서 새 파일을 만든다 (예: `src/data/quizzes/office-meme.ts`).
2. `id`, `title`, `description`, `questions`, `results`만 새 소재에 맞게 채운다.
   - `results`는 보통 3~4개가 적당하다.
   - 각 보기(`option`)의 `scores`는 `{ 결과id: 점수 }`. 가장 점수가 높은 결과로 배정된다.
3. `src/data/quizzes/index.ts`에 import + `quizzes` 배열 등록.

이게 끝이다. 라우팅(`/[quizId]`, `/[quizId]/r/[resultId]`), OG 이미지, 카카오톡/인스타 공유, 광고 슬롯은 모두 데이터 기반이라 코드를 더 건드릴 필요가 없다.

## 배포 전 체크리스트

- `.env.local`에 `NEXT_PUBLIC_SITE_URL` (배포 도메인)을 설정한다 — OG 태그/공유 링크가 이 값을 기준으로 만들어진다.
- Google AdSense 승인 후 `NEXT_PUBLIC_ADSENSE_CLIENT_ID`를 채우면 광고가 나온다. 값이 없으면 광고 스크립트/슬롯이 아예 렌더링되지 않는다 (승인 전 깨진 광고 자리가 안 보이도록).
- 결과 페이지 하단, 홈 화면 하단에만 광고를 배치했다 — 질문 진행 중에는 이탈/완료율을 지키기 위해 광고를 넣지 않았다. 필요하면 `src/components/AdSlot.tsx`를 다른 곳에도 추가로 배치.

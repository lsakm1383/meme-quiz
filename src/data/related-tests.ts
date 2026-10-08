// 결과 화면 아래 "이 테스트도 해보세요"에 띄울 테스트 — 결과를 본 사람이 이어서 해볼 만한 것을 손으로 골랐다.
// 키는 test-registry 의 키(주소 앞부분)와 같다. 목록에 없는 테스트는 같은 분야의 다른 테스트로 채운다.
export const RELATED_TESTS: Record<string, string[]> = {
  // 1분 테스트
  "internet-pickle": ["reply-speed", "corporate-cattle", "m/gamer-type"],
  "corporate-cattle": ["m/office-type", "spending-style", "internet-pickle"],
  "reply-speed": ["internet-pickle", "m/flavor-type", "s/compat"],
  "spending-style": ["travel-style", "corporate-cattle", "s/fortune"],
  "travel-style": ["d/honeymoon", "d/region", "spending-style"],
  "flower-type": ["moon-phase", "m/princess-type", "s/today"],
  "moon-phase": ["flower-type", "s/tarot", "s/saju"],
  // 성격 유형
  "m/flavor-type": ["m/princess-type", "flower-type", "d/cafe-recommend"],
  "m/princess-type": ["m/flavor-type", "flower-type", "d/dress"],
  "m/gamer-type": ["m/office-type", "internet-pickle", "m/flavor-type"],
  "m/office-type": ["corporate-cattle", "m/gamer-type", "d/menu-recommend"],
  // 사주 시리즈
  "s/saju": ["s/compat", "s/newyear", "s/daeun"],
  "s/fortune": ["s/today", "s/compat", "s/saju"],
  "s/today": ["s/zodiac", "s/tarot", "s/fortune"],
  "s/daeun": ["s/newyear", "s/saju", "s/tojeong"],
  "s/compat": ["s/fortune", "s/saju", "m/flavor-type"],
  "s/newyear": ["s/tojeong", "s/zodiac", "s/daeun"],
  "s/zodiac": ["s/today", "s/newyear", "s/dream"],
  // 전통 운세
  "s/tojeong": ["s/newyear", "s/zodiac", "s/palm"],
  "s/dream": ["s/tarot", "s/palm", "s/today"],
  "s/palm": ["s/tarot", "s/saju", "s/dream"],
  "s/tarot": ["s/palm", "s/today", "moon-phase"],
  // 추천
  "d/cafe-recommend": ["d/menu-recommend", "w/icecream-worldcup", "m/flavor-type"],
  "d/menu-recommend": ["c/malatang", "w/ramen-worldcup", "d/cafe-recommend"],
  "d/dress": ["d/honeymoon", "l/wedding", "s/compat"],
  "d/honeymoon": ["d/dress", "travel-style", "l/wedding"],
  "d/region": ["travel-style", "d/honeymoon", "d/menu-recommend"],
  // 월드컵·조합 만들기
  "w/ramen-worldcup": ["w/icecream-worldcup", "c/malatang", "d/menu-recommend"],
  "w/icecream-worldcup": ["w/ramen-worldcup", "d/cafe-recommend", "m/flavor-type"],
  "c/malatang": ["w/ramen-worldcup", "d/menu-recommend", "m/flavor-type"],
  // 체크리스트
  "l/wedding": ["d/dress", "d/honeymoon", "l/appliances"],
  "l/appliances": ["l/wedding", "spending-style", "corporate-cattle"],
};

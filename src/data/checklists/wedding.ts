import type { ChecklistConfig } from "@/data/checklist-types";

const checklist: ChecklistConfig = {
  id: "wedding",
  emoji: "💍",
  title: "결혼식 체크리스트",
  description:
    "예식 준비부터 신혼여행까지, 빠뜨리기 쉬운 항목들을 하나씩 체크해보세요. 체크한 내용은 이 기기에만 저장돼요.",
  accentColor: "#db2777",
  sections: [
    {
      id: "venue",
      title: "예식 준비",
      items: [
        { id: "hall", text: "예식장 계약", note: "날짜·홀 규모·식대 확인" },
        { id: "planner", text: "웨딩플래너/직접 준비 결정" },
        { id: "invitation", text: "청첩장 디자인 및 인쇄" },
        { id: "mc", text: "주례·사회자 섭외" },
        { id: "gift-money", text: "축의금 관리 방식 정하기" },
      ],
    },
    {
      id: "sdm",
      title: "스드메 (스튜디오·드레스·메이크업)",
      items: [
        { id: "studio", text: "웨딩 촬영 스튜디오 예약" },
        { id: "dress", text: "드레스 투어 및 예약" },
        { id: "makeup", text: "메이크업 샵 예약 및 리허설" },
        { id: "groom-suit", text: "신랑 예복 준비" },
      ],
    },
    {
      id: "housing",
      title: "혼수·신혼집",
      items: [
        { id: "house", text: "신혼집 계약", note: "전세/매매 여부, 입주일 확인" },
        { id: "appliances", text: "혼수 가전·가구 구매" },
        { id: "gift-exchange", text: "예단·예물 준비" },
      ],
    },
    {
      id: "honeymoon",
      title: "신혼여행",
      items: [
        { id: "passport", text: "여권 유효기간 확인" },
        { id: "destination", text: "신혼여행지 결정" },
        { id: "flight-hotel", text: "항공권·숙소 예약" },
        { id: "travel-insurance", text: "여행자 보험 가입" },
      ],
    },
    {
      id: "admin",
      title: "행정·마무리",
      items: [
        { id: "marriage-report", text: "혼인신고" },
        { id: "invitation-send", text: "청첩장 발송" },
        { id: "return-gift", text: "답례품 준비" },
        { id: "final-meeting", text: "예식 최종 미팅 및 순서 확인" },
      ],
    },
  ],
};

export default checklist;

import type { ChecklistConfig } from "@/data/checklist-types";

// 항목 id 는 이용자 브라우저에 저장된 체크 상태의 열쇠라 바꾸지 않는다 (순서·섹션 이동, 새 항목 추가는 괜찮다).
const checklist: ChecklistConfig = {
  id: "wedding",
  emoji: "💍",
  title: "결혼식 체크리스트",
  description:
    "상견례부터 예식, 신혼여행, 혼인신고까지 빠뜨리기 쉬운 항목들을 준비 순서대로 체크해보세요. 체크한 내용은 지금 쓰는 브라우저에만 저장돼요.",
  accentColor: "#db2777",
  image: "/checklist/wedding/cover.webp",
  sections: [
    {
      id: "plan",
      title: "큰 틀 정하기",
      items: [
        { id: "meet-parents", text: "양가 상견례", note: "식장·예단·예물 방식처럼 양가가 함께 맞출 큰 방향을 이야기해요" },
        { id: "budget", text: "예산·비용 분담 정하기", note: "총예산을 먼저 정하고 항목별로 누가 얼마나 맡을지 나눠요" },
        { id: "wedding-date", text: "결혼 날짜·지역 정하기", note: "양가 일정과 하객 이동을 생각해 후보 날짜와 지역을 추려요" },
        {
          id: "planner",
          text: "웨딩플래너/직접 준비 결정",
          note: "플래너 계약 전엔 기본·추가 요금과 해지 위약금을 계약서로 확인해요",
        },
      ],
    },
    {
      id: "venue",
      title: "예식장·예식 진행",
      items: [
        {
          id: "hall",
          text: "예식장 계약",
          note: "보증 인원·식대 포함 항목과 날짜 변경·취소 위약금을 계약서로 확인해요",
        },
        { id: "snap-video", text: "본식 스냅·영상 예약", note: "식장 촬영 규정과 원본 제공 여부, 결과물 받는 시기를 확인해요" },
        { id: "mc", text: "주례·사회자 섭외", note: "주례 없이 할지도 정하고, 사회자에게 식순과 이름 발음을 전해요" },
        { id: "ceremony-music", text: "축가·식순 정하기", note: "축가·축사 맡을 사람과 입장·행진 음악을 정해 식장에 전달해요" },
        {
          id: "pyebaek",
          text: "폐백·이바지 여부 정하기",
          note: "할지 말지 양가와 정하고, 한다면 폐백실과 음식 준비 방법을 확인해요",
        },
      ],
    },
    {
      id: "sdm",
      title: "스드메·의상",
      items: [
        {
          id: "studio",
          text: "웨딩 촬영 스튜디오 예약",
          note: "촬영 콘셉트와 원본·수정본 개수, 앨범·액자 포함 여부를 확인해요",
        },
        { id: "dress", text: "드레스 투어 및 예약", note: "투어에서 여러 벌 입어보고 촬영용·본식용 대여 범위를 확인해요" },
        { id: "makeup", text: "메이크업 샵 예약 및 리허설", note: "리허설 때 본식 스타일을 맞춰보고 당일 시작 시간을 확인해요" },
        {
          id: "groom-suit",
          text: "신랑 예복 준비",
          note: "대여·맞춤 중 정하고, 맞춤이라면 제작·가봉 기간을 넉넉히 잡아요",
        },
        {
          id: "bouquet-shoes",
          text: "부케·웨딩슈즈·소품 준비",
          note: "부케 종류를 정하고, 구두는 드레스 길이에 맞춰 미리 신어봐요",
        },
        { id: "parents-attire", text: "혼주 한복·의상 준비", note: "양가 혼주 한복·정장의 색 조화와 대여·맞춤 여부를 맞춰봐요" },
      ],
    },
    {
      id: "housing",
      title: "신혼집·혼수·예물",
      items: [
        {
          id: "house",
          text: "신혼집 계약",
          note: "전세라면 등기부등본을 보고, 확정일자와 입주 때 전입신고를 챙겨요",
        },
        { id: "appliances", text: "혼수 가전·가구 구매", note: "입주일에 맞춰 배송일을 잡고, 놓을 자리를 실측한 뒤 골라요" },
        {
          id: "gift-exchange",
          text: "예단·예물(웨딩밴드) 준비",
          note: "생략·간소화 여부까지 양가와 정하고, 반지는 사이즈 조정 기간도 확인해요",
        },
      ],
    },
    {
      id: "guests",
      title: "청첩장·하객",
      items: [
        { id: "guest-list", text: "하객 명단·식대 인원 정리", note: "양가 예상 하객 수를 모아 보증 인원·식권 수와 맞춰봐요" },
        {
          id: "invitation",
          text: "청첩장 디자인 및 인쇄",
          note: "인쇄 전 날짜·시간·장소와 양가 부모님 이름 오타를 여러 번 확인해요",
        },
        {
          id: "invitation-send",
          text: "청첩장 발송(종이·모바일)",
          note: "종이·모바일 중 누구에게 어떻게 보낼지 명단에 표시해두고 전해요",
        },
      ],
    },
    {
      id: "honeymoon",
      title: "신혼여행",
      items: [
        {
          id: "passport",
          text: "여권 유효기간 확인",
          note: "6개월 이상 남아야 하는 나라도 있어 여행지·경유지 입국 조건을 확인해요",
        },
        {
          id: "destination",
          text: "신혼여행지 결정",
          note: "예식 직후 체력과 휴가 일정, 여행지 계절·날씨를 함께 따져 정해요",
        },
        { id: "flight-hotel", text: "항공권·숙소 예약", note: "항공권 영문 이름이 여권과 똑같은지 예약할 때 꼭 확인해요" },
        {
          id: "travel-insurance",
          text: "여행자 보험 가입",
          note: "출발 전에 가입하고, 보장 범위와 두 사람 모두 가입됐는지 확인해요",
        },
      ],
    },
    {
      id: "wedding-day",
      title: "예식 직전·당일",
      items: [
        {
          id: "final-meeting",
          text: "예식 최종 미팅 및 순서 확인",
          note: "입장 순서·축가·영상·식사 인원을 식장과 마지막으로 맞춰봐요",
        },
        { id: "gift-money", text: "축의금 관리 방식 정하기", note: "축의금을 받을 사람과 정리할 사람, 보관 방법을 미리 정해요" },
        {
          id: "return-gift",
          text: "답례품 준비",
          note: "필요한 수량과 받을 장소·날짜를 정하고, 당일 나눠줄 사람도 정해요",
        },
      ],
    },
    {
      id: "admin",
      title: "행정·마무리",
      items: [
        {
          id: "marriage-report",
          text: "혼인신고",
          note: "시(구)·읍·면사무소에 신분증과 성년 증인 2명 서명이 든 신고서로 해요",
        },
        { id: "thanks", text: "하객 감사 인사", note: "축의금 명단을 정리하며 와준 하객에게 감사 인사를 전해요" },
      ],
    },
  ],
};

export default checklist;

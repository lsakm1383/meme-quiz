import type { ChecklistConfig } from "@/data/checklist-types";

const checklist: ChecklistConfig = {
  id: "appliances",
  emoji: "🧺",
  title: "가전제품 체크리스트",
  description:
    "신혼살림이든 자취든, 놓치기 쉬운 가전을 방·용도별로 체크해보세요. 체크한 내용은 지금 쓰는 브라우저에만 저장돼요.",
  accentColor: "#0891b2",
  image: "/checklist/appliances/cover.webp",
  sections: [
    {
      id: "kitchen",
      title: "주방가전",
      items: [
        { id: "fridge", text: "냉장고", note: "놓을 자리를 실측하고 문 열림 방향과 뒤쪽 방열 공간도 확인해요" },
        { id: "kimchi-fridge", text: "김치냉장고", note: "뚜껑형·스탠드형 중 놓을 자리와 보관하는 양에 맞춰 골라요" },
        { id: "microwave", text: "전자레인지", note: "설명서의 주변 이격 공간과 가까운 콘센트 위치를 확인해요" },
        {
          id: "induction",
          text: "인덕션·가스레인지",
          note: "전기 용량·전용 콘센트를 확인하고 가스 설치는 전문 기사에게 맡겨요",
        },
        { id: "dishwasher", text: "식기세척기", note: "급수·배수 연결 방법과 하부장·상판 공간, 몇 인용인지 확인해요" },
        { id: "water-purifier", text: "정수기", note: "렌탈·구매 총비용과 필터 교체 주기, 관리 방식을 비교해요" },
      ],
    },
    {
      id: "living",
      title: "생활가전",
      items: [
        { id: "washer", text: "세탁기·건조기", note: "수도꼭지·배수구 위치와 위로 쌓을 땐 천장 높이를 확인해요" },
        { id: "vacuum", text: "청소기", note: "유선·무선 중 고르고 거치대 둘 자리와 충전 콘센트를 확인해요" },
        { id: "aircon", text: "에어컨", note: "실외기 자리·배관 구멍 위치와 추가 설치비 여부를 미리 확인해요" },
        { id: "air-purifier", text: "공기청정기", note: "방 크기에 맞는 사용 면적과 필터 교체 주기·비용을 확인해요" },
        { id: "tv", text: "TV", note: "벽걸이·스탠드 중 정하고 시청 거리와 콘센트 위치를 확인해요" },
      ],
    },
    {
      id: "seasonal",
      title: "계절가전",
      items: [
        { id: "fan", text: "선풍기·에어서큘레이터", note: "침실에 둘 거라면 소음과 타이머·풍량 단계를 비교해 골라요" },
        { id: "heater", text: "히터·온풍기", note: "소비전력이 커서 멀티탭 말고 벽 콘센트에 단독으로 꽂아요" },
        { id: "dehumidifier", text: "제습기·가습기", note: "물통 크기·연속 배수 가능 여부와 세척하기 쉬운지 확인해요" },
      ],
    },
    {
      id: "bedroom",
      title: "침실·기타",
      items: [
        { id: "bed", text: "침대·매트리스", note: "현관·엘리베이터·방문 폭으로 들어갈 수 있는지 먼저 재봐요" },
        { id: "lighting", text: "조명", note: "전구 교체형인지 일체형인지와 밝기·색온도 조절을 확인해요" },
        { id: "styler", text: "의류관리기", note: "놓을 자리의 폭·높이와 문 열 공간, 작동 소음을 확인해요" },
      ],
    },
  ],
};

export default checklist;

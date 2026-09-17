import type { ChecklistConfig } from "@/data/checklist-types";

const checklist: ChecklistConfig = {
  id: "appliances",
  emoji: "🧺",
  title: "가전제품 체크리스트",
  description:
    "신혼살림이든 자취든, 놓치기 쉬운 가전을 방·용도별로 체크해보세요. 체크한 내용은 이 기기에만 저장돼요.",
  accentColor: "#0891b2",
  sections: [
    {
      id: "kitchen",
      title: "주방가전",
      items: [
        { id: "fridge", text: "냉장고" },
        { id: "kimchi-fridge", text: "김치냉장고" },
        { id: "microwave", text: "전자레인지" },
        { id: "induction", text: "인덕션·가스레인지" },
        { id: "dishwasher", text: "식기세척기" },
        { id: "water-purifier", text: "정수기" },
      ],
    },
    {
      id: "living",
      title: "생활가전",
      items: [
        { id: "washer", text: "세탁기·건조기" },
        { id: "vacuum", text: "청소기" },
        { id: "aircon", text: "에어컨" },
        { id: "air-purifier", text: "공기청정기" },
        { id: "tv", text: "TV" },
      ],
    },
    {
      id: "seasonal",
      title: "계절가전",
      items: [
        { id: "fan", text: "선풍기·에어서큘레이터" },
        { id: "heater", text: "히터·온풍기" },
        { id: "dehumidifier", text: "제습기·가습기" },
      ],
    },
    {
      id: "bedroom",
      title: "침실·기타",
      items: [
        { id: "bed", text: "침대·매트리스" },
        { id: "lighting", text: "조명" },
        { id: "styler", text: "의류관리기" },
      ],
    },
  ],
};

export default checklist;

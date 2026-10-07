import type { QuizConfig } from "@/data/quiz-types";

const quiz: QuizConfig = {
  id: "travel-style",
  emoji: "✈️",
  image: { src: "/quiz/travel-style/cover.webp", aspect: "aspect-[793/427]", wide: true },
  title: "여행 스타일 유형 테스트",
  description:
    "나는 여행 갈 때 어떤 사람일까? 6개 질문으로 알아보는 나의 여행 유형.",
  accentColor: "#14b8a6",
  questions: [
    {
      id: "q1",
      text: "여행 가기 한 달 전, 나는?",
      options: [
        { text: "일정표를 시간 단위로 짜고 있음", scores: { planner: 2 } },
        { text: "가고 싶은 곳 몇 군데만 정리해둠", scores: { balanced: 2 } },
        { text: "아직 어디 갈지도 안 정함", scores: { spontaneous: 2 } },
        { text: "숙소 예약하고 그냥 쉴 생각만 함", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q2",
      text: "여행지에 도착한 첫날, 나의 행동은?",
      options: [
        { text: "미리 짜둔 코스대로 바로 움직임", scores: { planner: 2 } },
        { text: "대략적인 동선만 보고 걷기 시작", scores: { balanced: 2 } },
        { text: "발길 닿는 대로 걸으며 즉흥적으로 정함", scores: { spontaneous: 2 } },
        { text: "숙소에서 짐 풀고 늘어짐", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q3",
      text: "맛집을 찾을 때 나는?",
      options: [
        { text: "블로그·리뷰 다 비교해서 미리 리스트업", scores: { planner: 2 } },
        { text: "대충 평점 좋은 곳 한두 군데만 체크", scores: { balanced: 2 } },
        { text: "걷다가 눈에 띄는 곳 아무데나 들어감", scores: { spontaneous: 2 } },
        { text: "숙소 근처 배달 앱부터 켬", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q4",
      text: "여행 중 예상치 못한 변수(우천, 일정 취소 등)가 생기면?",
      options: [
        { text: "미리 짜둔 플랜 B로 바로 전환", scores: { planner: 2 } },
        { text: "당황하지만 금방 다른 걸 찾아봄", scores: { balanced: 2 } },
        { text: "오히려 더 재밌는 걸 발견하는 기회로 삼음", scores: { spontaneous: 2 } },
        { text: "잘됐다 싶어서 숙소에 더 머무름", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q5",
      text: "여행 사진첩을 보면 주로 뭐가 많이 찍혀있나?",
      options: [
        { text: "일정표대로 다녀온 관광지 인증샷", scores: { planner: 2 } },
        { text: "그날그날 마음에 든 순간들", scores: { balanced: 2 } },
        { text: "우연히 만난 사람들, 즉흥적인 장면들", scores: { spontaneous: 2 } },
        { text: "숙소 침대, 창밖 풍경, 룸서비스", scores: { homebody: 2 } },
      ],
    },
    {
      id: "q6",
      text: "여행에서 돌아온 후 가장 뿌듯한 순간은?",
      options: [
        { text: "계획한 걸 하나도 빠짐없이 다 해냈을 때", scores: { planner: 2 } },
        { text: "예상 못한 좋은 경험을 하나쯤 건졌을 때", scores: { balanced: 2 } },
        { text: "완전히 새로운 걸 발견했을 때", scores: { spontaneous: 2 } },
        { text: "푹 쉬고 왔다는 사실 자체", scores: { homebody: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "planner",
      emoji: "🗺️",
      image: { src: "/quiz/travel-style/planner.webp", aspect: "aspect-[392/330]" },
      title: "분 단위 계획형",
      subtitle: "일정표 없이는 여행이 불안한 타입",
      description:
        "동선, 맛집, 시간까지 미리 다 짜둬야 마음이 편한 타입이에요. 변수 없이 알찬 여행을 만들어내는 능력자지만, 가끔은 일정표를 잠깐 접어두는 것도 여행의 묘미예요.",
      color: "#99F6E4",
      detail: {
        more: "여행 전날 밤에는 캡처해 둔 지도와 영업시간을 한 번 더 확인해야 마음 편히 잠드는 편이에요. 덕분에 일행은 '다음 어디야?'만 물으면 되고, 문 닫힌 가게 앞에서 허탈해할 일도 거의 없어요. 하루가 계획대로 착착 맞아떨어질 때의 짜릿함은 이 유형만 아는 즐거움이에요.",
        strengths: ["빈틈없는 동선 설계력", "변수에도 흔들리지 않는 플랜 B", "일행을 든든하게 만드는 안정감"],
        cautions: [
          "일정 하나가 틀어지면 하루 전체가 망한 것처럼 느껴질 수 있어요.",
          "다음 장소로 이동하느라 눈앞의 풍경을 충분히 못 즐길 때가 있어요.",
          "준비를 혼자 도맡다 보면 출발 전부터 지치기 쉬워요.",
        ],
        bestMatch: {
          id: "balanced",
          reason:
            "큰 틀은 계획형이 잡고, 빈칸은 균형형이 유연하게 채워 줘요. 서로의 방식을 존중해서 다툼 없이 알찬 여행이 되는 조합이에요.",
        },
        hardMatch: {
          id: "spontaneous",
          reason:
            "시간표대로 움직이고 싶은 계획형과 발길 닿는 대로 걷고 싶은 즉흥형은 첫날부터 속도가 엇갈리기 쉬워요. 즉흥형과 함께라면 일정표 밖에서 뜻밖의 명장면을 만나게 돼요.",
        },
        tips: ["다음 여행 일정에 '아무것도 안 하는 1시간' 넣어 두기", "집에 가는 길을 평소와 다른 길로 걸어 보기"],
      },
    },
    {
      id: "balanced",
      emoji: "🧭",
      image: { src: "/quiz/travel-style/balanced.webp", aspect: "aspect-[392/330]" },
      title: "적당히 계획하고 즉흥도 즐기는형",
      subtitle: "큰 틀만 잡고 나머지는 흘러가는 대로",
      description:
        "필수 코스만 정해두고 나머지는 그때그때 결정하는 타입이에요. 계획의 안정감과 즉흥의 재미를 둘 다 챙기는, 제일 지치지 않는 여행 스타일이에요.",
      color: "#FDE68A",
      detail: {
        more: "꼭 가 보고 싶은 곳 두세 군데만 지도에 별표를 찍어 두고, 나머지는 현지 분위기를 보며 정하는 편이에요. 비가 오면 근처 카페로 방향을 틀고, 골목에서 괜찮아 보이는 가게를 발견하면 슬쩍 들어가 보기도 해요. 여행이 끝나면 지치기보다 '또 가고 싶다'는 마음이 먼저 드는 사람이에요.",
        strengths: ["상황에 맞춰 바꾸는 유연함", "계획과 즉흥 사이의 균형 감각", "누구와도 맞춰 가는 편안함"],
        cautions: [
          "이것도 저것도 괜찮다 보니 결정을 미루게 될 때가 있어요.",
          "일행의 의견에 맞추다 정작 내가 원하는 걸 놓칠 수 있어요.",
          "대충 챙긴 준비물 때문에 현지에서 허둥댈 때가 있어요.",
        ],
        bestMatch: {
          id: "spontaneous",
          reason:
            "즉흥형이 찾아낸 뜻밖의 골목을 균형형이 기분 좋게 따라가 줘요. 너무 헤매지 않을 만큼만 방향을 잡아 주니 둘 다 신나는 여행이 돼요.",
        },
        hardMatch: {
          id: "homebody",
          reason:
            "하루 한두 곳은 꼭 둘러보고 싶은 균형형과 숙소에서 쉬고 싶은 집순이형은 외출 시간을 두고 줄다리기하기 쉬워요. 집순이형 덕분에 푹 쉬는 것도 여행이라는 걸 배우게 돼요.",
        },
        tips: ["가 보고 싶은 곳 세 군데만 지도에 저장하기", "이번 주말 계획에 '그때 정하기' 칸 하나 남겨 두기"],
      },
    },
    {
      id: "spontaneous",
      emoji: "🎒",
      image: { src: "/quiz/travel-style/spontaneous.webp", aspect: "aspect-[392/330]" },
      title: "몸이 먼저 움직이는 즉흥형",
      subtitle: "계획은 도착해서 생각하는 타입",
      description:
        "일정표 없이 발길 닿는 대로 다니는 타입이에요. 가끔 헤매기도 하지만, 그만큼 예상 못한 순간들을 가장 많이 만나는 여행자이기도 해요.",
      color: "#FDBA74",
      detail: {
        more: "버스 창밖으로 예뻐 보이는 동네가 보이면 일단 내리고 보는 사람이에요. 길을 잃어도 '덕분에 이런 데를 다 와 보네' 하며 웃고, 현지 사람에게 물어 들어간 작은 식당이 여행의 하이라이트가 되기도 해요. 돌아와서 들려줄 이야기가 가장 많은 쪽은 늘 이 유형이에요.",
        strengths: ["낯선 길도 즐기는 모험심", "변수를 기회로 바꾸는 순발력", "새로운 사람과 금방 친해지는 친화력"],
        cautions: [
          "숙소나 교통편을 미루다 막상 떠날 때 선택지가 줄어들 수 있어요.",
          "꼭 봐야 할 곳을 놓치고 돌아와서 아쉬워할 때가 있어요.",
          "체력 생각 없이 걷다 보면 다음 날이 힘들어질 수 있어요.",
        ],
        bestMatch: {
          id: "balanced",
          reason:
            "어디로 튈지 모르는 즉흥형 옆에서 균형형이 큰 방향만 슬쩍 잡아 줘요. 자유로움은 그대로 두고 헤매는 시간만 줄여 주는 든든한 짝이에요.",
        },
        hardMatch: {
          id: "planner",
          reason:
            "발길 닿는 대로 가고 싶은 즉흥형에게 계획형의 시간표는 조금 갑갑하게 느껴질 수 있어요. 계획형의 꼼꼼함을 빌리면 놓치기 아까운 곳까지 알차게 챙길 수 있어요.",
        },
        tips: ["처음 보는 가게나 골목 한 군데에 들러 보기", "다음 여행에서 꼭 할 일 딱 하나만 정해 두기"],
      },
    },
    {
      id: "homebody",
      emoji: "🛋️",
      image: { src: "/quiz/travel-style/homebody.webp", aspect: "aspect-[391/330]" },
      title: "숙소가 제일 좋은 집순이형",
      subtitle: "여행지보다 침대가 더 그리운 타입",
      description:
        "관광보다 좋은 숙소에서 쉬는 게 목적인 타입이에요. '여행 가서 뭐 했어?'라는 질문에 '그냥 쉬었어'라고 당당히 답할 수 있는, 진짜 휴식을 아는 사람이에요.",
      color: "#C7D2FE",
      detail: {
        more: "숙소를 고를 때 관광지와의 거리보다 침구 후기와 창밖 풍경을 먼저 보는 편이에요. 늦잠 자고 일어나 커튼을 젖히고, 근처 편의점 간식으로 하루를 여는 순간이 이 유형에게는 최고의 여행 코스예요. 집에 돌아왔을 때 몸이 가볍다면 그걸로 충분히 성공한 여행이에요.",
        strengths: ["쉼의 가치를 아는 여유", "남의 속도에 휘둘리지 않는 주관", "좋은 숙소를 알아보는 안목"],
        cautions: [
          "일행이 나가자고 할 때마다 거절하면 서운해할 수 있어요.",
          "숙소에만 머물다 보면 그 동네만의 매력을 놓칠 수 있어요.",
          "숙소가 기대와 다르면 여행 전체가 아쉽게 느껴질 수 있어요.",
        ],
        bestMatch: {
          id: "planner",
          reason:
            "계획형이 예약과 동선을 척척 챙기면 집순이형은 마음 편히 쉬기만 하면 돼요. 저녁마다 숙소에서 하루 이야기를 들어 주는 집순이형 덕분에 계획형도 쉬어 가는 법을 배워요.",
        },
        hardMatch: {
          id: "spontaneous",
          reason:
            "숙소에서 뒹굴고 싶은 집순이형과 하루 종일 돌아다니고 싶은 즉흥형은 에너지 쓰는 법이 정반대예요. 즉흥형을 따라 한 번쯤 나가 보면 숙소 밖에도 좋은 순간이 있다는 걸 알게 돼요.",
        },
        tips: ["가 보고 싶은 숙소 하나 저장해 두기", "좋아하는 음료 한 잔과 함께 30분 푹 쉬기"],
      },
    },
  ],
};

export default quiz;

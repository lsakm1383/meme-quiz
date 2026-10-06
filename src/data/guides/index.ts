import type { ContentGuide } from "@/data/guide-types";
import mFlavorType from "@/data/guides/m-flavor-type";
import mPrincessType from "@/data/guides/m-princess-type";
import mGamerType from "@/data/guides/m-gamer-type";
import mOfficeType from "@/data/guides/m-office-type";
import quizCorporateCattle from "@/data/guides/quiz-corporate-cattle";
import quizFlowerType from "@/data/guides/quiz-flower-type";
import quizInternetPickle from "@/data/guides/quiz-internet-pickle";
import quizMoonPhase from "@/data/guides/quiz-moon-phase";
import quizReplySpeed from "@/data/guides/quiz-reply-speed";
import quizSpendingStyle from "@/data/guides/quiz-spending-style";
import quizTravelStyle from "@/data/guides/quiz-travel-style";
import wRamenWorldcup from "@/data/guides/w-ramen-worldcup";
import wIcecreamWorldcup from "@/data/guides/w-icecream-worldcup";
import dCafeRecommend from "@/data/guides/d-cafe-recommend";
import dDress from "@/data/guides/d-dress";
import dHoneymoon from "@/data/guides/d-honeymoon";
import dMenuRecommend from "@/data/guides/d-menu-recommend";
import dRegion from "@/data/guides/d-region";
import cMalatang from "@/data/guides/c-malatang";
import lWedding from "@/data/guides/l-wedding";
import lAppliances from "@/data/guides/l-appliances";
import sSaju from "@/data/guides/s-saju";
import sFortune from "@/data/guides/s-fortune";
import sToday from "@/data/guides/s-today";
import sDaeun from "@/data/guides/s-daeun";
import sNewyear from "@/data/guides/s-newyear";
import sZodiac from "@/data/guides/s-zodiac";
import sCompat from "@/data/guides/s-compat";

// 시작 페이지 경로(맨 앞 "/" 제외) → 소개글. 새 테스트를 추가하면 여기에도 등록한다.
const guides: Record<string, ContentGuide> = {
  "m/flavor-type": mFlavorType,
  "m/princess-type": mPrincessType,
  "m/gamer-type": mGamerType,
  "m/office-type": mOfficeType,
  "corporate-cattle": quizCorporateCattle,
  "flower-type": quizFlowerType,
  "internet-pickle": quizInternetPickle,
  "moon-phase": quizMoonPhase,
  "reply-speed": quizReplySpeed,
  "spending-style": quizSpendingStyle,
  "travel-style": quizTravelStyle,
  "w/ramen-worldcup": wRamenWorldcup,
  "w/icecream-worldcup": wIcecreamWorldcup,
  "d/cafe-recommend": dCafeRecommend,
  "d/dress": dDress,
  "d/honeymoon": dHoneymoon,
  "d/menu-recommend": dMenuRecommend,
  "d/region": dRegion,
  "c/malatang": cMalatang,
  "l/wedding": lWedding,
  "l/appliances": lAppliances,
  "s/saju": sSaju,
  "s/fortune": sFortune,
  "s/today": sToday,
  "s/daeun": sDaeun,
  "s/newyear": sNewyear,
  "s/zodiac": sZodiac,
  "s/compat": sCompat,
};

export function getGuide(path: string): ContentGuide | undefined {
  return guides[path];
}

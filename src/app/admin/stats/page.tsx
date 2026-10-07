import type { Metadata } from "next";
import { StatsDashboard } from "@/components/StatsDashboard";

export const metadata: Metadata = {
  title: "이용 통계",
  robots: { index: false, follow: false },
};

// 관리자 전용 이용 통계 화면. 데이터는 관리자 비밀값을 넣어야 불러온다 (/api/admin/events).
export default function AdminStatsPage() {
  return (
    <div className="w-full max-w-3xl flex-1 px-4 py-10">
      <StatsDashboard />
    </div>
  );
}

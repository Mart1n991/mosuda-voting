import { getCoachDetail } from "@/services/getCoachDetail";
import { CoachDetail } from "./CoachDetail";

export default async function CoachDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coachDetail = await getCoachDetail(id);

  return (
    <main className="max-w-screen-xl xl:mx-auto my-20 mx-10 flex flex-col items-center">
      <CoachDetail coachDetail={coachDetail} />
    </main>
  );
}

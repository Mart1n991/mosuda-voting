import { getCoachDetail } from "@/services/getCoachDetail";
import { CoachDetail } from "./CoachDetail";

export default async function CoachDetailPage({ params }: { params: { id: string } }) {
  const coachDetail = await getCoachDetail(params.id);

  return (
    <main className="max-w-screen-xl xl:mx-auto my-20 mx-10 flex flex-col items-center">
      <CoachDetail coachDetail={coachDetail} />
    </main>
  );
}

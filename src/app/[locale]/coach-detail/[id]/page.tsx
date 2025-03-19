import { getCoachDetail } from "@/services/getCoachDetail";
import { CoachDetail } from "./CoachDetail";
import { Navbar } from "@/components/Navbar";

export default async function CoachDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coachDetail = await getCoachDetail(id);

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl xl:mx-auto md:my-20 md:mx-10 flex flex-col items-center">
        <CoachDetail coachDetail={coachDetail} />
      </main>
    </>
  );
}

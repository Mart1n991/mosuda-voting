import { CoachCard } from "@/components/CoachCard";
import { getCoachList } from "@/services/getCoachList";
import { CoachProfile } from "@/types/CoachProfile";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function CoachList() {
  const t = await getTranslations("coachListPage");

  const coachList: CoachProfile[] = await getCoachList({ pageSize: 10, pageNumber: 1 });

  return (
    <main className="max-w-screen-xl xl:mx-auto my-10 mx-6 flex flex-col items-center">
      <section className="flex flex-col items-center gap-4 mb-10">
        <Image src="/images/logo.png" alt="logo" width={150} height={100} />
        <h1 className="whitespace-pre-line text-center text-2xl md:text-4xl font-bold">
          {t.rich("heading", { region: (chunks) => <span className="underline decoration-mosuda-green-light">{chunks}</span> })}
        </h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {coachList ? (
          coachList.map((coachProfile) => <CoachCard key={coachProfile.id} coachProfile={coachProfile} />)
        ) : (
          <h1>Žiadni tréneri nenájdení</h1>
        )}
      </section>
    </main>
  );
}

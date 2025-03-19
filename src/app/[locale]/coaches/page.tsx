import { getCoachList } from "@/services/getCoachList";
import { CoachProfile } from "@/types/CoachProfile";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Coaches } from "./coaches";

export default async function CoachListPage() {
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
      <Coaches coachList={coachList} />
    </main>
  );
}

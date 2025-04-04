import { getCoachList } from "@/services/getCoachList";
import { CoachProfile } from "@/types/CoachProfile";
import { getTranslations } from "next-intl/server";
import { Coaches } from "./coaches";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";

export default async function CoachListPage() {
  const t = await getTranslations("coachListPage");
  const pageSize = 12; // Number of coaches per page
  const initialPage = 1;

  const coachList: CoachProfile[] = await getCoachList({
    pageSize,
    pageNumber: initialPage,
  });

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl xl:mx-auto my-10 mx-6 flex flex-col items-center">
        <section className="flex flex-col items-center gap-4 mb-10">
          <h1 className="whitespace-pre-line text-center text-2xl md:text-4xl font-bold">
            {t.rich("heading", { region: (chunks) => <span className="underline decoration-mosuda-green-light">{chunks}</span> })}
          </h1>
        </section>
        <Coaches initialCoachList={coachList} pageSize={pageSize} initialPage={initialPage} />
      </main>
      <Footer />
    </>
  );
}

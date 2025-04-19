import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getTranslations } from "next-intl/server";

export default async function votingEnded() {
  const t = await getTranslations("coachListPage");
  return (
    <>
      <Navbar />
      <main>
        <div className="text-center my-20">
          <h1 className="text-4xl font-semibold bg-mosuda-green-light p-4 rounded-md">{t("coachList.votingEndedTitle")}</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}

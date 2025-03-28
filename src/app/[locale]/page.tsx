import { Accordion } from "@/components/Accordion.tsx/Accordion";
import { AppStoreButton } from "@/components/AppStoreButton";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { Navbar } from "@/components/Navbar";
import { PrizeCarousel } from "@/components/PrizeCard/PrizeCarousel";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("homePage");

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl xl:mx-auto my-20 flex flex-col items-center">
        <section className="flex w-full px-10 mb-10">
          <div className="flex-1 flex flex-col items-start">
            <h1 className="whitespace-pre-line text-2xl md:text-5xl font-bold">
              {t.rich("heading", {
                region: (chunks) => <span className="underline decoration-mosuda-green-light">{chunks}</span>,
              })}
            </h1>
            <p className="max-w-[500px] mt-6">{t("description")}</p>
            <div className="flex gap-4 mt-10">
              <AppStoreButton href="https://apps.apple.com/sk/app/mosuda/id1662260317?l=sk" />
              <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.no_creativity_coach_of_people" />
            </div>
            <div className="mt-10 w-[80%]">
              <Accordion
                items={[
                  { title: t("whyParticipate"), content: t("whyParticipateDescription") },
                  { title: t("howToParticipate"), content: t("howToParticipateDescription") },
                  { title: t("whatYouCanWin"), content: t("whatYouCanWinDescription") },
                ]}
              />
            </div>
          </div>
          <div>
            <PrizeCarousel />
          </div>
        </section>
      </main>
    </>
  );
}

import { Accordion } from "@/components/Accordion.tsx/Accordion";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Footer } from "@/components/Footer/Footer";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { Navbar } from "@/components/Navbar";
import PartnersLogos from "@/components/PartnersLogos/PartnersLogos";
import { PrizeCarousel } from "@/components/PrizeCarousel";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("homePage");

  const prizes = [
    {
      title: t("prizes.firstPlace.title"),
      description: t("prizes.firstPlace.description"),
      image: "/placeholder-price-1.avif",
      place: t("prizes.firstPlace.place"),
    },
    {
      title: t("prizes.secondPlace.title"),
      description: t("prizes.secondPlace.description"),
      image: "/placeholder-price-2.jpeg",
      place: t("prizes.secondPlace.place"),
    },
    {
      title: t("prizes.thirdPlace.title"),
      description: t("prizes.thirdPlace.description"),
      image: "/placeholder-price-3.webp",
      place: t("prizes.thirdPlace.place"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl xl:mx-auto my-5 xl:my-20 flex flex-col items-center">
        <section className="flex flex-col xl:flex-row items-center xl:items-start w-full px-4 sm:px-10 mb-10">
          <div className="flex-1 flex flex-col items-center xl:items-start">
            <h1 className="whitespace-pre-line text-2xl md:text-5xl font-bold text-center xl:text-left">
              {t.rich("heading", {
                region: (chunks) => <span className="underline decoration-mosuda-green-light">{chunks}</span>,
              })}
            </h1>
            <p className="max-w-[500px] mt-6 text-center xl:text-left text-sm md:text-base">{t("description")}</p>
            <div className="flex gap-4 mt-10">
              <AppStoreButton href="https://apps.apple.com/sk/app/mosuda/id1662260317?l=sk" />
              <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.no_creativity_coach_of_people" />
            </div>
            <div className="mt-10 w-[80%] hidden xl:block">
              <Accordion
                items={[
                  { title: t("whyParticipate"), content: t("whyParticipateDescription") },
                  { title: t("howToParticipate"), content: t("howToParticipateDescription") },
                  { title: t("whatYouCanWin"), content: t("whatYouCanWinDescription") },
                ]}
              />
            </div>
          </div>

          <PrizeCarousel prizes={prizes} className="mt-10 xl:mt-0" />

          <div className="mt-10 block w-full max-w-[500px] xl:hidden">
            <Accordion
              items={[
                { title: t("whyParticipate"), content: t("whyParticipateDescription") },
                { title: t("howToParticipate"), content: t("howToParticipateDescription") },
                { title: t("whatYouCanWin"), content: t("whatYouCanWinDescription") },
              ]}
            />
          </div>
        </section>
        <section className="flex flex-col w-full px-4 sm:px-10">
          <h2 className="text-2xl md:text-5xl font-bold mb-5 text-center xl:text-left">{t("partners.title")}</h2>
          <PartnersLogos />
        </section>
      </main>
      <Footer />
    </>
  );
}

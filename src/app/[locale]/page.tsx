import { Accordion } from "@/components/Accordion";
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
      id: "111-111",
      title: t.rich("prizes.firstPlace.title", {
        span: (chunks) => <span className="text-sm text-stone-400">{chunks}</span>,
        span2: (chunks) => <span className="text-md text-mosuda-green-light">{chunks}</span>,
      }),
      description: t("prizes.firstPlace.description"),
      image: "/images/coach-prizes/dubaj.png",
      place: t("prizes.firstPlace.place"),
    },
    {
      id: "222-222",
      title: t.rich("prizes.secondPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      description: t("prizes.secondPlace.description"),
      image: "/images/coach-prizes/pelikan.png",
      place: t("prizes.secondPlace.place"),
    },
    {
      id: "333-333",
      title: t.rich("prizes.thirdPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      description: t("prizes.thirdPlace.description"),
      image: "/images/coach-prizes/enspire.png",
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
            <p className="mt-2 text-stone-700 text-center xl:text-left text-sm md:text-base">{t("date")}</p>
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
        <section className="flex flex-col w-full px-4 sm:px-10 mb-10">
          <h2 className="text-2xl md:text-5xl font-bold mb-5 text-center xl:text-left">{t("partners.title")}</h2>
          <PartnersLogos />
        </section>
      </main>
      <Footer />
    </>
  );
}

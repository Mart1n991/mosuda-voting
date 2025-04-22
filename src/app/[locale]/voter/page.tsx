import { Accordion } from "@/components/Accordion";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar";
import PartnersLogos from "@/components/PartnersLogos/PartnersLogos";
import { PrizeCarousel } from "@/components/PrizeCarousel";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Voter() {
  const t = await getTranslations("voter");

  const prizes = [
    {
      id: "111-111",
      title: t.rich("prizes.firstPlace.title", {
        span: (chunks) => <span className="min-[425px]:block text-mosuda-green-light text-md">{chunks}</span>,
      }),
      image: "/images/voter-prizes/hotel-hills.png",
      place: t("prizes.firstPlace.place"),
    },
    {
      id: "222-222",
      title: t("prizes.secondPlace.title"),
      image: "/images/voter-prizes/xiaomi.png",
      place: t("prizes.secondPlace.place"),
    },
    {
      id: "333-333",
      title: t.rich("prizes.thirdPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      image: "/images/voter-prizes/divique.png",
      place: t("prizes.thirdPlace.place"),
    },
    {
      id: "444-444",
      title: t.rich("prizes.fourthPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      image: "/images/voter-prizes/topankovo.png",
      place: t("prizes.fourthPlace.place"),
    },
    {
      id: "555-555",
      title: t.rich("prizes.fifthPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      image: "/images/voter-prizes/saxana.png",
      place: t("prizes.fifthPlace.place"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="md:bg-gradient-to-br bg-gradient-to-b from-white from-15% md:from-30% to-mosuda-green-light">
        <div className="max-w-screen-xl xl:mx-auto py-5 xl:py-20 flex flex-col items-center">
          <section className="flex flex-col xl:flex-row items-center xl:items-start w-full px-4 sm:px-10 mb-10">
            <div className="flex-1 flex flex-col items-center xl:items-start">
              <h1 className="whitespace-pre-line text-2xl md:text-5xl font-bold text-center xl:text-left">
                {t.rich("heading", {
                  region: (chunks) => <span className="underline decoration-mosuda-green-light">{chunks}</span>,
                })}
              </h1>
              <p className="mt-2 text-stone-700 text-center xl:text-left text-sm md:text-base">{t("date")}</p>
              <p className="max-w-[500px] text-stone-700 mt-6 text-center xl:text-left text-sm md:text-base">
                {t("description")}
              </p>
              <div className="flex gap-4 mt-10">
                <Link href={routes.coaches} className={cn(buttonVariants({ size: "lg" }), "shadow-lg")}>
                  {t("vote")}
                </Link>
              </div>

              <div className="mt-10 w-[80%] hidden xl:block">
                <Accordion
                  items={[
                    { title: t("howToVote"), content: t("howToVoteDescription") },
                    { title: t("whatIcanWin"), content: t("whatIcanWinDescription") },
                    { title: t("howAndWhenIfIWin"), content: t("howAndWhenIfIWinDescription") },
                  ]}
                />
              </div>
            </div>

            <PrizeCarousel prizes={prizes} className="mt-10 xl:mt-0" />

            <div className="mt-10 block w-full max-w-[500px] xl:hidden">
              <Accordion
                items={[
                  { title: t("howToVote"), content: t("howToVoteDescription") },
                  { title: t("whatIcanWin"), content: t("whatIcanWinDescription") },
                  { title: t("howAndWhenIfIWin"), content: t("howAndWhenIfIWinDescription") },
                ]}
              />
            </div>
          </section>
        </div>
        <section className="bg-white">
          <div className="max-w-screen-xl xl:mx-auto flex flex-col w-full px-4 sm:px-10 py-10 mb-10">
            <h2 className="text-2xl md:text-5xl font-bold mb-5 text-center xl:text-left">{t("partners.title")}</h2>
            <PartnersLogos />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

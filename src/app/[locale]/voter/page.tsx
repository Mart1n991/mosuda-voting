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
        span: (chunks) => <span className="block text-mosuda-green-light text-md">{chunks}</span>,
      }),
      image: "/images/placeholder-price-1.avif",
      place: t("prizes.firstPlace.place"),
    },
    {
      id: "222-222",
      title: t("prizes.secondPlace.title"),
      image: "/images/placeholder-price-2.jpeg",
      place: t("prizes.secondPlace.place"),
    },
    {
      id: "333-333",
      title: t.rich("prizes.thirdPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      image: "/images/placeholder-price-3.webp",
      place: t("prizes.thirdPlace.place"),
    },
    {
      id: "444-444",
      title: t.rich("prizes.fourthPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      image: "/images/placeholder-price-3.webp",
      place: t("prizes.fourthPlace.place"),
    },
    {
      id: "555-555",
      title: t.rich("prizes.fifthPlace.title", {
        span: (chunks) => <span className="text-mosuda-green-light">{chunks}</span>,
      }),
      image: "/images/placeholder-price-3.webp",
      place: t("prizes.fifthPlace.place"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-mosuda-green-light to-mosuda-green-dark">
        <div className="max-w-screen-xl xl:mx-auto py-5 xl:py-20 flex flex-col items-center">
          <section className="flex flex-col xl:flex-row items-center xl:items-start w-full px-4 sm:px-10 mb-10">
            <div className="flex-1 flex flex-col items-center xl:items-start">
              <h1 className="whitespace-pre-line text-2xl md:text-5xl font-bold text-center xl:text-left">
                {t.rich("heading", {
                  region: (chunks) => <span className="underline decoration-white">{chunks}</span>,
                })}
              </h1>
              <p className="mt-2 text-stone-100">{t("date")}</p>
              <p className="max-w-[500px] text-stone-700 mt-6 text-center xl:text-left text-sm md:text-base">
                {t("description")}
              </p>
              <div className="flex gap-4 mt-10">
                <Link href={routes.coaches} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "shadow-lg")}>
                  {t("vote")}
                </Link>
              </div>
              <div className="mt-10 w-[80%] hidden xl:block">
                <p className="font-bold tet-2xl mb-4">{t("howToVote")}</p>
                <p className="text-sm text-stone-700">
                  {t.rich("howToVoteDescription", {
                    vote: (chunks) => (
                      <Link href={routes.coaches} className="cursor-pointer underline decoration-white">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>
            </div>

            <PrizeCarousel prizes={prizes} className="mt-10 xl:mt-0" />

            <div className="mt-10 block w-full max-w-[500px] xl:hidden">
              <p className="font-bold tet-2xl text-center xl:text-left">{t("howToVote")}</p>
              <p className="text-sm text-stone-700 text-center xl:text-left">
                {t.rich("howToVoteDescription", {
                  vote: (chunks) => (
                    <Link href={routes.coaches} className="cursor-pointer underline decoration-white">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
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

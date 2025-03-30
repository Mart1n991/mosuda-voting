import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar";
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
      title: t("prizes.firstPlace.title"),
      description: t("prizes.firstPlace.description"),
      image: "/images/placeholder-price-1.avif",
      place: t("prizes.firstPlace.place"),
    },
    {
      title: t("prizes.secondPlace.title"),
      description: t("prizes.secondPlace.description"),
      image: "/images/placeholder-price-2.jpeg",
      place: t("prizes.secondPlace.place"),
    },
    {
      title: t("prizes.thirdPlace.title"),
      description: t("prizes.thirdPlace.description"),
      image: "/images/placeholder-price-3.webp",
      place: t("prizes.thirdPlace.place"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-mosuda-green-light">
        <div className="max-w-screen-xl xl:mx-auto py-5 xl:py-20 flex flex-col items-center">
          <section className="flex flex-col xl:flex-row items-center xl:items-start w-full px-4 sm:px-10 mb-10">
            <div className="flex-1 flex flex-col items-center xl:items-start">
              <h1 className="whitespace-pre-line text-2xl md:text-5xl font-bold text-center xl:text-left">
                {t.rich("heading", {
                  region: (chunks) => <span className="underline decoration-white">{chunks}</span>,
                })}
              </h1>
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
      </main>
      <Footer />
    </>
  );
}

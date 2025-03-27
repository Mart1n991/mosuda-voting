import { AppStoreButton } from "@/components/AppStoreButton";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { Navbar } from "@/components/Navbar";
import { PrizeCards } from "@/components/PrizeCard/PrizeCards";
import { getTranslations } from "next-intl/server";

type InfoRowProps = {
  title: string;
  description: string;
};

const InfoRow = ({ title, description }: InfoRowProps) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
};

export default async function Home() {
  const t = await getTranslations("homePage");

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl xl:mx-auto my-10 mx-6 flex flex-col items-center">
        <section className="flex flex-col items-center gap-4 mb-10">
          <h1 className="whitespace-pre-line text-center text-2xl md:text-4xl font-bold">
            {t.rich("heading", { region: (chunks) => <span className="underline decoration-mosuda-green-light">{chunks}</span> })}
          </h1>
        </section>
        <section>
          <p className="max-w-[700px] text-center">{t("description")}</p>
        </section>
        <section className="flex gap-4 mt-10">
          <AppStoreButton href="https://apps.apple.com/sk/app/mosuda/id1662260317?l=sk" />
          <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.no_creativity_coach_of_people" />
        </section>
        <section>
          <PrizeCards />
        </section>
        <section className="flex flex-col gap-4 max-w-[700px]">
          <InfoRow title={t("whyParticipate")} description={t("whyParticipateDescription")} />
          <div className="flex flex-col gap-4 items-center">
            <InfoRow title={t("howToParticipate")} description={t("howToParticipateDescription")} />
            <div className="flex gap-4">
              <AppStoreButton href="https://apps.apple.com/sk/app/mosuda/id1662260317?l=sk" />
              <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.no_creativity_coach_of_people" />
            </div>
          </div>
          <InfoRow title={t("whatYouCanWin")} description={t("whatYouCanWinDescription")} />
        </section>
      </main>
    </>
  );
}

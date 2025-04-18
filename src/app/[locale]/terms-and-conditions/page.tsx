import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { getTranslations } from "next-intl/server";
import { List } from "./List";
import { routes } from "@/constants/routes";

export default async function TermsAndConditions() {
  const t = await getTranslations("termsAndConditions");

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto mt-10 mb-20 flex flex-col px-4 md:px-10 xl:px-0">
        <h1 className="text-xl xl:text-3xl font-bold mb-10 text-left">{t("title")}</h1>
        <div className="flex flex-col gap-10 md:max-w-4xl">
          <List number={1}>
            {t.rich("list1", {
              web: (chunks) => (
                <a href={routes.mosudaWeb} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                  {chunks}
                </a>
              ),
              heading: (chunks) => <span className="text-lg md:text-xl font-bold">{chunks}</span>,
            })}
          </List>
          <List number={2}>{t("list2")}</List>
          <List number={3} className="whitespace-pre-line">
            {t.rich("list3", {
              section: (chunks) => <span className="font-bold mt-4 block">{chunks}</span>,
            })}
          </List>
          <List number={4}>
            {t.rich("list4", {
              web: (chunks) => (
                <a href={routes.mosudaWeb} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                  {chunks}
                </a>
              ),
            })}
          </List>
          <List number={5}>{t("list5")}</List>
          <List number={6} className="whitespace-pre-line">
            {t("list6")}
          </List>
          <List number={7} className="whitespace-pre-line">
            {t.rich("list7", {
              link1: (chunks) => (
                <a href={routes.mosudaWeb} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                  {chunks}
                </a>
              ),
              link2: (chunks) => (
                <a href={routes.mosudaWeb} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                  {chunks}
                </a>
              ),
            })}
          </List>
          <List number={8}>{t("list8")}</List>
          <List number={9}>{t("list9")}</List>
          <List number={10}>{t("list10")}</List>
          <List number={11}>
            {t.rich("list11", {
              web: (chunks) => (
                <a
                  href="https://www.mhsr.sk/obchod/ochrana-spotrebitela/alternativne-riesenie-spotrebitelskych-sporov-1/zoznam-subjektov-alternativneho-riesenia-spotrebitelskych-sporov-1?csrt=14518442250999247636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500"
                >
                  {chunks}
                </a>
              ),
            })}
          </List>
          <List number={12}>
            {t.rich("list12", {
              web: (chunks) => (
                <a href={routes.privacyPolicy} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                  {chunks}
                </a>
              ),
            })}
          </List>
        </div>
      </main>
      <Footer />
    </>
  );
}

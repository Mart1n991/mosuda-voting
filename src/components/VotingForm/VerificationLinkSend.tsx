import { useTranslations } from "next-intl";
import { CdnImage } from "../CdnImage";

export const VerificationLinkSend = () => {
  const t = useTranslations("coachListPage.votingForm");

  return (
    <div className="space-y-4">
      <div className="relative size-10">
        <CdnImage src="/confetti.png" alt="confetti" fill />
      </div>
      <h3 className="text-lg font-bold">{t("verificationLinkSend.title")}</h3>
      <p>{t("verificationLinkSend.description")}</p>
      <p className="text-sm text-muted-foreground mt-4">({t("verificationLinkSend.checkSpam")})</p>
    </div>
  );
};

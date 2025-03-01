import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CoachProfile } from "@/types/CoachProfile";
import { useTranslations } from "next-intl";
import { VotingForm } from "../VotingForm";
import { Badge } from "../ui/badge";
import { truncateText } from "@/utils/truncateText";

type VotingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coachProfile: CoachProfile;
};

export const VotingDialog = ({ open, onOpenChange, coachProfile }: VotingDialogProps) => {
  const t = useTranslations("coachListPage");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 md:p-10 md:max-w-[600px]">
        <DialogHeader className="items-start">
          <p className="text-xs text-stone-500">{t("votingDialog.votingFor")}</p>
          <div className="flex gap-10 items-center">
            <DialogTitle className="text-2xl font-bold">{truncateText(coachProfile.name, 40)}</DialogTitle>
            <Badge>{coachProfile.voteCount}</Badge>
          </div>
          <DialogDescription />
        </DialogHeader>
        <VotingForm />
      </DialogContent>
    </Dialog>
  );
};

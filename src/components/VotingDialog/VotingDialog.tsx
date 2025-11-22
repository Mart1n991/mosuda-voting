import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export const VotingDialog = ({
  open,
  onOpenChange,
  coachProfile,
}: VotingDialogProps) => {
  const t = useTranslations("coachListPage");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4 md:p-10 md:max-w-[600px]">
        <DialogHeader className="items-start">
          <p className="text-xs text-stone-500">
            {t("votingDialog.votingFor")}
          </p>
          <div className="flex gap-4 sm:gap-10 items-start sm:items-center justify-between sm:justify-start w-full sm:w-auto">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-left flex-1">
              {truncateText(coachProfile.name, 35)}
            </DialogTitle>
            <Badge size="lg" className="bg-amber-400">
              {t("votes", { count: coachProfile.ranking })}
            </Badge>
          </div>
          <DialogDescription />
        </DialogHeader>
        <VotingForm coachId={coachProfile.id} />
      </DialogContent>
    </Dialog>
  );
};

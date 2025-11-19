import {
  StepListItem,
  StepListSubStep,
} from "@/app/[locale]/increase-chance/stepsList";
import React from "react";

type SubstepRowProps = {
  subStep: StepListSubStep;
};

function SubstepRow({ subStep }: SubstepRowProps) {
  return (
    <div>
      <div>square</div>
      <p>substep text</p>
    </div>
  );
}

type SubstepWithBadgesProps = {
  subStep: StepListSubStep;
};

function SubstepWithBadges({ subStep }: SubstepWithBadgesProps) {
  return <div className="">Badge</div>;
}

type IncreaseChanceCardProps = {
  stepItem: StepListItem;
};

export default function IncreaseChanceCard({
  stepItem,
}: IncreaseChanceCardProps) {
  return (
    <div className="p-6 rounded-xl bg-[#39D2C0]/20">
      <div className="flex items-center gap-4">
        <div className="size-[50px] flex items-center justify-center rounded-xl bg-mosuda-green-light text-3xl font-bold">
          {stepItem.step}
        </div>
        <p className="whitespace-pre-line text-md font-bold">
          {stepItem.titleKey}
        </p>
      </div>
      <div>
        {stepItem.subSteps.map((subStep) =>
          subStep.badgeKey || subStep.bulletKeys ? (
            <SubstepWithBadges key={subStep.id} subStep={subStep} />
          ) : (
            <SubstepRow key={subStep.id} subStep={subStep} />
          )
        )}
      </div>
      IncreaseChanceCard component
    </div>
  );
}

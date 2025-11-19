import {
  StepListItem,
  StepListSubStep,
} from "@/app/[locale]/increase-chance/stepsList";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { AppStoreButton } from "../AppStoreButton";
import { GooglePlayButton } from "../GooglePlayButton";

type TranslateFn = (key: string) => string;

function Bullet() {
  return (
    <div>
      <div className="mt-1 size-3 justify-center rounded-sm bg-mosuda-green-light"></div>
    </div>
  );
}

type SubstepRowProps = {
  subStep: StepListSubStep;
  translate: TranslateFn;
};

function SubstepRow({ subStep, translate }: SubstepRowProps) {
  if (!subStep.textKey) return null;

  return (
    <>
      <div className="flex items-start gap-2 rounded-2xl">
        <div>
          <Bullet />
        </div>
        <p className="whitespace-pre-line text-sm">
          {translate(subStep.textKey)}
        </p>
      </div>
      {subStep.buttons && (
        <div className="flex gap-4 ml-[17px]">
          <AppStoreButton href="https://apps.apple.com/sk/app/mosuda/id1662260317?l=sk" />
          <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.no_creativity_coach_of_people" />
        </div>
      )}
    </>
  );
}

type SubstepWithBadgesProps = {
  subStep: StepListSubStep;
  translate: TranslateFn;
};

function SubstepWithBadges({ subStep, translate }: SubstepWithBadgesProps) {
  return (
    <div className="space-y-3 mb-6">
      {subStep.badgeKey && (
        <Badge className="bg-amber-400">{translate(subStep.badgeKey)}</Badge>
      )}

      {subStep.bulletKeys && (
        <ul className="space-y-4 text-sm">
          {subStep.bulletKeys.map((key, idx) => (
            <li key={`${subStep.id}-${idx}`}>
              <div className="flex items-start gap-2">
                <Bullet />
                <span className="whitespace-pre-line">{translate(key)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {subStep.cta && (
        <div>
          <div className="flex gap-2">
            <Bullet />
            <p className="text-sm">{translate(subStep.cta.titleKey)}</p>
          </div>
          <div className="mt-2 ml-[17px] flex flex-wrap gap-2">
            {subStep.cta.badgeKeys.map((key, index) => (
              <Badge
                key={`${subStep.id}-cta-${index}`}
                variant="outline"
                className="bg-white"
              >
                {translate(key)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type IncreaseChanceCardProps = {
  stepItem: StepListItem;
  classname?: string;
};

export default function IncreaseChanceCard({
  stepItem,
  classname,
}: IncreaseChanceCardProps) {
  const t = useTranslations("increaseChancePage");

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-5 rounded-3xl bg-[#39D2C0]/20 p-4 md:p-6 shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1",
        classname
      )}
    >
      <header className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex size-[50px] items-center justify-center rounded-2xl bg-mosuda-green-light text-lg font-semibold text-black">
              {stepItem.step}
            </div>
          </div>
          <p className="whitespace-pre-line text-md md:text-lg font-semibold text-zinc-900">
            {t(stepItem.titleKey)}
          </p>
        </div>

        {stepItem.badgeKey && (
          <Badge className="w-fit bg-red-400">{t(stepItem.badgeKey)}</Badge>
        )}
      </header>

      <div className="flex flex-col gap-3">
        {stepItem.subSteps.map((subStep) =>
          subStep.badgeKey || subStep.bulletKeys ? (
            <SubstepWithBadges
              key={subStep.id}
              subStep={subStep}
              translate={t}
            />
          ) : (
            <SubstepRow key={subStep.id} subStep={subStep} translate={t} />
          )
        )}
      </div>

      {stepItem.badges && (
        <div className="flex flex-wrap gap-2">
          {stepItem.badges.map((badge) => (
            <Badge
              key={`${stepItem.id}-${badge.id}`}
              className="bg-emerald-300"
            >
              {t(badge.labelKey)}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}

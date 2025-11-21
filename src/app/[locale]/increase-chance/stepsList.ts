export type StepListBadge = {
  id: number;
  labelKey: string;
};

export type StepListSubStep = {
  id: number;
  textKey?: string;
  buttons?: boolean;
  badgeKey?: string;
  bulletKeys?: string[];
  cta?: {
    titleKey: string;
    badgeKeys: string[];
  };
};

export type StepListItem = {
  id: number;
  step: number;
  titleKey: string;
  badgeKey?: string;
  subSteps: StepListSubStep[];
  badges?: StepListBadge[];
};

export const stepList: StepListItem[] = [
  {
    id: 1,
    step: 1,
    titleKey: "step1.title",
    subSteps: [
      { id: 1, textKey: "step1.subSteps.first", buttons: true },
      { id: 2, textKey: "step1.subSteps.second" },
      { id: 3, textKey: "step1.subSteps.third" },
    ],
  },
  {
    id: 2,
    step: 2,
    titleKey: "step2.title",
    subSteps: [
      { id: 1, textKey: "step2.subSteps.first" },
      { id: 2, textKey: "step2.subSteps.second" },
      { id: 3, textKey: "step2.subSteps.third" },
      { id: 4, textKey: "step2.subSteps.fourth" },
    ],
    badges: [
      { id: 1, labelKey: "step2.badges.prax" },
      { id: 2, labelKey: "step2.badges.specializations" },
      { id: 3, labelKey: "step2.badges.certifications" },
      { id: 4, labelKey: "step2.badges.clients" },
      { id: 5, labelKey: "step2.badges.trainingStyle" },
      { id: 6, labelKey: "step2.badges.missonOrPhilosophy" },
      { id: 7, labelKey: "step2.badges.videoOfCoach" },
      { id: 8, labelKey: "step2.badges.videoTrainingClients" },
    ],
  },
  {
    id: 3,
    step: 3,
    titleKey: "step3.title",
    subSteps: [
      { id: 1, textKey: "step3.subSteps.first" },
      { id: 2, textKey: "step3.subSteps.second" },
    ],
    badges: [
      { id: 1, labelKey: "step3.badges.professional" },
      { id: 2, labelKey: "step3.badges.sharp" },
      { id: 3, labelKey: "step3.badges.light" },
    ],
  },
  {
    id: 4,
    step: 4,
    titleKey: "step4.title",
    subSteps: [
      {
        id: 1,
        badgeKey: "step4.subSteps.first.badge",
        bulletKeys: [
          "step4.subSteps.first.one",
          "step4.subSteps.first.two",
          "step4.subSteps.first.three",
        ],
      },
      {
        id: 2,
        badgeKey: "step4.subSteps.second.badge",
        bulletKeys: ["step4.subSteps.second.one", "step4.subSteps.second.two"],
        cta: {
          titleKey: "step4.subSteps.second.three.title",
          badgeKeys: [
            "step4.subSteps.second.three.badgeOne",
            "step4.subSteps.second.three.badgeTwo",
          ],
        },
      },
      {
        id: 3,
        badgeKey: "step4.subSteps.third.badge",
        bulletKeys: [
          "step4.subSteps.third.one",
          "step4.subSteps.third.two",
          "step4.subSteps.third.three",
        ],
      },
      {
        id: 4,
        badgeKey: "step4.subSteps.fourth.badge",
        bulletKeys: ["step4.subSteps.fourth.one", "step4.subSteps.fourth.two"],
      },
    ],
  },
  {
    id: 5,
    step: 5,
    titleKey: "step5.title",
    subSteps: [
      { id: 1, textKey: "step5.subSteps.first" },
      { id: 2, textKey: "step5.subSteps.second" },
      { id: 3, textKey: "step5.subSteps.third" },
    ],
  },
  {
    id: 6,
    step: 6,
    titleKey: "step6.title",
    badgeKey: "step6.badge",
    subSteps: [
      { id: 1, textKey: "step6.subSteps.first" },
      { id: 2, textKey: "step6.subSteps.second" },
    ],
  },
  {
    id: 7,
    step: 7,
    titleKey: "step7.title",
    badgeKey: "step7.badge",
    subSteps: [
      { id: 1, textKey: "step7.subSteps.first" },
      { id: 2, textKey: "step7.subSteps.second" },
      { id: 3, textKey: "step7.subSteps.third" },
      { id: 4, textKey: "step7.subSteps.fourth" },
    ],
  },
  {
    id: 8,
    step: 8,
    titleKey: "step8.title",
    badgeKey: "step8.badge",
    subSteps: [
      { id: 1, textKey: "step8.subSteps.first" },
      { id: 2, textKey: "step8.subSteps.second" },
      { id: 3, textKey: "step8.subSteps.third" },
    ],
  },
];

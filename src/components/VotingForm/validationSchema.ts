import { z } from "zod";
import { type AbstractIntlMessages } from "next-intl";

// Base schema without translations
export const createVotingFormSchema = (t: (key: keyof AbstractIntlMessages) => string) =>
  z.object({
    name: z.string().min(1, {
      message: t("votingForm.errors.name"),
    }),
    email: z.string().email({
      message: t("votingForm.errors.emailFormat"),
    }),
    termsAndConditionsAgreement: z.boolean().refine((data) => data, {
      message: t("votingForm.errors.termsAndConditionsAgreement"),
    }),
    marketingAgreement: z.boolean(),
  });

export type VotingFormSchema = z.infer<ReturnType<typeof createVotingFormSchema>>;

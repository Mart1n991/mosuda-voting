import { z } from "zod";
import { type AbstractIntlMessages } from "next-intl";

// Base schema without translations
export const createInfoFormSchema = (t: (key: keyof AbstractIntlMessages) => string) =>
  z.object({
    email: z.string().email({
      message: t("form.errors.emailFormat"),
    }),
  });

export type InfoFormSchema = z.infer<ReturnType<typeof createInfoFormSchema>>;

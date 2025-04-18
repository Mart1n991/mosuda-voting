import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useReCaptcha } from "next-recaptcha-v3";
import { validateEmail } from "@/utils/emailValidation";
import { VerificationLinkSend } from "./VerificationLinkSend";
import { CustomEmailErrorMessage } from "./CustomEmailErrorMessage";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useLocale } from "use-intl";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { createVotingFormSchema } from "./validationSchema";

type FormValues = z.infer<ReturnType<typeof createVotingFormSchema>>;

type VotingFormProps = {
  coachId: string;
  className?: string;
};

export const VotingForm = ({ coachId, className }: VotingFormProps) => {
  const t = useTranslations("coachListPage");

  const votingFormSchema = createVotingFormSchema(t);

  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [customEmailError, setCustomEmailError] = useState<string | null>(null);
  const [isSubmittingLoading, setIsSubmittingLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const { executeRecaptcha } = useReCaptcha();
  const locale = useLocale();

  const form = useForm<FormValues>({
    resolver: zodResolver(votingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      termsAndConditionsAgreement: false,
      marketingAgreement: false,
    },
  });

  const {
    control,
    formState: { isSubmitting, isValidating },
  } = form;

  const onSubmit = async (data: FormValues) => {
    // 1. Reset errors state
    setRecaptchaError(null);
    setCustomEmailError(null);

    try {
      // 2. Set loading state
      setIsSubmittingLoading(true);

      // 3. Validate email - temporary email, alias
      const emailValidationError = await validateEmail(data.email, t);
      if (emailValidationError) {
        setCustomEmailError(emailValidationError);
        return;
      }

      // 4. Get token from reCAPTCHA
      const token = await executeRecaptcha("vote_form");

      // 5. Send data to my nextJS endpoint to register vote
      const response = await fetch(`/api/vote/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          recaptchaToken: token,
          coachId,
          locale: locale,
        }),
      });

      // 6. Get response from my nextJS endpoint
      const result = await response.json();

      // 7. If response is not ok, throw error
      if (!response.ok) {
        throw new Error(result.message || "Registrácia hlasu zlyhala");
      }

      // 8. Set verification sent state
      setIsSubmittingLoading(false);
      setVerificationSent(true);
    } catch (error) {
      setRecaptchaError(error instanceof Error ? error.message : "Neočakávaná chyba");
    } finally {
      setIsSubmittingLoading(false);
    }
  };

  if (verificationSent) {
    return <VerificationLinkSend />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t("votingForm.name")}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("votingForm.email")}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
              {customEmailError && <CustomEmailErrorMessage message={customEmailError} />}
              {recaptchaError && <CustomEmailErrorMessage message={recaptchaError} />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsAndConditionsAgreement"
          render={({ field }) => (
            <>
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal">
                  {t.rich("votingForm.termsAndConditionsAgreement", {
                    link1: (chunks) => (
                      <Link
                        href={routes.termsAndConditions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        {chunks}
                      </Link>
                    ),
                    link2: (chunks) => (
                      <Link
                        href={routes.privacyPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </FormLabel>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="marketingAgreement"
          render={({ field }) => (
            <>
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal">
                  {t.rich("votingForm.marketingAgreement", {
                    link: (chunks) => (
                      <Link
                        href={routes.privacyPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </FormLabel>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmittingLoading || isSubmitting || isValidating}>
          {t("votingForm.submit")}
        </Button>
      </form>
    </Form>
  );
};

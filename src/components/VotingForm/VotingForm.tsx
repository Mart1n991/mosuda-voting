import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { czechSlovakPhoneRegex } from "@/utils/phoneNumberRegex";
import { useReCaptcha } from "next-recaptcha-v3";
import { validateEmail } from "@/utils/emailValidation";
import { VerificationLinkSend } from "./VerificationLinkSend";

// TODO: Translate error messages
const votingFormSchema = z.object({
  name: z.string().min(1, { message: "Meno je povinné pole" }),
  surname: z.string().min(1, { message: "Priezvisko je povinné pole" }),
  email: z.string().email({ message: "Nesprávny formát emailu" }),
  phone: z
    .string()
    .min(1, { message: "Telefón je povinné pole" })
    .regex(czechSlovakPhoneRegex, { message: "Nesprávny formát telefónneho čísla" }),
});

type FormValues = z.infer<typeof votingFormSchema>;

type VotingFormProps = {
  coachId: string;
};

export const VotingForm = ({ coachId }: VotingFormProps) => {
  const t = useTranslations("coachListPage");

  console.log("coachID: ", coachId);

  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [customEmailError, setCustomEmailError] = useState<string | null>(null);
  const [isSubmittingLoading, setIsSubmittingLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<FormValues>({
    resolver: zodResolver(votingFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  const {
    control,
    formState: { errors, isSubmitting, isValidating },
  } = form;

  /**
   * TODO:
   * - [ ] Finish recaptcha setup ( I think is is done now Šimon has to do it )
   * - [ ] Add more email verifications - buying votes
   * - [ ] display correct error message on email form field
   * - [ ] display message about voting success / unsuccessful
   * - [ ] display message about recaptcha error
   * - [ ] display message from Šimon server when is 400 user already voted
   */

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // 1. Reset errors state
    setRecaptchaError(null);
    setCustomEmailError(null);

    try {
      // 2. Set loading state
      setIsSubmittingLoading(true);

      // 3. Validate email - temporary email, alias
      const emailValidationError = validateEmail(data.email);
      if (emailValidationError) {
        setCustomEmailError(emailValidationError);
        throw new Error(emailValidationError);
      }

      // 4. Get token from reCAPTCHA
      const token = await executeRecaptcha("vote_form");

      // 5. Send data to my nextJS endpoint to register vote
      const response = await fetch(`/api/vote/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken: token, coachId }),
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
      console.error("Chyba:", error);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-start gap-4 md:flex-row">
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
            name="surname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("votingForm.surname")}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("votingForm.phone")}</FormLabel>
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
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t("votingForm.submit")}
        </Button>
      </form>
    </Form>
  );
};

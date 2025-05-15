import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/utils/emailValidation";
import { CustomEmailErrorMessage } from "./CustomEmailErrorMessage";
import { cn } from "@/lib/utils";
import { createInfoFormSchema } from "./validationSchema";
import Image from "next/image";

type FormValues = z.infer<ReturnType<typeof createInfoFormSchema>>;

type InfoFormProps = {
  className?: string;
};

export const InfoForm = ({ className }: InfoFormProps) => {
  const t = useTranslations("maintenancePage");

  const infoFormSchema = createInfoFormSchema(t);

  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [customEmailError, setCustomEmailError] = useState<string | null>(null);
  const [isSubmittingLoading, setIsSubmittingLoading] = useState(false);
  const [isEmailSubscribed, setIsEmailSubscribed] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(infoFormSchema),
    defaultValues: {
      email: "",
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

      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      // 7. If response is not ok, throw error
      if (!response.ok) {
        throw new Error(result.message || "Ups... niečo sa pokazilo :(");
      }

      // 4. Set verification sent state
      setIsSubmittingLoading(false);
      setIsEmailSubscribed(true);
    } catch (error) {
      setRecaptchaError(error instanceof Error ? error.message : "Neočakávaná chyba");
    } finally {
      setIsSubmittingLoading(false);
    }
  };

  if (isEmailSubscribed) {
    return (
      <div className="space-y-4">
        <div className="relative size-10">
          <Image src="/images/confetti.png" alt="confetti" fill />
        </div>
        <h3 className="text-lg font-bold">{t("emailSubscribedTitle")}</h3>
        <p className="bg-red-400 p-2 rounded-md">{t("emailSubscribedDescription")}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <p className="text-center text-xs">{t("description2")}</p>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.email")}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
              {customEmailError && <CustomEmailErrorMessage message={customEmailError} />}
              {recaptchaError && <CustomEmailErrorMessage message={recaptchaError} />}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          variant="secondary"
          className="w-full"
          disabled={isSubmittingLoading || isSubmitting || isValidating}
        >
          {t("form.submit")}
        </Button>
      </form>
    </Form>
  );
};

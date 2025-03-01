import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { czechSlovakPhoneRegex } from "@/utils/phoneNumberRegex";

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

export const VotingForm = () => {
  const t = useTranslations("coachListPage");
  const form = useForm<FormValues>({
    resolver: zodResolver(votingFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  const { control } = form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

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

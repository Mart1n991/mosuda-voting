"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function VoteConfirmationPage() {
  const t = useTranslations("verifyVote");
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const message = searchParams?.get("message");

  if (status === "success") {
    return (
      <div className="container mx-auto max-w-md h-screen flex flex-col gap-4 items-center justify-center">
        <Image src="/images/logo.png" alt="Mosuda Logo" width={150} height={100} />
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>{t("verificationSuccess")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">{t("verificationSuccessMessage")}</p>
            <Button asChild>
              <Link href={routes.coaches}>{t("backToVoting")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md h-screen flex flex-col gap-4 items-center justify-center">
      <Image src="/images/logo.png" alt="Mosuda Logo" width={150} height={100} />
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle>{t("verificationFailed")}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{message || t("verificationFailedMessage")}</p>
          <Button asChild>
            <Link href={routes.coaches}>{t("backToVoting")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

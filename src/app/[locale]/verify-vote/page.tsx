"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useReCaptcha } from "next-recaptcha-v3";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function VerifyVotePage() {
  const t = useTranslations("verifyVote");
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const { executeRecaptcha, loaded } = useReCaptcha();

  useEffect(() => {
    if (!token) {
      router.push("/vote-confirmation?status=error&message=Chýbajúci token");
      return;
    }

    // Automatic redirect to API endpoint for verification
    const verifyToken = async () => {
      try {
        // Generate recaptcha token
        const recaptchaToken = await executeRecaptcha("vote_verification");

        // This replaces the current page in the browser history and prevents multiple redirects
        window.location.replace(
          `/api/vote/verify?token=${encodeURIComponent(token)}&recaptcha=${encodeURIComponent(recaptchaToken)}`
        );
      } catch (error) {
        console.error("Chyba pri presmerovaní na verifikáciu:", error);

        // Also use the same approach for consistency
        window.location.replace("/vote-confirmation?status=error&message=Nastala neočakávaná chyba");
      }
    };

    // Start verification, only if reCAPTCHA is loaded
    if (loaded) {
      verifyToken();
    } else {
      // Wait 2 seconds for reCAPTCHA to load
      const timeoutId = setTimeout(() => {
        if (loaded) {
          verifyToken();
        } else {
          // If it still didn't load, redirect without it
          // (backend should have fallback for missing token)
          window.location.replace(`/api/vote/verify?token=${encodeURIComponent(token)}`);
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }

    // Timeout for case where redirect takes too long
    const timeoutId = setTimeout(() => {
      setIsVerifying(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [token, router, loaded, executeRecaptcha]);

  return (
    <div className="container mx-auto max-w-md h-screen flex flex-col gap-4 items-center justify-center">
      <Image src="/images/logo.png" alt="Mosuda Logo" width={150} height={100} />
      <Card>
        <CardContent className="pt-6 text-center">
          {isVerifying ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>{t("checkingVote")}</p>
            </div>
          ) : (
            <div className="py-4">
              <p>
                {t.rich("automaticRedirect", {
                  a: (chunks) => (
                    <a className="text-primary underline" href={`/api/vote/verify?token=${encodeURIComponent(token || "")}`}>
                      {chunks}
                    </a>
                  ),
                })}
                .
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

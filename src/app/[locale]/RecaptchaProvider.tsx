"use client";

import React from "react";
import { ReCaptchaProvider } from "next-recaptcha-v3";

interface RecaptchaProviderProps {
  children: React.ReactNode;
}

export const RecaptchaProvider = ({ children }: RecaptchaProviderProps) => {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} useEnterprise>
      {children}
    </ReCaptchaProvider>
  );
};

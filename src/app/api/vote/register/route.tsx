import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { encrypt } from "@/utils/encryption";
import { getTranslations } from "next-intl/server";
import { render } from "@react-email/components";
import VoteVerificationEmail from "./VoteVerificationEmail";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, recaptchaToken, coachId, locale } = body;

    // Get translations for the email
    const t = await getTranslations({ locale, namespace: "email.verification" });

    // Verifikácia reCAPTCHA Enterprise
    try {
      const recaptchaResponse = await fetch(
        `https://recaptchaenterprise.googleapis.com/v1/projects/mosuda-452422/assessments?key=${process.env.RECAPTCHA_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Referer: "http://localhost:3000",
          },
          body: JSON.stringify({
            event: {
              token: recaptchaToken,
              expectedAction: "vote_form",
              siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            },
          }),
        }
      );

      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.tokenProperties?.valid) {
        console.error("reCAPTCHA verifikácia zlyhala:", recaptchaResult);
        return NextResponse.json({ message: "reCAPTCHA verification failed" }, { status: 400 });
      }

      // Môžeš pridať aj kontrolu skóre (nepovinné)
      if (recaptchaResult.riskAnalysis?.score < 0.5) {
        console.error("reCAPTCHA skóre je príliš nízke:", recaptchaResult);
        return NextResponse.json({ message: "reCAPTCHA verification failed - suspicious activity" }, { status: 400 });
      }
    } catch (error) {
      console.error("Chyba pri volaní reCAPTCHA API:", error);
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ message: "Error verifying reCAPTCHA" }, { status: 500 });
      }
    }

    // Vytvorím payload s dátami a časovou pečiatkou
    const payload = {
      name,
      email,
      coachId,
      timestamp: Date.now(),
    };

    // Zašifrujem payload ako token
    const token = encrypt(JSON.stringify(payload));

    // Vytvorím odkaz na verifikáciu
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-vote?token=${encodeURIComponent(token)}`;

    // Odošlem email s verifikačným linkom
    const transporter = createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT || 587),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: process.env.EMAIL_SERVER_PORT === "465",
    });

    const translations = {
      title: t("title"),
      thankYou: t("thankYou"),
      instructions: t("instructions"),
      button: t("button"),
      validity: t("validity"),
      ignore: t("ignore"),
    };

    const emailHtml = await render(<VoteVerificationEmail verificationLink={verificationLink} translations={translations} />);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: t("subject"),
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Verifikačný email bol odoslaný",
      ...(process.env.NODE_ENV !== "production" && { devToken: token }),
    });
  } catch (error) {
    console.error("Chyba pri registrácii hlasu:", error);
    return NextResponse.json({ message: "Nastala chyba pri registrácii vášho hlasu" }, { status: 500 });
  }
}

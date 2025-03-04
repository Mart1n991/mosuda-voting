import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { encrypt } from "@/utils/encryption";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, surname, email, phone, recaptchaToken, coachId } = body;
    // Verifikácia reCAPTCHA Enterprise
    if (process.env.NODE_ENV === "production" || process.env.RECAPTCHA_API_KEY) {
      try {
        const recaptchaResponse = await fetch(
          `https://recaptchaenterprise.googleapis.com/v1/projects/mosuda-452422/assessments?key=${process.env.RECAPTCHA_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        // V development móde pokračujeme aj pri chybe
        console.warn("Preskakujem reCAPTCHA overenie v dev móde kvôli chybe");
      }
    } else {
      console.warn("RECAPTCHA_API_KEY nie je nastavený, preskakujem overenie v development móde");
    }

    // Vytvorím payload s dátami a časovou pečiatkou
    const payload = {
      name,
      surname,
      email,
      phone,
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

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Potvrďte svoj hlas v súťaži o najlepšieho trénera",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Potvrďte svoj hlas</h1>
            <p>Ďakujeme za váš hlas v súťaži o najlepšieho trénera.</p>
            <p>Pre dokončenie hlasovania, prosím kliknite na nasledujúci odkaz:</p>
            <div style="margin: 30px 0;">
              <a href="${verificationLink}" style="background-color: #0070f3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Potvrdiť hlas
              </a>
            </div>
            <p>Odkaz je platný 24 hodín.</p>
            <p style="color: #666; margin-top: 30px; font-size: 12px;">
              Ak ste nežiadali o hlasovanie, tento email môžete ignorovať.
            </p>
          </div>
        `,
    });

    return NextResponse.json({
      success: true,
      message: "Verifikačný email bol odoslaný",
      // Vo vývoji môžeme pridať token do odpovede pre jednoduché testovanie
      ...(process.env.NODE_ENV !== "production" && { devToken: token }),
    });
  } catch (error) {
    console.error("Chyba pri registrácii hlasu:", error);
    return NextResponse.json({ message: "Nastala chyba pri registrácii vášho hlasu" }, { status: 500 });
  }
}

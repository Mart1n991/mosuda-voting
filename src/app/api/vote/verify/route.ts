import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/encryption";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const recaptchaToken = searchParams.get("recaptcha");

  if (!token) {
    return NextResponse.redirect(
      new URL(`/${request.nextUrl.locale}/vote-confirmation?status=error&message=Neplatný token`, request.url)
    );
  }

  // Decrypt token to get original data
  const payloadStr = decrypt(token);

  if (!payloadStr) {
    return NextResponse.redirect(
      new URL(`/${request.nextUrl.locale}/vote-confirmation?status=error&message=Neplatný formát tokenu`, request.url)
    );
  }

  const payload = JSON.parse(payloadStr);

  // Check if token is not older than 24 hours
  const tokenAge = Date.now() - payload.timestamp;
  if (tokenAge > 24 * 60 * 60 * 1000) {
    return NextResponse.redirect(
      new URL(`/${request.nextUrl.locale}/vote-confirmation?status=error&message=Platnosť odkazu vypršala`, request.url)
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${process.env.MOSUDA_APP_ENDPOINT}/coachProfileChallenge/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
        phone: payload.phone,
        coachId: payload.coachId,
        recaptchaToken: recaptchaToken,
        verified: true,
      }),
    });

    // Keď zistíme, že je to kvôli už existujúcemu hlasu (kontrola podľa správy)
    if (response.status === 400) {
      return NextResponse.redirect(
        new URL(
          `${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=${encodeURIComponent(
            "Váš hlas už bol dnes zaregistrovaný. Hlasovať znova môžete nasledujúci deň."
          )}`
        )
      );
    }

    // Redirect user to confirmation page
    return NextResponse.redirect(new URL(`${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=success`));
  } catch (error) {
    console.error("Error sending vote to API:", error);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(
      new URL(`${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=API communication error`)
    );
  }
}

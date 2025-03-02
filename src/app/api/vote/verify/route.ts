import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/encryption";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

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

    // Send final vote to colleague's endpoint - add diagnostics
    console.log("Sending vote to:", process.env.MOSUDA_APP_ENDPOINT);
    console.log("Payload:", {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      // phone hidden for security
      coachId: payload.coachId,
      verified: true,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Check if we have the necessary setting
    if (!process.env.MOSUDA_APP_ENDPOINT) {
      console.error("MOSUDA_APP_ENDPOINT is not set!");
      return NextResponse.redirect(
        new URL(`${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=Server configuration error`)
      );
    }

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
          verified: true,
        }),
      });

      // More detailed diagnostics for the response
      console.log("Response status:", response.status);

      // Bezpečné parsovanie JSON s ošetrením chyby
      let responseData;
      const responseText = await response.text();
      console.log("Response text:", responseText);

      try {
        responseData = JSON.parse(responseText);
        console.log("API response:", responseData);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        responseData = { message: "Neplatný formát odpovede zo servera" };
      }

      if (!response.ok) {
        // Keď zistíme, že je to kvôli už existujúcemu hlasu (kontrola podľa správy)
        if (response.status === 400 && responseData?.message?.includes("already voted")) {
          return NextResponse.redirect(
            new URL(
              `${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=${encodeURIComponent(
                "Váš hlas už bol dnes zaregistrovaný. Ďakujeme za záujem!"
              )}`
            )
          );
        }

        // Ostatné chyby
        return NextResponse.redirect(
          new URL(
            `${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=${encodeURIComponent(
              responseData?.message || "Nepodarilo sa zaznamenať váš hlas"
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
  } catch (error) {
    console.error("Chyba pri verifikácii hlasu:", error);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(
      new URL(
        `${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=Nastala neočakávaná chyba`,
        request.url
      )
    );
  }
}

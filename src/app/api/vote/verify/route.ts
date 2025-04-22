import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/encryption";
import { storeEmailInMailchimp } from "@/utils/storeEmailIInMailchimp";
import { monitorVoteActivity } from "@/utils/voteMonitoring";

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
    // First, send the vote to the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_MOSUDA_APP_ENDPOINT}/coachProfileChallenge/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        termsAndConditionsAgreementAt: new Date().toISOString(),
        marketingAgreementAt: payload.marketingAgreement ? new Date().toISOString() : null,
        coachId: payload.coachId,
        recaptchaToken: recaptchaToken,
        verified: true,
      }),
    });

    if (response.ok) {
      await monitorVoteActivity({
        coachId: payload.coachId,
        timestamp: Date.now(),
        email: payload.email,
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      });
    }

    // When we find out that it's because of an already existing vote (check by message)
    if (response.status === 400) {
      const errorText = await response.text();

      if (errorText.includes("You cannot vote for yourself")) {
        return NextResponse.redirect(
          new URL(
            `${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=${encodeURIComponent("cannotVoteForYourself")}`
          )
        );
      }

      return NextResponse.redirect(
        new URL(
          `${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=${encodeURIComponent("alreadyVotedToday")}`
        )
      );
    }

    // If vote was successful, try to subscribe to Mailchimp
    // This is now non-blocking - if it fails, we still consider the vote successful
    try {
      await storeEmailInMailchimp(payload.email, payload.name, payload.marketingAgreement);
    } catch (mailchimpError) {
      console.error("Failed to subscribe to Mailchimp:", mailchimpError);
      // Continue with the success flow even if Mailchimp fails
    }

    // Redirect user to confirmation page
    return NextResponse.redirect(new URL(`${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=success`));
  } catch (error) {
    console.error("Error sending vote to API:", error);
    return NextResponse.redirect(
      new URL(`${baseUrl}/${request.nextUrl.locale}/vote-confirmation?status=error&message=API communication error`)
    );
  }
}

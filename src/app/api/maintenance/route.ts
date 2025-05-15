import { NextRequest, NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;

  const listId = process.env.MAILCHIMP_LIST_ID || "";
  const tagName = process.env.MAILCHIMP_MAINTENANCE_TAG_NAME || "";

  if (!email || !listId) {
    return NextResponse.json({ message: "Missing email or list ID" }, { status: 400 });
  }

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      tags: [tagName],
    });

    return NextResponse.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    console.error("Mailchimp error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

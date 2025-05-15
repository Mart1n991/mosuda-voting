import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function storeEmailInMailchimp(email: string) {
  const listId = process.env.MAILCHIMP_LIST_ID || "";
  const tagName = process.env.MAILCHIMP_MAINTENANCE_TAG_NAME || "";

  console.log({ listId, tagName });

  if (!listId) {
    console.error("Mailchimp List ID is not configured");
    return null;
  }

  if (!email) {
    console.error("Missing required fields:", { email, name });
    return null;
  }

  try {
    // First, add the subscriber to the list
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      tags: [tagName], // Add the tag when subscribing
    });

    return response;
  } catch (error) {
    console.error("Raw Mailchimp error:", error);
    return null;
  }
}

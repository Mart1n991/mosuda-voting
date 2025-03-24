import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function storeEmailInMailchimp(email: string, name: string) {
  const listId = process.env.MAILCHIMP_LIST_ID || "";
  const tagName = process.env.MAILCHIMP_TAG_NAME || ""; // Default tag name if not specified

  if (!listId) {
    console.error("Mailchimp List ID is not configured");
    return null;
  }

  if (!email || !name) {
    console.error("Missing required fields:", { email, name });
    return null;
  }

  try {
    // First, add the subscriber to the list
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
      },
      tags: [tagName], // Add the tag when subscribing
    });

    return response;
  } catch (error) {
    console.error("Raw Mailchimp error:", error);
    return null;
  }
}

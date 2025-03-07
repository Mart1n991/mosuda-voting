import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER,
});

export async function storeEmailInMailchimp(email: string, name: string) {
  const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID ?? "";

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
      },
    });
    console.log("RESPONSE: ", response);
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
}

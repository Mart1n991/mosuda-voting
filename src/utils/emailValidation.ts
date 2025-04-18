// Importovanie knižnice s dočasnými emailovými doménami
import disposableDomains from "disposable-email-domains";

// Control through MailCheck.ai (existujúci kód)
const isTemporaryEmail = async (email: string) => {
  if (!email) return false;

  try {
    // Api service to check if email is temporary
    const response = await fetch(`https://api.usercheck.com/email/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_CHECK_API}`,
      },
    });

    const result = await response.json();

    // Return true if email is disposable
    return result.disposable === true;
  } catch (error) {
    console.error("Error checking email:", error);
    // Allow email even if there is an error (to avoid app from crashing)
    return false;
  }
};

// User check control
const isKnownDisposableDomain = (email: string): boolean => {
  if (!email || !email.includes("@")) return false;

  const domain = email.split("@")[1].toLowerCase();
  return disposableDomains.includes(domain);
};

// Check if email contains aliases (existujúci kód)
const hasEmailAlias = (email: string): boolean => {
  if (!email) {
    return false;
  }

  const [localPart, domain] = email.toLowerCase().split("@");

  // Gmail aliases (+ and - sign)
  if (domain === "gmail.com") {
    if (localPart.includes("+")) {
      return true;
    }
  }

  // Yahoo aliases (-)
  if (domain === "yahoo.com" && localPart.includes("-")) {
    return true;
  }

  // General aliases (+)
  if (localPart.includes("+")) {
    return true;
  }

  return false;
};

export const validateEmail = async (email: string) => {
  // 1. Quick check using library (without API call)
  if (isKnownDisposableDomain(email)) {
    return "Prosím, nepoužívajte dočasnú emailovú adresu";
  }

  // 2. Aliases check
  if (hasEmailAlias(email)) {
    return "Prosím, nepoužívajte emailové aliasy (napr. meno+alias@gmail.com)";
  }

  // 3. API check (only if local check passed)
  if (await isTemporaryEmail(email)) {
    return "Prosím, nepoužívajte dočasnú emailovú adresu";
  }

  return null;
};

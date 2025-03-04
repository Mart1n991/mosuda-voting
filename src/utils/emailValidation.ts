const isTemporaryEmail = async (email: string) => {
  if (!email) return false;

  try {
    // Api service to check if email is temporary
    const response = await fetch(`https://api.mailcheck.ai/email/${encodeURIComponent(email)}`);
    const result = await response.json();

    // Return true if email is disposable
    return result.disposable === true;
  } catch (error) {
    console.error("Error checking email:", error);
    // Allow email even if there is an error (to avoid app from crashing)
    return false;
  }
};

// Check if email contains aliases
const hasEmailAlias = (email: string): boolean => {
  if (!email) {
    return false;
  }

  const [localPart, domain] = email.toLowerCase().split("@");

  // Gmail aliases (+ or dots)
  if (domain === "gmail.com") {
    if (localPart.includes("+") || localPart.includes(".")) {
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
  if (await isTemporaryEmail(email)) {
    return "Prosím, nepoužívajte dočasnú emailovú adresu";
  }

  // Kontrola aliasov
  if (hasEmailAlias(email)) {
    return "Prosím, nepoužívajte emailové aliasy (napr. meno+alias@gmail.com)";
  }

  return null;
};

import disposableDomains from "disposable-email-domains";

const isTemporaryEmail = (email: string) => {
  if (!email) return false;

  const domain = email.split("@")[1]?.toLowerCase();

  if (disposableDomains.includes(domain)) {
    return true;
  }

  return false;
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

export const validateEmail = (email: string) => {
  if (isTemporaryEmail(email)) {
    return "Prosím, nepoužívajte dočasnú emailovú adresu";
  }

  // Kontrola aliasov
  if (hasEmailAlias(email)) {
    return "Prosím, nepoužívajte emailové aliasy (napr. meno+alias@gmail.com)";
  }

  return null;
};

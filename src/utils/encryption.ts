import crypto from "crypto";

// Get secret key from environment variables and ensure it's the right length
let SECRET_KEY = process.env.ENCRYPTION_SECRET || "";

// AES-256 requires a 32-byte key
if (SECRET_KEY.length < 32) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("ENCRYPTION_SECRET must be at least 32 characters long");
  } else {
    console.warn("ENCRYPTION_SECRET is too short, padding with zeros for development");
    // Pad the key to 32 bytes
    SECRET_KEY = SECRET_KEY.padEnd(32, "0");
  }
} else if (SECRET_KEY.length > 32) {
  // If longer than 32 bytes, truncate it
  SECRET_KEY = SECRET_KEY.slice(0, 32);
}

const IV_LENGTH = 16; // For AES-256

/**
 * Encrypts a string using AES-256-CBC algorithm
 * @param text - Plain text to encrypt
 * @returns Encrypted string in format 'iv:encrypted' (hex encoded)
 */
export function encrypt(text: string): string {
  // Generate random initialization vector
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);

  // Encrypt the text
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Return iv:encrypted in hex format
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

/**
 * Decrypts a string that was encrypted using encrypt function
 * @param text - Encrypted string in format 'iv:encrypted' (hex encoded)
 * @returns Decrypted string or null if decryption fails
 */
export function decrypt(text: string): string | null {
  try {
    // Split the text into IV and encrypted parts
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift() || "", "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");

    // Decrypt the text
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
}

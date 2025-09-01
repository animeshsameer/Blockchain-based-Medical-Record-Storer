const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// ✅ Use a static 32-character (256-bit) string as the key
const secretKey = "12345678901234567890123456789012"; // Must be 32 chars
// Note: Keep this key secret in production

function encrypt(text) {
  const iv = crypto.randomBytes(16); // Always generate a new IV
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(text) {
  const [ivHex, encrypted] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };

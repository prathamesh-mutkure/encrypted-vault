import * as crypto from "crypto";

// Generate a new RSA key pair
export const getKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 512, // the length of the key in bits
    publicKeyEncoding: {
      type: "spki", // the type of encoding used for the public key
      format: "pem", // the format of the key
    },
    privateKeyEncoding: {
      type: "pkcs8", // the type of encoding used for the private key
      format: "pem", // the format of the key
    },
  });

  return { publicKey, privateKey };
};

const encryptMessage = (message: string, publicKey: string) => {
  // Encrypt the message using the public key
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(message)
  );

  return encrypted.toString();
};

const decryptMessage = (encrypted: string, privateKey: string) => {
  // Decrypt the message using the private key
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(encrypted)
  );

  decrypted.toString(); // 'This is a secret message'
};

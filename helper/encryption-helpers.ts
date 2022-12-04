import * as crypto from "crypto";

const algorithm = "aes256"; // or any other algorithm supported by OpenSSL

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

  // return { publicKey, privateKey };
  return { publicKey, privateKey: publicKey };
};

export const encryptMessage = (message: string, publicKey: string) => {
  // Encrypt the message using the public key
  // const encrypted = crypto.publicEncrypt(
  //   {
  //     key: publicKey,
  //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //   },
  //   Buffer.from(message)
  // );

  // return encrypted.toString();

  const cipher = crypto.createCipher(algorithm, publicKey);
  const encrypted = cipher.update(message, "utf8", "hex") + cipher.final("hex");

  return encrypted;
};

export const decryptMessage = (encrypted: string, privateKey: string) => {
  // Decrypt the message using the private key
  // const decrypted = crypto.privateDecrypt(
  //   {
  //     key: privateKey,
  //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //   },
  //   Buffer.from(encrypted)
  // );

  // decrypted.toString(); // 'This is a secret message'

  var decipher = crypto.createDecipher(algorithm, privateKey);
  var decrypted =
    decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
};

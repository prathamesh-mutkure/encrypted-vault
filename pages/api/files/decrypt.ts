import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytes,
  UploadResult,
  getBlob,
} from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "../../../firebase-config";
import {
  encryptMessage,
  encrypFile,
  decryptFile,
} from "../../../helper/encryption-helpers";
import * as crypto from "crypto";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    // const { path } = req.body;
    const path = "1/0-mlh-img.jpeg";

    const fileRef = ref(storage, path);

    const fileBlob = await getBlob(fileRef);
    const arrayBuffer = await fileBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = decryptFile(buffer, "key");

    const blob = new Blob([result]);

    return blob;
  }

  res.status(200).json({ success: true });
};

export default handler;
export {};

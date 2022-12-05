import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "../../../firebase-config";
import { encryptMessage, encrypFile } from "../../../helper/encryption-helpers";
import * as crypto from "crypto";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const _uploadFile = async (userId: string, file: File, key: string) => {
  const userFolderRef = ref(storage, `${userId}/${file.name}`);

  key = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);

  try {
    const buffer = await file.arrayBuffer();
    const encryptedFile = encrypFile(Buffer.from(buffer), key);

    // console.log(key);
    // console.log("ENC FILE: ", encrypFile);

    // return true;

    const snapshot: UploadResult = await uploadBytes(
      userFolderRef,
      encryptedFile
    );

    return true;
  } catch (e: any) {
    console.log(e);

    throw new Error(e?.message ?? "Failed to upload file");
  }
};

const _getAllFiles = async (userId: string) => {
  const userFolderRef = ref(storage, userId);

  const itemRefs = await (await list(userFolderRef)).items;

  const downloadURLs = await Promise.all(
    itemRefs.map((itemRef) => getDownloadURL(itemRef))
  );

  const items = itemRefs.map((itemRef, i: number) => {
    return {
      name: itemRef.name,
      fullPath: itemRef.fullPath,
      bucket: itemRef.bucket,
      url: downloadURLs[i],
    };
  });

  console.log(items);

  return items;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
  }

  res.status(200).json({ success: true });
};

export default handler;
export { _getAllFiles, _uploadFile };

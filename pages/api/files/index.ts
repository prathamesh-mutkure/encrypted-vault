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
import { encryptMessage } from "../../../helper/encryption-helpers";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const _uploadFile = async (userId: string, file: File) => {
  const userFolderRef = ref(storage, `${userId}/${file.name}`);

  try {
    const snapshot: UploadResult = await uploadBytes(userFolderRef, file);

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
  const publicKey =
    "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI0TWotq2h7vrqlKZjRvg1oVic9wwlAKgwqccBLWhpn/vh6lVRPmZwi7CR+YOI6ccADXSpXg2Mz63oLGkWeVWBsCAwEAAQ==";

  const pvtKey =
    "MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAjRNai2raHu+uqUpmNG+DWhWJz3DCUAqDCpxwEtaGmf++HqVVE+ZnCLsJH5g4jpxwANdKleDYzPregsaRZ5VYGwIDAQABAkEAgSXikhczr3aEUv6FKiOb//APxRPZDyVQaXplLxmtB3S30BdxdoM6+uQugKo4CMcKpzhQUgqUrMIXZTS7b7vOgQIhAMgqVzpYA3cWwRrhzOoqZ710GuF9o8CbS3hBVx7uKgjxAiEAtG10nq1Bo+HMseuO85PyzRSd/2aaBGGVKmJ+wRYsUcsCIQC8cLAB604H1VIifqUtZpKXlzCfTGrXLtwT8F+WbN0B4QIgL7MYN7L6PYc+hHMQEdk1QX6H3rOTWEEsHE550DY6dU0CICa6Wqj0eNO5JdISVSiNh6mmHu8PpQN58PxdtbnnzD8c";

  const encry = encryptMessage("base64", publicKey);

  console.log(encry);

  res.status(200).json({ name: "John Doe" });
};

export default handler;
export { _getAllFiles, _uploadFile };

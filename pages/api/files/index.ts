import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, list, ref } from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "../../../firebase-config";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

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
  res.status(200).json({ name: "John Doe" });
};

export default handler;
export { _getAllFiles };

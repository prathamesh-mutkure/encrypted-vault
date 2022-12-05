/* eslint-disable @next/next/no-img-element */
import { Container, IconButton, List, Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteFile,
  getAllFiles,
  renameFile,
  uploadFile,
} from "../../helper/file-helpers";
import FileListItem from "../files/file-list-item";
import FileRenameModal from "../files/file-rename-modal";
import AddIcon from "@mui/icons-material/Add";
import classes from "./home.module.scss";
import FileUploadModal from "../files/file-upload-modal";
import { AppDispatch, RootState } from "../../store";
import Image from "next/image";
import MasonryImage from "../files/files-masonry-item";
import { User } from "../../models/user-model";
import { useRouter } from "next/router";
import { decryptFile } from "../../helper/encryption-helpers";
import * as crypto from "crypto";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytes,
  UploadResult,
  getBlob,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/*
  TODO: 
  2. Test if encrypted images show
  3. Add Image upload code
  4. LFX Mentorship
*/

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const files = useSelector((state: RootState) => state.files.files);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fileToRename, setFileToRename] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getAllFiles(user.id));
  }, [user.id, dispatch]);

  const onDownload = (file: any) => {};

  const onDecrypt = async (file: any) => {
    // setFileToRename(file);
    // setIsOpen(true);

    console.log(file);

    const fileRef = ref(storage, file.fullPath);

    let key = "key";
    key = crypto
      .createHash("sha256")
      .update(String(key))
      .digest("base64")
      .substr(0, 32);

    getBlob(fileRef)
      .then(async (blob) => {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const decrypted = decryptFile(buffer, key);

        const x = new Blob([decrypted.buffer]);
        const url = URL.createObjectURL(x);

        console.log(url);
      })
      .catch((e) => console.error("Error decrypting: ", e));
  };

  const onUploadClick = (file: any) => {
    setIsUploadModalOpen(true);
  };

  const closeRenameModal = () => {
    setFileToRename(null);
    setIsOpen(false);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleRename = (id: String, newFileName: String) => {
    dispatch(renameFile(id, newFileName, closeRenameModal));
  };

  return (
    <React.Fragment>
      <FileRenameModal
        isOpen={isOpen}
        handleClose={closeRenameModal}
        id={fileToRename?._id}
        fileName={fileToRename?.filename}
        handleRename={handleRename}
      />

      <FileUploadModal
        user={user}
        isOpen={isUploadModalOpen}
        handleClose={closeUploadModal}
      />

      <Container maxWidth="xl" className={classes.HomeContainer}>
        <Box>
          <Masonry columns={3} spacing={2}>
            {files.map((file: any, i: number) => (
              <MasonryImage
                key={i}
                filename={file.name}
                url={file.url}
                onDownload={() => onDownload(file)}
                onDecrypt={() => onDecrypt(file)}
              />
            ))}
          </Masonry>
        </Box>

        <p>Private Key: {user.privateKey}</p>
        <p>Public Key: {user.publicKey}</p>
      </Container>

      <IconButton
        size="large"
        edge="end"
        color="inherit"
        sx={{
          mr: 2,
          color: "white",
          backgroundColor: "#1776D1",
          position: "fixed",
          right: 0,
          bottom: 0,
          margin: "1rem",

          "&:hover": {
            backgroundColor: "#1776D1",
            opacity: 0.8,
          },
        }}
        aria-label="Upload File"
        className={classes.addButton}
        onClick={onUploadClick}
      >
        <AddIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default Dashboard;

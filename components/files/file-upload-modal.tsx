import React, { useState } from "react";

import { Modal, Button, Box, TextField, CircularProgress } from "@mui/material";
import { uploadFile } from "../../helper/file-helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/index";
import { encryptMessage } from "../../helper/encryption-helpers";
import { User } from "../../models/user-model";

interface FileUploadModalProps {
  user: User;
  isOpen: boolean;
  handleClose: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  user,
  isOpen,
  handleClose,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [file, setFile] = useState<File | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = () => {
    if (!file) return;

    setIsLoading(true);

    dispatch(
      uploadFile(user.id, file, "key", () => {
        setFile(undefined);
        setIsLoading(false);
        handleClose();
      })
    );
  };

  const style = {
    position: "absolute" as "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.item(0))}
        />
        <Button
          variant="contained"
          onClick={() => handleUpload()}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress /> : "Upload"}
        </Button>
      </Box>
    </Modal>
  );
};

export default FileUploadModal;

import React, { useEffect, useState } from "react";

import { Modal, Button, Box, TextField } from "@mui/material";

interface FileRenameModalProps {
  isOpen: boolean;
  id: String;
  fileName: String;
  handleClose: () => void;
  handleRename: (id: String, newFileName: String) => void;
}

const FileRenameModal: React.FC<FileRenameModalProps> = ({
  id,
  isOpen,
  fileName,
  handleClose,
  handleRename,
}) => {
  const [newFileName, setNewFileName] = useState<String>("");

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
        <TextField
          defaultValue={fileName}
          label="Enter new name"
          helperText="Make sure to not remove the extension "
          onChange={(event) => setNewFileName(event.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={() => handleRename(id, newFileName)}
        >
          Rename
        </Button>
      </Box>
    </Modal>
  );
};

export default FileRenameModal;

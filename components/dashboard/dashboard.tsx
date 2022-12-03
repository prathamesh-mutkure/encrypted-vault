import { Container, IconButton, List } from "@mui/material";
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

interface HomeProps {}

const Dashboard: React.FC<HomeProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const files = useSelector((state: RootState) => state.files.files);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fileToRename, setFileToRename] = useState<any | null>(null);

  useEffect(() => {
    // dispatch(getAllFiles());
  }, [dispatch]);

  const onDeleteClick = (id: String) => {
    dispatch(deleteFile(id));
  };

  const onRenameClick = (file: any) => {
    setFileToRename(file);
    setIsOpen(true);
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
        isOpen={isUploadModalOpen}
        handleClose={closeUploadModal}
      />

      <Container maxWidth="md" className={classes.HomeContainer}>
        <List>
          {files.map((file: any) => {
            return (
              <FileListItem
                filename={file.filename}
                id={file._id}
                onDelete={onDeleteClick}
                onRename={() => onRenameClick(file)}
              />
            );
          })}
        </List>
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

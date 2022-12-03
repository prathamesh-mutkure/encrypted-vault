import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import {
  Avatar,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Endpoints } from "../../constants/endpoints";

interface FileListItemProps {
  filename: String;
  id: String;
  onDelete: (id: String) => void;
  onRename: (id: String) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({
  filename,
  id,
  onDelete,
  onRename,
}) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <Link
            href={`${Endpoints.backendUrl}${Endpoints.getFile}/${id}`}
            target="_blank"
            download={true}
            style={{ textDecoration: "none", padding: "0", margin: "0" }}
            rel="noreferrer"
          >
            <IconButton
              style={{ marginLeft: "1rem" }}
              edge="end"
              aria-label="download"
            >
              <DownloadRoundedIcon />
            </IconButton>
          </Link>
          <IconButton
            style={{ marginLeft: "1rem" }}
            edge="end"
            aria-label="edit"
            onClick={() => onRename(id)}
          >
            <EditRoundedIcon />
          </IconButton>
          <IconButton
            style={{ marginLeft: "1rem" }}
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={filename} />
    </ListItem>
  );
};

export default FileListItem;

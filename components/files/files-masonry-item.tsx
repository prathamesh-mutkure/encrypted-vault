/* eslint-disable @next/next/no-img-element */
import { Paper, styled } from "@mui/material";
import React from "react";

interface MasonryImageProps {
  filename: string;
  url: string;
  onDelete: (id: String) => void;
  onRename: (id: String) => void;
}

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const MasonryImage: React.FC<MasonryImageProps> = ({
  filename,
  url,
  onDelete,
  onRename,
}) => {
  return (
    <div>
      <img
        src={url}
        // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
        alt={filename}
        loading="lazy"
        style={{
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          display: "block",
          width: "100%",
          // maxWidth: "25%",
          height: "auto",
        }}
      />
      <Label>{filename}</Label>
    </div>
  );
};

export default MasonryImage;

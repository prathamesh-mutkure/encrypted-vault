/* eslint-disable @next/next/no-img-element */
import { Button, Paper, Stack, styled } from "@mui/material";
import React from "react";

interface MasonryImageProps {
  filename: string;
  url: string;
  onDownload: () => void;
  onDecrypt: () => void;
}

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 3,
  boxShadow: "none",
  border: "solid 1px #F5F5F5",
}));

const MasonryImage: React.FC<MasonryImageProps> = ({
  filename,
  url,
  onDownload,
  onDecrypt,
}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        padding: "1rem",
        borderRadius: "4px",
      }}
    >
      <Stack direction="column" spacing={1}>
        <img
          src={url}
          // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
          alt={filename}
          loading="lazy"
          style={{
            borderRadius: 4,
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
        <Label>{filename}</Label>
        <Stack direction="row" spacing={5} justifyContent="center">
          <a href={url} target="_blank" rel="noreferrer">
            <Button
              variant="contained"
              size="small"
              onClick={() => onDownload()}
            >
              Download
            </Button>
          </a>
          <Button variant="contained" size="small" onClick={() => onDecrypt()}>
            Decrypt
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default MasonryImage;

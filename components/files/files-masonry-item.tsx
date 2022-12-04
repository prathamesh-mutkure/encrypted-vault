import React from "react";

interface MasonryImageProps {
  filename: string;
  url: string;
  onDelete: (id: String) => void;
  onRename: (id: String) => void;
}

const MasonryImage: React.FC<MasonryImageProps> = ({
  filename,
  url,
  onDelete,
  onRename,
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
      alt={filename}
      loading="lazy"
      style={{
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        display: "block",
        width: "100%",
        maxWidth: "25%",
        height: "auto",
      }}
    />
  );
};

export default MasonryImage;

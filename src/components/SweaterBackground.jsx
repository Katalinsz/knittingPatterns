import React from "react";
import { Image as KonvaImage } from "react-konva";

const SweaterBackground = ({
  sweaterBounds,
  sweaterSize,
  scale,
  sweaterImage,
}) => {
  return (
    <KonvaImage
      image={sweaterImage}
      x={sweaterBounds.left}
      y={sweaterBounds.top}
      width={sweaterSize.width * scale}
      height={sweaterSize.height * scale}
      listening={false}
    />
  );
};

export default SweaterBackground;

import React, { useRef, useEffect } from "react";
import { Image as KonvaImage, Transformer, Text, Rect } from "react-konva";
import { enforceBoundaries } from "../utils/sweaterUtils";

const MotifElement = ({
  motif,
  isSelected,
  onSelect,
  onChange,
  sweaterBounds,
}) => {
  const imageRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragMove = () => {
    const node = imageRef.current;
    if (!node) return;

    const newX = Math.max(
      sweaterBounds.left,
      Math.min(sweaterBounds.right - node.width(), node.x())
    );
    const newY = Math.max(
      sweaterBounds.top,
      Math.min(sweaterBounds.bottom - node.height(), node.y())
    );

    node.position({ x: newX, y: newY });
  };

  const handleDragEnd = (e) => {
    const constrained = enforceBoundaries(
      {
        ...motif,
        x: e.target.x(),
        y: e.target.y(),
      },
      sweaterBounds
    );
    onChange(constrained);
  };

  return (
    <>
      <KonvaImage
        ref={imageRef}
        image={motif.image}
        x={motif.x}
        y={motif.y}
        width={motif.width}
        height={motif.height}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />

      {motif.stitches && (
        <Text
          x={motif.x}
          y={motif.y + motif.height + 6}
          text={`${motif.stitches.cols} × ${motif.stitches.rows}`}
          fontSize={13}
          fill="#1F2937"
          fontStyle="bold"
          listening={false}
        />
      )}

      {isSelected && (
        <>
          <Rect
            x={motif.x - 2}
            y={motif.y - 2}
            width={motif.width + 4}
            height={motif.height + 4}
            stroke="#4F46E5"
            strokeWidth={3}
            dash={[8, 4]}
            listening={false}
          />
          <Transformer
            ref={transformerRef}
            enabledAnchors={[]}
            borderEnabled={false}
          />
        </>
      )}
    </>
  );
};

export default MotifElement;

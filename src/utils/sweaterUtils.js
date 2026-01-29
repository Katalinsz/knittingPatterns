import { STITCH_SIZE } from "../constants/sweaterConstants";

export const calculateStitches = (width, height, stitchSize = STITCH_SIZE) => {
  const cols = Math.round(width / stitchSize);
  const rows = Math.round(height / stitchSize);
  return { cols, rows };
};

export const enforceBoundaries = (attrs, bounds) => {
  const { x, y, width, height } = attrs;
  const { left, top, right, bottom } = bounds;

  return {
    ...attrs,
    x: Math.max(left, Math.min(right - width, x)),
    y: Math.max(top, Math.min(bottom - height, y)),
  };
};

export const calculateSweaterBounds = (
  sweaterSize,
  scale,
  stageWidth,
  stageHeight
) => {
  const sweaterWidth = sweaterSize.width * scale;
  const sweaterHeight = sweaterSize.height * scale;

  const offsetX = (stageWidth - sweaterWidth) / 2;
  const offsetY = (stageHeight - sweaterHeight) / 2;

  return {
    left: offsetX,
    top: offsetY,
    right: offsetX + sweaterWidth,
    bottom: offsetY + sweaterHeight,
  };
};

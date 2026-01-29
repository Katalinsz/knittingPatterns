import { useState, useEffect } from "react";
import {
  PRESET_SIZES,
  STAGE_WIDTH,
  STAGE_HEIGHT,
} from "../constants/sweaterConstants";
import {
  calculateStitches,
  enforceBoundaries,
  calculateSweaterBounds,
} from "../utils/sweaterUtils";

export const useSweaterDesigner = () => {
  const [placedMotifs, setPlacedMotifs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [sweaterSize, setSweaterSize] = useState(PRESET_SIZES.M);
  const [scale, setScale] = useState(1);
  const [sweaterBounds, setSweaterBounds] = useState({
    left: 50,
    top: 100,
    right: 550,
    bottom: 700,
  });
  // Bounds for the restricted body area
  const [designBounds, setDesignBounds] = useState({
    left: 150,
    top: 100,
    right: 450,
    bottom: 700,
  });

  // Calculate sweater bounds based on size and scale
  useEffect(() => {
    const bounds = calculateSweaterBounds(
      sweaterSize,
      scale,
      STAGE_WIDTH,
      STAGE_HEIGHT
    );
    setSweaterBounds(bounds);

    // Calculate restricted body bounds (assuming body is central 50% of width)
    const totalWidth = bounds.right - bounds.left;
    const bodyWidth = totalWidth * 0.5;
    const marginX = (totalWidth - bodyWidth) / 2;

    setDesignBounds({
      left: bounds.left + marginX,
      top: bounds.top, // Could add top margin for neck if needed
      right: bounds.right - marginX,
      bottom: bounds.bottom,
    });
  }, [sweaterSize, scale]);

  // Handle preset size change
  const handlePresetSize = (sizeKey) => {
    setSweaterSize(PRESET_SIZES[sizeKey]);
  };

  // Add motif to canvas
  const addMotifToCanvas = (imageUrl) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const id = `motif-${Date.now()}`;
      // Center in design bounds
      const centerX = (designBounds.left + designBounds.right) / 2;
      const centerY = (designBounds.top + designBounds.bottom) / 2;
      const width = 100;
      const height = 100;
      const stitches = calculateStitches(width, height);

      setPlacedMotifs((prev) => [
        ...prev,
        {
          id,
          image: img,
          x: centerX - width / 2,
          y: centerY - height / 2,
          width,
          height,
          stitches,
        },
      ]);
      setSelectedId(id);
    };

    img.onerror = () => {
      console.error("Failed to load motif image:", imageUrl);
      const placeholderUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23E5E7EB' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='14' fill='%239CA3AF' text-anchor='middle' dominant-baseline='middle'%3EMotif%3C/text%3E%3C/svg%3E`;
      const fallbackImg = new window.Image();
      fallbackImg.src = placeholderUrl;

      fallbackImg.onload = () => {
        const id = `motif-${Date.now()}`;
        const centerX = (designBounds.left + designBounds.right) / 2;
        const centerY = (designBounds.top + designBounds.bottom) / 2;
        const width = 100;
        const height = 100;
        const stitches = calculateStitches(width, height);

        setPlacedMotifs((prev) => [
          ...prev,
          {
            id,
            image: fallbackImg,
            x: centerX - width / 2,
            y: centerY - height / 2,
            width,
            height,
            stitches,
          },
        ]);
        setSelectedId(id);
      };
    };
  };

  // Update motif size via slider
  const updateMotifSize = (newSize) => {
    if (!selectedId) return;

    setPlacedMotifs((prev) =>
      prev.map((motif) => {
        if (motif.id === selectedId) {
          const stitches = calculateStitches(newSize, newSize);
          const centerX = motif.x + motif.width / 2;
          const centerY = motif.y + motif.height / 2;

          const newAttrs = {
            ...motif,
            width: newSize,
            height: newSize,
            x: centerX - newSize / 2,
            y: centerY - newSize / 2,
            stitches,
          };

          return enforceBoundaries(newAttrs, designBounds);
        }
        return motif;
      })
    );
  };

  // Handle motif changes (dragging)
  const handleMotifChange = (updatedMotif) => {
    // Enforce design bounds during drag/update
    // Note: MotifElement usually handles drag end enforcement, but we should make sure
    // the updatedMotif passed here respects it.
    // However, MotifElement calls onChange with `constrained`.
    // We just update state.
    setPlacedMotifs((prev) =>
      prev.map((m) => (m.id === updatedMotif.id ? updatedMotif : m))
    );
  };

  // Delete selected motif on keyboard event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        setPlacedMotifs((prev) =>
          prev.filter((motif) => motif.id !== selectedId)
        );
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const selectedMotif = placedMotifs.find((m) => m.id === selectedId);

  return {
    placedMotifs,
    selectedId,
    sweaterSize,
    scale,
    sweaterBounds, // Full image bounds
    designBounds,  // Restricted body bounds
    selectedMotif,
    setSelectedId,
    setScale,
    handlePresetSize,
    addMotifToCanvas,
    updateMotifSize,
    handleMotifChange,
  };
};

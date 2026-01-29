import React from "react";

const MotifSizeSlider = ({ selectedMotif, onSizeChange }) => {
  if (!selectedMotif) return null;

  return (
    <div className="mb-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-indigo-900">
          Selected Motif Size
        </h3>
        <span className="text-sm font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
          {Math.round(selectedMotif.width)}px
        </span>
      </div>
      <input
        type="range"
        min="50"
        max="300"
        step="5"
        value={selectedMotif.width}
        onChange={(e) => onSizeChange(parseFloat(e.target.value))}
        className="w-full h-2.5 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-indigo-700 font-medium">
          Stitches: {selectedMotif.stitches.cols} ×{" "}
          {selectedMotif.stitches.rows}
        </span>
        <span className="text-indigo-600">
          Total: {selectedMotif.stitches.cols * selectedMotif.stitches.rows}
        </span>
      </div>
    </div>
  );
};

export default MotifSizeSlider;

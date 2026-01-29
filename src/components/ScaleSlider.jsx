import React from "react";

const ScaleSlider = ({ scale, onScaleChange }) => {
  return (
    <div className="w-full md:w-1/2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Canvas Scale</h3>
        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {Math.round(scale * 100)}%
        </span>
      </div>
      <input
        type="range"
        min="0.5"
        max="1.5"
        step="0.01"
        value={scale}
        onChange={(e) => onScaleChange(parseFloat(e.target.value))}
        className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};

export default ScaleSlider;

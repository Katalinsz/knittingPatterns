import React from "react";
import { PRESET_SIZES } from "../constants/sweaterConstants";

const SizeSelector = ({ currentSize, onSizeChange }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Sweater Size</h3>
      <div className="flex space-x-2">
        {Object.keys(PRESET_SIZES).map((sizeKey) => (
          <button
            key={sizeKey}
            onClick={() => onSizeChange(sizeKey)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentSize.width === PRESET_SIZES[sizeKey].width
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            {sizeKey}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;

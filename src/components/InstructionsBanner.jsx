import React from "react";

const InstructionsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow-sm">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="text-sm text-blue-800 font-medium mb-1">How to use:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click a motif to select it</li>
            <li>• Drag to move (stays within sweater bounds)</li>
            <li>• Use slider to resize selected motif</li>
            <li>• Press Delete/Backspace to remove</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructionsBanner;

import React, { useState } from "react";

const MotifCard = ({ motif, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="border-2 border-gray-200 rounded-xl cursor-pointer p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 bg-white group active:scale-95"
      onClick={() => onClick(motif.imageUrl)}
    >
      <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden mb-3 relative">
        {!imgError ? (
          <img
            src={motif.imageUrl}
            alt={motif.title}
            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-200"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="text-gray-400 text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">{motif.title}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-700 text-center font-semibold truncate group-hover:text-indigo-600 transition-colors">
        {motif.title}
      </p>
    </div>
  );
};

export default MotifCard;

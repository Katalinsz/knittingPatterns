import React from "react";
import MotifCard from "./MotifCard";

const MotifGallery = ({ motifs, onMotifClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
        Motif Library
      </h2>
      <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {motifs.map((motif) => (
          <MotifCard key={motif.id} motif={motif} onClick={onMotifClick} />
        ))}
      </div>
    </div>
  );
};

export default MotifGallery;

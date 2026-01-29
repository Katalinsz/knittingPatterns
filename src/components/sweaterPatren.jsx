import React from "react";
import { Stage, Layer } from "react-konva";
import useImage from "use-image";
import { useSweaterDesigner } from "../hooks/useSweaterDesigner";
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  STITCH_SIZE,
  LOCAL_MOTIFS,
  PLACEHOLDER_SWEATER,
} from "../constants/sweaterConstants";
import MotifElement from "./MotifElement";
import SweaterBackground from "./SweaterBackground";
import SizeSelector from "./SizeSelector";
import InstructionsBanner from "./InstructionsBanner";
import MotifGallery from "./MotifGallery";
import EmptyMotifState from "./EmptyMotifState";
import sweaterSrc from "../assets/simpleSweater.png";

const SweaterDesigner = () => {
  const [sweaterImg] = useImage(sweaterSrc);

  const {
    placedMotifs,
    selectedId,
    sweaterSize,
    scale,
    sweaterBounds,
    designBounds,
    selectedMotif,
    setSelectedId,
    setScale,
    handlePresetSize,
    addMotifToCanvas,
    updateMotifSize,
    handleMotifChange,
  } = useSweaterDesigner();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Sweater Designer Studio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Design your custom sweater with precision. Add motifs, position them
            perfectly, and see real-time stitch calculations.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Canvas Area */}
          <div className="lg:w-3/4 bg-white rounded-3xl shadow-2xl p-8">
            {/* Controls */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <SizeSelector
                  currentSize={sweaterSize}
                  onSizeChange={handlePresetSize}
                />
              </div>

              <InstructionsBanner />
            </div>

            {/* Canvas */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 flex justify-center items-center shadow-inner">
              <Stage
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                onMouseDown={(e) => {
                  if (e.target === e.target.getStage()) {
                    setSelectedId(null);
                  }
                }}
                className="shadow-2xl rounded-xl overflow-hidden bg-white"
              >
                {/* Layer 1: Sweater Background */}
                <Layer>
                  <SweaterBackground
                    sweaterBounds={sweaterBounds}
                    sweaterSize={sweaterSize}
                    scale={scale}
                    sweaterImage={sweaterImg}
                  />
                </Layer>

                {/* Layer 2: Grid Overlay - REMOVED */}
                


                {/* Layer 3: Motifs */}
                <Layer>
                  {placedMotifs.map((motif) => (
                    <MotifElement
                      key={motif.id}
                      motif={motif}
                      isSelected={motif.id === selectedId}
                      onSelect={() => setSelectedId(motif.id)}
                      onChange={handleMotifChange}
                      sweaterBounds={designBounds}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>

          {/* Motif Gallery Sidebar */}
          <aside className="lg:w-1/4">
            {LOCAL_MOTIFS.length > 0 ? (
              <MotifGallery
                motifs={LOCAL_MOTIFS}
                onMotifClick={addMotifToCanvas}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <EmptyMotifState />
              </div>
            )}
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-block bg-white rounded-full shadow-md px-8 py-4">
            <p className="text-sm text-gray-600 font-medium">
              💡 <span className="font-semibold">Pro Tip:</span> Motifs
              automatically center when added • Grid shows every {STITCH_SIZE}px
              = 1 stitch
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SweaterDesigner;

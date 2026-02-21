import { useState, useRef, useEffect } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from './components/Header/Header';
import ClothingPreview from './components/ClothingPreview/ClothingPreview';
import Controls from './components/Controls/Controls';
import InfoSection from './components/InfoSection/InfoSection';
import InfoModal from './components/Modal/InfoModal';
import DocumentIcon from './assets/Logos/DocumentIcon.svg?react';
import { useMotifData } from './hooks/useMotifData';
import { usePatternCalculation } from './hooks/usePatternCalculation';
import { SWEATER_SIZES } from './constants/patternSizes';

function App() {
  const [knittingTensionMin, setKnittingTensionMin] = useState(18)
  const [knittingTensionMax, setKnittingTensionMax] = useState(32)
  const [chestSize, setChestSize] = useState(2) // 0-5 for sweater sizes
  const [sizeMin, setSizeMin] = useState(60) // Baby blanket width (or hat circumference)
  const [sizeMax, setSizeMax] = useState(80) // Baby blanket height
  const [activeModal, setActiveModal] = useState<'tension' | 'chest' | 'motifError' | null>(null)
  const [motifErrorMessage, setMotifErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [motifPositions, setMotifPositions] = useState<{ id: string; bottomRightXCm: number; bottomRightYCm: number }[]>([])

  // Track previous valid values for reverting on error
  const previousValues = useRef({ tensionMin: 18, tensionMax: 32, sizeMin: 60, sizeMax: 80 })

  // Fixed tension range for all patterns
  const tensionRange = { min: 8, max: 40 };

  // --- Hooks ---
  const { currentPattern, motifId, motifImageUrl, motifDimensions } = useMotifData()

  const { accordionSections, motifSize, blanketDimensions, calculate } = usePatternCalculation({
    currentPattern,
    loading,
    knittingTensionMin,
    knittingTensionMax,
    sizeMin,
    sizeMax,
    chestSize,
    motifDimensions,
    motifPositions,
    onError: (message) => {
      setMotifErrorMessage(message)
      setActiveModal('motifError')
    },
    onRevert: () => {
      setKnittingTensionMin(previousValues.current.tensionMin)
      setKnittingTensionMax(previousValues.current.tensionMax)
      setSizeMin(previousValues.current.sizeMin)
      setSizeMax(previousValues.current.sizeMax)
    },
  })

  // Load .pat file and run initial calculation whenever the pattern type changes
  useEffect(() => {
    const loadPattern = async () => {
      try {
        setLoading(true);
        // Reset size slider to a sensible default when switching patterns
        if (currentPattern === 'Hat') setSizeMin(56);
        else if (currentPattern === 'BabyBlanket') setSizeMin(60);

        // Trigger initial calculation for the new pattern type
        const type = currentPattern === 'BabyBlanket' ? 'blanket'
          : currentPattern === 'Hat' ? 'hat'
          : 'sweater';
        await calculate(type);
      } catch (error) {
        console.error('Failed to load pattern:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPattern();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPattern]);

  // Info Section Scroll Logic
  const [showInfoSection, setShowInfoSection] = useState(false)
  const [isInInfoSection, setIsInInfoSection] = useState(false)
  const infoSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Logic: if intersecting (visible) OR if the top of the element is above the viewport (scrolled past),
        // we consider the user "in" the section or past it?
        // Original logic: rect.top <= window.innerHeight / 2.
        // This means if the top of the section is in the top-half of the viewport or above it.

        // IntersectionObserver alone tells if *any* part is visible.
        // To match "scrolled past or into":
        // We can observe a sentinel or the section itself with threshold.

        // Let's stick to a simpler check inside the observer callback or use the entry data.
        // If we want to replicate specifically "top <= window.innerHeight/2":
        // We can check entry.boundingClientRect.top.

        if (entry) {
          setIsInInfoSection(entry.isIntersecting || entry.boundingClientRect.top < 0);
        }
      },
      {
        rootMargin: '-50% 0px 0px 0px' // This roughly emulates the "top <= innerHeight / 2" trigger point
      }
    );

    if (showInfoSection && infoSectionRef.current) {
      observer.observe(infoSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showInfoSection]); // Re-run if showInfoSection changes effectively enabling the check

  const scrollToInfo = () => {
    if (isInInfoSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowInfoSection(true);
      // Small timeout to allow render before scroll
      setTimeout(() => {
        infoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <p>Loading pattern...</p>
        </div>
      </div>
    );
  }

  const isBabyBlanket = currentPattern === 'BabyBlanket';
  const isHat = currentPattern === 'Hat';
  const sizeRange = isBabyBlanket 
    ? { min: 60, max: 140, step: 10 }
    : isHat
    ? { min: 10, max: 60, step: 5 }
    : { min: 0, max: 5, step: 1 };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="left-section">
          <ClothingPreview 
            blanketDimensions={blanketDimensions} 
            motifSize={motifSize}
            motifDimensions={motifDimensions}
            motifImageUrl={motifImageUrl}
            hatDimensions={isHat ? { circumference: sizeMin, height: Math.round(sizeMin / 2 - 4) } : null}
            garmentDimsCm={
              isBabyBlanket ? blanketDimensions
              : isHat ? { width: sizeMin, height: Math.round(sizeMin / 2 - 4) }
              : { width: SWEATER_SIZES[chestSize]?.bodyWidth ?? 56, height: SWEATER_SIZES[chestSize]?.bodyLength ?? 70 }
            }
            onMotifPositionsChange={setMotifPositions}
            onMotifsCannotFit={() => {
              // Revert to previous valid values
              setKnittingTensionMin(previousValues.current.tensionMin);
              setKnittingTensionMax(previousValues.current.tensionMax);
              setSizeMin(previousValues.current.sizeMin);
              setSizeMax(previousValues.current.sizeMax);
            }}
            onMotifsUpdatedSuccessfully={() => {
              // Only update previous values after confirming motifs fit successfully
              previousValues.current = {
                tensionMin: knittingTensionMin,
                tensionMax: knittingTensionMax,
                sizeMin: sizeMin,
                sizeMax: sizeMax
              };
            }}
          />
        </div>

        <div className="right-section">
          <Controls
            tensionMin={knittingTensionMin}
            setTensionMin={setKnittingTensionMin}
            tensionMax={knittingTensionMax}
            setTensionMax={setKnittingTensionMax}
            chestSize={chestSize}
            setChestSize={setChestSize}
            sizeMin={sizeMin}
            setSizeMin={setSizeMin}
            sizeMax={sizeMax}
            setSizeMax={setSizeMax}
            onOpenInfo={setActiveModal}
            tensionRange={tensionRange}
            sizeRange={sizeRange}
            isBabyBlanket={isBabyBlanket}
            isHat={isHat}
          />
        </div>
      </main>

      {/* Preview Instructions Button */}
      <button
        className={`info-scroll-button ${isInInfoSection ? 'active' : ''}`}
        onClick={scrollToInfo}
        title={isInInfoSection ? "Back to top" : "View detailed information"}
      >
        <span>Preview instructions</span>
        <DocumentIcon className="info-doc-icon" />
      </button>

      {/* Detailed Information Section */}
      {showInfoSection && (
        <InfoSection 
          ref={infoSectionRef} 
          showFloatingButtons={isInInfoSection}
          accordionSections={accordionSections}
          isBabyBlanket={isBabyBlanket}
          hasMotif={motifImageUrl !== null}
          motifId={motifId}
          onScrollToInfo={scrollToInfo}
        />
      )}

      {/* Info Modals */}
      <InfoModal
        isOpen={activeModal === 'tension'}
        onClose={() => setActiveModal(null)}
        title="Knitting tension"
      >
        <h3>How does it work?</h3>
        <p>By pulling the handles above, you change the knitting tension.</p>
        <p>In the preview image, you will see how much the size of the motif in the middle changes. The knitting pattern is recalculated depending on the selected knitting tension.</p>
        <p>Be sure to choose a yarn tension that reproduces the motif in the desired size.</p>
      </InfoModal>

      <InfoModal
        isOpen={activeModal === 'chest'}
        onClose={() => setActiveModal(null)}
        title={isBabyBlanket ? "Size" : "Chest / Bust"}
      >
        <h3>How does it work?</h3>
        {isBabyBlanket ? (
          <>
            <p>By pulling the handles above, you can adjust the width and height of your baby blanket.</p>
            <p>The left handle controls the width, and the right handle controls the height.</p>
            <p>The pattern will automatically adjust to fit your selected dimensions.</p>
          </>
        ) : (
          <>
            <p>By moving the slider, you can select the desired chest/bust size for your garment.</p>
            <p>The pattern will automatically adjust to fit the selected size, ensuring a perfect fit.</p>
            <p>Choose the size that best matches your measurements for optimal results.</p>
          </>
        )}
      </InfoModal>

      <InfoModal
        isOpen={activeModal === 'motifError'}
        onClose={() => setActiveModal(null)}
        title="Motif Size Error"
        className="error-modal"
      >
        <h3>Motif too large</h3>
        <p>{motifErrorMessage}</p>
        <p>The settings have been reverted to the previous valid configuration. Please try adjusting to smaller dimensions or looser tension.</p>
      </InfoModal>
    </div>
  )
}

export default App

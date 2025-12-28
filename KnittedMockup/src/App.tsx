import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [knittingTensionMin, setKnittingTensionMin] = useState(19)
  const [knittingTensionMax, setKnittingTensionMax] = useState(20)
  const [chestSize, setChestSize] = useState(2) // 0-4 for XS, S, M, L, XL
  const [isClothingDropdownOpen, setIsClothingDropdownOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<'tension' | 'chest' | null>(null)
  const [showInfoSection, setShowInfoSection] = useState(false)
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set())
  const [isInInfoSection, setIsInInfoSection] = useState(false)
  const infoSectionRef = useRef<HTMLDivElement>(null)

  const sizes = ['Woman XXS', 'Woman XS', 'Woman S', 'Woman M', 'Woman L', 'Woman XL']
  const tensionValues = [17, 18, 19, 20, 21, 22, 23]

  useEffect(() => {
    const handleScroll = () => {
      if (infoSectionRef.current) {
        const rect = infoSectionRef.current.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight / 2
        setIsInInfoSection(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showInfoSection])

  const scrollToInfo = () => {
    if (isInInfoSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setShowInfoSection(true)
      setTimeout(() => {
        infoSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const toggleAccordion = (index: number) => {
    const newOpenAccordions = new Set<number>()
    if (!openAccordions.has(index)) {
      newOpenAccordions.add(index)
    }
    setOpenAccordions(newOpenAccordions)
  }

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <img src="/IconsImages/ImageIcon.png" alt="Logo" className="logo-icon" />
        </div>
        <nav className="topbar-nav">
          <button className="nav-button">
            <span>Contact</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>
          <button className="nav-button">
            <span>Library</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </button>
          <button className="nav-button">
            <span>Create</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </nav>
        <div className="topbar-right">
          <button className="profile-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="8" r="3"/>
              <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Section */}
        <div className="left-section">
          <div className="clothing-dropdown">
            <button 
              className="dropdown-button"
              onClick={() => setIsClothingDropdownOpen(!isClothingDropdownOpen)}
            >
              Clothing
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className={isClothingDropdownOpen ? 'rotated' : ''}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            
            {isClothingDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">
                  <div className="dropdown-item-content">
                    <img src="/IconsImages/WhoolHatIcon.png" alt="Hats" />
                    <span>Hats</span>
                  </div>
                  <span className="dropdown-item-arrow">›</span>
                </button>
                <button className="dropdown-item">
                  <div className="dropdown-item-content">
                    <img src="/IconsImages/ScarfIcon.png" alt="Scarfs" />
                    <span>Scarfs</span>
                  </div>
                  <span className="dropdown-item-arrow">›</span>
                </button>
                <button className="dropdown-item">
                  <div className="dropdown-item-content">
                    <img src="/IconsImages/SweaterIcon.png" alt="Sweaters" />
                    <span>Sweaters</span>
                  </div>
                  <span className="dropdown-item-arrow">›</span>
                </button>
                <button className="dropdown-item">
                  <div className="dropdown-item-content">
                    <img src="/IconsImages/MittensIcon.png" alt="Mittens" />
                    <span>Mittens</span>
                  </div>
                  <span className="dropdown-item-arrow">›</span>
                </button>
                <button className="dropdown-item">
                  <div className="dropdown-item-content">
                    <img src="/IconsImages/BagIcon.png" alt="Bags" />
                    <span>Bags</span>
                  </div>
                  <span className="dropdown-item-arrow">›</span>
                </button>
              </div>
            )}
          </div>

          <div className={`sweater-preview ${isClothingDropdownOpen ? 'dropdown-open' : ''}`}>
            <div className="sweater-container">
              <img src="/IconsImages/SweaterPreviewIcon.png" alt="Sweater Preview" className="sweater-base" />
              <img src="/IconsImages/ImageIcon.png" alt="Motif" className="motif-overlay" />
            </div>
            <div className="motif-size">
              <label>Motif size</label>
              <div className="size-display">46.2 × 54.6</div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="control-group">
            <div className="control-header">
              <label>
                Knitting tension
                <button 
                  className="info-button" 
                  title="Information about knitting tension"
                  onClick={() => setActiveModal('tension')}
                >?</button>
              </label>
              <div className="value-display">{knittingTensionMin} × {knittingTensionMax}</div>
            </div>
            <div className="dual-slider-container">
              <input 
                type="range" 
                min="0" 
                max="6" 
                value={tensionValues.indexOf(knittingTensionMin)}
                onChange={(e) => {
                  const newMin = tensionValues[parseInt(e.target.value)];
                  if (newMin <= knittingTensionMax) {
                    setKnittingTensionMin(newMin);
                  }
                }}
                className="slider slider-min"
              />
              <input 
                type="range" 
                min="0" 
                max="6" 
                value={tensionValues.indexOf(knittingTensionMax)}
                onChange={(e) => {
                  const newMax = tensionValues[parseInt(e.target.value)];
                  if (newMax >= knittingTensionMin) {
                    setKnittingTensionMax(newMax);
                  }
                }}
                className="slider slider-max"
              />
            </div>
          </div>

          <div className="control-group">
            <div className="control-header">
              <label>
                Chest / Bust
                <button 
                  className="info-button" 
                  title="Information about chest/bust sizing"
                  onClick={() => setActiveModal('chest')}
                >?</button>
              </label>
              <div className="value-display">{sizes[chestSize]}</div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5" 
              value={chestSize}
              onChange={(e) => setChestSize(parseInt(e.target.value))}
              className="slider"
            />
          </div>
        </div>
      </main>

      {/* Info Button */}
      <button className="info-scroll-button" onClick={scrollToInfo} title={isInInfoSection ? "Back to top" : "View detailed information"}>
        <div className="info-icon-circle">
          <img 
            src={isInInfoSection ? "/IconsImages/EditIcon.png" : "/IconsImages/InformationIcon.png"} 
            alt={isInInfoSection ? "Edit" : "Info"} 
            className="info-icon-img"
          />
        </div>
        <svg className="arrow-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          {isInInfoSection ? (
            <>
              <line x1="12" y1="19" x2="12" y2="5"/>
              <polyline points="5 12 12 5 19 12"/>
            </>
          ) : (
            <>
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </>
          )}
        </svg>
      </button>

      {/* Detailed Information Section */}
      {showInfoSection && (
        <section ref={infoSectionRef} className="info-section">
          <div className="instructions-header">
            <h2>Knitting instructions</h2>
            <p className="instructions-subtitle">Precise instructions about how to knit your motifs</p>
          </div>
          
          <div className="instructions-grid">
            <button 
              className={`instruction-dropdown-btn ${openAccordions.has(0) ? 'active' : ''}`}
              onClick={() => toggleAccordion(0)}
            >
              <span>Size</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            
            <button 
              className={`instruction-dropdown-btn ${openAccordions.has(1) ? 'active' : ''}`}
              onClick={() => toggleAccordion(1)}
            >
              <span>Backside</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            
            <button 
              className={`instruction-dropdown-btn ${openAccordions.has(2) ? 'active' : ''}`}
              onClick={() => toggleAccordion(2)}
            >
              <span>Fronside</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          <div className="instructions-grid-bottom">
            <button 
              className={`instruction-dropdown-btn ${openAccordions.has(3) ? 'active' : ''}`}
              onClick={() => toggleAccordion(3)}
            >
              <span>Arms</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            
            <button 
              className={`instruction-dropdown-btn ${openAccordions.has(4) ? 'active' : ''}`}
              onClick={() => toggleAccordion(4)}
            >
              <span>Neckline</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          {/* Dropdown Content Areas */}
          {openAccordions.has(0) && (
            <div className="instruction-content">
              <h3>Yarn Tension & Measurements</h3>
              <p>The width of the cardigan is 11 stitches × 38 rows on 10×10cm.<br/>
              Be careful to choose the right yarn and needles to get this yarn tension.</p>
              <ul>
                <li>The width of the sweater is 52 cm.</li>
                <li>The length of the sweater is 67 cm.</li>
                <li>The length of the arms from the armhole is 52 cm.</li>
                <li>The width of the sleeves at the cuff is 20 cm.</li>
                <li>The width of the sleeves at the top is 36 cm.</li>
                <li>The width of the neck is 14 cm.</li>
                <li>The depth of the neck is 8 cm.</li>
                <li>Wrist ribbing: 5 cm.</li>
                <li>Armhole length 22 cm.</li>
              </ul>
            </div>
          )}

          {openAccordions.has(1) && (
            <div className="instruction-content">
              <h3>Back Side Instructions</h3>
              <p>Cast on 57 stitches and knit 19 rows wrist, p1 k1.<br/>
              Knit 152 rows in stockinette.<br/>
              Work the armholes and the neckline based on the instructions below.</p>
              <p>Decrease 5 stitches at the beginning and the end of the next row.<br/>
              Decrease 1 stitch at the beginning and the end of every 4th row 2 times.<br/>
              Knit 56 rows. Move 10 stitches from the middle to a stitch holder.</p>
              <p>Knit each side of the neckline separately.<br/>
              Cast off 1 stitch/stitches every 4th row 5 times. Cast off.<br/>
              Work the same on the other side of the neckline.</p>
            </div>
          )}

          {openAccordions.has(2) && (
            <div className="instruction-content">
              <h3>Front Side Instructions</h3>
              <p>Cast on 57 stitches and knit 19 rows wrist, 1a, 1r.<br/>
              Knit 11 rows in stockinette.</p>
              <p>Work according to your chosen motif in the middle of the garment. Knit 141 rows.<br/>
              You have now reached the armhole. Cast off 5 stitches. Knit 47 stitches and cast off 5 stitches.</p>
              <p>Decrease 1 stitch at the armhole in every 4th row 2 times.<br/>
              Knit 37 rows. Now you will knit the neckline. Move 10 stitches from the middle to a stitch holder. Knit each side of the neckline separately.</p>
              <p>Decrease 1 stitch at the neck every 8th row 5 times.<br/>
              Cast off remaining stitches.<br/>
              Work the same on the other side of the neckline.</p>
            </div>
          )}

          {openAccordions.has(3) && (
            <div className="instruction-content">
              <h3>Arms Instructions</h3>
              <p>Cast on 22 stitches and knit 19 rows wrist, 1a, 1r.<br/>
              Knit in stockinette increasing 1 at the beginning and end of each 20th row 9 times.</p>
              <p>Shape the sleeve cap according to the instructions below:</p>
              <ul>
                <li>Decrease 5 stitches at the beginning and the end of the next row.</li>
                <li>Decrease 1 stitch at the beginning and the end of every 4th row 2 times.</li>
                <li>Decrease 1 stitch at the beginning and the end of every 6th row 7 times.</li>
                <li>Decrease 1 stitch at the beginning and the end of every 6th row 2 times.</li>
                <li>Decrease 1 stitch at the beginning and the end of every 2nd row 2 times.</li>
              </ul>
              <p>Cast off the remaining stitches. Knit the second sleeve in the same way.</p>
            </div>
          )}

          {openAccordions.has(4) && (
            <div className="instruction-content">
              <h3>Neckline Assembly</h3>
              <p>Sew the shoulder seams.</p>
              <p>Transfer the stitches from the stitch holder at the front neckline to a circular needle. Pick up 13 stitches along the right neckline edge, transfer the stitches from the back neckline, and pick up 13 stitches along the left neckline edge.</p>
              <p>Work in rib stitch around until the neckline measures 2 cm. Cast off in rib stitch.</p>
              <p>Sew together the sides of the body and the sleeves. Attach the sleeves to the armholes.</p>
            </div>
          )}

          <div className="knitting-chart-section">
            <h3>Knitting chart line by line</h3>
            <div className="chart-placeholder">
              <div className="chart-diagram">
                <svg width="100%" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="40" width="520" height="140" rx="20" stroke="#000" strokeWidth="3" fill="white"/>
                  <ellipse cx="220" cy="80" rx="60" ry="20" stroke="#000" strokeWidth="2" fill="none"/>
                  <path d="M 80 150 Q 200 100, 400 120 Q 500 130, 560 140" stroke="#000" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Modals */}
      {activeModal === 'tension' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="modal-content">
              <div className="modal-left">
                <h2>Knitting tension</h2>
                <h3>How does it work?</h3>
                <p>By pulling the handles above, you change the knitting tension.</p>
                <p>In the preview image, you will see how much the size of the motif in the middle changes. The knitting pattern of the sweater is recalculated depending on the selected knitting tension.</p>
                <p>Be sure to choose a yarn tension that reproduces the motif in the desired size.</p>
              </div>
              <div className="modal-right">
                <div className="video-placeholder">
                  <img src="/IconsImages/VideoIcon.png" alt="Video" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'chest' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="modal-content">
              <div className="modal-left">
                <h2>Chest / Bust</h2>
                <h3>How does it work?</h3>
                <p>By moving the slider, you can select the desired chest/bust size for your garment.</p>
                <p>The pattern will automatically adjust to fit the selected size, ensuring a perfect fit.</p>
                <p>Choose the size that best matches your measurements for optimal results.</p>
              </div>
              <div className="modal-right">
                <div className="video-placeholder">
                  <img src="/IconsImages/VideoIcon.png" alt="Video" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

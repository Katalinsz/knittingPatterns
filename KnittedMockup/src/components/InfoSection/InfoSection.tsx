import { useState, forwardRef } from 'react';
import './InfoSection.css';

// Data definition outside component to keep it clean
// In a real app, this might come from props or a separate data file
const ACCORDION_DATA = [
    {
        id: 0,
        title: 'Size',
        content: (
            <>
                <h3 className="content-section-title">Size calculations</h3>
                <div className="measurements-list">
                    <div className="measurement-labels">
                        <span>Sweater Width</span>
                        <span>Sweater Length</span>
                        <span>Arm Length</span>
                        <span>Sleeve Cuff</span>
                        <span>Sleeve Top</span>
                    </div>
                    <div className="measurement-values">
                        <span>59 cm</span>
                        <span>72 cm</span>
                        <span>55 cm</span>
                        <span>22 cm</span>
                        <span>41 cm</span>
                    </div>
                </div>
                <div className="measurements-list">
                    <div className="measurement-labels">
                        <span>Neck Width</span>
                        <span>Neck Depth</span>
                        <span>Wrist Ribbing</span>
                        <span>Armhole Length</span>
                        <span></span>
                    </div>
                    <div className="measurement-values">
                        <span>16 cm</span>
                        <span>9 cm</span>
                        <span>5 cm</span>
                        <span>25 cm</span>
                        <span></span>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 1,
        title: 'Backside',
        content: (
            <>
                <h3>Back Side Instructions</h3>
                <p>Cast on 57 stitches and knit 19 rows wrist, p1 k1.<br />
                    Knit 152 rows in stockinette.<br />
                    Work the armholes and the neckline based on the instructions below.</p>
                <p>Decrease 5 stitches at the beginning and the end of the next row.<br />
                    Decrease 1 stitch at the beginning and the end of every 4th row 2 times.<br />
                    Knit 56 rows. Move 10 stitches from the middle to a stitch holder.</p>
                <p>Knit each side of the neckline separately.<br />
                    Cast off 1 stitch/stitches every 4th row 5 times. Cast off.<br />
                    Work the same on the other side of the neckline.</p>
            </>
        )
    },
    {
        id: 2,
        title: 'Frontside',
        content: (
            <>
                <h3>Front Side Instructions</h3>
                <p>Cast on 57 stitches and knit 19 rows wrist, 1a, 1r.<br />
                    Knit 11 rows in stockinette.</p>
                <p>Work according to your chosen motif in the middle of the garment. Knit 141 rows.<br />
                    You have now reached the armhole. Cast off 5 stitches. Knit 47 stitches and cast off 5 stitches.</p>
                <p>Decrease 1 stitch at the armhole in every 4th row 2 times.<br />
                    Knit 37 rows. Now you will knit the neckline. Move 10 stitches from the middle to a stitch holder. Knit each side of the neckline separately.</p>
                <p>Decrease 1 stitch at the neck every 8th row 5 times.<br />
                    Cast off remaining stitches.<br />
                    Work the same on the other side of the neckline.</p>
            </>
        )
    },
    {
        id: 3,
        title: 'Arms',
        content: (
            <>
                <h3>Arms Instructions</h3>
                <p>Cast on 22 stitches and knit 19 rows wrist, 1a, 1r.<br />
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
            </>
        )
    },
    {
        id: 4,
        title: 'Neckline',
        content: (
            <>
                <h3>Neckline Assembly</h3>
                <p>Sew the shoulder seams.</p>
                <p>Transfer the stitches from the stitch holder at the front neckline to a circular needle. Pick up 13 stitches along the right neckline edge, transfer the stitches from the back neckline, and pick up 13 stitches along the left neckline edge.</p>
                <p>Work in rib stitch around until the neckline measures 2 cm. Cast off in rib stitch.</p>
                <p>Sew together the sides of the body and the sleeves. Attach the sleeves to the armholes.</p>
            </>
        )
    }
];

const InfoSection = forwardRef<HTMLDivElement>((_, ref) => {
    const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
    const [currentRow, setCurrentRow] = useState(14);
    const [totalRows] = useState(48);

    const toggleAccordion = (index: number) => {
        const newOpenAccordions = new Set<number>();
        if (!openAccordions.has(index)) {
            newOpenAccordions.add(index);
        }
        setOpenAccordions(newOpenAccordions);
    };

    const accordionData = [
        ...ACCORDION_DATA,
        {
            id: 5,
            title: 'Chart',
            content: (
                <div className="knitting-chart-section" style={{ marginTop: 0 }}>
                    <h3>Knitting chart line by line</h3>
                    <div className="chart-container">
                        <img src="/IconsImages/LineByLineChart.png" alt="Knitting Chart" className="chart-image" />
                        <div className="chart-controls">
                            <div className="total-rows">{totalRows}</div>
                            <div className="row-navigator">
                                <button
                                    className="nav-button"
                                    onClick={() => setCurrentRow(Math.max(1, currentRow - 1))}
                                    disabled={currentRow <= 1}
                                >
                                    &lt;
                                </button>
                                <div className="current-row-display">
                                    <span className="row-label">Current row:</span>
                                    <span className="row-number">{currentRow}</span>
                                </div>
                                <button
                                    className="nav-button"
                                    onClick={() => setCurrentRow(Math.min(totalRows, currentRow + 1))}
                                    disabled={currentRow >= totalRows}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section ref={ref} className="info-section">
            <div className="instructions-header">
                <h2>Knitting pattern</h2>
                <p className="instructions-subtitle">Precise instructions about how to knit your motifs</p>
            </div>

            <div className="instructions-container">
                {/* Accordion Sections */}
                {accordionData.map((section) => (
                    <div key={section.id} className={`accordion-item ${openAccordions.has(section.id) ? 'active' : ''}`}>
                        <button
                            className="accordion-header"
                            onClick={() => toggleAccordion(section.id)}
                        >
                            <span>{section.title}</span>
                            <div className="accordion-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="accordion-icon">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </button>
                        <div className={`accordion-content ${openAccordions.has(section.id) ? 'open' : ''}`}>
                            <div className="accordion-content-inner">
                                {section.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default InfoSection;

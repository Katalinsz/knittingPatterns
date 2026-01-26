import { useState } from 'react';
import './ClothingPreview.css';

const ClothingPreview = () => {
    const [isClothingDropdownOpen, setIsClothingDropdownOpen] = useState(false);

    return (
        <>
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
                        <polyline points="6 9 12 15 18 9" />
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
        </>
    );
};

export default ClothingPreview;

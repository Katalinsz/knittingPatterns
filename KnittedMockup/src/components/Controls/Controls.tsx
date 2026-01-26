import React from 'react';
import './Controls.css';

interface ControlsProps {
    tensionMin: number;
    setTensionMin: (val: number) => void;
    tensionMax: number;
    setTensionMax: (val: number) => void;
    chestSize: number;
    setChestSize: (val: number) => void;
    onOpenInfo: (type: 'tension' | 'chest') => void;
}

const Controls: React.FC<ControlsProps> = ({
    tensionMin,
    setTensionMin,
    tensionMax,
    setTensionMax,
    chestSize,
    setChestSize,
    onOpenInfo
}) => {
    const sizes = ['Woman XXS', 'Woman XS', 'Woman S', 'Woman M', 'Woman L', 'Woman XL'];
    const tensionValues = [17, 18, 19, 20, 21, 22, 23];

    return (
        <>
            <div className="control-group">
                <div className="control-header">
                    <label>
                        Knitting tension
                        <button
                            className="info-button"
                            title="Information about knitting tension"
                            onClick={() => onOpenInfo('tension')}
                        >?</button>
                    </label>
                    <div className="value-display">{tensionMin} × {tensionMax}</div>
                </div>
                <div className="dual-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="6"
                        value={tensionValues.indexOf(tensionMin)}
                        onChange={(e) => {
                            const newMin = tensionValues[parseInt(e.target.value)];
                            if (newMin <= tensionMax) {
                                setTensionMin(newMin);
                            }
                        }}
                        className="slider slider-min"
                    />
                    <input
                        type="range"
                        min="0"
                        max="6"
                        value={tensionValues.indexOf(tensionMax)}
                        onChange={(e) => {
                            const newMax = tensionValues[parseInt(e.target.value)];
                            if (newMax >= tensionMin) {
                                setTensionMax(newMax);
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
                            onClick={() => onOpenInfo('chest')}
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
        </>
    );
};

export default Controls;

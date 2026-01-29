import React, { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer, Text, Rect, Group, Line } from 'react-konva';
import Konva from 'konva';

export interface Motif {
    id: string;
    image: HTMLImageElement;
    x: number;
    y: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    width: number;
    height: number;
    stitches?: {
        cols: number;
        rows: number;
    };
}

interface DraggableMotifProps {
    motif: Motif;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (updatedMotif: Motif) => void;
    onDuplicate?: (id: string) => void;
    onDelete?: (id: string) => void;
    sweaterBounds: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
}

// Helper to safely get CSS variable with fallback
const getCssVariable = (name: string, fallback: string) => {
    if (typeof window === 'undefined') return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
};

// Helper to construct RGBA from CSS RGB variable
const getRgbaFromCss = (name: string, alpha: number, fallbackRgb: string) => {
    const rgb = getCssVariable(name, fallbackRgb);
    return `rgba(${rgb}, ${alpha})`;
};

const DraggableMotif: React.FC<DraggableMotifProps> = ({
    motif,
    isSelected,
    onSelect,
    onChange,
    onDuplicate,
    onDelete,
    sweaterBounds,
}) => {
    const groupRef = useRef<Konva.Group>(null);
    const buttonsRef = useRef<Konva.Group>(null);
    const imageRef = useRef<Konva.Image>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformerRef = useRef<any>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

    // Force re-render on mount to ensure CSS is loaded
    const [, forceUpdate] = React.useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    useEffect(() => {
        if (isSelected && transformerRef.current && groupRef.current) {
            transformerRef.current.nodes([groupRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    // Handle counter-rotation for buttons during transform
    useEffect(() => {
        const node = groupRef.current;
        if (!node) return;

        const handleTransform = () => {
            if (buttonsRef.current) {
                // Counter-rotate the buttons group so it stays upright
                buttonsRef.current.rotation(-node.rotation());
            }
        };

        node.on('transform', handleTransform);
        // Initial sync
        handleTransform();

        return () => {
            node.off('transform', handleTransform);
        };
    }, []); // Run once on mount (setup listener) - node ref is stable

    const handleDragMove = () => {
        const node = groupRef.current;
        if (!node) return;

        const newX = Math.max(
            sweaterBounds.left,
            Math.min(sweaterBounds.right - (node.width() * node.scaleX()), node.x())
        );
        const newY = Math.max(
            sweaterBounds.top,
            Math.min(sweaterBounds.bottom - (node.height() * node.scaleY()), node.y())
        );

        node.position({ x: newX, y: newY });
    };

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        const node = e.target;
        onChange({
            ...motif,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
        });
    };

    const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
        const node = e.target;
        onChange({
            ...motif,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
        });
    };

    // Styling constants derived from user request
    const secondaryRgb = '--color-secondary-rgb';
    const accentRgb = '--color-accent-rgb';

    // Fallbacks
    const fallbackSecondaryRgb = '245, 245, 240';
    const fallbackAccentRgb = '255, 128, 138';

    // Default Styles
    const buttonFill = getRgbaFromCss(secondaryRgb, 0.8, fallbackSecondaryRgb);
    const buttonStroke = getRgbaFromCss(accentRgb, 0.133, fallbackAccentRgb);
    const accentColor = getCssVariable('--color-accent', '#FF808A');
    const shadowColor = getRgbaFromCss(accentRgb, 0.3, fallbackAccentRgb);

    // Hover Styles
    const hoverStroke = getRgbaFromCss(accentRgb, 0.6, fallbackAccentRgb);
    const hoverShadowColor = getRgbaFromCss(accentRgb, 0.65, fallbackAccentRgb);

    return (
        <React.Fragment>
            <Group
                ref={groupRef}
                x={motif.x}
                y={motif.y}
                rotation={motif.rotation || 0}
                scaleX={motif.scaleX || 1}
                scaleY={motif.scaleY || 1}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onTransformEnd={handleTransformEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >


                <KonvaImage
                    ref={imageRef}
                    image={motif.image}
                    width={motif.width}
                    height={motif.height}
                    x={0}
                    y={0}
                />

                {/* Buttons Group - Shows on Hover/Select. Follows position but stays upright! */}
                {(isHovered || isSelected) && (
                    <Group
                        ref={buttonsRef}
                        x={motif.width}
                        y={0}
                        rotation={-(motif.rotation || 0)} // React state sync
                    >
                        {/* Copy Button */}
                        {onDuplicate && (
                            <Group
                                x={-24} // Relative to top-right corner
                                y={-14}
                                onClick={(e) => {
                                    e.cancelBubble = true;
                                    onDuplicate(motif.id);
                                }}
                                onTap={(e) => {
                                    e.cancelBubble = true;
                                    onDuplicate(motif.id);
                                }}
                                onMouseEnter={(e) => {
                                    setHoveredButton('copy');
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'pointer';
                                }}
                                onMouseLeave={(e) => {
                                    setHoveredButton(null);
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'default';
                                }}
                            >
                                <Rect
                                    width={24}
                                    height={24}
                                    fill={buttonFill}
                                    stroke={hoveredButton === 'copy' ? hoverStroke : buttonStroke}
                                    strokeWidth={1}
                                    cornerRadius={8}
                                    shadowColor={hoveredButton === 'copy' ? hoverShadowColor : shadowColor}
                                    shadowBlur={hoveredButton === 'copy' ? 10 : 6}
                                    shadowOffsetY={hoveredButton === 'copy' ? 3 : 2}
                                />
                                <Text
                                    width={24}
                                    height={24}
                                    text="+"
                                    fontSize={18}
                                    fontStyle="bold"
                                    align="center"
                                    verticalAlign="middle"
                                    fill={accentColor}
                                    listening={false}
                                />
                            </Group>
                        )}

                        {/* Delete Button */}
                        {onDelete && (
                            <Group
                                x={6} // Relative to top-right corner
                                y={-14}
                                onClick={(e) => {
                                    e.cancelBubble = true;
                                    onDelete(motif.id);
                                }}
                                onTap={(e) => {
                                    e.cancelBubble = true;
                                    onDelete(motif.id);
                                }}
                                onMouseEnter={(e) => {
                                    setHoveredButton('delete');
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'pointer';
                                }}
                                onMouseLeave={(e) => {
                                    setHoveredButton(null);
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'default';
                                }}
                            >
                                <Rect
                                    width={24}
                                    height={24}
                                    fill={buttonFill}
                                    stroke={hoveredButton === 'delete' ? hoverStroke : buttonStroke}
                                    strokeWidth={1}
                                    cornerRadius={8}
                                    shadowColor={hoveredButton === 'delete' ? hoverShadowColor : shadowColor}
                                    shadowBlur={hoveredButton === 'delete' ? 10 : 6}
                                    shadowOffsetY={hoveredButton === 'delete' ? 3 : 2}
                                />
                                <Text
                                    width={24}
                                    height={23}
                                    text="×"
                                    fontSize={18}
                                    fontStyle="bold"
                                    align="center"
                                    verticalAlign="middle"
                                    fill={accentColor}
                                    listening={false}
                                />
                            </Group>
                        )}
                    </Group>
                )}
            </Group>

            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    enabledAnchors={[]} /* Disable resizing */
                    rotationSnaps={[0, 90, 180, 270]}
                    // Hide default border so we can use our custom rounded one
                    borderEnabled={false}
                    // Styling Anchors
                    anchorFill={buttonFill}
                    anchorStroke={accentColor}
                    anchorStrokeWidth={2}
                    anchorCornerRadius={50} // "make the anchor a circle"
                    anchorSize={15}
                    rotateAnchorAngle={-18}
                    rotateAnchorCursor='ew-resize'
                    rotateAnchorOffset={-10} /* Closer to the element */
                    boundBoxFunc={(oldBox, newBox) => {
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default DraggableMotif;

import React, { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer, Text, Rect, Group } from 'react-konva';
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
    const imageRef = useRef<Konva.Image>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformerRef = useRef<any>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    useEffect(() => {
        if (isSelected && transformerRef.current && groupRef.current) {
            transformerRef.current.nodes([groupRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleDragMove = () => {
        const node = groupRef.current;
        if (!node) return;

        // With rotation, bounding box calc is complex. 
        // For now, using center point or top-left constraint as basic check.
        // Or just clamping x/y of the group anchor.

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

                {/* Text Removed */}
                {/* Selection Border Removed */}

                {/* Buttons Group - Shows on Hover/Select. Rotates with image! */}
                {(isHovered || isSelected) && (
                    <Group>
                        {/* Copy Button */}
                        {onDuplicate && (
                            <Group
                                x={motif.width - 24}
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
                                    // cursor pointer
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'pointer';
                                }}
                                onMouseLeave={(e) => {
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'default';
                                }}
                            >
                                <Rect
                                    width={24}
                                    height={24}
                                    fill="#137663" /* var(--color-primary) */
                                    cornerRadius={12}
                                    shadowColor="rgba(0,0,0,0.15)"
                                    shadowBlur={4}
                                />
                                <Text
                                    width={24}
                                    height={24}
                                    text="+"
                                    fontSize={18}
                                    fontStyle="bold"
                                    align="center"
                                    verticalAlign="middle"
                                    fill="white"
                                    listening={false}
                                />
                            </Group>
                        )}

                        {/* Delete Button */}
                        {onDelete && (
                            <Group
                                x={motif.width + 6}
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
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'pointer';
                                }}
                                onMouseLeave={(e) => {
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'default';
                                }}
                            >
                                <Rect
                                    width={24}
                                    height={24}
                                    fill="#FF808A" /* var(--color-accent) */
                                    cornerRadius={12}
                                    shadowColor="rgba(0,0,0,0.15)"
                                    shadowBlur={4}
                                />
                                <Text
                                    width={24}
                                    height={23}
                                    text="×"
                                    fontSize={18}
                                    fontStyle="bold"
                                    align="center"
                                    verticalAlign="middle"
                                    fill="white"
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
                    /* Styling the Transformer (Selection Box) */
                    borderStroke="#137663" /* Primary Color */
                    borderStrokeWidth={2}
                    anchorStroke="#137663"
                    anchorFill="#ffffff"
                    anchorSize={10} /* Size of the rotation handle */
                    boundBoxFunc={(oldBox, newBox) => {
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default DraggableMotif;

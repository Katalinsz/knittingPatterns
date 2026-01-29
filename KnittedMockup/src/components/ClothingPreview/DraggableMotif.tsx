import React, { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer, Text, Rect } from 'react-konva';
import Konva from 'konva';

export interface Motif {
    id: string;
    image: HTMLImageElement;
    x: number;
    y: number;
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
    sweaterBounds,
}) => {
    const imageRef = useRef<Konva.Image>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformerRef = useRef<any>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    useEffect(() => {
        if (isSelected && transformerRef.current && imageRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleDragMove = () => {
        const node = imageRef.current;
        if (!node) return;

        const newX = Math.max(
            sweaterBounds.left,
            Math.min(sweaterBounds.right - node.width(), node.x())
        );
        const newY = Math.max(
            sweaterBounds.top,
            Math.min(sweaterBounds.bottom - node.height(), node.y())
        );

        node.position({ x: newX, y: newY });
    };

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        const node = e.target;
        const width = node.width();
        const height = node.height();

        // Final boundary enforcement just in case
        const constrainedX = Math.max(
            sweaterBounds.left,
            Math.min(sweaterBounds.right - width, node.x())
        );
        const constrainedY = Math.max(
            sweaterBounds.top,
            Math.min(sweaterBounds.bottom - height, node.y())
        );

        onChange({
            ...motif,
            x: constrainedX,
            y: constrainedY,
        });
    };

    return (
        <React.Fragment>
            <KonvaImage
                ref={imageRef}
                image={motif.image}
                x={motif.x}
                y={motif.y}
                width={motif.width}
                height={motif.height}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />

            {motif.stitches && (
                <Text
                    x={motif.x}
                    y={motif.y + motif.height + 6}
                    text={`${motif.stitches.cols} × ${motif.stitches.rows}`}
                    fontSize={13}
                    fill="#1F2937"
                    fontStyle="bold"
                    listening={false}
                />
            )}

            {/* Copy Button Group - Shows on Hover */}
            {(isHovered || isSelected) && onDuplicate && (
                <React.Fragment>
                    {/* Using a Group to act as a button */}
                    <Rect
                        x={motif.x + motif.width - 24}
                        y={motif.y - 12}
                        width={24}
                        height={24}
                        fill="#3B82F6"
                        cornerRadius={12}
                        onClick={(e) => {
                            e.cancelBubble = true; // Prevent selecting the underlying image if they overlap weirdly
                            onDuplicate(motif.id);
                        }}
                        onTap={(e) => {
                            e.cancelBubble = true;
                            onDuplicate(motif.id);
                        }}
                        onMouseEnter={() => {
                            const stage = imageRef.current?.getStage();
                            if (stage) stage.container().style.cursor = 'pointer';
                            setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                            const stage = imageRef.current?.getStage();
                            if (stage) stage.container().style.cursor = 'default';
                        }}
                    />
                    <Text
                        x={motif.x + motif.width - 24}
                        y={motif.y - 12}
                        width={24}
                        height={24}
                        text="+"
                        fontSize={18}
                        fontStyle="bold"
                        align="center"
                        verticalAlign="middle"
                        fill="white"
                        listening={false} // Click through to the Rect
                    />
                </React.Fragment>
            )}

            {isSelected && (
                <>
                    <Rect
                        x={motif.x - 2}
                        y={motif.y - 2}
                        width={motif.width + 4}
                        height={motif.height + 4}
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dash={[8, 4]}
                        listening={false}
                    />
                    <Transformer
                        ref={transformerRef}
                        enabledAnchors={[]}
                        borderEnabled={false}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default DraggableMotif;

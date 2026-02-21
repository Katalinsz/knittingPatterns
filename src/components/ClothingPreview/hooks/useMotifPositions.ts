import { useEffect } from 'react';
import type { Motif } from '../types';
import type { Bounds } from '../models/Bounds';

export interface MotifPositionCm {
    id: string;
    /** X position of the motif's bottom-right corner, in cm from the garment's left edge. */
    bottomRightXCm: number;
    /** Y position of the motif's bottom-right corner, in cm from the garment's top edge. */
    bottomRightYCm: number;
}

interface UseMotifPositionsOptions {
    motifs: Motif[];
    /** Pixel bounds of the droppable garment area on the canvas. */
    designBounds: Bounds | null;
    /** Real-world cm dimensions of the garment area (maps 1:1 to designBounds). */
    garmentDimsCm: { width: number; height: number } | null;
    onChange?: (positions: MotifPositionCm[]) => void;
}

/**
 * Converts each placed motif's pixel position to cm coordinates
 * relative to the garment's knittable area, then calls onChange.
 *
 * bottomRightX/Y are used because knitting patterns typically anchor
 * motifs from their bottom-right (end of row / end of stitch count).
 */
export function useMotifPositions({
    motifs,
    designBounds,
    garmentDimsCm,
    onChange,
}: UseMotifPositionsOptions): void {
    useEffect(() => {
        if (!onChange || !garmentDimsCm || !designBounds) return;
        if (designBounds.width === 0 || designBounds.height === 0) return;

        const round1 = (n: number) => Math.round(n * 10) / 10;

        const positions: MotifPositionCm[] = motifs.map(motif => {
            const pixelXFromLeft = motif.x + motif.width  - designBounds.left;
            const pixelYFromTop  = motif.y + motif.height - designBounds.top;

            return {
                id: motif.id,
                bottomRightXCm: round1((pixelXFromLeft / designBounds.width)  * garmentDimsCm.width),
                bottomRightYCm: round1((pixelYFromTop  / designBounds.height) * garmentDimsCm.height),
            };
        });

        console.log('[useMotifPositions] positions in cm:', positions);
        onChange(positions);

    // We intentionally omit `onChange` from deps — it's a callback ref pattern.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motifs, designBounds, garmentDimsCm]);
}

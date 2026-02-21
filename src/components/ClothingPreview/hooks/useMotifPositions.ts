import { useEffect } from 'react';
import type { Motif } from '../types';
import type { Bounds } from '../models/Bounds';

export interface MotifPositionCm {
    id: string;
    /** X position of the motif's bottom-right corner, in cm from the garment's left edge (includes 3 cm ribbing offset). */
    bottomRightXCm: number;
    /** Y position of the motif's bottom-right corner, in cm from the garment's top edge (includes 3 cm ribbing offset). */
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
 * All four sides have 3 cm of ribbing, so:
 *   - The knittable area starts at (3 cm, 3 cm) from each garment edge.
 *   - The knittable area dimensions are (garmentWidth − 6) × (garmentHeight − 6).
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

        const RIBBING_CM = 3;
        const round1 = (n: number) => Math.round(n * 10) / 10;

        const knittableWidth  = garmentDimsCm.width  - 2 * RIBBING_CM;
        const knittableHeight = garmentDimsCm.height - 2 * RIBBING_CM;

        const positions: MotifPositionCm[] = motifs.map(motif => {
            const pixelXFromLeft = motif.x + motif.width  - designBounds.left;
            const pixelYFromTop  = motif.y + motif.height - designBounds.top;

            return {
                id: motif.id,
                // Offset by ribbing so (0,0) pixels maps to (3 cm, 3 cm), not (0, 0).
                bottomRightXCm: round1(RIBBING_CM + (pixelXFromLeft / designBounds.width)  * knittableWidth),
                bottomRightYCm: round1(RIBBING_CM + (pixelYFromTop  / designBounds.height) * knittableHeight),
            };
        });

        console.log('[useMotifPositions] positions in cm:', positions);
        onChange(positions);

    // We intentionally omit `onChange` from deps — it's a callback ref pattern.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motifs, designBounds, garmentDimsCm]);
}

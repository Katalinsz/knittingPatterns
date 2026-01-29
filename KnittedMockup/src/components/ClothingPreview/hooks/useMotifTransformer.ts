import { useEffect } from 'react';
import Konva from 'konva';

export const useMotifTransformer = (
    isSelected: boolean,
    nodeRef: React.RefObject<Konva.Group | null>,
    transformerRef: React.RefObject<Konva.Transformer | null>
) => {
    useEffect(() => {
        if (isSelected && transformerRef.current && nodeRef.current) {
            transformerRef.current.nodes([nodeRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, nodeRef, transformerRef]);
};

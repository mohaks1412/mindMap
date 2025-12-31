// hooks/useCanvasControls.ts - SMOOTH PAN + MOMENTUM
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { 
  startDrag, updatePan, endDrag, 
  zoomIn, zoomOut, decayMomentum 
} from '@/app/store/slices/uiSlice';

export const useCanvasDrag = () => {
  const dispatch = useAppDispatch();
  const { isDragging } = useAppSelector(state => state.ui);

  // 🆕 SMOOTH MOMENTUM LOOP (runs in hook!)
  useEffect(() => {
    let rafId: number;
    
    const loop = () => {
      dispatch(decayMomentum());
      rafId = requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => cancelAnimationFrame(rafId);
  }, [dispatch]);

  // Drag handlers
  const onMouseDown = useCallback(() => {
    dispatch(startDrag());
  }, [dispatch]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      dispatch(updatePan({ 
        x: e.movementX * 0.8,
        y: e.movementY * 0.8 
      }));
    }
  }, [dispatch, isDragging]);

  const onMouseUp = useCallback(() => {
    dispatch(endDrag());
  }, [dispatch]);

  const onMouseLeave = useCallback(() => {
    dispatch(endDrag());
  }, [dispatch]);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.deltaY < 0 ? dispatch(zoomIn()) : dispatch(zoomOut());
  }, [dispatch]);

  return {
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel,
  };
};

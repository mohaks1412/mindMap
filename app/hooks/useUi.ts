// hooks/useUi.ts
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { 
  fitView, 
  zoomIn, 
  zoomOut, 
  startDrag, 
  updatePan, 
  endDrag, 
  resetView 
} from '@/app/store/slices/uiSlice';

export const useUi = () => {
  const dispatch = useAppDispatch();
  const { zoom, panX, panY, autoFit, isDragging } = useAppSelector(
    (state) => state.ui
  );

  return {
    // State
    zoom,
    panX,
    panY,
    autoFit,
    isDragging,

    // Actions
    fitView: () => dispatch(fitView()),
    zoomIn: () => dispatch(zoomIn()),
    zoomOut: () => dispatch(zoomOut()),
    startDrag: () => dispatch(startDrag()),
    updatePan: (delta: { x: number; y: number }) => dispatch(updatePan(delta)),
    endDrag: () => dispatch(endDrag()),
    resetView: () => dispatch(resetView()),
  };
};

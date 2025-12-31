// store/slices/uiSlice.ts - SMOOTH PANNING (COMPLETE)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  zoom: number;
  panX: number;
  panY: number;
  velocityX: number;  // Momentum
  velocityY: number;  // Momentum
  autoFit: boolean;
  isDragging: boolean;
}

const initialState: UiState = {
  zoom: 1,
  panX: 0,
  panY: 0,
  velocityX: 0,
  velocityY: 0,
  autoFit: true,
  isDragging: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 🎯 SMOOTH PAN (with momentum)
    updatePan: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      
      if (state.isDragging) {
        state.panX -= x * 0.8;  // 80% sensitivity
        state.panY -= y * 0.8;
        state.velocityX = x * 0.3;  // Build momentum
        state.velocityY = y * 0.3;
      }
    },

    // MOMENTUM DECAY (smooth coasting)
    decayMomentum: (state) => {
      if (!state.isDragging) {
        state.velocityX *= 0.92;  // Friction
        state.velocityY *= 0.92;
        state.panX += state.velocityX;
        state.panY += state.velocityY;
        
        if (Math.abs(state.velocityX) < 0.1) state.velocityX = 0;
        if (Math.abs(state.velocityY) < 0.1) state.velocityY = 0;
      }
    },

    fitView: (state) => {
      state.zoom = 1;
      state.panX = 0;
      state.panY = 0;
      state.velocityX = 0;
      state.velocityY = 0;
      state.autoFit = true;
    },

    zoomIn: (state) => {
      state.zoom = Math.min(state.zoom * 1.2, 3);
      state.autoFit = false;
    },

    zoomOut: (state) => {
      state.zoom = Math.max(state.zoom / 1.2, 0.3);
      state.autoFit = false;
    },

    startDrag: (state) => {
      state.isDragging = true;
      state.velocityX *= 0.5;  // Dampen existing momentum
      state.velocityY *= 0.5;
    },

    endDrag: (state) => {
      state.isDragging = false;  // Momentum continues smoothly!
    },

    resetView: (state) => {
      state.zoom = 1;
      state.panX = 0;
      state.panY = 0;
      state.velocityX = 0;
      state.velocityY = 0;
      state.autoFit = true;
    },
  },
});

// ✅ FIXED: Only export ACTIONS (not state!)
export const { 
  fitView, 
  zoomIn, 
  zoomOut, 
  startDrag, 
  updatePan, 
  endDrag, 
  resetView, 
  decayMomentum 
} = uiSlice.actions;

export default uiSlice.reducer;

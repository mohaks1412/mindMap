import { configureStore } from '@reduxjs/toolkit';
import mindmapReducer from './slices/mindmapSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    mindmap: mindmapReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from '@/store/slices/chatSlice';
import { modalsReducer } from '@/store/slices/modalsSlice';

export const store = configureStore({
  reducer: { chatReducer, modalsReducer: modalsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

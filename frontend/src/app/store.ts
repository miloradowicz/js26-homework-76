import { configureStore } from '@reduxjs/toolkit';

import { chatReducer } from '@/store/slices/chat';

export const store = configureStore({ reducer: { chatReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

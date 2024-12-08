import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/cyrillic.css';

import App from './App.tsx';
import { store } from '@/app/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

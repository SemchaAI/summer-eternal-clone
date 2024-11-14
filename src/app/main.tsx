import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from '@/components/pages';
import { CursorProvider, CustomCursor } from '@/components/features';
import './assets/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CursorProvider>
      <HomePage />
      <CustomCursor />
    </CursorProvider>
  </StrictMode>
);
